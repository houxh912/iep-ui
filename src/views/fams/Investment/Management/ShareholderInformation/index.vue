
<template>
  <iep-table :isLoadTable="isLoadTable" :columnsMap="columnsMap" :pagedTable="pagedTable">
    <template slot="before-columns">
      <el-table-column label="时间">
        <template slot-scope="scope">
          {{scope.row.time|parseToDay}}
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
          prop: 'userName',
          label: '股东',
        },
        {
          prop: 'sharesNumber',
          label: '总持股数量',
        },
        {
          prop: 'shareRatio',
          label: '持股比例',
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
        {
          prop: 'updateTime',
          label: '最近变更日期',
        },
      ],
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