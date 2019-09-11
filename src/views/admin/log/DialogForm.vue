
<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}日志`" width="500px" @close="loadPage">
    <el-form :model="form" ref="form" size="small" label-width="100px" :disabled="disabled">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" disabled></el-input>
      </el-form-item>
      <el-form-item label="操作人" prop="name">
        <el-input v-model="form.createBy" disabled></el-input>
      </el-form-item>
      <el-form-item label="IP地址" prop="ip">
        <el-input v-model="form.remoteAddr" disabled></el-input>
      </el-form-item>
      <el-form-item label="请求方式" prop="mode">
        <el-input v-model="form.method" disabled></el-input>
      </el-form-item>
      <el-form-item label="客户端" prop="client">
        <el-input v-model="form.serviceId" disabled></el-input>
      </el-form-item>
      <el-form-item label="请求时间" prop="askTime">
        <el-input v-model="form.time" disabled></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-input v-model="form.createTime" disabled></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <operation-wrapper>
        <iep-button @click="loadPage">取消</iep-button>
      </operation-wrapper>
    </template>
  </iep-dialog>
</template>
<script>
import { initMemberForm } from './options'
export default {
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

