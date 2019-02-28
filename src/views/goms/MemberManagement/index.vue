<template>
  <div>
    <basic-container>
      <page-header :title="formData.orgName" :replaceText="replaceText" :data="data"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleReview()">批量审核</iep-button>
        </template>
        <template slot="right">
          <operation-search @search="searchPage" :paramForm="paramForm" advance-search>
            <el-form :model="paramForm" label-width="80px" size="mini">
              <el-form-item label="真实姓名">
                <el-input v-model="paramForm.name"></el-input>
              </el-form-item>
              <el-form-item>
                <iep-button type="primary" @click="searchPage">搜索</iep-button>
                <iep-button @click="clearSearchParam">清空</iep-button>
              </el-form-item>
            </el-form>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
        <template slot="before-columns">
          <el-table-column label="用户名" width="150px">
            <template slot-scope="scope">
              <span>{{scope.row.username}}</span>
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作" min-width="160">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button v-if="!([1].includes(scope.row.status))" @click="handleEdit(scope.row)">编辑</iep-button>
              <iep-button v-if="scope.row.status===0" @click="handleLocking(scope.row)">锁定</iep-button>
              <iep-button v-else-if="scope.row.status===2" @click="handleLocking(scope.row)">解锁</iep-button>
              <el-dropdown size="medium">
                <iep-button type="default">更多<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-if="!([1].includes(scope.row.status))">查看</el-dropdown-item>
                  <el-dropdown-item v-if="!([1].includes(scope.row.status))" @click.native="handleDeleteById(scope.row)">删除</el-dropdown-item>
                  <el-dropdown-item v-if="([1].includes(scope.row.status))" @click.native="handlePassById(scope.row)">通过</el-dropdown-item>
                  <el-dropdown-item v-if="([1].includes(scope.row.status))" @click.native="handleRejectById(scope.row)">不通过</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <add-dialog-form ref="addDialogForm" @load-page="loadPage"></add-dialog-form>
    <batch-review-confirm ref="batchReviewForm" @load-page="loadPage"></batch-review-confirm>
  </div>
</template>
<script>
import { mergeByFirst } from '@/util/util'
import { dictsMap, columnsMap, initSearchForm, optionMap, initGomsForm } from './options'
import AddDialogForm from './AddDialogForm'
import batchReviewConfirm from './BatchReviewConfirm'
import { orgDetail, gomsUserPage, delGomsUser, userLock, userUnLock, delAllGomsUser, putGoms, gomsPass, gomsReject } from '@/api/admin/org'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      dictsMap,
      optionMap,
      data: [0, 0],
      loadImage: '',
      paramForm: initSearchForm(),
      replaceText: (data) => ` 共${data[0]}个成员(其中${data[1]}个待审核)`,
      formData: { 'orgName': '', 'logo': '', 'realName': '', 'logList': [], 'memberNum': 0, 'applyUserNum': 0, 'deptNum': 0, 'managerList': [], 'isOpen': 0 },
    }
  },
  created () {
    this.loadPage()
  },
  components: {
    AddDialogForm,
    batchReviewConfirm,
  },
  methods: {
    handleReview () {
      this.$refs['batchReviewForm'].methodName = '批量审核'
      this.$refs['batchReviewForm'].formRequestFn = ''
      this.$refs['batchReviewForm'].dialogShow = true
    },
    handleDel () {
      this._handleGlobalDeleteAll(delAllGomsUser)
    },
    handleEdit (row) {
      this.$refs['addDialogForm'].gomsForm = mergeByFirst(initGomsForm(), row)
      this.$refs['addDialogForm'].methodName = '编辑'
      this.$refs['addDialogForm'].formRequestFn = putGoms
      this.$refs['addDialogForm'].dialogShow = true
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.userId, delGomsUser)
    },
    handlePassById (row) {
      this.$confirm('此操作将审核通过该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        gomsPass(row.userId).then(res => {
          if (res.data.data) {
            this.$message({
              type: 'success',
              message: '审核成功!',
            })
          } else {
            this.$message({
              type: 'info',
              message: `审核失败，${res.data.msg}`,
            })
          }
          this.load()
        })
      })
    },
    handleRejectById (row) {
      this.$confirm('此操作将拒绝通过该成员加入组织, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        gomsReject(row.userId).then(res => {
          if (res.data.data) {
            this.$message({
              type: 'success',
              message: '拒绝成功!',
            })
          } else {
            this.$message({
              type: 'info',
              message: `拒绝成功，${res.data.msg}`,
            })
          }
          this.load()
        })
      })
    },
    handleLocking (row) {
      if (row.status === 0) {
        userLock(row.userId).then(() => {
          this.loadPage()
        })
      } else if (row.status === 2) {
        userUnLock(row.userId).then(() => {
          this.loadPage()
        })
      }

    },
    clearSearchParam () {
      this.paramForm = initSearchForm()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.userId)
    },
    loadPage (param = this.paramForm) {
      this.loadTable(param, gomsUserPage)
      orgDetail().then((res) => {
        this.formData = res.data.data
        this.data = [this.formData.memberNum, this.formData.applyUserNum]
      })
    },
  },
}
</script>
