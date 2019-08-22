
<template>
  <iep-dialog :dialog-show="dialogShow" title="修改角色" width="520px" @close="close">
    <el-form class="form-detail" :model="form" ref="form" size="small" label-width="100px">
      <div class="avatar" style="text-align: center;margin-bottom:20px;">
        <iep-img-avatar :size="128" :src="form.avatar"></iep-img-avatar>
      </div>
      <el-form-item label="真实姓名：" prop="realName">
        <el-input v-model="form.realName" disabled></el-input>
      </el-form-item>
      <el-form-item label="手机号：" prop="phone">
        <el-input v-model="form.phone" disabled></el-input>
      </el-form-item>
      <el-form-item label="资产所属：" prop="assetOrg">
        <el-input v-model="form.assetOrg" disabled></el-input>
      </el-form-item>
      <el-form-item label="组织角色：" prop="roleOrg">
        <iep-cascader v-model="form.roleOrg" placeholder="请填入组织角色" :props="{ multiple: true }" :prefixUrl="`admin/role/union/${form.userId}`"></iep-cascader>
      </el-form-item>
      <el-form-item label="联盟角色：" prop="role">
        <iep-select v-model="form.role" placeholder="请填入联盟角色" prefixUrl="admin/role/union" multiple></iep-select>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <operation-wrapper>
        <iep-button type="primary" @click="updateForm()">保存</iep-button>
        <iep-button @click="close">取消</iep-button>
      </operation-wrapper>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm, toDtoForm } from './options'
export default {
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      form: initForm(),
    }
  },
  methods: {
    close () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    updateForm () {
      this.formRequestFn(toDtoForm(this.form)).then(({ data }) => {
        if (data.data) {
          this.$message.success('修改成功')
          this.close()
        } else {
          this.$message(data.msg)
        }
      })
    },
  },
}
</script>

