<template>
  <div>
    <basic-container>
      <page-header title="我发起的"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd()" type="primary" icon="el-icon-plus" plain>发起申请</iep-button>
          <!-- <el-button @click="rowCell(scope.row,scope.index)">发起申请</el-button> -->
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="false" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
        <template slot="before-columns">
          <el-table-column label="申请人" width="120px">
            <template slot-scope="scope">
              <iep-table-link @click="handleDetail(scope.row)">{{scope.row.name}}</iep-table-link>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="操作" width="220px">
          <template slot-scope="scope">
            <el-button size="small" type="warning" plain @click="handleEdit(scope.row,scope.index)">修改</el-button>
            <el-button size="small" @click="handleDelete(scope.row)">删除</el-button>
            <el-button size="small">提交</el-button>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <new-approval ref="NewApproval" @load-page="loadPage"></new-approval>
  </div>
</template>

<script>
import { getInitiatePage, deleteApprovalById, putApprovalInitiate } from '@/api/hrms/wel'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from '../options'
import NewApproval from '@/views/wel/approval/Components/NewApproval.vue'
export default {
  components: {
    NewApproval,
  },
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
    handleDetail (row) {
      this.$router.push({
        path: '/hrms_spa/approval_detail',
        query: {
          id: row.id,
        },
      })
    },
    handleCommandType () {
      // console.log(val)
    },
    handleCommandUser () {
      // console.log(val)
    },
    handleEdit (row) {
      this.$emit('onEdit', {
        formRequestFn: putApprovalInitiate,
        methodName: '修改',
        id: row.id,
      })
    },
    handleAdd () {
      this.$refs['NewApproval'].dialogShow = true
    },
    handleDelete (row) {
      this._handleComfirm(row.id, deleteApprovalById, '删除')
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getInitiatePage)
    },
  },
}
</script>
<style scoped>
</style>
