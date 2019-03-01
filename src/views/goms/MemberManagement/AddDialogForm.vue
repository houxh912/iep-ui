<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}成员信息`" width="25%" @close="loadPage" @slot-mounted="load">
    <div class="avatar" style="text-align: center;margin-bottom:20px;">
      <img :src="gomsForm.avatar" alt="" id="avatar" style="width:100px;border-radius:50%;">
    </div>
    <el-form :model="gomsForm" ref="gomsForm" label-width="100px">
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="gomsForm.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="真实姓名：" prop="realName">
        <el-input v-model="gomsForm.realName" disabled></el-input>
      </el-form-item>
      <el-form-item label="配置角色：" prop="role">
        <el-select v-model="gomsForm.roleList" multiple placeholder="请选择">
          <el-option v-for="role in roleList" :key="role.roleId" :label="role.roleName" :value="role.roleId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机：" prop="phone">
        <el-input v-model="gomsForm.phone" disabled></el-input>
      </el-form-item>
      <el-form-item label="所属组织：" prop="orgNames">
        <li v-for="item in gomsForm.orgNames" :key="item">{{item}}</li>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button @click="updateForm()">保存</iep-button>
      <iep-button @click="loadPage">取消</iep-button>
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
      orgNames: [],
      rolesOptions: [],
      roleList: [],
    }
  },
  methods: {
    load () {
      putGoms().then((res) => {
        this.roleList = res.data.data
      })
      handleImg(this.gomsForm.avatar, 'avatar')
    },
    loadPage () {
      this.gomsForm = initGomsForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    updateForm () {
      updateGomsUser({
        userId: this.gomsForm.userId,
        role: this.gomsForm.roleList,
      }).then(() => {
        this.loadPage()
      })
    },
  },
}
</script>
