<template>
  <iep-table :isLoadTable="isLoadTable" :columnsMap="columnsMap" :pagedTable="pagedTable">
  </iep-table>
</template>
<script>
import mixins from '@/mixins/mixins'
import { getPersonnelChangePageByUserId } from '@/api/hrms/user_record'
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
          prop: 'msg',
          label: '变更信息',
        },
        {
          prop: 'date',
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
      this.loadTable({ ...param, userId: this.id }, getPersonnelChangePageByUserId)
    },
  },
}
</script>