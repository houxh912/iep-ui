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
        action: {
          'reward': '个人打赏',
          'orgReward': '组织打赏',
          'orgReduce': '扣减',
          'groupReward': '集团打赏',
          'groupReduce': '集团扣减',
        },
        type: {
          'A': '奖赏',
          'L': '惩罚',
        },
      },
      columnsMap: [
        {
          prop: 'flowId',
          label: 'ID',
        },
        {
          prop: 'createTime',
          label: '奖惩时间',
        },
        {
          prop: 'action',
          label: '动作',
          type: 'dict',
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