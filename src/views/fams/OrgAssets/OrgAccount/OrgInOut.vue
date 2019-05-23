<template>
  <div class="total-wrapper">
    <iep-fams-card class="total-item-2" title="组织收支">
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </iep-table>
    </iep-fams-card>
    <iep-fams-card class="total-item-1" title="快捷入口">
      <div class="card-btn-grid">
        <div>组织拆借</div>
        <div>组织转账</div>
        <div>打赏/扣减</div>
        <div>投资管理</div>
        <div>组织预算</div>
      </div>
    </iep-fams-card>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import { getAssetsByDate } from '@/api/fams/statistics'
import IepFamsCard from './IepFamsCard'
export default {
  mixins: [mixins],
  components: { IepFamsCard },
  data () {
    return {
      columnsMap: [],
      financialData: {
        '银行存款': 6325.5,
        '库存现金': 6325.5,
        '集团往来': 6325.5,
        '合同应收账款': 6325.5,
        '融资': 6325.5,
        '投资': 6325.5,
        '其他应收款': 6325.5,
        '组织拆借': 6325.5,
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
<style lang="scss" scoped>
.total-wrapper {
  display: flex;
  .total-item-2 {
    flex: 2;
  }
  .total-item-1 {
    flex: 1;
    margin-left: 20px;
  }
}
.card-btn-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  & > div {
    cursor: pointer;
    padding: 10px;
    text-align: center;
    border: 1px solid #aaa;
    color: #666;
    &:hover {
      border: 1px solid #ba1b21;
      color: #ba1b21;
    }
  }
}
</style>
