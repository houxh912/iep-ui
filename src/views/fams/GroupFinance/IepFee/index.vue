<template>
  <div>
    <basic-container>
      <iep-page-header title="内网使用费" :backOption="backOption"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd" type="primary" icon="el-icon-plus" plain>收取内网使用费</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>

<script>
import { columnsMap } from './options'
import { getInnerCostPage, postInnerCost } from '@/api/fams/inner_cost'
import mixins from '@/mixins/mixins'
import DialogForm from './DialogForm'
export default {
  components: {
    DialogForm,
  },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      backOption: {
        isBack: true,
      },
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleAdd () {
      this.$refs['DialogForm'].formRequestFn = postInnerCost
      this.$refs['DialogForm'].dialogShow = true
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id)
    },
    loadPage (param = this.searchForm) {
      this.loadTable({ ...param }, getInnerCostPage)
    },
  },
}
</script>
