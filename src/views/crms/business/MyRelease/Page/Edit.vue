<template>
  <div class="edit-wrapper">
    <el-card class="edit-card" shadow="hover">
      <div slot="header" class="title">
        <span v-if="isAdd=='add'">新增商机</span>
        <span v-if="isAdd=='edit'">修改商机</span>
      </div>
      <el-form :model="form" :rules="rules" ref="formName" label-width="100px">
        <el-form-item label="客户名称：" prop="clientName">
          <el-input v-model="form.clientName" placeholder="客户名称"></el-input>
        </el-form-item>
        <el-form-item label="项目名称：" prop="projectName">
          <el-input v-model="form.projectName" placeholder="项目名称"></el-input>
        </el-form-item>
        <el-form-item label="业务类型：" prop="businessType">
          <el-checkbox-group v-model="form.businessType">
            <el-checkbox v-for="item in dicData.businessType" :key="item.value" :label="item.value">{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="意向程度：" prop="intentionLevel">
          <el-radio-group v-model="form.intentionLevel">
            <el-radio v-for="item in dicData.intentionLevel" :key="item.value" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="商机标签：" prop="tags">
          <iep-tags v-model="form.tags" @addTags="addTags"></iep-tags>
        </el-form-item> -->
        <el-form-item label="商机描述：" prop="opportunityDes">
          <el-input type="textarea" v-model="form.opportunityDes" placeholder="商机描述"></el-input>
        </el-form-item>
        <el-form-item label="发布者：" v-if="isAdd=='edit '">
          <el-input v-model="form.publisher" disabled></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <footer-tool-bar>
      <iep-button type="info" @click="handleGoBack">返回</iep-button>
      <iep-button type="primary" @click="submitForm('formName')">提交</iep-button>
    </footer-tool-bar>
  </div>
</template>

<script>
import { initForm, rules } from '../options'
// import iepTags from '@/components/IepTags'
import FooterToolBar from '@/components/FooterToolbar'
import { createData, updateData } from '@/api/crms/business'
export default {
  components: { FooterToolBar },
  props: {
    record: {
      type: Object,
      default: () => { },
    },
    isAdd: {
      type: String,
      default: () => '',
    },
  },
  data () {
    return {
      form: initForm(),
      rules,
      dialogShow: false,
      // formRequestFn: () => { },
      dicData: {
        businessType: [
          { label: '咨询', value: 1 },
          { label: '数据', value: 2 },
          { label: '事项', value: 3 },
          { label: '平台', value: 4 },
          { label: '软件', value: 5 },
        ],
        intentionLevel: [
          { label: '高', value: 1 },
          { label: '中', value: 2 },
          { label: '底', value: 3 },
        ],
      },
    }
  },
  created () {
    // this.formRequestFn = this.record.formRequestFn
    this.load()
  },
  methods: {
    handleGoBack () {
      this.$emit('onGoBack')
    },
    loadPage () {
      this.$emit('load-page')
    },
    resetForm () {
      this.form = initForm()
    },
    load () {
      if (this.isAdd == 'edit') {
        this.record.businessType = this.record.businessType.map(m => parseInt(m.commonId))
        this.form = {
          opportunityId: this.record.opportunityId, // ID
          clientName: this.record.clientName, // 客户名称 clientName
          projectName: this.record.projectName, // 项目名称 projectName
          businessType: this.record.businessType, // 业务类型 businessType
          intentionLevel: this.record.intentionLevel, // 意向程度 intentionLevel
          tags: this.record.tags, // 商机标签 businessTag
          opportunityDes: this.record.opportunityDes, // 商机描述
          publisher: this.record.publisher, //发布者
        }
        console.log(this.form)
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isAdd == 'add') {
            createData(this.form).then(() => {
              this.$message({
                message: '商机新增成功',
                type: 'success',
              })
              this.$emit('onGoBack')
            })
          } else {
            console.log(this.form)
            updateData(this.form).then(() => {
              this.$message({
                message: '商机修改成功',
                type: 'success',
              })
              this.$emit('onGoBack')
            })
          }
        } else {
          this.$message.error('输入未完成')
          return false
        }
      })

    },
    addTags () {
      console.log(this.form)
      this.$message('添加标签')
    },
    // claimBusiness (formName) {
    //   this.formRequestFn(this.formData.id).then(res => {
    //     if (res.data.data) {
    //       this.$message.success('认领成功！')
    //       this.loadPage()
    //       this.resetForm(formName)
    //     } else {
    //       this.$message.info(`操作失败，${res.data.msg}`)
    //     }
    //   })
    // },
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
</style>
