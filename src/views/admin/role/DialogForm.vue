
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
      <el-form-item label="关联组织：" prop="orgId">
        <iep-select v-model="form.orgId" autocomplete="off" prefix-url="admin/org/all" placeholder="请选择关联组织"></iep-select>
      </el-form-item>
      <el-form-item label="是否通用：" prop="isCommon">
        <el-switch v-model="form.isCommon" active-text="是" inactive-text="否" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>
      <el-form-item label="数据权限：" prop="dsType">
        <el-select v-model="form.dsType" placeholder="选择数据权限">
          <el-option v-for="item in dsType" :key="item.value" :label="item.label" :value="+item.value" :disabled="item.disabled"></el-option>
        </el-select>
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
      dsType: [],
      dialogShow: false,
      disabled: false,
      roleCodeDisabled: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initForm(),
      dsScopeData: [],
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

