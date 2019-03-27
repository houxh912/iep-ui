<template>
  <iep-drawer :drawer-show="drawerShow" type="drawer" :title="'商机'+methodName" width="30%" @close="loadPage">
    <div slot="header" class="title">
      <span>商机详情</span>
    </div>
    <el-form :model="formData" label-width="100px" size="samll">
      <el-form-item label="客户名称：">
        <el-input v-model="formData.clientName" placeholder="客户名称" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="项目名称：">
        <el-input v-model="formData.projectName" placeholder="项目名称" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="业务类型：">
        <el-tag type="info" class="tagStyle" v-for="(item,idx) in formData.businessType" :key="idx">{{item.commonName}}</el-tag>
      </el-form-item>
      <el-form-item label="意向程度：" class="select">
        <el-tag type="info" class="tagStyle">{{formData.intentionLevelValue}}</el-tag>
      </el-form-item>
      <el-form-item label="商机描述：" prop="miaoshu">
        <el-input type="textarea" v-model="formData.opportunityDes" placeholder="商机描述" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="商机标签：">
        <el-tag type="info" class="tagStyle" v-for="(item,idx) in formData.tags" :key="idx">{{item.commonName}}</el-tag>
      </el-form-item>
      <el-form-item label="发布者：">
        <span>{{formData.publisher}} </span>
      </el-form-item>
      <el-form-item label="发布日期：">
        <span>{{formData.publishDate}}</span>
      </el-form-item>
      <el-form-item label="认领状态：">
        <span>{{formData.statusValue}}</span>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button class="btn" @click="handleCancel">取消</iep-button>
      <iep-button type="primary" @click="claimBusiness" v-if="formData.statusKey!==1">认领</iep-button>
    </template>
  </iep-drawer>
</template>

<script>
import { initForm, rules } from '../options'
import { claimById } from '@/api/crms/business'
export default {
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      formData: initForm(),
      methodName: '',
      rules,
      drawerShow: false,
      id: '',
      formRequestFn: () => { },
      backOption: {
        isBack: true,
        backPath: this.$route.query.redirect,
      },
    }
  },
  created () {
  },
  methods: {
    handleCancel () {
      this.drawerShow = false
    },
    loadPage () {
      this.drawerShow = false
      this.$emit('load-page')
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.formData = initForm()
      this.dialogShow = false
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.formData).then(() => {
            this.$notify({
              title: '成功',
              message: `${this.methodName}成功`,
              type: 'success',
              duration: 2000,
            })
            this.loadPage()
            this.dialogShow = false
          })
        } else {
          return false
        }
      })
    },
    addTags () {
      this.$message('添加标签')
    },
    claimBusiness () {
      let claim = {
        opportunityId: this.formData.opportunityId,
        status: this.formData.statusKey,
      }
      claimById({ ...claim }).then(res => {
        if (res.status == 200) {
          this.$message.success('认领成功！')
          this.$emit('onGoBack')
        } else {
          this.$message.info(`认领失败，${res.data.msg}`)
        }
      })
    },
  },
}
</script>