
<template>
  <iep-table :isLoadTable="isLoadTable" :columnsMap="columnsMap" :dictsMap="dictsMap" :pagedTable="pagedTable">
  </iep-table>
</template>
<script>
import mixins from '@/mixins/mixins'
import { getReleaseRecordPage } from '@/api/fams/investment'
export default {
  mixins: [mixins],
  data () {
    return {
      dictsMap: {
        releaseType: {
          1: '增加',
          2: '减少',
        },
      },
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
          prop: 'realName',
          label: '操作人',
        },
        {
          prop: 'reviewName',
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
      this.loadTable({ ...param, investmentId: this.id }, getReleaseRecordPage)
    },
  },
}
</script>