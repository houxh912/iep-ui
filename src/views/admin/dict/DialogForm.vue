<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}信息`" width="500px" @close="loadPage">
    <el-form :model="form" ref="form" size="small" label-width="100px" :disabled="disabled">
      <iep-form-item label-name="字典编码" prop="code">
        <el-input v-model="form.code"></el-input>
      </iep-form-item>
      <iep-form-item label-name="字典名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </iep-form-item>
      <iep-form-item label-name="所属系统" prop="system">
        <el-input v-model="form.system" disabled></el-input>
      </iep-form-item>
      <iep-form-item label-name="创建时间" prop="createTime">
        <el-input v-model="form.createTime" disabled></el-input>
      </iep-form-item>
      <iep-form-item label-name="更新时间" prop="updateTime">
        <el-input v-model="form.updateTime" disabled></el-input>
      </iep-form-item>
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
import { initMemberForm } from './options'
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
      form: initMemberForm(),
    }
  },
  computed: {
  },
  methods: {
    loadPage () {
      this.form = initMemberForm()
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
