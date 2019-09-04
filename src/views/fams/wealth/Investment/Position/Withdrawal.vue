<template>
  <iep-dialog :dialog-show="dialogShow" title="新增支出" width="700px" @close="close">
    <iep-table :isLoadTable="isLoadTable" :columnsMap="columnsMap" :pagedTable="pagedTable">
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button type="warning" plain @click="handleBuy(scope.row)">退股</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
  </iep-dialog>
</template>
<script>
import { getWithdrawPage, getWithdrawById } from '@/api/fams/investment'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  data () {
    return {
      dialogShow: false,
      investmentId: null,
      columnsMap: [
        {
          prop: 'tradingPrice',
          label: '买入价格',
        },
        {
          prop: 'investmentNumber',
          label: '股份数量',
        },
        {
          prop: 'createTime',
          label: '买入时间',
        },
        {
          prop: 'tradingPrice',
          label: '退股价格',
        },
      ],
    }
  },
  methods: {
    close () {
      this.dialogShow = false
      this.$emit('load-page')
    },
    handleBuy (row) {
      this._handleComfirm(row.id, getWithdrawById, '退股')
    },
    loadPage (param = this.searchForm) {
      this.loadTable({ ...param, investmentId: this.investmentId }, getWithdrawPage)
    },
  },
}
</script>