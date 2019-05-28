<template>
  <div>
    <basic-container>
      <page-header title="集团财务流水"></page-header>
      <operation-container>
        <template slot="right">
          <el-radio-group v-model="type" size="small" @change="changeType">
            <el-radio-button v-for="tab in tabList" :label="tab.value" :key="tab.value">{{tab.label}}</el-radio-button>
          </el-radio-group>
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
import { columnsMap, tabList } from './options'
export default {
  mixins: [mixins],
  components: { DialogForm },
  data () {
    return {
      tabList,
      columnsMap,
      type: 'outOrgId',
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
    changeType () { },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getUnionBorrowPage)
    },
  },
}
</script>
