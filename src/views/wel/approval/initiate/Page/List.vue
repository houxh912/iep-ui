<template>
  <div>
    <basic-container>
      <page-header title="我发起的"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd()" type="danger" icon="el-icon-plus" plain>发起申请</iep-button>
          <!-- <el-button @click="rowCell(scope.row,scope.index)">发起申请</el-button> -->
        </template>
        <template slot="right">
          <operation-search @search="searchPage" advance-search>
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
            <el-button size="small">删除</el-button>
            <el-button size="small">提交</el-button>
          </template>
        </el-table-column>
      </iep-table>
      <request-dialog ref="requestDialog" @load-page="loadPage"></request-dialog>
    </basic-container>
  </div>
</template>

<script>
import { getInitiatePage, postApproval , putApprovalInitiate } from '@/api/wel/administrative_approval'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from '../options'
import requestDialog from './requestDialog'
export default {
  components: {
    requestDialog,
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
      this.$refs['requestDialog'].methodName = '创建'
      this.$refs['requestDialog'].formRequestFn = postApproval
      this.$refs['requestDialog'].dialogShow = true
    },
    handleDetail (row) {
      this.$emit('onDetail', row)
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getInitiatePage)
    },
  },
}
</script>
<style scoped>
</style>
