<template>
  <iep-dialog :dialog-show="dialogShow" title="当前可退股份（持有时间超过三个月可退股）" width="700px" @close="close">
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
    const parseMethod = (prop) => {
      return (row) => {
        if (row[prop] >= 1) {
          return 1
        } else {
          return row[prop]
        }
      }
    }
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
          width: '200px',
        },
        {
          prop: 'tradingPrice',
          label: '退股价格',
          type: 'custom',
          customFunction: parseMethod('tradingPrice'),
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