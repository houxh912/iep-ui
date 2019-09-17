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
          label: '序号',
          width: '100',
        },
        {
          prop: 'msg',
          label: '变更信息',
          type: 'detail',
        },
        {
          prop: 'date',
          label: '生效时间',
          width: '150',
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