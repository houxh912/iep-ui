<template>
  <div>
    <iep-table class="dept-table" :isLoadTable="isLoadTable" :columnsMap="columnsMap" :pagination="pagination" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @row-click="handleDetail" is-tree>
      <template slot="before-columns">
      </template>
    </iep-table>
  </div>
</template>

<script>
import { getInvestmentPage } from '@/api/fams/investment'
import mixins from '@/mixins/mixins'
const columnsMap = [
  {
    prop: 'updateTime',
    label: '日期',
    width: '180px',
  },
  {
    prop: 'orgName',
    label: '投资组织',
    width: '250px',
  },
  {
    prop: 'remarks',
    label: '备注',
  },
]
export default {
  mixins:[mixins],
  data () {
    return {
      pagination:{},
      pagedTable: [],
      columnsMap,
    }
  },
  computed: {
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage (param = this.searchForm) {
      this.loadTable({ status: 4, ...param }, getInvestmentPage)
    },
    handleDetail (row) {
      this.$router.push({
        path: `/app/wealth/wealth_details/${row.id}`,
      })
    },
  },
}
</script>
<style  lang="scss" scoped>
</style>
