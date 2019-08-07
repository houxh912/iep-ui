<template>
  <div>
    <basic-container>
      <iep-page-header title="行为规则"></iep-page-header>
      <operation-container>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="ruleName">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <el-table-column label="操作" width="220px">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" plain @click="handleDetail(scope.row)">查看明细</iep-button>
              <iep-button @click="handleEdit(scope.row)">编辑规则</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import { getBellBalancePage, putBellBalance } from '@/api/fams/balance_rule'
import mixins from '@/mixins/mixins'
import { columnsMap } from '../options'
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
    handleDetail (row) {
      this.$emit('onDetail', {
        id: row.ruleId,
      })
    },
    handleEdit (row) {
      this.$emit('onEdit', {
        formRequestFn: putBellBalance,
        id: row.ruleId,
      })
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getBellBalancePage)
    },
  },
}
</script>
<style scoped>
</style>
