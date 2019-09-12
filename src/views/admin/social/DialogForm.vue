<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}信息`" width="600px" @close="loadPage">
    <el-form :model="form" class="form-detail" ref="form" size="small" label-width="100px" :disabled="disabled">
      <el-form-item label="类型" prop="type" class="form-half">
        <el-input v-model="form.type"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="remark" class="form-half">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
      <el-form-item label="appId" prop="appId" class="form-half">
        <el-input v-model="form.appId"></el-input>
      </el-form-item>
      <el-form-item label="appSecret" prop="appSecret" class="form-half">
        <el-input v-model="form.appSecret"></el-input>
      </el-form-item>
      <el-form-item label="回调地址" prop="redirectUrl" class="form-half">
        <el-input v-model="form.redirectUrl"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <operation-wrapper>
        <iep-button type="primary" @click="updateForm()">保存</iep-button>
        <iep-button @click="loadPage">取消</iep-button>
      </operation-wrapper>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm } from './options'
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
      formRequestFn: () => { },
      methodName: '创建',
      form: initForm(),
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
