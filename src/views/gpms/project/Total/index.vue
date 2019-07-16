<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button type="primary" icon="el-icon-plus" @click="handleCreate" plain>新增</iep-button>
        <iep-button v-if="onlyResponsible==true" @click="handleDeleteAll">批量删除</iep-button>
        <iep-button v-if="onlyResponsible==true" @click="transferMentor">批量移交</iep-button>
      </template>
      <template slot="right">
        <el-checkbox v-model="onlyResponsible" @change="changeResponsible()">仅看我负责的项目</el-checkbox>
        <operation-search @search-page="searchPage" advance-search placeHolder="请输入项目名称" prop="projectName">
          <advance-search @search-page="searchPage"></advance-search>
        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection @selection-change="selectionChange" :dictsMap="dictMap">
      <el-table-column label="项目名称" slot="before-columns" width="300px">
        <template slot-scope="scope">
          <div style="cursor: pointer;width: 100%;" @click="handleDetail(scope.row)">
            <span>{{ scope.row.projectName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="项目经理">
        <template slot-scope="scope">
          <span>{{ scope.row.projectManagerList.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="立项时间" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.approvalTime || parseToDay }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目状态">
        <template slot-scope="scope">
          <span v-if="scope.row.projectStatus==1">待提交</span>
          <span v-if="scope.row.projectStatus==2">待审核</span>
          <span v-if="scope.row.projectStatus==3">已立项</span>
          <span v-if="scope.row.projectStatus==4">审核未通过</span>
          <span v-if="scope.row.projectStatus==5">锁定</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180px">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleClaim(scope.row)" v-if="userInfo.userId==scope.row.projectManagerList.id">移入公海库</iep-button>
            <iep-button @click="handleWithdraw(scope.row.id,1,'撤回')" v-if="userInfo.userId==scope.row.projectManagerList.id && scope.row.projectStatus=='2'">撤回</iep-button>
            <el-dropdown size="medium" v-if="userInfo.userId==scope.row.projectManagerList.id && scope.row.projectStatus=='1'||scope.row.projectStatus=='4'">
              <iep-button type="default">
                <i class="el-icon-more-outline"></i>
              </iep-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="handleWithdraw(scope.row.id,2,'立项')">立项</el-dropdown-item>
                <el-dropdown-item @click.native="handleUpdate(scope.row)">编辑</el-dropdown-item>
                <el-dropdown-item @click.native="handleDelete(scope.row)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <transfer-dialog-form ref="TransferDialogForm" @load-page="loadPage"></transfer-dialog-form>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { dictMap, columnsMap, paramForm } from './const.js'
import { getTableData, deleteData, withdrawById } from '@/api/gpms/index'
import { statusCancel } from '@/api/gpms/fas'
import AdvanceSearch from './AdvanceSearch'
import { mapGetters } from 'vuex'
import TransferDialogForm from '../TransferDialogForm'
export default {
  components: { AdvanceSearch, TransferDialogForm },
  props: {
    tabType: {
      type: String,
    },
  },
  computed: {
    ...mapGetters(['permissions', 'userInfo']),
  },
  data () {
    return {
      isLoadTable: false,
      dictMap,
      columnsMap,
      dialogIsShow: true,
      paramForm: paramForm(),
      value: '',
      searchForm: {},
      onlyResponsible: false,
      statistics: '',
    }
  },
  mixins: [mixins],
  methods: {
    async loadPage (params = {}) {
      const data = await this.loadTable(Object.assign({}, params, this.searchForm), getTableData)
      this.statistics = data.total
      this.$emit('statistics', this.statistics)
    },
    searchPage (val) {
      this.searchForm = Object.assign({}, this.searchForm, val)
      this.loadPage()
    },
    //勾选行执行
    selectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleDetail (row) {
      this.$router.push({
        path: `/gpms_spa/project/detail/${row.id}`,
        query: {
          isApprove: false,
        },
      })
    },
    handleCreate () {
      this.$router.push('/gpms_spa/project/add_first')
    },
    handleUpdate (row) {
      this.$router.push(`/gpms_spa/project/add/${row.id}`)
    },
    handleDelete (val) {
      this._handleGlobalById(val.id, deleteData)
    },
    handleDeleteAll () {
      this._handleGlobalAll(deleteData)
    },
    //撤回
    handleWithdraw (ids, val, name) {
      this.$confirm(`此操作将${name}该数据, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        withdrawById({ ids: [ids], projectStatus: val }).then(res => {
          if (res.data.data) {
            this.$message({
              type: 'success',
              message: `${name}成功!`,
            })
          } else {
            this.$message({
              type: 'info',
              message: `撤回失败，${res.data.msg}`,
            })
          }
          this.loadPage()
        })
      })
    },
    //移交
    transferMentor () {
      if (this.multipleSelection === undefined || this.multipleSelection.length === 0) {
        this.$message('请先选择需要移交的选项')
        return
      }
      this.$refs['TransferDialogForm'].methodName = '项目经理'
      this.$refs['TransferDialogForm'].ids = this.multipleSelection
      this.$refs['TransferDialogForm'].dialogShow = true
    },
    changeResponsible () {
      if (this.onlyResponsible) {
        this.searchForm.listType = 1
        this.loadPage()
      }
      else {
        this.searchForm.listType = 2
        this.loadPage()
      }
      this.onlyResponsible != this.onlyResponsible
      return false
    },
    handleClaim (row) {
      this.$confirm('是否确认移入公海此数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        statusCancel([row.id]).then(() => {
          this.$message.success('移入成功！')
          this.loadPage()
        })
      })
    },
  },
  mounted () {
    this.searchForm.listType = this.tabType
    this.loadPage()
  },
  created () {
  },
}
</script>

<style scoped>
.search {
  height: 35px;
  line-height: 26px;
  color: #666;
  font-weight: 900;
  font-size: 17px;
  border-bottom: 1px solid #cdcdcd;
  margin-bottom: 20px;
}
.searchbot {
  margin-right: 20px !important;
}
.num {
  width: 47%;
}
.smallcol {
  width: 110px !important;
}
.blackColor {
  color: #666;
}
.cell {
  padding: 0;
}
.cell .el-button {
  margin-left: 0;
  display: inline;
}
.el-button--small {
  padding: 8px 10px;
}
</style>