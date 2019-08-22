<template>
  <div>
    <el-row class="aside-main" :gutter="8">
      <el-col class="sub-menu-left" :span="4">
        <el-card shadow="never" :body-style="bodyStyle">
          <div slot="header" class="clearfix">
            <span class="title">通讯录</span>
          </div>
          <el-menu :default-openeds="selectType" class="menu-vertical">
            <!-- <el-submenu index="1" collapse>
              <template slot="title">
                <span>国脉人</span>
              </template>
              <el-menu-item class="menu-item" :index="item.value+''" :key="item.value" v-for="item in allPeople" @click.native="handleAllPeople(item.value)">
                <span>{{item.label}}</span>
              </el-menu-item>
            </el-submenu> -->
            <el-menu-item index="1" @click.native="handleAllPeople(1001)">
              <span slot="title">国脉人</span>
            </el-menu-item>
            <el-submenu index="2" collapse>
              <template slot="title">
                <span>我的关系</span>
              </template>
              <el-menu-item index="601" class="menu-item" @click.native="handleSelectMaster()">
                <span>我的师父</span>
              </el-menu-item>
              <el-menu-item index="602" class="menu-item" @click.native="handleSelectApprentice()">
                <span>我的徒弟</span>
              </el-menu-item>
              <el-menu-item index="603" class="menu-item" @click.native="handleSelectAttention()">
                <span>我的关注</span>
              </el-menu-item>
              <el-menu-item class="menu-item" :index="item.id+''" :key="item.id" v-for="item in relationship" @click.native="handleSelectType(item.id)" @dblclick.native="item.userId==userInfo.userId?changeGroup(item.name,item.id,item.isOpen):''">
                <el-tooltip class="item" effect="dark" content="双击可进行编辑自定义分组名" placement="bottom-start" v-if="item.userId==userInfo.userId">
                  <span>{{item.name}}</span>
                </el-tooltip>
                <span v-else>{{item.name}}</span>
                <i class="iconfont icon-shanchu1" @click="handleDelete(item.id)" v-show="item.userId==userInfo.userId"></i>
              </el-menu-item>
            </el-submenu>
          </el-menu>
          <el-button style="width:100%;border:0;" @click="openContact"><i class="iconfont icon-xinzeng"></i></el-button>
        </el-card>
      </el-col>
      <el-col :span="20" v-if="this.mark=='master'">
        <master></master>
      </el-col>
      <el-col :span="20" v-else-if="this.mark=='apprentice'">
        <apprentice></apprentice>
      </el-col>
      <el-col :span="20" v-else-if="this.mark=='attention'">
        <attention-page></attention-page>
      </el-col>
      <el-col :span="20" v-else>
        <!-- <iep-page-header title=""></iep-page-header> -->
        <operation-container>
          <template slot="left">
            <iep-button type="primary" @click="handleAddBatch" plain v-show="mark==''">批量添加</iep-button>
            <iep-button type="primary" @click="handleRemoveBatch" plain v-show="mark=='group'">批量移除</iep-button>
          </template>
          <template slot="right">
            <iep-select v-model="orgId" autocomplete="off" prefix-url="admin/org/all" placeholder="请选择组织" size="small"></iep-select>
            <el-radio-group size="small">
              <!-- <el-radio-button v-for="tab in tabList" :label="tab.value" :key="tab.value">{{tab.label}}</el-radio-button> -->
            </el-radio-group>
            <operation-search ref="OperationSearch" @search-page="searchPage">
              <!-- <advance-search @search-page="searchPage"></advance-search> -->
            </operation-search>
          </template>
        </operation-container>
        <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
          <template slot="before-columns">
          </template>
          <el-table-column prop="operation" label="操作" width="160px">
            <template slot-scope="scope">
              <operation-wrapper>
                <iep-button type="warning" v-show="mark==''" plain @click="handleadd(scope.row)">添加</iep-button>
                <iep-button v-show="mark=='group'" plain @click="handleRemove(scope.row,scope.row)">移除</iep-button>
                <el-dropdown size="medium" v-show="mark==''">
                  <iep-button type="default"><i class="el-icon-more-outline"></i></iep-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-if="scope.row.isMentor==0" @click.native="handleApprenticeConfirm(scope.row)">拜师</el-dropdown-item>
                    <el-dropdown-item v-else @click.native="handleRelease(scope.row)">解除关系</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.isFollowed==0" @click.native="handleFollow(scope.row)"><i class="icon-xinzeng" style="font-size:14px;"></i> 关注</el-dropdown-item>
                    <el-dropdown-item v-else @click.native="handleUnFollow(scope.row)"><i class="icon-check" style="font-size:14px;"></i> 取消关注</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </operation-wrapper>
            </template>
          </el-table-column>
        </iep-table>
      </el-col>
    </el-row>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
    <add-dialog-form ref="AddDialogForm" @load-page="loadPage"></add-dialog-form>
  </div>
