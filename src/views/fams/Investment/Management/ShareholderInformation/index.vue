
<template>
  <iep-table :isLoadTable="isLoadTable" :columnsMap="columnsMap" :pagedTable="pagedTable">
    <template slot="before-columns">
      <el-table-column label="股东">
        <template slot-scope="scope">
          <iep-div-detail v-if="scope.row.holdType === '2'" :value="scope.row.orgName"></iep-div-detail>
          <iep-div-detail v-if="scope.row.holdType === '3'" :value="scope.row.userName"></iep-div-detail>
          <iep-div-detail v-if="scope.row.holdType === '4'" :value="scope.row.externalShareholder"></iep-div-detail>
        </template>
      </el-table-column>
      <el-table-column label="持股比例" width="90px">
        <template slot-scope="scope">
          <iep-div-detail :value="parseToPercent(scope.row.sharesNumber / scope.row.allSharesNumber, 2)"></iep-div-detail>
        </template>
      </el-table-column>
    </template>
  </iep-table>
</template>
<script>
import mixins from '@/mixins/mixins'
import { getShareholderPage } from '@/api/fams/investment'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap: [
        {
          prop: 'sharesNumber',
          label: '总持股数量',
        },
        {
          prop: 'holdType',
          label: '持股类型',
          type: 'dictGroup',
          dictName: 'FAMS_HOLD_TYPE',
        },
        {
          prop: 'nonCirculationNumber',
          label: '非流通股本',
        },
        {
          prop: 'circulationNumber',
          label: '流通股本',
        },
      ],
      parseToPercent: this.$options.filters.parseToPercent,
    }
  },
  computed: {
    id () {
      return +this.$route.params.id
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage (param = this.searchForm) {
      this.loadTable({ ...param, investmentId: this.id }, getShareholderPage)
    },
  },
}
</script>