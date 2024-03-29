<template>
  <div>
    <basic-container>
      <iep-page-header :title="userInfo.orgName" :replaceText="replaceText" :data="statistics"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button type="primary" @click="handleAddUsers()" icon="el-icon-plus" plain>批量添加成员</iep-button>
          <iep-button @click="handleReviewBatch()">批量审核</iep-button>
          <iep-button @click="handleDeleteBatch()">批量删除</iep-button>
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
        <el-table-column prop="operation" label="操作" width="300">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button v-if="!([1].includes(scope.row.status))" type="warning" @click="handleEdit(scope.row)" plain>编辑</iep-button>
              <iep-button :disabled="isMine(scope.row)" v-if="scope.row.status===0" @click="handleLocking(scope.row)">锁定</iep-button>
              <iep-button :disabled="isMine(scope.row)" v-else-if="scope.row.status===2" @click="handleLocking(scope.row)">解锁</iep-button>
              <iep-button :disabled="isMine(scope.row)" v-if="([1].includes(scope.row.status))" @click="handlePassById(scope.row)">通过</iep-button>
              <iep-button :disabled="isMine(scope.row)" v-if="([1].includes(scope.row.status))" @click="handleRejectById(scope.row)">不通过</iep-button>
              <iep-button :disabled="isMine(scope.row)" v-if="!([1].includes(scope.row.status))" icon="el-icon-delete" @click="handleDeleteById(scope.row)"></iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
    <multiple-form ref="MultipleForm" @load-page="loadPage"></multiple-form>
    <iep-review-confirm ref="IepReviewForm" @load-page="loadPage" :is-content="false"></iep-review-confirm>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import mixins from '@/mixins/mixins'
import DialogForm from './DialogForm'
import MultipleForm from '@/views/goms/Components/MultipleForm.vue'
import { dictsMap, columnsMap, initSearchForm, initForm } from './options'
import { gomsUserPage, delGomsUser, userLock, userUnLock, delAllGomsUser, updateGomsUser, gomsPass, gomsReject } from '@/api/admin/org'
import { passJoins, pullUsersWithMessage } from '@/api/goms/org'
import { resetPassByUserId, gomsNoJoinUserPage } from '@/api/admin/user'
export default {
  components: {
    DialogForm, MultipleForm,
  },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      dictsMap,
      loadImage: '',
      paramForm: initSearchForm(),
      replaceText: (data) => ` 共${data[0]}个成员(其中${data[1]}个待审核)`,
      statistics: [0, 0],
      formData: { orgName: '', logo: '', realName: '', logList: [], memberNum: 0, applyUserNum: 0, deptNum: 0, managerList: [], isOpen: 0 },
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
    handleAddUsers () {
      this.$refs['MultipleForm'].selectList = []
      this.$refs['MultipleForm'].searchForm = {}
      this.$refs['MultipleForm'].putRequestFunction = pullUsersWithMessage
      this.$refs['MultipleForm'].getRequestFunction = gomsNoJoinUserPage
      this.$refs['MultipleForm'].loadPage()
      this.$refs['MultipleForm'].dialogShow = true
    },
    isMine (row) {
      return row.userId === this.userInfo.userId
    },
    handleResetPass (row) {
      this._handleComfirm(row.userId, resetPassByUserId, '重置密码为123456')
    },
    handleReviewBatch () {
      // TODO: 是否多选提醒
      if (!this.multipleSelection.length) {
        this.$message('请先选择需要的选项')
        return
      }
      this.$refs['IepReviewForm'].ids = this.multipleSelection
      this.$refs['IepReviewForm'].title = '批量审核'
      this.$refs['IepReviewForm'].formRequestFn = passJoins
      this.$refs['IepReviewForm'].dialogShow = true
    },
    handleDeleteBatch () {
      this._handleGlobalDeleteAll(delAllGomsUser)
    },
    handleDetail (row) {
      this.$refs['DialogForm'].form = this.$mergeByFirst(initForm(), row)
      this.$refs['DialogForm'].methodName = '查看'
      this.$refs['DialogForm'].disabled = true
      this.$refs['DialogForm'].dialogShow = true
    },
    handleEdit (row) {
      this.$refs['DialogForm'].form = this.$mergeByFirst(initForm(), row)
      this.$refs['DialogForm'].methodName = '编辑'
      this.$refs['DialogForm'].formRequestFn = updateGomsUser
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
      let functionName = undefined
      let msg = undefined
      if (row.status === 0) {
        functionName = userLock
        msg = '锁定'
      } else if (row.status === 2) {
        functionName = userUnLock
        msg = '解锁'
      } else {
        return
      }
      functionName(row.userId).then(({ data }) => {
        if (data.data) {
          this.$message({
            type: 'success',
            message: `${msg}成功!`,
          })
          this.loadPage()
        } else {
          this.$message({
            type: 'success',
            message: data.msg,
          })
        }
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.userId)
    },
    async loadPage (param = this.searchForm) {
      const data = await this.loadTable(param, gomsUserPage)
      this.statistics = this.$fillStatisticsArray(this.statistics, data.statistics, true)
    },
  },
}
</script>
