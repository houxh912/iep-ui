<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}信息`" width="500px" @close="loadPage" @slot-mounted="load">
    <div class="avatar" style="text-align: center;margin-bottom:20px;">
      <iep-img-avatar :size="128" :src="form.avatar"></iep-img-avatar>
    </div>
    <el-form class="form-detail" :model="form" ref="form" size="small" label-width="100px" :disabled="disabled">
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="form.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="真实姓名：" prop="realName">
        <el-input v-model="form.realName" disabled></el-input>
      </el-form-item>
      <el-form-item label="配置角色：" prop="role">
        <el-select v-model="form.roleList" filterable multiple placeholder="请选择">
          <el-option v-for="item in roleList" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
          </el-option>
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
import { mapGetters } from 'vuex'
import { initMemberForm } from './options'
import { getRoleList } from '@/api/admin/org'
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
      orgNames: [],
      rolesOptions: [],
      roleList: [],
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  methods: {
    handleCancelAsset () {
      this.form.assetOrgId = 0
    },
    handleSetAsset (row) {
      this.form.assetOrgId = row.id
    },
    load () {
      getRoleList().then(({ data }) => {
        const roleList = data.data.map(m => {
          return {
            label: m.roleName,
            value: m.roleId,
          }
        })
        this.roleList = [
          { value: 1, label: '超级管理员', disabled: true },
          { value: 2, label: '游客权限', disabled: true },
          { value: 3, label: '组织成员', disabled: true },
          ...roleList,
        ]
      })
    },
    loadPage () {
      this.form = initMemberForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    updateForm () {
      this.formRequestFn({
        userId: this.form.userId,
        role: this.form.roleList,
      }).then(({ data }) => {
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
<style lang="scss" scoped>
.isAsset {
  color: red;
}
</style>
