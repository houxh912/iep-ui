
<template>
  <iep-table :isLoadTable="isLoadTable" :columnsMap="columnsMap" :pagedTable="pagedTable">
    <template slot="before-columns">
      <el-table-column label="组织名称" width="250">
        <template slot-scope="scope">
          <iep-table-link-img-desc :img="scope.row.orgLogo" :name="scope.row.orgName" v-on:m-click="handleDetail(scope.row)"></iep-table-link-img-desc>
        </template>
      </el-table-column>
      <el-table-column label="持有总值">
        <template slot-scope="scope">
          {{scope.row.holdNumber}}
        </template>
      </el-table-column>
      <el-table-column label="持股数量">
        <template slot-scope="scope">
          {{scope.row.circulationNumber + scope.row.nonCirculationNumber}}
        </template>
      </el-table-column>
    </template>
  </iep-table>
</template>
<script>
import mixins from '@/mixins/mixins'
import { getMyPositionPage } from '@/api/fams/investment'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap: [
        {
          prop: 'todayPrice',
          label: '当前股价',
        },
        {
          prop: 'circulationNumber',
          label: '流通股本',
        },
        {
          prop: 'nonCirculationNumber',
          label: '非流通股本',
        },
      ],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage (param = this.searchForm) {
      this.loadTable({ ...param }, getMyPositionPage)
    },
  },
}
</script>