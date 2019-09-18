<template>
  <div class="leader-board">
    <IepAppTabCard :title="title" :linkName="linkName">
      <!-- <div class="important" slot="left">
        <el-button type="text" @click="() => {this.$router.push('/app/tobeBole')}">争做伯乐</el-button>
      </div> -->
      <el-button class="right" slot="left" type="text" @click="() => {this.$router.push('/app/tobeBole')}">争做伯乐</el-button>
      <el-table :data="tableData" style="padding-bottom:20px;width: 100%" height="300px" @cell-click="handleDetail">
        <el-table-column prop="positionName" label="岗位名称">
        </el-table-column>
        <el-table-column prop="recruitsCount" label="需求数">
        </el-table-column>
        <el-table-column prop="academicId" label="学历要求">
          <template slot-scope="scope">
            {{getDictVal(scope.row.academicId, 'hrms_highest_educational')}}
          </template>
        </el-table-column>
        <el-table-column prop="treatment" label="薪资待遇">
          <template slot-scope="scope">
            {{getDictVal(scope.row.treatment, 'hrms_wages_salaries')}}
          </template>
        </el-table-column>
        <el-table-column prop="orgName" label="需求组织" max-width="190">
        </el-table-column>
      </el-table>
    </IepAppTabCard>
  </div>
</template>
<script>
import { getPostList } from '@/api/app/hrms/index'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      title: '紧缺岗位',
      data: '（53个）',
      linkName: '',
      tableData: [],
    }
  },
  computed: {
    ...mapGetters(['dictGroup']),
  },
  methods: {
    loadList () {
      getPostList().then(({ data }) => {
        this.tableData = data.data
      })
    },
    getDictVal (val, dict) {
      for (let item of this.dictGroup[dict]) {
        if (item.value == val) {
          return item.label
        }
      }
      return '暂无'
    },
    getEducation (val) {
      for (let item of this.dictGroup.hrms_highest_educational) {
        if (item.value == val) {
          return item.label
        }
      }
    },
    handleDetail (row) {
      this.$router.push(`/app/recruitDetail/${row.id}`)
    },
  },
  created () {
    this.loadList()
  },
}
</script>
<style lang="scss" scoped>
.title {
  font-size: 18px;
  .datas {
    font-size: 16px;
    color: #999;
  }
}
.left {
  font-size: 18px;
  margin-left: 15px;
}
</style>
<style scoped>
.important >>> .el-button--text {
  padding: 0;
}
.important >>> .el-button--text:hover {
  color: #f56c6c;
}
.leader-board >>> .el-table th {
  background-color: #fafafa;
}
.leader-board >>> .el-card {
  height: 350px;
}
.leader-board >>> .el-table .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.leader-board >>> .el-table__body-wrapper {
  overflow-y: scroll;
  height: 210px !important;
}
.leader-board >>> .el-table__body-wrapper::-webkit-scrollbar {
  border-radius: 10px;
  width: 6px;
  background-color: #fff;
}
.leader-board >>> .el-table__body-wrapper::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #fff;
  transition: 0.3s background-color;
}
.leader-board >>> .el-table__body-wrapper::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #ddd;
  transition: 0.3s background-color;
  display: none;
  transition: all 0.5s;
}
.leader-board >>> .el-table__body-wrapper:hover::-webkit-scrollbar-thumb {
  display: block;
}
.leader-board >>> .title .right {
  float: right;
  padding: 0;
  height: 24px;
  color: #cb3737;
}
.leader-board >>> .title .right:hover {
  opacity: 0.7;
}
</style>
