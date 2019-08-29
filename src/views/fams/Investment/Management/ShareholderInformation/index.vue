
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
import { getReleasePage } from '@/api/fams/investment'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap: [
        {
          prop: 'issueNumber',
          label: '发行数量',
        },
        {
          prop: 'groupNumber',
          label: '发行后集团持有股份数量',
        },
        {
          prop: 'releaseType',
          label: '发行类型',
          type: 'dict',
        },
        {
          prop: 'userId',
          label: '操作人',
        },
        {
          prop: 'reviewUserId',
          label: '审核人',
        },
        {
          prop: 'updateTime',
          label: '变更时间',
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
      this.loadTable({ ...param, investmentId: this.id }, getReleasePage)
    },
  },
}
</script>