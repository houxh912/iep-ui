<template>
  <div>
    <basic-container>
      <iep-page-header title="项目审批"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button type="primary" plain @click="handleReviewDialog">批量审核</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" advance-search placeHolder="请输入项目名称" prop="projectName">
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :dictsMap="dictsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
        <el-table-column label="项目名称" slot="before-columns" width="300px">
          <template slot-scope="scope">
            <div style="cursor: pointer;width: 100%;" @click="handleDetail(scope.row)">
              <span class="grade" v-show="scope.row.projectLevel==1">重要</span>
              <span class="grade" v-show="scope.row.projectLevel==2">中级</span>
              <span class="grade" v-show="scope.row.projectLevel==3">一般</span>
              <span class="stage">{{dictsMap.projectStage[scope.row.projectStage]}}</span>
              <span>{{ scope.row.projectName }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="成本预算" slot="before-columns">
          <template slot-scope="scope">
            {{ scope.row.projectBudget }}
          </template>
        </el-table-column>
        <el-table-column label="申请人" slot="before-columns">
          <template slot-scope="scope">
            {{ scope.row.applicantName }}
          </template>
        </el-table-column>
        <el-table-column label="审批人" slot="before-columns">
          <template slot-scope="scope">
            {{ scope.row.approverName }}
          </template>
        </el-table-column>
        <el-table-column label="立项时间" slot="before-columns">
          <template slot-scope="scope">
            {{ scope.row.projectTime | parseToDay }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button size="small" type="warning" plain v-if="scope.row.projectStatus==2" @click="handleReviewDialog(scope.row, scope.index)">立项审核</iep-button>
              <iep-button size="small" v-if="scope.row.projectStatus==3" @click="lockingEnable(scope.row.id,'5','锁定')" type="warning" plain>锁定</iep-button>
              <iep-button size="small" v-if="scope.row.projectStatus==5" @click="lockingEnable(scope.row.id,'3','启用')" type="warning" plain>启用</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>

    </basic-container>
    <review-confirm is-inverse ref="ReviewForm" @load-page="loadPage"></review-confirm>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
// import { getDataDetail } from '@/api/gpms/index'
import { columnsMap, dictsMap } from './option.js'
import { getApprovalList, approvalById } from '@/api/gpms/index'
import ReviewConfirm from './ReviewConfirm'
import AdvanceSearch from './AdvanceSearch'

export default {
  mixins: [mixins],
  components: { ReviewConfirm, AdvanceSearch },
  data () {
    return {
      columnsMap,
      dictsMap,
      announcementSelection: [],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    close () {
      this.$router.history.go(-1)
    },
    loadPage (param = this.searchForm) {
      this.loadTable({ approvalStatus: 0, ...param }, getApprovalList)
    },
    handleDetail (row) {
      this.$router.push({
        path: `/gpms_spa/project/detail/${row.id}`,
        query: {
          isApprove: true,
        },
      })
    },
    //审核
    handleReviewDialog (row) {
      if (row.id) {
        this.$refs['ReviewForm'].id = row.id
      } else {
        // TODO: 是否多选提醒
        if (!this.multipleSelection.length) {
          this.$message('请先选择需要的选项')
          return
        }
        this.$refs['ReviewForm'].ids = this.multipleSelection
      }
      this.$refs['ReviewForm'].title = '审核'
      this.$refs['ReviewForm'].formRequestFn = approvalById
      this.$refs['ReviewForm'].dialogShow = true
      this.$refs['ReviewForm'].projectInformation = row
      this.$refs['ReviewForm'].announcementSelection = this.announcementSelection
    },
    //锁定启用
    lockingEnable (id, val, name) {
      this.$confirm(`此操作将${name}该项目 , 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        approvalById({
          ids: [id],
          projectStatus: val, // 用来变更状态
        }).then(({ data }) => {
          if (data.data) {
            this.$message({
              message: `${name}成功`,
              type: 'success',
            })
          } else {
            this.$message({
              message: data.msg,
              type: 'warning',
            })
          }
          this.loadPage()
        })
      })
    },
    handleSelectionChange (val) {
      console.log(val)
      this.multipleSelection = val.map(m => m.id)
      this.announcementSelection = val
    },
  },
}
</script>

<style lang="scss" scoped>
.head {
  margin-bottom: 20px;
  display: flex;
  .item {
    font-size: 18px;
    cursor: pointer;
  }
  .item-select {
    color: $--color-primary;
  }
  .middle {
    width: 30px;
    text-align: center;
    font-size: 18px;
  }
}
.grade,
.stage {
  color: #fff;
  font-size: 12px;
  padding: 2px 6px;
  height: 18px;
  line-height: 18px;
  margin-right: 4px;
  margin-top: 10px;
}
.grade {
  background-color: #b91b21;
}
.stage {
  background-color: #b5b5b5;
  margin-right: 10px;
}
</style>