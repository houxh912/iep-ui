<template>
  <iep-table :isLoadTable="isLoadTable" :columnsMap="columnsMap" :pagedTable="pagedTable">
  </iep-table>
</template>
<script>
import mixins from '@/mixins/mixins'
import { getTestRecordList } from '@/api/exam/personalCenter/testRecord/testRecord.js'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap: [
        {
          prop: 'id',
          label: 'ID',
        },
        {
          prop: 'title',
          label: '考试名称',
        },
        {
          prop: 'fieldName',
          label: '类型',
        },
        {
          prop: 'description',
          label: '描述',
        },
        {
          prop: 'beginTime',
          label: '开始时间',
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
      this.loadTable({ ...param, userId: this.id }, getTestRecordList)
    },
  },
}
</script>