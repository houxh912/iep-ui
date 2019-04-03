<template>
  <div>
    <div v-if="pageState=='list'">
      <div class="info">回款总金额：123,000,000，待收款 <i class="el-icon-question"></i> ：3，000，000，回款率：89%</div>
      <operation-container>
        <template slot="left">
          <iep-button size="small" type="primary" @click="handleAdd"><i class="el-icon-plus"></i> 新增</iep-button>
          <el-dropdown size="medium">
            <iep-button size="small" type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleDeleteByIds">删除</el-dropdown-item>
              <el-dropdown-item divided @click.native="handleExport">导出</el-dropdown-item>
              <el-dropdown-item @click.native="handleDownloadAll">下载</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="contractName"></operation-search>
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
        isMutipleSelection
        @selection-change="selectionChange">
        <template slot="before-columns">
          <el-table-column label="合同名称">
            <template slot-scope="scope">
              <div class="custom-name">{{scope.row.contractName}}</div>
              <el-col class="custom-tags">
                <el-tag type="info" size="mini" v-for="(item, index) in scope.row.code" :key="index">{{item}}</el-tag>
              </el-col>
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作" width="300">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleEdit(scope.row)" size="small">编辑</iep-button>
              <iep-button @click="handleDeleteById(scope.row)" size="small">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </div>
    <main-dialog ref="mainDialog" @load-page="loadPage" v-if="pageState=='dialog'"></main-dialog>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { tableOption, dictsMap } from './option'
import { getTableData, createData, updateData, deleteData, getDataById } from '@/api/mlms/material/datum/contract'
import MainDialog from './mainDialog'

export default {
  mixins: [mixins],
  components: { MainDialog },
  computed: {},
  data () {
    return {
      pageState: 'list',
      dictsMap,
      columnsMap: tableOption,
    }
  },
  methods: {
    handleAdd () {
      this.pageState = 'dialog'
      this.$nextTick(() => {
        this.$refs['mainDialog'].methodName = '新增'
        this.$refs['mainDialog'].formRequestFn = createData
      })
    },
    handleEdit (row) {
      this.pageState = 'dialog'
      getDataById(row.id).then(({data}) => {
        data.data.underTakeDeptList = data.data.underTakeDeptName // 承接部门
        if (data.data.contractType == 0) {
          data.data.directorList = {
            id: data.data.directorId,
            name: data.data.directorRealName,
          }
        }
        console.log('data: ', data)
        this.$refs['mainDialog'].formData = data.data
        this.$refs['mainDialog'].methodName = '编辑'
        this.$refs['mainDialog'].formRequestFn = updateData
      })
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.id, deleteData)
    },
    // 批量删除
    handleDeleteByIds () {
      this._handleGlobalDeleteAll(deleteData)
    },
    selectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    loadPage (param) {
      this.pageState = 'list'
      this.loadTable(param, getTableData)
    },
    // 批量导出
    handleExport () {
      this.$message.error('抱歉，此功能尚未开发')
    },
    // 批量下载
    handleDownloadAll () {
      this.$message.error('抱歉，此功能尚未开发')
    },
  },
  created () {
    this.loadPage()
  },
}
</script>

<style lang="scss" scoped>
.info {
  color: #666;
  padding: 8px 18px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
  i {
    color: #ccc;
    cursor: pointer;
  }
}
.custom-name {
  cursor: pointer;
  margin-bottom: 10px;
  width: 100%;
  // text-decoration: underline;
}
.custom-tags {
  margin: 0;
  .el-tag {
    margin-right: 5px;
    height: 26px;
    line-height: 26px;
  }
}
</style>
