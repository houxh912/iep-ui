<template>
  <div class="my-tasks">
    <basic-container>
      <page-header title="我的任务"></page-header>
      <el-card class="box" shadow="hover">
        <div class="total-wrapper">
          <div class="total-item" @click="cSelectTpye('myAll')">
            <div class="value">{{myCountList.myAll}}</div>
            <div class="label"><a href="#">全部</a></div>
          </div>
          <div class="total-item" @click="cSelectTpye('myCreated')">
            <div class="value">{{myCountList.myCreated}}</div>
            <div class="label"><a href="#">我创建的</a></div>
          </div>
          <div class="total-item" @click="cSelectTpye('myToDo')">
            <div class="value">{{myCountList.myToDo}}</div>
            <div class="label"><a href="#">我的待办</a></div>
          </div>
          <div class="total-item" @click="cSelectTpye('myCharge')">
            <div class="value">{{myCountList.myCharge}}</div>
            <div class="label"><a href="#">我负责的</a></div>
          </div>
          <div class="total-item" @click="cSelectTpye('myParticipated')">
            <div class="value">{{myCountList.myParticipated}}</div>
            <div class="label"><a href="#">我参与的</a></div>
          </div>
          <!-- <div class="total-item"  @click="cSelectTpye('myCollection')">
            <div class="value">{{myCountList.myCollection}}</div>
            <div class="label"><a href="#">我关注的</a></div>
          </div> -->
        </div>
      </el-card>
      <operation-container>
        <template slot="left">
          <iep-button type="primary" @click="handleAdd()" icon="el-icon-plus" plain>新增</iep-button>
          <!-- <el-dropdown size="medium">
            <iep-button type="default" plain>批量操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>关注</el-dropdown-item>
              <el-dropdown-item>完成</el-dropdown-item>
              <el-dropdown-item>确认</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
          <!-- <el-dropdown size="medium" style="margin-left:20px;">
            <i class="icon-paixu2"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><i class="icon-paixu2"></i>默认排序</el-dropdown-item>
              <el-dropdown-item><i class="icon-px-early"></i>按创建时间最早</el-dropdown-item>
              <el-dropdown-item><i class="icon-px-late"></i>按创建时间最晚</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection @row-click="handleDetail">

        <template>
          <el-table-column label="起止时间" width="300px">
            <template slot-scope="scope">
              {{scope.row.startTime | parseToDay}}~{{scope.row.endTime | parseToDay}}
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作" width="180">
          <template slot-scope="scope">
            <operation-wrapper>
              <!-- <iep-button>关注</iep-button>
              <iep-button type="warning" plain>已关注</iep-button> -->
              <el-dropdown size="medium" v-if="scope.row.hasBegun==1" v-show="userInfo.userId == scope.row.principalId || userInfo.userId == scope.row.creatorId">
                <iep-button type="warning" plain :disabled="scope.row.status==3">
                  {{dictsMap.status[scope.row.status]}}<i class="el-icon-arrow-down el-icon--right"></i>
                </iep-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="(s,i) in dictsMap.status" :key="i" @click.native="handleChangeStatus(scope.row.id, i)">{{s}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <iep-button type="warning" plain v-else-if="scope.row.hasBegun==0">待办</iep-button>
              <iep-button @click="handleDelete(scope.row)" v-show="userInfo.userId == scope.row.principalId || userInfo.userId == scope.row.creatorId">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <delete-dialog-form ref="deleteDialogForm" @load-page="loadPage"></delete-dialog-form>
  </div>
</template>
<script>
import { getMyAtms, changeAtmsStatus, getMyCount } from '@/api/atms/index'
import mixins from '@/mixins/mixins'
import { dictsMap, columnsMap } from './options'
import deleteDialogForm from './deleteDialogForm'
import { mapGetters } from 'vuex'
export default {
  mixins: [mixins],
  components: { deleteDialogForm },
  data () {
    return {
      dictsMap,
      columnsMap,
      pagedTable: [
      ],
      myCountList: {
        myAll: 0,
        myCreated: 0,
        myToDo: 0,
        myCharge: 0,
        myCollection: 0,
      },
      selectType: 'myAll',
      reserved: '',
    }
  },
  created () {
    this.loadPage()
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  methods: {
    loadPage (param = this.searchForm) {
      this.loadTable({ selectType: this.selectType, ...param }, getMyAtms)
      getMyCount().then(({ data }) => {
        this.myCountList = data.data
      })
    },
    handleSelectionChange () {
    },
    handleAdd () {
      this.$router.push({
        path: '/atms/add',
      })
    },
    handleDetail (row) {
      this.$router.push({
        path: `/atms/details/${row.id}`,
      })
    },
    handleDelete (row) {
      this.$refs['deleteDialogForm'].id = row.id
      this.$refs['deleteDialogForm'].childrenCount = row.childrenCount
      this.$refs['deleteDialogForm'].dialogShow = true
    },
    handleChangeStatus (id, status) {
      changeAtmsStatus(id, status).then(({ data }) => {
        if (data.data) {
          this.$message({
            message: '修改成功',
            type: 'success',
          })
          this.loadPage()
        } else {
          this.$message(data.msg)
        }
      })
    },
    cSelectTpye (val) {
      this.selectType = val
      this.searchPage()
    },
  },
}
</script>

<style lang="scss" scoped>
.box {
  margin-bottom: 20px;
}
.total-wrapper {
  display: flex;
  justify-content: space-around;
  margin: 14px 0;
  .total-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-right: 1px solid rgb(233, 233, 233);
    width: 100%;
    &:last-child {
      border-right: none;
    }
    .value {
      font-size: 24px;
      color: rgb(48, 49, 51);
    }
    .label {
      & > a {
        color: #999;
      }
    }
  }
}
</style>
<style scoped>
.my-tasks >>> .el-table tr {
  cursor: pointer;
}
</style>

