<template>
  <div class="wrap">
    <page-header :title="`${methodName}合同`" :backOption="backOption"></page-header>
    <el-form :model="formData" :rules="rules" ref="form" label-width="130px" style="margin-bottom: 50px;">

      <el-form-item label="合同名称：" prop="contractName">
        <el-input v-model="formData.contractName" placeholder="当天日期（八位数字）+客户名称+项目内容名称+“合同”，如“20180306农业部政务资源目录梳理合同”。"></el-input>
      </el-form-item>
      <el-form-item label="合同说明 / 收款方式：" prop="contractExpl">
        <el-input type="textarea" v-model="formData.contractExpl" placeholder="合同说明/收款方式" rows=5></el-input>
      </el-form-item>
      <el-form-item label="业务类型：" prop="businessType">
        <el-radio-group v-model="formData.businessType">
          <el-radio v-for="item in dictGroup['mlms_business_type']" :key="item.value" :label="item.value">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="合同标签：" prop="tagKeyWords">
        <iep-tag v-model="formData.tagKeyWords"></iep-tag>
      </el-form-item>
      <el-row>
        <el-col :span=12>
          <el-form-item label="签订日期：" prop="signTime">
            <IepDatePicker v-model="formData.signTime"></IepDatePicker>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="完结日期：" prop="finishTime">
            <IepDatePicker v-model="formData.finishTime"></IepDatePicker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="委托单位：" prop="companyOrgId">
            <!-- <iep-dept-select v-model="formData.companyOrgId"></iep-dept-select> -->
            <iep-select prefix-url="" v-model="formData.companyOrgId"></iep-select>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="签署单位：" prop="signCompanyOrgId">
            <!-- <iep-dept-select v-model="formData.signCompanyOrgId"></iep-dept-select> -->
            <iep-select prefix-url="" v-model="formData.signCompanyOrgId"></iep-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="签署部门：" prop="signDeptOrgId">
            <iep-dept-select v-model="formData.signDeptOrgId"></iep-dept-select>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="承接部门：" prop="underTakeDeptId">
            <!-- <iep-dept-select v-model="formData.underTakeDeptId"></iep-dept-select>  -->
            <iep-dept-multiple v-model="formData.underTakeDeptId"></iep-dept-multiple>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="市场经理：" prop="directorId">
            <!-- <iep-contact-select v-model="formData.directorId"></iep-contact-select> -->
            <el-input v-model="formData.directorId" disabled></el-input>
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
              <el-option v-for="item in dictGroup['mlms_contract_level']" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="合同状态：" prop="contractStatus">
            <el-select v-model="formData.contractStatus" placeholder="请选择">
              <el-option v-for="item in dictGroup['mlms_contract_status']" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
      <el-row>
        <!-- <el-col :span=12>
          <el-form-item label="合同附件：" prop="baozhengjin">
            <iep-upload v-model="formData.fileList" :limit="1">
              <slot name="tip"><span>文件类型为excel，每次上传数量不超过一个</span></slot>
            </iep-upload>
          </el-form-item>
        </el-col> -->
      </el-row>
    </el-form>
    <footer-toolbar>
      <iep-button type="primary" @click="submitForm('form')">保存</iep-button>
      <iep-button @click="resetForm('form')">取消</iep-button>
    </footer-toolbar>
  </div>
</template>
<script>
import { initFormData, rules } from '../options'
import FooterToolbar from '@/components/FooterToolbar/'
import { mapState } from 'vuex'
import { getDataById } from '@/api/crms/contract'
export default {
  components: { FooterToolbar },
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      dialogShow: false,
      methodName: '',
      formRequestFn: () => { },
      formData: initFormData(),
      rules: rules,
      id: '',
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          // this.$emit('load-page', true)
          this.$emit('onGoBack')
        },
      },
    }
  },
  computed: {
    ...mapState({
      dictGroup: state => state.user.dictGroup,
    }),
  },
  created () {
    console.log(this.id)
    console.log(this.dictGroup)
    this.formRequestFn = this.record.formRequestFn
    this.methodName = this.record.methodName
    this.id = this.record.id
    if (this.id) {
      getDataById(this.id).then(res => {
        console.log(res)
        this.formData = res.data.data
        this.formData.signCompanyOrgId = res.data.data.signCompanyRealName
        this.formData.underTakeDeptId = res.data.data.underTakeDeptName
        this.formData.companyOrgId = res.data.data.companyName
        this.formData.signDeptOrgId = res.data.data.signDeptOrgName
        this.formData.directorId = res.data.data.directorRealName
      })
    }
  },
  methods: {
    loadPage () {
      this.$emit('load-page')
    },
    resetForm () {
      this.formData = initFormData()
      this.$emit('onGoBack')
    },
    submitForm (formName) {
      let formData = Object.assign({}, this.formData)
      formData.companyOrgId = this.formData.companyOrgId.id
      formData.signCompanyOrgId = this.formData.signCompanyOrgId.id
      formData.signDeptOrgId = this.formData.signDeptOrgId.id
      formData.underTakeDeptId = this.formData.underTakeDeptId.map(m => m.id)
      formData.directorId = this.formData.directorId.id
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(formData).then(() => {
            this.$notify({
              title: '成功',
              message: `${this.methodName}成功`,
              type: 'success',
              duration: 2000,
            })
            this.$emit('onGoBack')
            this.loadPage()
          })
        } else {
          return false
        }
      })
    },
  },
}
</script>
<style>
.wrap {
  padding: 20px;
}
</style>

