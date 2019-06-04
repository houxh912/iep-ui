<template>
  <iep-result type="success" :description="description" :title="title">
    <el-form class="content-wrapper" ref="form" size="small" :model="data" label-width="150px">
      <iep-form-item label-name="投资组织">
        <iep-select v-model="data.investmentCompanyId" autocomplete="off" prefix-url="admin/org/all" placeholder="请选择向哪个组织投资"></iep-select>
      </iep-form-item>
      <iep-form-item label-name="投资股份比例">
        <iep-div-detail :value="`${data.orgInterest}%`"></iep-div-detail>
      </iep-form-item>
      <iep-form-item label-name="支付方式"> 
        <el-radio-group v-model="data.investmentMoneyType">
          <el-radio v-for="(item, idx) in dictsMap.investmentMoneyType" :key="idx" :label="idx">{{item}}</el-radio>
        </el-radio-group>
      </iep-form-item>
      <iep-form-item label-name="投资金额">
        <iep-input-number v-model="data.investmentAmount"></iep-input-number>
      </iep-form-item>
    </el-form>
    <template v-slot:action>
      <a-button style="margin-left: 8px" @click="handleBack">返回列表</a-button>
    </template>
  </iep-result>
</template>
<script>
import { dictsMap } from './options'
export default {
  props: ['data'],
  data () {
    return {
      dictsMap,
      submitLoading: false,
      borrowInRepayCompanyId: '',
      borrowInRepayCompanyBankId: '',
    }
  },
  computed: {
    title () {
      if (this.data.status === 8) {
        return '投资失败'
      } else if (this.data.status === 6) {
        return '确认成功'
      } else {
        return '操作成功'
      }
    },
    description () {
      if (this.data.status === 8) {
        return '具体原因请与借入方联系'
      } else if (this.data.status === 6) {
        return '请于所属组织财务对接投资信息'
      } else {
        return ''
      }
    },
    bankAmountOption () {
      if (this.data.borrowInCompanyId && this.data.borrowMoneyType === '1') {
        return {
          disabled: false,
        }
      } else {
        return {
          disabled: true,
        }
      }
    },
    repayBankAmountOption () {
      if (this.borrowInRepayCompanyId) {
        return {
          disabled: false,
          prefixUrl: `fams/bank_account/${this.borrowInRepayCompanyId}`,
        }
      } else {
        return {
          disabled: true,
          prefixUrl: `fams/bank_account/${this.borrowInRepayCompanyId}`,
        }
      }
    },
  },
  created () {
  },
  methods: {
    handleBack () {
      this.$emit('back')
    },
  },
}
</script>

<style lang="scss" scoped>
@import "./borrow.scss";
</style>