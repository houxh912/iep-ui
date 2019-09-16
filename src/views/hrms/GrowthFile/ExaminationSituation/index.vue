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
          label: '序号',
          width: '55',
        },
        {
          prop: 'fieldName',
          label: '科目',
        },
        {
          prop: 'title',
          label: '考试名称',
        },
        {
          prop: 'beginTime',
          label: '参与考试时间',
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