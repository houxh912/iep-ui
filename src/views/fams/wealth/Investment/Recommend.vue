<template>
  <div>
    <iep-table class="dept-table" :isLoadTable="isLoadTable" :columnsMap="columnsMap" :dictsMap="dictsMap" :pagination="pagination" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @row-click="handleDetail" is-tree>
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
  },
  {
    prop: 'orgName',
    label: '投资组织',
  },
  {
    prop: 'status',
    label: '状态',
    type: 'dict',
  },
  {
    prop: 'remarks',
    label: '备注',
  },
]
const dictsMap = {
  status: {
    1: '待审核',
    2: '审核通过',
    3: '审核驳回',
  },
}
export default {
  mixins:[mixins],
  data () {
    return {
      pagination:{},
      pagedTable: [],
      columnsMap,
      dictsMap,
    }
  },
  computed: {
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage (param = this.searchForm) {
      this.loadTable({ status: this.status, ...param }, getInvestmentPage)
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
