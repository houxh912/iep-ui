<template>
  <div class="edit-wrapper">
    <el-card class="edit-card" shadow="hover">
      <div slot="header" class="title">
        <span>商机详情</span>
      </div>
      <el-form :model="formData" label-width="100px">
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
    </el-card>
    <footer-tool-bar>
      <iep-button type="info" @click="handleGoBack">返回</iep-button>
      <iep-button type="primary" @click="claimBusiness" v-if="formData.statusKey!==1">认领</iep-button>
    </footer-tool-bar>
  </div>
</template>

<script>
import { initForm, rules } from '../options'
import FooterToolBar from '@/components/FooterToolbar'
import { businessById, claimById } from '@/api/crms/business'
export default {
  components: { FooterToolBar },
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      formData: {},
      rules,
      dialogShow: false,
      formRequestFn: () => { },
      backOption: {
        isBack: true,
        backPath: this.$route.query.redirect,
      },
    }
  },
  created () {
    this.formData = this.record
    this.load()
  },
  methods: {
    handleGoBack () {
      this.$emit('onGoBack')
    },
    loadPage () {
      this.$emit('load-page')
    },
    load () {
      businessById(this.record.opportunityId).then((res) => {
        this.formData = res.data.data.data
      })
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
<style scoped>
.edit-wrapper >>> .el-collapse-item__wrap {
  padding: 30px 70px 0 70px;
  border: none;
}
.edit-wrapper >>> .el-collapse {
  border: none;
}
.edit-wrapper >>> .el-collapse-item__header {
  background-color: #f8f8f8;
  font-size: 15px;
  font-weight: 700;
  padding-left: 20px;
  margin: 5px;
  border-radius: 5px;
  border: none;
}
</style>

<style lang="scss" scoped>
.edit-wrapper {
  margin: 5px 5px 50px 5px;
  .form-half {
    width: 50%;
    display: inline-block;
  }
  .edit-card {
    .title {
      font-weight: 600;
    }
  }
}
.tagStyle {
  margin-right: 20px;
}
.select {
  width: 200px;
}
</style>
