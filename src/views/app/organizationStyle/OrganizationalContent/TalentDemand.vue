<template>
  <div class="leader-board">
    <IepAppTabCard :title="title" :linkName="linkName">
      <div class="important" slot="right">
        <el-button type="text" @click="() => {this.$router.push('/app/tobeBole')}">争做伯乐</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%" v-if="tableData.length !== 0" @row-click="handleDetail">
        <el-table-column prop="positionName" label="岗位名称" width="180">
        </el-table-column>
        <el-table-column prop="recruitsCount" label="需求数" width="180">
        </el-table-column>
        <el-table-column prop="academicId" label="学历要求">
          <template slot-scope="scope">
            {{getDictVal(scope.row.academicId, 'hrms_highest_educational')}}
          </template>
        </el-table-column>
        <el-table-column prop="treatment" label="薪资待遇" width="150">
          <template slot-scope="scope">
            {{getDictVal(scope.row.treatment, 'hrms_wages_salaries')}}
          </template>
        </el-table-column>
      </el-table>
      <IepNoData v-else></IepNoData>
    </IepAppTabCard>
  </div>
</template>

<script>
import { getRecruitList } from '@/api/app/hrms/'
import { mapGetters } from 'vuex'

export default {
  props: {
    orgId: {
      type: Number,
    },
  },
  computed: {
    ...mapGetters(['dictGroup']),
  },
  data () {
    return {
      title: '人才需求',
      linkName: '',
      tableData: [
        {
          name: 'java工程师',
          num: '3',
          education: '大专',
          salary: '面议',
        },
      ],
    }
  },
  methods: {
    getEducation (val) {
      for (let item of this.dictGroup.hrms_highest_educational) {
        if (item.value == val) {
          return item.label
        }
      }
      return ''
    },
    getDictVal (val, dict) {
      for (let item of this.dictGroup[dict]) {
        if (item.value == val) {
          return item.label
        }
      }
      return '暂无'
    },
    handleDetail (row) {
      this.$router.push(`/app/recruitDetail/${row.id}`)
    },
  },
  watch: {
    orgId (newVal) {
      getRecruitList(newVal).then(({ data }) => {
        this.tableData = data.data
      })
    },
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
.leader-board >>> .el-card {
  height: 330px;
}
.leader-board >>> .el-table .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
