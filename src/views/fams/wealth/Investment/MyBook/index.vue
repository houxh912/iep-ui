
<template>
  <div>
    <iep-table :isLoadTable="isLoadTable" :columnsMap="columnsMap" :dictsMap="dictsMap" :pagedTable="pagedTable">
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleGrant(scope.row)">股权授予书</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>

    <iep-equity-dialog ref="EquityDialog" @load-page="loadPage" :information="information"></iep-equity-dialog>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import { getMyBookPage } from '@/api/fams/investment'
export default {
  mixins: [mixins],
  data () {
    return {
      dictsMap: {
        type: {
          1: '增加',
          2: '减少',
        },
      },
      columnsMap: [
        {
          prop: 'orgName',
          label: '组织名称',
        },
        {
          prop: 'tradingPrice',
          label: '交易单价',
        },
        {
          prop: 'investmentNumber',
          label: '交易股数',
        },
        {
          prop: 'type',
          label: '类型',
          type: 'dict',
        },
        {
          prop: 'createTime',
          label: '买入时间',
        },
      ],
    }
  },
  computed: {
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleGrant (row) {
      this.$refs['EquityDialog'].form = { ...row }
      this.$refs['EquityDialog'].dialogShow = true
    },
    loadPage (param = this.searchForm) {
      this.loadTable({ ...param }, getMyBookPage)
    },
  },
}
</script>