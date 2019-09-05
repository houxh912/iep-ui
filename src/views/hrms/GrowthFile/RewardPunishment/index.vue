<template>
  <iep-table :isLoadTable="isLoadTable" :columnsMap="columnsMap" :pagedTable="pagedTable">
  </iep-table>
</template>
<script>
import mixins from '@/mixins/mixins'
import { getWealthFlowPageByUserId } from '@/api/fams/wealth_flow'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap: [
        {
          prop: 'flowId',
          label: 'ID',
        },
        {
          prop: 'creatorName',
          label: '操作者',
        },
        {
          prop: 'amount',
          label: '金额',
        },
        {
          prop: 'createTime',
          label: '操作时间',
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