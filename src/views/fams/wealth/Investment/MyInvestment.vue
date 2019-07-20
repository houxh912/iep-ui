<template>
  <div>
    <iep-table :isLoadTable="isLoadTable" :isPagination="false" :columnsMap="columnsMap" :dictsMap="dictsMap" :pagination="pagination" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
    </iep-table>
    <el-pagination style="text-align:center;margin-top: 20px;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pagination.size" :current-page="pagination.current" :pager-count="11" layout="prev, pager, next" :total="pagination.total">
    </el-pagination>
  </div>
</template>

<script>
import { getInvestmentPersonPage } from '@/api/fams/investment'
import { mapGetters } from 'vuex'
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
    prop: 'totalAmount',
    label: '投资金额',
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
    1: '待核准',
    2: '核准通过',
    3: '核准驳回',
  },
}
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
      dictsMap,
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage (param = this.searchForm) {
      this.loadTable({ status: this.status, ...param, userId: this.userInfo.userId }, getInvestmentPersonPage)
    },
  },
}
</script>
<style  lang="scss" scoped>
</style>
