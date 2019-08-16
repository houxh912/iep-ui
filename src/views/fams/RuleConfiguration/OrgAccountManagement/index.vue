<template>
  <div>
    <basic-container>
      <iep-page-header title="组织账户"></iep-page-header>
      <iep-table :isLoadTable="isLoadTable" :isPagination="false" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable">
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import { getOrgAccountList } from '@/api/fams/statistics'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from './options'
export default {
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    // handleDetail (row) {
    //   this.$router.push({
    //     path: '/wel/wealth/wealth_flow',
    //     query: { name: row.realName, id: row.id },
    //   })
    // },
    async loadPage () {
      this.isLoadTable = true
      const { data } = await getOrgAccountList()
      this.pagedTable = data.data
      this.isLoadTable = false
    },
  },
}
</script>
