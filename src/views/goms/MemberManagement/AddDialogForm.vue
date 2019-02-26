<template>
  <iep-dialog :dialog-show="dialogShow" :title="`成员信息`" width="35%" @load="loadPage" @close="loadPage">
    <el-form :model="gomsForm" ref="gomsForm" label-width="100px">
      <el-form-item>
        <img :src="gomsForm.avatar" alt="" id="avatar">
      </el-form-item>
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="gomsForm.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="真实姓名：" prop="realName">
        <el-input v-model="gomsForm.realName" disabled></el-input>
      </el-form-item>
      <el-form-item label="配置角色：" prop="role">
        <el-select v-model="roleList.roleName" multiple placeholder="请选择">
          <el-option v-for="role in roleList" :key="role.roleId" :label="role.label" :value="role.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机：" prop="phone">
        <el-input type="textarea" v-model="gomsForm.phone" disabled></el-input>
      </el-form-item>
      <el-form-item label="所属组织：" prop="orgNames">
        <li v-for="item in gomsForm.orgNames" :key="item">{{item}}</li>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button @click="updateForm('gomsForm')">保存</el-button>
      <el-button @click="handleCancel()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import { handleImg } from '@/util/util'
import IepDialog from '@/components/IepDialog/'
import { initGomsForm } from './options'
import { putGoms, updateGomsUser } from '@/api/admin/org'
export default {
  components: { IepDialog },
  props: {
    loadImage: {
      type: String,
    },
  },
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      gomsForm: initGomsForm(),
      role: [],
      orgNames: [],
      rolesOptions: [],
      roleList: [],
      roleProps: {
        label: 'roleName',
        value: 'roleId',
      },
    }
  },
  methods: {
    loadPage () {
      this.gomsForm = initGomsForm()
      this.dialogShow = false
      this.$emit('load-page')
      putGoms().then((res) => {
        this.roleList = res.data.data
      })
      console.log(this.gomsForm.avatar)
      handleImg(this.gomsForm.avatar, 'avatar')
    },
    roleSelect () {
      console.log(this.roleList.roleId)
    },
    updateForm (formName) {
      this.$refs[formName].resetFields()
      updateGomsUser({
        userId: this.$refs[formName].userId,
        roleIds: [this.roleList.roleId],
      }).then(() => {
        this.load()
      })
      console.log(this.$refs[formName].validate())
    },
    handleCancel () {
      this.$emit('close')
    },
  },
}
</script>
