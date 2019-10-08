<template>
  <div>
    <div class="financial-assets">
      <iep-statistics-header title="总资产" :dataMap="financialData" :typeUrlMap="typeUrlMap" v-if="!isAbled">
      </iep-statistics-header>
      <iep-statistics-header title="总资产" :dataMap="financialGroupData" :typeUrlMap="typeUrlMap" v-else>
      </iep-statistics-header>
    </div>
  </div>
</template>
<script>
import { getAssetsByDate, getGroupAssetsByDate } from '@/api/fams/statistics'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      rangeTime: [],
      financialData: {
        '银行存款': 0,
        '库存现金': 0,
        '集团往来': 0,
        '合同应收账款': 0,
        '融资': 0,
        '投资': 0,
        '其他应收款': 0,
      },
      financialGroupData: {
        '发行量': 0,
        '系统账户余额': 0,
        '系统支出': 0,
        '系统收入': 0,
        '提现数': 0,
        '项目应收款': 0,
        '其他应收款': 0,
        '组织拆借': 0,
      },
    }
  },
  created () {
    this.loadPage()
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
    isAbled () {
      return this.userInfo.userId === 1 || this.userInfo.userId === 2 || this.userInfo.userId === 3
    },
  },
  methods: {
    async loadPage () {
      if (!this.isAbled) {
        const { data } = await getAssetsByDate(this.rangeTime)
        const realData = data.data
        this.financialData['银行存款'] = realData.bankDeposit
        this.financialData['库存现金'] = realData.cashInStock
        this.financialData['集团往来'] = realData.groupContacts
        this.financialData['合同应收账款'] = realData.contractualReceive
        this.financialData['融资'] = realData.financing
        this.financialData['投资'] = realData.investment
        this.financialData['其他应收款'] = realData.other
      } else {
        const { data } = await getGroupAssetsByDate(this.rangeTime)
        const realData = data.data
        this.financialGroupData['发行量'] = realData.circulation
        this.financialGroupData['系统账户余额'] = realData.balance
        this.financialGroupData['系统支出'] = realData.expenditure
        this.financialGroupData['系统收入'] = realData.income
        this.financialGroupData['提现数'] = realData.putForward
        this.financialGroupData['项目应收款'] = realData.project
        this.financialGroupData['其他应收款'] = realData.other
        this.financialGroupData['组织拆借'] = realData.borrow
      }
    },
  },
}
</script>
