<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header :title="`新增资金调拨`" :back-option="backOption">
        <iep-button type="primary" @click="handleSubmit()">保存</iep-button>
      </page-header>
      <el-form ref="form" class="form-detail" :rules="rules" :model="form" label-width="200px" size="small">
        <h4 class="iep-sub-title">基础信息</h4>
        <iep-form-item label-name="调拨金额(元)" prop="amount" class="form-half">
          <iep-input-number v-model="form.amount"></iep-input-number>
        </iep-form-item>
        <iep-form-item label-name="调拨方式" prop="allocationWay" class="form-half">
          <el-radio-group v-model="form.allocationWay" disabled>
            <el-radio v-for="(item,i) in dictsMap.allocationWay" :key="i" :label="+i">{{item}}</el-radio>
          </el-radio-group>
        </iep-form-item>
        <iep-form-item label-name="组织日利息(%)" prop="orgInterest" class="form-half">
          <iep-input-number v-model="form.orgInterest"></iep-input-number>
        </iep-form-item>
        <iep-form-item label-name="集团日利息(%)" prop="groupInterest" class="form-half">
          <iep-input-number v-model="form.groupInterest"></iep-input-number>
        </iep-form-item>
        <iep-form-item label-name="调拨天数(日)" prop="allocationDays" class="form-half">
          <iep-input-number v-model="form.allocationDays" :precision="0"></iep-input-number>
        </iep-form-item>
        <iep-form-item label-name="执行日期" prop="implementRangeTime" class="form-half">
          <iep-date-picker v-model="form.implementRangeTime" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
          </iep-date-picker>
        </iep-form-item>
        <iep-form-item label-name="预计时间" class="form-half">
          <el-input v-model="estimatedTime" disabled></el-input>
        </iep-form-item>
        <h4 class="iep-sub-title">调出组织</h4>
        <iep-form-item label-name="调出组织" prop="callOutOrgId" class="form-half">
          <iep-select v-model="form.callOutOrgId" autocomplete="off" prefix-url="admin/org/all" placeholder="请选择调出组织"></iep-select>
        </iep-form-item>
        <iep-form-item v-if="!callOutCompanyOption.disabled" label-name="线下公司" class="form-half">
          <iep-select v-model="form.callOutCompanyId" autocomplete="off" :prefix-url="callOutCompanyOption.prefixUrl" placeholder="请选择线下公司"></iep-select>
        </iep-form-item>
        <iep-form-item v-if="!callOutBankAmountOption.disabled" label-name="银行账户">
          <iep-select v-model="form.callOutCompanyBankId" autocomplete="off" :prefix-url="callOutBankAmountOption.prefixUrl" placeholder="请选择银行账户"></iep-select>
        </iep-form-item>
        <iep-form-item label-name="调出方财务" class="form-half">
          <iep-contact-select v-model="form.callOutUser"></iep-contact-select>
        </iep-form-item>
        <h4 class="iep-sub-title">调入组织</h4>
        <iep-form-item label-name="调入组织" class="form-half">
          <iep-select v-model="form.callInOrgId" autocomplete="off" prefix-url="admin/org/all" placeholder="请选择调入组织" disabled></iep-select>
        </iep-form-item>
        <iep-form-item v-if="!callInCompanyOption.disabled" label-name="线下公司" class="form-half">
          <iep-select v-model="form.callInCompanyId" autocomplete="off" :prefix-url="callInCompanyOption.prefixUrl" placeholder="请选择线下公司" disabled></iep-select>
        </iep-form-item>
        <iep-form-item v-if="!callInBankAmountOption.disabled" label-name="银行账户">
          <iep-select v-model="form.callInCompanyBankId" autocomplete="off" :prefix-url="callInBankAmountOption.prefixUrl" placeholder="请选择银行账户" disabled></iep-select>
        </iep-form-item>
        <iep-form-item label-name="调入方财务" class="form-half">
          <iep-contact-select v-model="form.callInUser"></iep-contact-select>
        </iep-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { initForm, dictsMap, borrowToForm, formToDto, calculateTime, rules } from './options'
import { postFundTransfer } from '@/api/fams/fund_transfer'
import { pickerOptions } from '@/const/formConfig.js'
import { getOrgBorrowById } from '@/api/fams/org_borrow'
import formMixins from '@/mixins/formMixins'
import { mapGetters } from 'vuex'
import fundTransferMixins from './fundTransferMixins'
export default {
  mixins: [formMixins, fundTransferMixins],
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      dictsMap,
      pickerOptions,
      form: initForm(),
      backOption: {
        isBack: true,
      },
      rules,
    }
  },
  computed: {
    ...mapGetters(['dictGroup']),
    id () {
      return +this.$route.params.id
    },
    estimatedTime () {
      const lastTime = this.form.implementRangeTime[1]
      return calculateTime(lastTime, this.form.allocationDays)
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      getOrgBorrowById(this.id).then(({ data }) => {
        this.form = borrowToForm(data.data)
      })
    },
    async handleSubmit () {
      try {
        await this.mixinsValidate()
        postFundTransfer(formToDto(this.form)).then(({ data }) => {
          if (data.data) {
            this.$message.success('操作成功')
            this.$router.push({
              path: '/fams/group_finance/fund_fransfer',
            })
          } else {
            this.$message(data.msg)
          }
        })
      }
      catch (object) {
        let message = ''
        for (const key in object) {
          if (object.hasOwnProperty(key)) {
            const element = object[key]
            message = element[0].message
          }
        }
        this.$message(message)
      }
    },
  },
}
</script>
