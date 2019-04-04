<template>
  <div>
    <page-header :title="`${methodName}合同`" :backOption="backOption"></page-header>
    <el-form :model="formData" :rules="rules" ref="form" label-width="130px" style="margin-bottom: 50px;" :disabled="true">
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
        <!-- <iep-tag v-model="formData.tagKeyWords"></iep-tag> -->
        <a-tag v-for="(item,index) in formData.tagKeyWords" :key="index">{{item}}</a-tag>
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
            <iep-select prefix-url="crm/customer" v-model="formData.companyOrgId"></iep-select>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="签署单位：" prop="signCompanyOrgId">
            <iep-select prefix-url="crm/customer" v-model="formData.signCompanyOrgId"></iep-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="签署部门：" prop="signDeptOrgName">
            <iep-dept-select v-model="formData.signDeptOrgName"></iep-dept-select>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="承接部门：" prop="underTakeDeptName">
            <iep-dept-multiple v-model="formData.underTakeDeptName"></iep-dept-multiple>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="市场经理：" prop="directorId">
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
            <iep-dict-select dict-name="mlms_contract_level" v-model="formData.contractLevel"></iep-dict-select>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="合同状态：" prop="contractStatus">
            <iep-dict-select dict-name="mlms_contract_status" v-model="formData.contractStatus"></iep-dict-select>
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
      <iep-button @click="resetForm('form')">取消</iep-button>
    </footer-toolbar>
  </div>
</template>
<script>
import { initFormData, rules } from './options'
import FooterToolbar from '@/components/FooterToolbar/'
import { mapState } from 'vuex'
import { agreementById } from '@/api/crms/agreement'
export default {
  components: { FooterToolbar },
  data () {
    return {
      dialogShow: false,
      methodName: '详情',
      formRequestFn: () => { },
      id: '',
      contractId: '',
      formData: initFormData(),
      rules: rules,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$emit('detail')
        },
      },
    }
  },
  props: {
    record: {
      type: Object,
      default: () => { },
    },
    add: {
      type: Object,
      default: () => { },
    },
  },
  computed: {
    ...mapState({
      dictGroup: state => state.user.dictGroup,
    }),
  },
  created () {
    this.contractId = this.add.contractId
    agreementById(this.contractId).then(res => {
      this.formData = res.data.data
      this.formData.companyOrgId = this.id
    })
  },
  methods: {
    loadPage () {
      this.$emit('load-page')
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.formData = initFormData()
      this.$emit('detail')
    },
  },
}
</script>
