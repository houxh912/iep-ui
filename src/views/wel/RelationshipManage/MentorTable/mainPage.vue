<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button type="primary" @click="handleAddBatch" plain v-show="mark==''">批量添加</iep-button>
        <iep-button type="primary" @click="handleRemoveBatch" plain v-show="mark=='group'">批量移除</iep-button>
      </template>
      <template slot="right">
        <iep-select v-model="orgId" autocomplete="off" prefix-url="admin/org/all" placeholder="请选择组织" size="small" clearable></iep-select>
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
      <el-table-column prop="operation" label="操作" width="160px" v-if="isremove == true">
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
    <add-dialog-form ref="AddDialogForm" @load-page="loadPage"></add-dialog-form>
  </div>
</template>
<script>
import { getRelationshipManagePage, getTypeCountMap, joinGroup, removeRelationshipById, removeRelationshipBatch } from '@/api/wel/relationship_manage'
import { followById, unfollowById } from '@/api/cpms/iepuserfollow'
import { deleteReleaseMentorById } from '@/api/wel/relationship_manage'
import { addMasterWorker } from '@/api/cpms/characterrelations'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from '../options'
import AddDialogForm from '../AddDialogForm'
export default {
  components: {
    AddDialogForm,
  },
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      sort: { positionId: '', jobId: '', professionalTitleId: '' },
      orgId: '',
      groupType: '',
      isremove: false,
      mark: '',
    }
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
    handleRemove (row) {
      this.$confirm('此操作将永久移出该分组, 是否继续?', '提示', {
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
      this.$confirm('此操作将永久移出该分组, 是否继续?', '提示', {
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
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.userId)
    },
    loadPage (param = this.searchForm) {
      this.$nextTick(() => { this.$refs['AddDialogForm'].loadTypeList() })
      if (this.mark == 'group') {
        this.loadTable({ orgId: this.orgId, groupId: this.groupType, ...param }, getTypeCountMap)
      }
      else {
        this.loadTable({ orgId: this.orgId, positionId: this.sort.positionId, jobId: this.sort.jobId, professionalTitleId: this.sort.professionalTitleId, ...param }, getRelationshipManagePage)
      }
      console.log(this.mark)
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
          this.$message.success('拜师申请已提交成功！')
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
