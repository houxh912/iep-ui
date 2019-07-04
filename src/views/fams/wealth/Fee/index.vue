<template>
  <div>
    <basic-container>
      <page-header title="费用申请"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd()" type="primary" icon="el-icon-plus" plain>新增</iep-button>
          <iep-button @click="handleDeleteBatch()">批量删除</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="remarks">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection @row-click="handleDetail" :cell-style="mixinsCellPointerStyle">
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button v-if="[0,3,5].includes(scope.row.status)" @click.stop="handleSend(scope.row)">发送</iep-button>
              <iep-button v-if="[0,3,5].includes(scope.row.status)" @click.stop="handleEdit(scope.row)">编辑</iep-button>
              <iep-button v-if="scope.row.status===1 && scope.row.financialAudit===0" @click.stop="handleCancel(scope.row)">撤回</iep-button>
              <iep-button v-if="scope.row.status===0" @click.stop="handleDelete(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import {
  getMyFeePage,
  deleteFeeById,
  deleteFeeBatch,
  referFeeById,
  withdrawFeeById,
} from '@/api/fams/fee'
import mixins from '@/mixins/mixins'
import { dictsMap, columnsMap } from './options'
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
    handleSend (row) {
      this._handleComfirm(row.costId, referFeeById, '发送')
    },
    handleCancel (row) {
      this._handleComfirm(row.costId, withdrawFeeById, '撤回')
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.costId)
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.costId, deleteFeeById)
    },
    handleDeleteBatch () {
      this._handleGlobalDeleteAll(deleteFeeBatch)
    },
    handleDetail (row) {
      this.$router.push({
        path: `/fams_spa/fee_detail/${row.costId}`,
      })
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getMyFeePage)
    },
    handleAdd () {
      this.$router.push({
        path: '/fams_spa/fee_edit/0',
      })
    },
    handleEdit (row) {
      this.$router.push({
        path: `/fams_spa/fee_edit/${row.costId}`,
      })
    },
  },
}
</script>
