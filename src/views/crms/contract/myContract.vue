<template>
  <div class="contract">
    <operation-container>
      <template slot="left">
        <el-button @click="handleAdd" size="small">新增</el-button>
      </template>
      <template slot="right">
        <operation-search @search="searchPage"></operation-search>
      </template>
    </operation-container>
    <iep-table 
      :isLoadTable="isLoadTable"
      :pagination="pagination"
      :dictsMap="dictsMap"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      is-index>
      <el-table-column prop="operation" label="操作" min-width="160">
        <template slot-scope="scope">
          <operation-wrapper>
            <el-button @click="handleDetail(scope.row)" size="small">详情</el-button>
            <el-button @click="handleEdit(scope.row)" size="small">编辑</el-button>
            <el-button @click="handleDeleteById(scope.row)" size="small">删除</el-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <main-form-dialog ref="mainDialog" @load-page="loadPage"></main-form-dialog>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { allTableOption, dictsMap } from './const'
import { fetchList, createData, updateData, deleteDataById } from '@/api/crms/contract'
import mainFormDialog from './mainDialog'
export default {
  name: 'contract',
  mixins: [ mixins ],
  components: { mainFormDialog },
  data () {
    return {
      dictsMap,
      columnsMap: allTableOption,
    }
  },
  methods: {
    loadPage (param) {
      this.loadTable(param, fetchList)
    },
    handleAdd () {
      this.$refs['mainDialog'].methodName = '新增'
      this.$refs['mainDialog'].formRequestFn = createData
      this.$refs['mainDialog'].dialogShow = true
    },
    handleEdit (row) {
      this.$refs['mainDialog'].formData = row
      this.$refs['mainDialog'].methodName = '编辑'
      this.$refs['mainDialog'].formRequestFn = updateData
      this.$refs['mainDialog'].dialogShow = true
    },
    handleDetail (row) {
      row.list = [{name: '文件1'}]
      row.startTime = '2018-09-11'
      row.endTime = '2018-09-11'
      row.jibie = 1
      row.type = 1
      row.tableData = [
        { daozhangshijian: '2019-09-01', daozhangjine: '2000', leijidaozhang: '20000', daozhangbili: 0.8 },
      ]
      this.$refs['mainDialog'].formData = row
      this.$refs['mainDialog'].methodName = '详情'
      this.$refs['mainDialog'].dialogShow = true
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.id, deleteDataById)
    },
  },
  created () {
    this.loadPage()
  },
}
</script>
