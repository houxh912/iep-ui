<template>
  <iep-dialog title="新增" :dialog-show="dialogShow" width="520px" @close="loadPage">
    <el-form :model="form" size="small" label-width="140px">
      <el-form-item label="父公司：" v-if="!!form.parentId">
        <iep-div-detail :value="form.parentName"></iep-div-detail>
      </el-form-item>
      <el-form-item label="线下公司：">
        <el-input v-model="form.name" autocomplete="off" placeholder="请输入线下公司名称"></el-input>
      </el-form-item>
      <el-form-item label="户头所属组织：">
        <iep-select v-model="form.orgId" autocomplete="off" prefix-url="admin/org/all" placeholder="请输入线下公司名称"></iep-select>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="handleSubmit">确 定</iep-button>
      <iep-button @click="loadPage">取 消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm } from './options'
export default {
  data () {
    return {
      form: initForm(),
      dialogShow: false,
      formRequestFn: () => { },
    }
  },
  methods: {
    handleSubmit () {
      this.formRequestFn(this.form).then(({ data }) => {
        if (data.data) {
          this.$message.success('操作成功')
          this.loadPage()
        } else {
          this.$message(data.msg)
        }
      })
    },
    loadPage () {
      this.dialogShow = false
      this.form = initForm()
      this.$emit('load-page')
    },
  },
}
</script>
