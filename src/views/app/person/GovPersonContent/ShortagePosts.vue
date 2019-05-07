<template>
  <div class="leader-board">
    <IepAppTabCard :title="title" :linkName="linkName">
      <div class="important" slot="right">
        <el-button type="text">争做伯乐</el-button>
        <el-button type="text">申请转岗</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="positionName" label="岗位名称" width="180">
        </el-table-column>
        <el-table-column prop="recruitsCount" label="需求数" width="180">
        </el-table-column>
        <el-table-column prop="academicId" label="学历要求">
          <template slot-scope="scope">
            {{getEducation(scope.row.academicId)}}
          </template>
        </el-table-column>
        <el-table-column prop="treatment" label="薪资待遇">
        </el-table-column>
        <el-table-column prop="deptName" label="需求部门">
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
      tableData: [
        {
          name: 'java工程师',
          num: '3',
          education: '大专',
          salary: '面议',
          demandDepartment: '国脉集体研发中心',
        },
        {
          name: '产品经理',
          num: '5',
          education: '大专',
          salary: '面议',
          demandDepartment: '国脉集体研发中心',
        },
        {
          name: '算法工程师',
          num: '2',
          education: '大专',
          salary: '面议',
          demandDepartment: '国脉集体研发中心',
        },
        {
          name: '高级咨询师',
          num: '2',
          education: '大专',
          salary: '面议',
          demandDepartment: '国脉集体研发中心',
        },
        {
          name: '前段开发工程师',
          num: '4',
          education: '大专',
          salary: '面议',
          demandDepartment: '国脉集体研发中心',
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['dictGroup']),
  },
  methods: {
    loadList () {
      getPostList().then(({data}) => {
        this.tableData = data.data
      })
    },
    getEducation (val) {
      for (let item of this.dictGroup.hrms_highest_educational) {
        if (item.value == val) {
          return item.label
        }
      }
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
.leader-board >>> .el-table tr {
  cursor: pointer;
}
.leader-board >>> .el-card__body {
  height: 332px;
}
.leader-board >>> .el-table .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
