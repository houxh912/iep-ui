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
          label: 'ID',
        },
        {
          prop: 'trainingTheme',
          label: '培训主题',
        },
        {
          prop: 'method',
          label: '培训方式',
        },
        {
          prop: 'type',
          label: '培训类型',
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