<template>
  <div class="iep-page-form">
    <page-header :title="`${methodName}合同`" :backOption="backOption"></page-header>
    <el-form :model="formData" :rules="rules" ref="form" size="small" label-width="130px" style="margin-bottom: 50px;">
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
        <el-col :span="12">
          <el-form-item label="签订日期：" prop="signTime">
            <IepDatePicker v-model="formData.signTime" @change="startChange(formData.signTime)" placeholder="请选择实际签订合同日期"></IepDatePicker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="完结日期：" prop="finishTime">
            <IepDatePicker v-model="formData.finishTime" @change="endChange(formData.finishTime)" placeholder="请选择合同中签订的完结时间"></IepDatePicker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="委托单位：" prop="companyOrgId">
            <iep-select prefix-url="crm/customer/my" v-model="formData.companyOrgId" @change="handleChange(formData.companyOrgId)" placeholder="请选择该项目实际服务对象"></iep-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="签署单位：" prop="signCompanyOrgId">
            <iep-select prefix-url="crm/customer" v-model="formData.signCompanyOrgId" placeholder="请选择实际与我司签订合同的单位"></iep-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="签署部门：" prop="signDeptOrgName">
            <iep-dept-select v-model="formData.signDeptOrgName"></iep-dept-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="承接部门：" prop="underTakeDeptName">
            <iep-dept-multiple v-model="formData.underTakeDeptName"></iep-dept-multiple>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="市场经理：" prop="Manager">
            <el-input v-model="formData.Manager" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同金额：" prop="contractAmount">
            <el-input v-model="formData.contractAmount" placeholder="请填写合同约定的金额，以“元”为单位"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="合同级别：" prop="contractLevel">
            <iep-dict-select dict-name="mlms_contract_level" v-model="formData.contractLevel"></iep-dict-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同状态：" prop="contractStatus">
            <iep-dict-select dict-name="mlms_contract_status" v-model="formData.contractStatus"></iep-dict-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="保证金：" prop="deposit">
            <el-input v-model="formData.deposit" placeholder="请根据缴纳保证金额填写"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <!-- <el-col :span="12">
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
      <iep-button @click="resetForm">取消</iep-button>
    </footer-toolbar>
  </div>
</template>
<script>
import { initFormData, rules } from './options'
import FooterToolbar from '@/components/FooterToolbar/'
import { mapGetters } from 'vuex'
import { agreementById } from '@/api/crms/agreement'
import { getMarket } from '@/api/crms/customer'
import { getObj } from '@/api/admin/user'
export default {
  components: { FooterToolbar },
  data () {
    return {
      dialogShow: false,
      methodName: '新增',
      formRequestFn: () => { },
      id: '',
      contractId: '',
      formData: initFormData(),
      rules: rules,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$emit('dialog')
        },
      },
      signTime: '',
      finishTime: '',
      isTime: true,
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
    ...mapGetters(['dictGroup']),
  },
  created () {
    this.formRequestFn = this.add.formRequestFn
    this.methodName = this.add.methodName
    this.id = this.add.id
    this.formData.companyOrgId = this.record.clientName
    this.formData.signCompanyOrgId = this.record.clientName
    getMarket({ clientId: this.id }).then((res) => {
      this.formData.directorId = res.data.data.id
      getObj(this.formData.directorId).then(res => {
        this.$set(this.formData, 'Manager', res.data.data.realName)
      })
    })
    if (this.methodName == '编辑') {
      this.contractId = this.add.contractId
      agreementById(this.contractId).then(res => {
        this.formData = res.data.data
        this.signTime = res.data.data.signTime
        this.finishTime = res.data.data.finishTime
        getMarket({ clientId: this.id }).then((res) => {
          this.formData.directorId = res.data.data.id
          getObj(this.formData.directorId).then(res => {
            this.$set(this.formData, 'Manager', res.data.data.realName)
          })
        })
      })
    }
  },
  methods: {
    handleChange (val) {
      getMarket({ clientId: val }).then((res) => {
        this.formData.directorId = res.data.data.id
        this.formData.Manager = res.data.data.name
      })
    },
    loadPage () {
      this.$emit('load-page')
    },
    resetForm () {
      this.formData = initFormData()
      this.$emit('dialog')
    },
    submitForm (formName) {
      if (this.methodName == '新增') {
        this.formData.companyOrgId = this.id
        this.formData.signCompanyOrgId = this.id
      }
      let formData = Object.assign({}, this.formData)
      formData.signDeptOrgId = this.formData.signDeptOrgName.id
      formData.underTakeDeptId = this.formData.underTakeDeptName.map(m => m.id)
      formData.directorId = this.formData.directorId
      formData.id = this.contractId,
        formData.companyOrgId = this.formData.companyOrgId
      formData.signCompanyOrgId = this.formData.signCompanyOrgId
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isTime) {
            this.formRequestFn(formData).then(() => {
              this.$message({
                message: `${this.methodName}成功`,
                type: 'success',
              })
              this.$emit('dialog')
              this.$emit('async')
              this.loadPage()
            })
          } else {
            this.$message.error('签订日期大于完结日期，不能保存！！！')
          }
        } else {
          return false
        }
      })
    },
    dealTime (val1, val2) {
      var str1 = val1.replace(/-/g, '/')
      var time1 = Date.parse(new Date(str1))
      var str2 = val2.replace(/-/g, '/')
      var time2 = Date.parse(new Date(str2))
      if (time2 < time1) {
        this.$message.error('签订日期不能大于完结日期！！！')
        this.isTime = false
      } else {
        this.isTime = true
      }
    },
    startChange (val) {
      this.signTime = val
      this.dealTime(val, this.finishTime)
    },
    endChange (val) {
      this.finishTime = val
      this.dealTime(this.signTime, val)
    },
  },
}
</script>
