<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}信息`" width="600px" @close="loadPage">
    <el-form :model="form" ref="form" :rules="rules" class="form-detail" size="small" label-width="100px" :disabled="disabled">
      <el-form-item label="编号：" prop="clientId" class="form-half">
        <el-input v-model="form.clientId"></el-input>
      </el-form-item>
      <el-form-item label="密钥：" prop="clientSecret" class="form-half">
        <el-input v-model="form.clientSecret"></el-input>
      </el-form-item>
      <el-form-item label="域：" prop="scope" class="form-half">
        <el-input v-model="form.scope"></el-input>
      </el-form-item>
      <el-form-item label="授权模式：" prop="authorizedGrantTypes" class="form-half">
        <el-input v-model="form.authorizedGrantTypes"></el-input>
      </el-form-item>
      <el-form-item label="回调地址：" prop="webServerRedirectUri" class="form-half">
        <el-input v-model="form.webServerRedirectUri"></el-input>
      </el-form-item>
      <el-form-item label="权限：" prop="authorities" class="form-half">
        <el-input v-model="form.authorities"></el-input>
      </el-form-item>
      <el-form-item label="自动放行：" prop="autoapprove" class="form-half">
        <el-radio-group v-model="form.autoapprove">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="令牌时效：" prop="accessTokenValidity" class="form-half">
        <el-input v-model="form.accessTokenValidity"></el-input>
      </el-form-item>
      <el-form-item label="刷新时效：" prop="refreshTokenValidity" class="form-half">
        <el-input v-model="form.refreshTokenValidity"></el-input>
      </el-form-item>
      <el-form-item label="扩展信息：" prop="additionalInformation" class="form-half">
        <el-input v-model="form.additionalInformation"></el-input>
      </el-form-item>
      <el-form-item label="资源ID：" prop="resourceIds" class="form-half">
        <el-input v-model="form.resourceIds"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <operation-wrapper>
        <iep-button type="primary" @click="updateForm()" v-show="disEdit">保存</iep-button>
        <iep-button @click="loadPage">取消</iep-button>
      </operation-wrapper>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm, rules } from './options'
export default {
  props: {
    loadImage: {
      type: String,
    },
  },
  data () {
    return {
      dialogShow: false,
      disabled: false,
      disEdit: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initForm(),
      rules,
    }
  },
  computed: {
  },
  methods: {
    loadPage () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    updateForm () {
      this.formRequestFn(this.form).then(({ data }) => {
        if (data.data) {
          this.$message.success('操作成功')
          this.loadPage()
        } else {
          this.$message(data.msg)
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.isAsset {
  color: red;
}
</style>
