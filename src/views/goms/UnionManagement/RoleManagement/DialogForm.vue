
<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}信息`" width="520px" @close="loadPage">
    <el-form :model="form" ref="form" size="small" label-width="100px" :disabled="disabled">
      <el-form-item label="角色名称：" prop="roleName">
        <el-input v-model="form.roleName" placeholder="请填入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="角色标识：" prop="roleCode">
        <el-input v-model="form.roleCode" placeholder="请填入角色标识" :disabled="roleCodeDisabled"></el-input>
      </el-form-item>
      <el-form-item label="角色描述：" prop="roleDesc">
        <el-input v-model="form.roleDesc" placeholder="请填入角色描述"></el-input>
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
  data () {
    return {
      dialogShow: false,
      disabled: false,
      roleCodeDisabled: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initForm(),
    }
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
          this.$message.success('修改成功')
          this.loadPage()
        } else {
          this.$message(data.msg)
        }
      })
    },
  },
}
</script>

