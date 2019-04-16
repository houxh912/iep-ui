<template>
  <div class="iep-page-form">
    <basic-container>
      <div class="select-org-wrapper">
        <div class="top-wrapper">
          <i class="el-icon-warning"></i>
          <span v-if="noOrg" class="remind-text">您尚未加入任何组织，请选择</span>
          <span v-else class="remind-text">您已在 {{userInfo.orgName}} 的组织</span>
          <el-button :type="`${tabsActive ? 'default':'primary'}`" size="mini" @click="tabsActive=0">加入组织</el-button>
          <el-button :type="`${tabsActive ? 'primary':'default'}`" size="mini" @click="tabsActive=1">创建组织</el-button>
        </div>
        <div class="bottom-wrapper">
          <template v-if="tabsActive===0">
            <a-input-search class="search-box" placeholder="请输入组织名进行搜索" @search="onSearch" enterButton />
            <div class="select-org-container">
              <el-button class="grid-item" v-for="(item,index) in orgList" :key="index" @click="handleApplyJoin(item)">{{item.name}}</el-button>
            </div>
          </template>
          <div v-if="tabsActive===1" class="create-org-container">
            <el-form ref="form" :rules="rules" size="small" :model="form" label-width="80px">
              <el-form-item label="组织名称" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="Logo" prop="logo">
                <iep-avatar v-model="form.logo"></iep-avatar>
              </el-form-item>
              <el-form-item label="组织简介" prop="intro">
                <iep-input-area v-model="form.intro"></iep-input-area>
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
      <el-form ref="applyForm" :model="applyForm" size="small" label-width="80px">
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
import { mapGetters } from 'vuex'
import { initForm } from './options'
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
      form: initForm(),
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
  computed: {
    ...mapGetters([
      'userInfo',
      'noOrg',
    ]),
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
    onSearch (name) {
      this.loadOrg(name)
    },
    loadOrg (name = '') {
      getOrgList(name).then(({ data }) => {
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
            if (data.data) {
              this.$message({
                message: '创建成功，等待审核',
                type: 'success',
              })
              this.tabsActive = 0
              this.form = initForm()
            } else {
              this.$message({
                message: data.msg,
                type: 'warning',
              })
            }
          })
        }
      })
    },
  },
}
</script>
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
    text-align: center;
    margin-top: 20px;
    .search-box {
      width: 50%;
      margin: 10px 0;
    }
    .select-org-container {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      .grid-item {
        margin: 10px 20px;
      }
    }
    .create-org-container {
      padding: 0 20px;
      text-align: left;
    }
  }
}
</style>
