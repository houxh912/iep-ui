<template>
  <div>
    <basic-container>
      <iep-page-header title="我的交易"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button type="primary" @click="handleTransaction" icon="el-icon-plus" plain>发起交易</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="hash">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm"></dialog-form>
  </div>
</template>
<script>
import { columnsMap } from './options'
import { getMyPage } from '@/api/fams/block_chain'
import mixins from '@/mixins/mixins'
import DialogForm from './DialogForm'
export default {
  components: { DialogForm },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      isLoadTable: false,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleTransaction () {
      this.$refs['DialogForm'].dialogShow = true
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getMyPage)
    },
  },
}
</script>
