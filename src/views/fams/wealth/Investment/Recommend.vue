<template>
  <div>
    <iep-table :isLoadTable="isLoadTable" :isPagination="false" :columnsMap="columnsMap" :pagination="pagination" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
    </iep-table>
    <el-pagination style="text-align:center;margin-top: 20px;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pagination.size" :current-page="pagination.current" :pager-count="11" layout="prev, pager, next" :total="pagination.total">
    </el-pagination>
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
function pageOption () {
  return {
    current: 1,
    size: 5,
  }
}
export default {
  mixins: [mixins],
  data () {
    return {
      pagination: pageOption(),
      pageOption: pageOption(),
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