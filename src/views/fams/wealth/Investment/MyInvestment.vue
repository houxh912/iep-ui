<template>
  <div>
    <iep-table class="dept-table" :isLoadTable="isLoadTable" :columnsMap="columnsMap" :dictsMap="dictsMap" :pagination="pagination" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-tree>
      <template slot="before-columns">
      </template>
    </iep-table>
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