</template>
<script>
import { getRelationshipManagePage, getTypeCountMap, getRelationshipList, putRelationshipList, joinRelationship, deleteRelationshipList, joinGroup, removeRelationshipById, removeRelationshipBatch } from '@/api/wel/relationship_manage'
import mixins from '@/mixins/mixins'
import formMixins from '@/mixins/formMixins'
import { columnsMap, dictsMap, initForm } from './options'
import DialogForm from './DialogForm'
import AddDialogForm from './AddDialogForm'
import master from './MentorTable/master'
import apprentice from './MentorTable/apprentice'
import attentionPage from './MentorTable/attentionPage'
import { mapGetters } from 'vuex'
import { followById, unfollowById } from '@/api/cpms/iepuserfollow'
import { deleteReleaseMentorById } from '@/api/wel/relationship_manage'
import { addMasterWorker } from '@/api/cpms/characterrelations'
// import AdvanceSearch from './AdvanceSearch'
export default {
  mixins: [mixins, formMixins],
  // components: { AdvanceSearch },
  components: { DialogForm, AddDialogForm, master, apprentice, attentionPage },
  data () {
    return {
      dictsMap,
      columnsMap,
      bodyStyle: {
        padding: 0,
      },
      mark: '',
      typeCountMap: {},
      selectType: ['1', '2'],
      allPeople: [
        { value: 1001, label: '按岗位信息' },
        { value: 1002, label: '按职务信息' },
        { value: 1003, label: '按职称信息' },
      ],
      sort: { positionId: '', jobId: '', professionalTitleId: '' },
      relationship: [
      ],
      tabList: [
        { value: 0, label: '含离职' },
        { value: 1, label: '仅管理员' },
        { value: 2, label: '资产所属为本组织' },
      ],
      orgId: '',
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  created () {
    this.mark = this.$route.query.mark ? this.$route.query.mark : ''
    this.loadPage()
  },
  methods: {
    handleadd (row) {
      this.$refs['AddDialogForm'].form.userId = [row.userId]
      this.$refs['AddDialogForm'].methodName = '添加到'
      this.$refs['AddDialogForm'].formRequestFn = joinGroup
      this.$refs['AddDialogForm'].dialogShow = true
    },
    handleAddBatch () {
      if (this.multipleSelection === undefined || this.multipleSelection.length === 0) {
        this.$message('请先选择需要添加的选项')
        return
      }
      this.$refs['AddDialogForm'].form.userId = this.multipleSelection
      this.$refs['AddDialogForm'].methodName = '添加到'
      this.$refs['AddDialogForm'].formRequestFn = joinGroup
      this.$refs['AddDialogForm'].dialogShow = true
    },
    handleDelete (id) {
      this._handleGlobalDeleteById(id, deleteRelationshipList)
    },
    handleAllPeople (val) {
      this.mark = ''
      if (val == 1001) {
        this.sort.positionId = '1'
        this.sort.jobId = ''
        this.sort.professionalTitleId = ''
      }
      else if (val == 1002) {
        this.sort.positionId = ''
        this.sort.jobId = '1'
        this.sort.professionalTitleId = ''
      }
      else if (val == 1003) {
        this.sort.positionId = ''
        this.sort.jobId = ''
        this.sort.professionalTitleId = '1'
      }
      if (typeof this.$refs['OperationSearch'] != 'undefined') {
        this.$refs['OperationSearch'].input = ''
      }
      this.searchPage()
    },
    handleRemove (row) {
      this.$confirm('此操作将永久移除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        removeRelationshipById(row.groupId, [row.userId]).then(res => {
          if (res.data.data) {
            this.$message({
              type: 'success',
              message: '移除成功!',
            })
          } else {
            this.$message({
              type: 'info',
              message: `移除失败，${res.data.msg}`,
            })
          }
          this.loadPage()
        })
      })
    },
    handleRemoveBatch () {
      if (this.multipleSelection === undefined || this.multipleSelection.length === 0) {
        this.$message('请先选择需要移除的选项')
        return
      }
      this.$confirm('此操作将永久移除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        removeRelationshipBatch(this.groupType, this.multipleSelection).then(res => {
          if (res.data.data) {
            this.$message({
              type: 'success',
              message: '移除成功!',
            })
          } else {
            this.$message({
              type: 'info',
              message: `移除失败，${res.data.msg}`,
            })
          }
          this.loadPage()
        })
      })
    },
    openContact () {
      this.$refs['DialogForm'].form = initForm()
      this.$refs['DialogForm'].formRequestFn = joinRelationship
      this.$refs['DialogForm'].dialogShow = true
    },
    changeGroup (name, id, isOpen) {
      this.$refs['DialogForm'].form.name = name
      this.$refs['DialogForm'].form.id = id
      this.$refs['DialogForm'].form.isOpen = isOpen
      this.$refs['DialogForm'].methodName = '编辑'
      this.$refs['DialogForm'].formRequestFn = putRelationshipList
      this.$refs['DialogForm'].dialogShow = true
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.userId)
    },
    handleSelectMaster () {
      this.mark = 'master'
    },
    handleSelectApprentice () {
      this.mark = 'apprentice'
    },
    handleSelectAttention () {
      this.mark = 'attention'
    },//我关注的分页
    handleSelectType (k) {
      this.groupType = k
      this.mark = 'group'
      if (typeof this.$refs['OperationSearch'] != 'undefined') {
        this.$refs['OperationSearch'].input = ''
      }
      this.searchPage()
    },
    loadTypeList () {
      getRelationshipList().then(({ data }) => {
        this.relationship = data.data
      })
    },
    //tab切换菜单
    // changeType () {
    //   this.searchPage()
    //   if (this.type === '2') {
    //     this.showSelect = true
    //   } else { this.showSelect = false }
    // },
    loadPage (param = this.searchForm) {
      this.loadTypeList()
      this.$nextTick(() => { this.$refs['AddDialogForm'].loadTypeList() })
      if (this.mark == 'group') {
        this.loadTable({ orgId: this.orgId, groupId: this.groupType, ...param }, getTypeCountMap)
      }
      else {
        this.loadTable({ orgId: this.orgId, positionId: this.sort.positionId, jobId: this.sort.jobId, professionalTitleId: this.sort.professionalTitleId, ...param }, getRelationshipManagePage)
      }
    },
    // 关注
    handleFollow (row) {
      followById(row.userId).then(() => {
        this.loadPage()
      })
    },
    // 取消关注
    handleUnFollow (row) {
      unfollowById(row.userId).then(() => {
        this.loadPage()
      })
    },
    //拜师
    handleApprenticeConfirm (row) {
      addMasterWorker({ masterWorker: [row.userId], refuseContent: '' }).then(({ data }) => {
        if (data.data) {
          this.$message.success('拜师成功！')
        } else {
          this.$message.error(data.msg)
        }
        this.loadPage()
      })
    },
    //解除师徒关系
    handleRelease (row) {
      this.$confirm('此操作将永久解除师徒关系, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteReleaseMentorById(row.userId).then(res => {
          if (res.data.data) {
            this.$message({
              type: 'success',
              message: '解除成功!',
            })
          } else {
            this.$message({
              type: 'info',
              message: `解除失败，${res.data.msg}`,
            })
          }
          this.loadPage()
        })
      })
    },
  },
  watch: {
    'orgId': function (n) {
      this.orgId = n
      this.loadPage()
    },
  },
}
</script>
<style lang="scss" scoped>
.aside-main {
  display: flex;
  margin: 0 !important;
  padding: 20px;
  width: 100%;
  height: 100vh;
  .title {
    font-size: 16px;
  }
  .menu-vertical {
    border: none;
  }
  .menu-item {
    display: flex;
    justify-content: space-between;
    & > .mark {
      margin-top: 5px;
    }
  }
  .page-container {
    margin-left: 20px;
    width: 100%;
  }
}
.sub-menu-left {
  margin: -20px 15px -20px -20px;
  padding-top: 12px;
  border-right: 1px solid #ebeef5;
  .el-card {
    border: 0;
  }
}
</style>
<style scoped>
.sub-menu-left >>> .el-card__header {
  padding: 8px 20px;
  border: 0;
}
.sub-menu-left >>> .el-menu-item {
  height: 40px;
  line-height: 40px;
}
</style>




