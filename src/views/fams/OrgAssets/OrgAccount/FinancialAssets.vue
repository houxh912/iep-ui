<template>
  <iep-statistics-header title="财务资产" :dataMap="financialData" :typeUrlMap="typeUrlMap">
    <template slot="right">
      <div style="width: 350px;">
        <iep-date-picker v-model="rangeTime" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" size="small">
        </iep-date-picker>
      </div>
    </template>
  </iep-statistics-header>
</template>
<script>
import { getAssetsByDate } from '@/api/fams/statistics'
export default {
  data () {
    return {
      rangeTime: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          },
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          },
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          },
        }],
      },
      financialData: {
        '可用金额': 0,
        '银行存款': 0,
        '库存现金': 0,
        '集团往来': 0,
        '组织拆借': 0,
        '合同应收账款': 0,
        '其他应收款': 0,
      },
      typeUrlMap: {
        '可用金额': '/fams/org_assets/org_account',
        '银行存款': '/fams/financial_management/bank_deposit_journal',
        '库存现金': '/fams/financial_management/cash_journal',
        '集团往来': '/fams/org_assets/group_current_ccount',
        '合同应收账款': '/fams_spa/accounts_receivable',
        '其他应收款': '/fams_spa/other_receivables',
        '组织拆借': '/fams/org_borrow/org_borrow',
      },
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    async loadPage () {
      const { data } = await getAssetsByDate(this.rangeTime)
      const realData = data.data
      this.financialData['可用金额'] = realData.availableBalance
      this.financialData['银行存款'] = realData.bankDeposit
      this.financialData['库存现金'] = realData.cashInStock
      this.financialData['集团往来'] = realData.groupContacts
      this.financialData['合同应收账款'] = realData.contractualReceive
      this.financialData['其他应收款'] = realData.other
      this.financialData['组织拆借'] = realData.borrow
    },
  },
}
</script>
