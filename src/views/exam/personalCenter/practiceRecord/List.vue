<template>
  <div>
    <basic-container>
      <iep-page-header title="模拟练习记录" :data="[10, 5]"></iep-page-header>
      <operation-container>
        <template slot="right">
          <el-radio-group v-model="type" size="small" @change="handleSelect(type)">
            <el-radio-button v-for="tab in tabList" :label="tab.value" :key="tab.value" :disabled="isLoadTable">{{tab.label}}</el-radio-button>
          </el-radio-group>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <el-table-column prop="fieldName" label="科目" width="150">
          <template slot-scope="scope">
            {{scope.row.fieldName}}
          </template>
        </el-table-column>
        <el-table-column prop="title" label="名称">
          <template slot-scope="scope">
            {{scope.row.title}}
          </template>
        </el-table-column>
        <el-table-column prop="datiFrequency" label="答题次数" width="150">
          <template slot-scope="scope">
            {{scope.row.datiFrequency | setDatiFrequency}}
          </template>
        </el-table-column>
        <el-table-column prop="practiceTime" label="练习时间" width="150">
          <template slot-scope="scope">
            {{scope.row | getPracticeTime}}
          </template>
        </el-table-column>
        <el-table-column prop="examStatus" label="个人中心状态" width="150">
          <template slot-scope="scope">
            <el-tag type="success" size="medium" v-if="scope.row.examStatus === 0">已报名</el-tag>
            <el-tag type="warning" size="medium" v-if="scope.row.examStatus === 1">进行中</el-tag>
            <el-tag type="warning" size="medium" v-if="scope.row.examStatus === 3">批卷中</el-tag>
            <el-tag type="info" size="medium" v-if="scope.row.examStatus === 4">已结束</el-tag>
            <el-tag type="success" size="medium" v-if="scope.row.examStatus === 8">已完成</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="examAchievement" label="分数" width="130">
          <template slot-scope="scope">
            {{scope.row.examAchievement}}
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="200">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" v-if="scope.row.examStatus === 0" disabled plain>开始练习</iep-button>
              <iep-button type="warning" plain v-if="scope.row.examStatus === 1" @click="handleStartPractice(scope.row)">开始练习</iep-button>
              <iep-button type="warning" v-if="scope.row.examStatus === 3" disabled plain>查看成绩</iep-button>
              <iep-button type="warning" v-if="scope.row.examStatus === 4" disabled plain>查看成绩</iep-button>
              <iep-button type="warning" plain v-if="scope.row.examStatus === 8" @click="handleShowResult(scope.row)">查看成绩</iep-button>
              <iep-button plain v-if="scope.row.examStatus === 8 && scope.row.datiFrequency == 0" @click="handleTestAgain(scope.row)">再考一次</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { getPracticeRecordList } from '@/api/exam/personalCenter/practiceRecord/practiceRecord'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  props: ['record'],
  data () {
    return {
      dialogShow: false,
      imgurl: '',
      type: '',
      tabList: [
        {
          label: '全部',
          value: '',
        },
        {
          label: '按月',
          value: 'month',
        },
        {
          label: '按年',
          value: 'year',
        },
      ],
    }
  },
  filters: {
    setDatiFrequency (val) {
      const data = val == 0 ? '无限次' : '一次'
      return data
    },
    getPracticeTime (val) {
      const data = val.endTime == '2049-09-24 12:00:00' ? '长期有效' : `${val.beginTime} ~ ${val.endTime}`
      return data
    },
  },
  created () {
    if (this.record) {
      this.load()
    } else {
      this.loadPage()
    }
  },
  methods: {
    /**
     * 点击筛选
     */
    handleSelect (type) {
      this.pageOption.current = 1
      this.searchForm.state = type
      this.loadTable({ ...this.searchForm }, getPracticeRecordList)
    },

    load (param = this.searchForm) {
      this.pageOption.current = this.record.current
      this.pageOption.size = this.record.size
      this.searchForm.state = this.record.state
      this.type = this.record.state
      this.loadTable({ ...this.pageOption, ...param }, getPracticeRecordList)
    },

    loadPage (param = this.searchForm) {
      this.loadTable({ ...this.pageOption, ...param }, getPracticeRecordList)
    },

    /**
     * 点击开始练习
     */
    handleStartPractice (row) {
      this.$confirm('此操作将开始练习, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$message({
          type: 'success',
          message: '开始练习!',
        })
        this.$emit('onStartExam', row)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消练习',
        })
      })
    },

    /**
     * 点击成绩
     */
    handleShowResult (row) {
      this.$emit('onShowResult', {
        id: row.id,
        title: row.title,
        state: this.searchForm.state,
        current: this.pageOption.current,
        size: this.pageOption.size,
      })
    },

    /**
     * 再考一次
     */
    handleTestAgain (row) {
      this.$confirm('此操作将重新开始练习, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$message({
          type: 'success',
          message: '开始练习!',
        })
        this.$emit('onStartExam', {
          id: row.id,
          answerNumber: 0,
          current: this.pageOption.current,
          size: this.pageOption.size,
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消练习',
        })
      })
    },
  },
}
</script>
