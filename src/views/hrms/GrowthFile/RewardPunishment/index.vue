<template>
  <iep-table :isLoadTable="isLoadTable" :columnsMap="columnsMap" :dictsMap="dictsMap" :pagedTable="pagedTable">
  </iep-table>
</template>
<script>
import mixins from '@/mixins/mixins'
import { getWealthFlowPageByUserId } from '@/api/fams/wealth_flow'
export default {
  mixins: [mixins],
  data () {
    return {
      dictsMap: {
        type: {
          'A': '奖赏',
          'L': '惩罚',
        },
      },
      columnsMap: [
        {
          prop: 'flowId',
          label: '序号',
        },
        {
          prop: 'createTime',
          label: '奖惩时间',
          type: 'date',
          formatString: 'YYYY-MM-DD',
        },
        {
          prop: 'creatorName',
          label: '操作者',
        },
        {
          prop: 'type',
          label: '类型',
          type: 'dict',
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
      this.loadTable({ ...param, userId: this.id }, getWealthFlowPageByUserId)
    },
  },
}
</script>
