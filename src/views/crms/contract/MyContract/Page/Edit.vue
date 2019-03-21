<template>
  <div class="edit-wrapper">
    <el-card class="edit-card" shadow="hover">
      <div slot="header" class="title">
        <span>编辑联系人</span>
      </div>
      <el-form :model="formData" :rules="rules" ref="form" label-width="100px">

        <el-row>
          <el-form-item label="合同名称：" prop="contractName">
            <el-input v-model="formData.contractName" placeholder="当天日期（八位数字）+客户名称+项目内容名称+“合同”，如“20180306农业部政务资源目录梳理合同”。"></el-input>
          </el-form-item>
          <!-- <el-form-item label="关联项目：" prop="guanlian">
            <el-input v-model="formData.guanlian" placeholder="关联项目"></el-input>
          </el-form-item> -->
          <el-form-item label="合同说明 / 收款方式：" prop="contractExpl">
            <el-input type="textarea" v-model="formData.contractExpl" placeholder="合同说明/收款方式"></el-input>
          </el-form-item>
          <el-form-item label="业务类型：" prop="businessType">
            <el-radio-group v-model="formData.businessType">
              <el-radio v-for="item in dicData.select" :key="item.value" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="合同标签：" prop="tagKeyWords">
            <iep-tags v-model="formData.tagKeyWords" @addTags="addTags"></iep-tags>
          </el-form-item>
          <el-row>
            <el-col :span=12>
              <el-form-item label="签订日期：" prop="signTime">
                <!-- <el-date-picker v-model="formData.signTime" type="date" placeholder="选择签订日期">
                </el-date-picker> -->
                <IepDatePicker v-model="formData.signTime"></IepDatePicker>
              </el-form-item>
            </el-col>
            <el-col :span=12>
              <el-form-item label="完结日期：" prop="finishTime">
                <!-- <el-date-picker v-model="formData.finishTime" type="date" placeholder="选择完结日期">
                </el-date-picker> -->
                <IepDatePicker v-model="formData.finishTime"></IepDatePicker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span=12>
              <el-form-item label="委托单位：" prop="companyOrgId">
                <el-select v-model="formData.companyOrgId" placeholder="请选择">
                  <el-option v-for="item in dicData.deptList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span=12>
              <el-form-item label="签署单位：" prop="signCompanyOrgId">
                <el-select v-model="formData.signCompanyOrgId" placeholder="请选择">
                  <el-option v-for="item in dicData.deptList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span=12>
              <el-form-item label="签署部门：" prop="signDeptOrgId">
                <el-select v-model="formData.signDeptOrgId" placeholder="请选择">
                  <el-option v-for="item in dicData.deptList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span=12>
              <el-form-item label="承接部门：" prop="underTakeDeptId">
                <el-select v-model="formData.underTakeDeptId" placeholder="请选择" multiple>
                  <el-option v-for="item in dicData.deptList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span=12>
              <el-form-item label="市场经理：" prop="directorId">
                <el-input v-model="formData.directorId" placeholder="市场经理"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span=12>
              <el-form-item label="合同金额：" prop="contractAmount">
                <el-input v-model="formData.contractAmount" placeholder="合同金额"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span=12>
              <el-form-item label="合同级别：" prop="contractLevel">
                <el-select v-model="formData.contractLevel" placeholder="请选择">
                  <el-option v-for="item in dicData.select" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span=12>
              <el-form-item label="合同状态：" prop="contractStatus">
                <el-select v-model="formData.contractStatus" placeholder="请选择">
                  <el-option v-for="item in dicData.select" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span=12>
              <el-form-item label="保证金：" prop="deposit">
                <el-input v-model="formData.deposit" placeholder="保证金"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span=20>
              <el-form-item label="合同上传：" prop="baozhengjin">
                <el-upload class="upload-demo" action="11111" :on-change="handleChange" :file-list="formData.list" :on-remove="onRemove">
                  <iep-button size="small" type="primary">点击上传</iep-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row> -->
          
        <el-col v-if="!pageState">
          <div style="float: right;">
            <iep-button type="primary" @click="submitForm('form')">{{methodName}}</iep-button>
            <iep-button @click="handleGoBack">取消</iep-button>
          </div>
        </el-col>
        </el-row>
      </el-form>
    </el-card>
    <footer-tool-bar v-if="pageState">
      <iep-button type="info" @click="handleGoBack">返回</iep-button>
      <iep-button type="primary" @click="submitForm('form')">提交</iep-button>
    </footer-tool-bar>
  </div>
</template>

<script>
import { initFormData, rules } from '../options'
import iepTags from '@/components/IepTags'
import FooterToolBar from '@/components/FooterToolbar'

export default {
  components: { iepTags, FooterToolBar },
  data () {
    return {
      pageState: true,
      formData: initFormData(),
      rules,
      methodName: '新增',
      methodState: false,
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
    }
  },
  methods: {
    handleGoBack () {
      this.$emit('onGoBack')
    },
    loadPage () {
      this.$emit('load-page')
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.formData = initFormData()
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
            this.handleGoBack()
          })
        } else {
          return false
        }
      })
    },
    handleChange (file) {
      console.log('file: ', file)
    },
    onRemove (file) {
      console.log('file: ', file)
    },
    addTags () {
      this.$message('添加标签')
    },
  },
  watch: {
    methodName (newVal) {
      this.methodState = newVal === '详情'
    },
  },
}
</script>
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
