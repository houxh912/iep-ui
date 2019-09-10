<template>
  <iep-table :isLoadTable="isLoadTable" :columnsMap="columnsMap" :pagedTable="pagedTable">
  </iep-table>
</template>
<script>
import mixins from '@/mixins/mixins'
import { getTrainingRecordPageByUserId } from '@/api/hrms/training_record'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap: [
        {
          prop: 'id',
          label: '序号',
        },
        {
          prop: 'startTime',
          label: '日期',
        },
        {
          prop: 'type',
          label: '类型',
        },
        {
          prop: 'trainingTheme',
          label: '主题',
        },
        {
          prop: 'method',
          label: '培训方式',
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
      this.loadTable({ ...param, userId: this.id }, getTrainingRecordPageByUserId)
    },
  },
}
</script>