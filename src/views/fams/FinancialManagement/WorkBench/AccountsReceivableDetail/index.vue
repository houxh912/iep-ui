<template>
  <div>
    <basic-container>
      <iep-page-header title="合同应收账款"></iep-page-header>
      <operation-container>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="projectName">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @row-click="handleDetail" :cell-style="mixinsCellPointerStyle">
        <el-table-column label="合同应收账款金额">
          <template slot-scope="scope">
            {{!scope.row.amount ? '暂无' : (scope.row.amount - (scope.row.projectIncome||0)) }}
          </template>
        </el-table-column>
        <el-table-column label="应收账款金额">
          <template slot-scope="scope">
            {{!scope.row.invoicingAmount ? '暂无' : (scope.row.invoicingAmount - (scope.row.projectIncome||0)) }}
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import { getContractPage } from '@/api/fams/statistics'
import mixins from '@/mixins/mixins'
import { columnsMap } from './options'
export default {
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
    loadPage (param = this.searchForm) {
      this.loadTable(param, getContractPage)
    },
    handleDetail (row) {
      this.$router.push({
        path: `/fams_spa/project_accounting/${row.id}`,
      })
    },
  },
}
</script>
<style scoped>
</style>
