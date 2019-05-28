<template>
  <div>
    <basic-container>
      <page-header title="国脉贝发行" :replaceText="replaceText" :data="[1000000 ,4]"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd" type="primary" icon="el-icon-plus" plain>发行</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage"></operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>
<script>
import { getUnionBorrowPage } from '@/api/fams/org_borrow'
import DialogForm from './DialogForm'
import mixins from '@/mixins/mixins'
import { columnsMap } from './options'
export default {
  mixins: [mixins],
  components: { DialogForm },
  data () {
    return {
      columnsMap,
      replaceText: (data) => `（已发行${data[0]}贝，共发行${data[1]}次。）`,
    }
  },
  created () {
    // this.loadPage()
    this.isLoadTable = false
  },
  methods: {
    handleAdd () {
      this.$refs['DialogForm'].dialogShow = true
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getUnionBorrowPage)
    },
  },
}
</script>
