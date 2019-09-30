<template>
  <iep-statistics-header title="财务资产" :dataMap="financialData" :typeUrlMap="typeUrlMap">
  </iep-statistics-header>
</template>
<script>
import { getAssetsByDate } from '@/api/fams/statistics'
export default {
  data () {
    return {
      rangeTime: [],
      financialData: {
        '银行存款': 0,
        '库存现金': 0,
        '集团往来': 0,
        '合同应收账款': 0,
        '组织拆借': 0,
        '融资': 0,
        '投资': 0,
        '其他应收款': 0,
      },
      typeUrlMap: {
        '银行存款': '/fams/financial_management/bank_deposit_journal',
        '库存现金': '/fams/financial_management/cash_journal',
        '集团往来': '/fams/org_assets/group_current_ccount',
        '合同应收账款': '/fams_spa/accounts_receivable',
        '融资': '/fams/financial_management/work_bench',
        '投资': '/fams/financial_management/work_bench',
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
      this.financialData['银行存款'] = realData.bankDeposit
      this.financialData['库存现金'] = realData.cashInStock
      this.financialData['集团往来'] = realData.groupContacts
      this.financialData['合同应收账款'] = realData.contractualReceive
      this.financialData['融资'] = realData.financing
      this.financialData['投资'] = realData.investment
      this.financialData['其他应收款'] = realData.other
      this.financialData['组织拆借'] = realData.borrow
    },
  },
}
</script>
