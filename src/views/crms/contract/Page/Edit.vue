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
            <IepDatePicker v-model="formData.signTime" @change="startChange(formData.signTime)"></IepDatePicker>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="完结日期：" prop="finishTime">
            <IepDatePicker v-model="formData.finishTime" @change="endChange(formData.finishTime)"></IepDatePicker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="委托单位：" prop="companyOrgId">
            <iep-select prefix-url="crm/customer/my" v-model="formData.companyOrgId" @change="handleChange(formData.companyOrgId)"></iep-select>
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
          <el-form-item label="市场经理：" prop="Manager">
            <el-input v-model="formData.Manager" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="合同金额：" prop="contractAmount">
            <el-input v-model.number="formData.contractAmount" placeholder="合同金额"></el-input>
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
            <el-input v-model.number="formData.deposit" placeholder="保证金"></el-input>
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
import { getMarket } from '@/api/crms/customer'
import { getObj } from '@/api/admin/user'
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
      signTime: '',
      finishTime: '',
      isTime: true,
    }
  },
  computed: {
    ...mapState({
      dictGroup: state => state.user.dictGroup,
    }),
  },
  created () {

    this.formRequestFn = this.record.formRequestFn
    this.methodName = this.record.methodName
    this.id = this.record.id
    if (this.id) {
      getDataById(this.id).then(res => {
        this.formData = res.data.data
        this.signTime = res.data.data.signTime
        this.finishTime = res.data.data.finishTime
        getObj(this.formData.directorId).then(res => {
          this.$set(this.formData, 'Manager', res.data.data.realName)

        })
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
    handleChange (val) {
      getMarket({ clientId: val }).then((res) => {
        this.formData.directorId = res.data.data.id
        this.formData.Manager = res.data.data.name
      })
    },
    submitForm (formName) {
      let formData = Object.assign({}, this.formData)
      formData.signDeptOrgId = this.formData.signDeptOrgName.id
      formData.underTakeDeptId = this.formData.underTakeDeptName.map(m => m.id)
      formData.directorId = this.formData.directorId
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isTime) {
            this.formRequestFn(formData).then(() => {
              this.$message({
                message: `${this.methodName}成功`,
                type: 'success',
              })
              this.$emit('onGoBack')
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
<style>
.wrap {
  padding: 20px;
}
</style>

