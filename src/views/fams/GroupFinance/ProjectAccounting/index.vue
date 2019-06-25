<template>
  <div>
    <basic-container>
      <page-header title="项目核算-集团"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd()" type="primary" icon="el-icon-plus" plain>新增业务指标</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @row-click="handleDetail" :cell-style="mixinsCellPointerStyle">
        <template slot="before-columns">
          <el-table-column label="时间">
            <template slot-scope="scope">
              {{scope.row.businessYear-scope.row.businessMonth}}
            </template>
          </el-table-column>
        </template>
        <el-table-column label="应收账款金额">
          <template slot-scope="scope">
            {{!scope.row.invoicingAmount ? '暂无' : (scope.row.invoicingAmount||0 - scope.row.projectIncome||0) }}
          </template>
        </el-table-column>
        <el-table-column label="应收账款完成率">
          <template slot-scope="scope">
            {{!scope.row.invoicingAmount ? '暂无' : (scope.row.invoicingAmount||0 - scope.row.projectIncome||0) }}
          </template>
        </el-table-column>
        <el-table-column label="业务指标完成率">
          <template slot-scope="scope">
            {{!scope.row.contractAmount ? '暂无' : (scope.row.contractAmount||0 / scope.row.amount||1) }}
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>

<script>
import { getUnionProjectPage } from '@/api/fams/statistics'
import DialogForm from './DialogForm'
import mixins from '@/mixins/mixins'
import { columnsMap, initForm } from './options'
export default {
  components: { DialogForm },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleAdd () {
      this.$refs['DialogForm'].form = initForm()
      this.$refs['DialogForm'].dialogShow = true
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getUnionProjectPage)
    },
  },
}
</script>
<style scoped>
</style>
