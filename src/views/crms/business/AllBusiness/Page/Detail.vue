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
          <!-- <el-tag type="info" class="tagStyle">{{formData.intentionLevel}}</el-tag> -->
          <el-select v-model="formData.intentionLevel" :disabled="true">
            <el-option label="高" :value=1></el-option>
            <el-option label="中" :value=2></el-option>
            <el-option label="低" :value=3></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商机描述：" prop="miaoshu">
          <el-input type="textarea" v-model="formData.opportunityDes" placeholder="商机描述" :disabled="true"></el-input>
        </el-form-item>
        <!-- <el-form-item label="商机标签：">
          <el-tag type="info" class="tagStyle" v-for="(item,idx) in formData.tags" :key="idx">{{item.commonName}}</el-tag>
        </el-form-item> -->
        <el-form-item label="发布者：">
          <span>{{formData.publisher}} </span>
        </el-form-item>
        <el-form-item label="发布日期：">
          <span>{{formData.publishDate}}</span>
        </el-form-item>
        <el-form-item label="认领状态：">
          <span>{{formData.status==1?'已认领':'未认领'}}</span>
        </el-form-item>
      </el-form>
    </el-card>
    <footer-tool-bar>
      <iep-button type="info" @click="handleGoBack">返回</iep-button>
      <iep-button type="primary" @click="claimBusiness" v-if="formData.status!==1">认领</iep-button>
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
      formData: {
        // clientName: '皮卡丘',
        // projectName: '小之',
        // businessTypeC: ['sss', 'aaa', 'ccc'],
        // intentionLevel: 1,
        // opportunityDes: 'ssssssssss',
        // tag: ['aaa', 'bbb', 'ccc'],
        // publisher: '萨达',
        // publishDate: 2018 - 8 - 21,
        // reciver: 'dds',
      },
      pagpagination: {
        size: 10,
        current: 1,
      },
      rules,
      dialogShow: false,
      formRequestFn: () => { },
      dicData: {
        select: [
          { label: '选项1', value: 1 },
          { label: '选项2', value: 2 },
        ],
        deptList: [
          { label: '部门1', value: 1 },
          { label: '部门2', value: 2 },
        ],
      },
      backOption: {
        isBack: true,
        backPath: this.$route.query.redirect,
      },
    }
  },
  created () {
    this.formData = this.record
    this.load()
    console.log(this.formData)
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
        // console.log(res)
        this.formData = res.data.data.data
        // console.log(this.formData)
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
      // console.log(this.record)
      let claim = {
        opportunityId: this.record.opportunityId,
        status: this.record.status,
      }
      claimById({ ...claim }).then(res => {
        if (res.status == 200) {
          this.$message.success('认领成功！')
          this.$emit('onGoBack')
          // this.loadPage()
          // this.resetForm(formName)
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
