<template>
  <div>
    <basic-container>
      <page-header :title="userInfo.orgName" :replaceText="replaceText" :data="[4,2]"></page-header>
      <operation-container>
        <template slot="left">
          <!-- <iep-button @click="handleReview()">批量审核</iep-button> -->
          <iep-button @click="handleDeleteBatch()">删除</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
        <template slot="before-columns">
          <el-table-column label="用户名" width="150px">
            <template slot-scope="scope">
              <iep-table-link @click="handleDetail(scope.row)">{{scope.row.username}}</iep-table-link>
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作" width="220">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button :disabled="isMine(scope.row)" v-if="!([1].includes(scope.row.status))" type="warning" @click="handleEdit(scope.row)" plain>编辑</iep-button>
              <iep-button :disabled="isMine(scope.row)"  v-if="scope.row.status===0" @click="handleLocking(scope.row)">锁定</iep-button>
              <iep-button :disabled="isMine(scope.row)"  v-else-if="scope.row.status===2" @click="handleLocking(scope.row)">解锁</iep-button>
              <iep-button :disabled="isMine(scope.row)"  v-if="([1].includes(scope.row.status))" @click="handlePassById(scope.row)">通过</iep-button>
              <iep-button :disabled="isMine(scope.row)"  v-if="([1].includes(scope.row.status))" @click="handleRejectById(scope.row)">不通过</iep-button>
              <iep-button :disabled="isMine(scope.row)"  v-if="!([1].includes(scope.row.status))" icon="el-icon-delete" @click="handleDeleteById(scope.row)"></iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
    <iep-review-confirm ref="iepReviewForm" @load-page="loadPage"></iep-review-confirm>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { dictsMap, columnsMap, initSearchForm, initMemberForm } from './options'
import DialogForm from './DialogForm'
import { gomsUserPage, delGomsUser, userLock, userUnLock, delAllGomsUser, putGoms, gomsPass, gomsReject } from '@/api/admin/org'
import mixins from '@/mixins/mixins'
export default {
  components: {
    DialogForm,
  },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      dictsMap,
      loadImage: '',
      paramForm: initSearchForm(),
      replaceText: (data) => ` 共${data[0]}个成员(其中${data[1]}个待审核)`,
      formData: { 'orgName': '', 'logo': '', 'realName': '', 'logList': [], 'memberNum': 0, 'applyUserNum': 0, 'deptNum': 0, 'managerList': [], 'isOpen': 0 },
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
    }),
  },
  created () {
    this.loadPage()
  },
  methods: {
    isMine (row) {
      return row.userId === this.userInfo.userId
    },
    handleDeleteBatch () {
      this._handleGlobalDeleteAll(delAllGomsUser)
    },
    handleDetail (row) {
      this.$refs['DialogForm'].form = this.$mergeByFirst(initMemberForm(), row)
      this.$refs['DialogForm'].methodName = '查看'
      this.$refs['DialogForm'].disabled = true
      this.$refs['DialogForm'].dialogShow = true
    },
    handleEdit (row) {
      this.$refs['DialogForm'].form = this.$mergeByFirst(initMemberForm(), row)
      this.$refs['DialogForm'].methodName = '编辑'
      this.$refs['DialogForm'].formRequestFn = putGoms
      this.$refs['DialogForm'].disabled = false
      this.$refs['DialogForm'].dialogShow = true
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
          this.loadPage()
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
          this.loadPage()
        })
      })
    },
    handleLocking (row) {
      if (row.status === 0) {
        userLock(row.userId).then(() => {
          this.$message({
            type: 'success',
            message: '锁定成功!',
          })
          this.loadPage()
        })
      } else if (row.status === 2) {
        userUnLock(row.userId).then(() => {
          this.$message({
            type: 'success',
            message: '解锁成功!',
          })
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
    },
  },
}
</script>