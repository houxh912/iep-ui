<template>
  <div>
    <basic-container>
      <div class="select-org-wrapper">
        <div class="top-wrapper">
          <i class="el-icon-warning"></i>
          <span class="remind-text">您尚未加入任何组织，请选择</span>
          <el-button :type="`${tabsActive ? 'default':'primary'}`" size="mini" @click="tabsActive=0">加入组织</el-button>
          <el-button :type="`${tabsActive ? 'primary':'default'}`" size="mini" @click="tabsActive=1">创建组织</el-button>
        </div>
        <div class="bottom-wrapper">
          <div v-if="tabsActive===0" class="select-org-container">
            <el-button class="grid-item" v-for="(item,index) in orgList" :key="index" @click="handleApplyJoin(item)">{{item.name}}</el-button>
          </div>
          <div v-if="tabsActive===1" class="create-org-container">
            <el-form ref="form" :rules="rules" :model="form" label-width="80px">
              <el-form-item label="组织名称" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="Logo" prop="logo">
                <iep-avatar v-model="form.logo"></iep-avatar>
              </el-form-item>
              <el-form-item label="组织简介" prop="intro">
                <el-input type="textarea" v-model="form.intro"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </basic-container>
    <el-dialog title="申请" :visible.sync="dialogVisible" width="30%">
      <el-form ref="applyForm" :model="applyForm" label-width="80px">
        <el-form-item label="组织名称">
          <el-input v-model="applyForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="申请理由">
          <el-input type="textarea" :rows="4" placeholder="请输入申请理由" v-model="applyForm.message"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmitApply">申 请</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import store from '@/store'
import { getOrgList, addObj, applyObj } from '@/api/admin/org'
export default {
  name: 'org',
  data () {
    return {
      tabsActive: 0,
      orgList: [],
      logo: '',
      applyForm: {
        name: '',
        orgId: '',
        message: '',
      },
      dialogVisible: false,
      headers: {
        Authorization: 'Bearer ' + store.getters.access_token,
      },
      form: {
        name: '',
        logo: '',
        intro: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入组织名称', trigger: 'blur' },
        ], logo: [
          { required: true, message: '请输入LOGO', trigger: 'blur' },
        ], intro: [
          { required: true, message: '请输入组织简介', trigger: 'blur' },
        ],
      },
    }
  },
  created () {
    this.loadOrg()
  },
  methods: {
    handleSubmitApply () {
      applyObj(this.applyForm).then(({ data }) => {
        if (data.data) {
          this.dialogVisible = false
          this.loadOrg()
        } else {
          this.$message({
            message: data.msg,
            type: 'warning',
          })
        }
      })
    },
    handleApplyJoin (item) {
      this.applyForm.name = item.name
      this.applyForm.orgId = item.orgId
      this.applyForm.message = ''
      this.dialogVisible = true
    },
    handleAvatarSuccess (res, file) {
      this.logo = URL.createObjectURL(file.raw)
      this.form.logo = res.data.bucketName + '-' + res.data.fileName
    },
    loadOrg () {
      getOrgList().then(({ data }) => {
        this.orgList = data.data
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addObj(this.form).then(({ data }) => {
            this.$message({
              message: data.msg,
              type: 'success',
            })
          })
        }
      })
    },
  },
}
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px !important;
  color: #8c939d !important;
  width: 178px !important;
  height: 178px !important;
  line-height: 178px !important;
  text-align: center !important;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style scoped="scoped" lang="scss">
.select-org-wrapper {
  padding: 10px 30px;
  .top-wrapper {
    color: #666;
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
    .remind-text {
      font-size: 14px;
      margin-right: 10px;
      margin-left: 5px;
    }
  }
  .bottom-wrapper {
    margin-top: 20px;
    .select-org-container {
      display: grid;
      grid-template-columns: auto auto auto auto;
      .grid-item {
        margin: 10px 20px;
      }
    }
    .create-org-container {
      padding: 0 20px;
    }
  }
}
</style>
