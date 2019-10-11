<template>
  <div>
    <iep-page-header title="我的好友"></iep-page-header>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <template slot="before-columns">
      </template>
    </iep-table>
  </div>
</template>
<script>
import { getFriendPage } from '@/api/admin/friend'
import mixins from '@/mixins/mixins'
import { columnsMap } from '../options'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
    }
  },
  computed: {
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleRelease () {
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getFriendPage)
    },
  },
  watch: {
  },
}
</script>
<style lang="scss" scoped>
</style>
