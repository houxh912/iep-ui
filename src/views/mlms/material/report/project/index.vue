<template>
  <div class="project">

    <div class="search">
      <div class="item">
        <el-date-picker v-model="searchData.date" type="date" placeholder="选择日期" size="small"></el-date-picker>
      </div>
      <!-- <div class="item">
        <el-input v-model="searchData.title" placeholder="请输入关键词" size="small"></el-input>
      </div> -->
      <iep-button @click="search">搜索</iep-button>
    </div>
    <div class="content">
      <div class="timeline">
        <time-line ref="timeline" @actively="actively" :option="timeLineOption" @changeYear="changeYear"></time-line>
      </div>
      <div class="form">
        <form-dialog ref="form" @putFormData="getFormData" v-show="dialogState!=='detail'" @load-page="dialogState='detail'"></form-dialog>
        <detail-dialog ref="detail" v-show="dialogState=='detail'" @handleUpdate="handleUpdate" @handleCreate="handleCreate"></detail-dialog>
      </div>
    </div>
    <create-dialog ref="createDialog" @selectProject="selectProject"></create-dialog>

  </div>
</template>

<script>
import TimeLine from '../timeline'
import FormDialog from './formDialog'
import DetailDialog from './detailDialog'
import { createWeeks, getWeekOfYear, getWeekStartAndEnd, getWeekOfMonth, getMonday } from '../util'
import { getTableData, createData, updateData } from '@/api/mlms/material/report/project'
import CreateDialog from './createDialog'

export default {
  name: 'daily',
  components: { TimeLine, FormDialog, DetailDialog, CreateDialog },
  data () {
    return {
      timeLineOption: {
        list: [],
      },
      formData: {},
      searchData: {
        date: '',
        title: '',
      },
      dialogState: 'detail',
      requestFn: () => {},
      currentDate: {
        startTime: '',
        endTime: '',
      },
      today: new Date(),
    }
  },
  methods: {
    submit () {
    },
    search () {
      let date = this.searchData.date ? new Date(this.searchData.date) : new Date()
      // 获取到选中的时间，解析出来年月周
      let monday = new Date(getMonday(date).timeStamp)
      let year = monday.getFullYear()
      let month = monday.getMonth()
      let week = getWeekOfMonth(monday)
      this.loadList(year, month+1, week, 'search')
    },
    // 切换周报
    actively (item, type) {
      if (type === 'week') {
        let year = new Date(item.timeStamp).getFullYear()
        this.dialogState = 'detail'
        this.currentDate = {
          startTime: `${year}-${item.startTime} 00:00:00`,
          endTime: `${year}-${item.endTime} 00:00:00`,
        }
        getTableData(this.currentDate).then(({data}) => {
          this.$refs['detail'].weeklyList = data.data
          this.$refs['detail'].activeName = -1
        })
      }
    },
    // 保存周报
    getFormData (data) {
      this.requestFn(data).then(({data}) => {
        if (!data.data) {
          this.$message.error(data.msg)
        }
        this.dialogState = 'detail'
        getTableData(this.currentDate).then(({data}) => {
          this.$refs['detail'].weeklyList = data.data
          this.$refs['detail'].activeName = -1
        })
      })
    },
    // 编辑周报
    handleUpdate (row) {
      this.dialogState = 'update'
      this.requestFn = updateData
      this.$nextTick(() => {
        this.$refs['form'].formData.startTime = this.currentDate.startTime
        this.$refs['form'].formData.endTime = this.currentDate.endTime
        this.$refs['form'].formData = row
      })
    },
    handleCreate () {
      this.$refs['createDialog'].open()
      this.requestFn = createData
    },
    selectProject (projectId, projectName) {
      this.dialogState = 'create'
      this.$nextTick(() => {
        let obj = this.timeLineOption
        let list = obj.list
        let dateObj = list[obj.active].children[obj.activeChild]
        // this.$refs['form'].open(projectId, `${projectName} ${dateObj.title}项目周报 （${dateObj.startTime}~${dateObj.endTime}）`)
        this.$refs['form'].open(projectId, `${projectName} ${dateObj.title}项目周报`, {
          startTime: this.currentDate.startTime,
          endTime: this.currentDate.endTime,
        })
      })
    },
    // 获取当前时间轴上面的月、周
    getDate (row) {
      let day = +this.today
      let month = this.today.getMonth() + 1
      let week = 0
      let list = row[month]
      // 两种情况，首先上个月的周报，timeStamp 应该是小于这个月最小的周的时间戳
      for (let item of list.children) {
        // if (day > item.timeStamp && day < item.timeStamp+7*24*3600*1000) {
        if (day > item.timeStamp+7*24*3600*1000) {
          week++
        } else  {
          if (week == -1) {
            // 上个月的最后一周
            if (month == 1) {
              // 上个月是去年的12月
              return { month: 12, week: list.children.length-1 }
            } else {
              // month = month-1
              return { month: month, week: list.children.length-1 }
            }
          } else {
            return { month, week }
          }
        }
      }
    },
    changeYear (year) {
      this.loadList(year, 1, 0, 'year')
    },
    loadList (year, month, week, type) {
      let list = createWeeks(year)
      this.timeLineOption.list = list
      let today = {}
      if (type === 'year') { // 年份翻页
        this.$refs['timeline'].active = month
        this.$refs['timeline'].activeChild = week
        today = getWeekStartAndEnd(list[1].children[0].timeStamp)
      } else if (type === 'search') { // 具体时间搜索
        this.$refs['timeline'].active = month
        this.$refs['timeline'].activeChild = week
        today = getWeekStartAndEnd(list[month].children[week].timeStamp)
      } else { // 默认加载
        let obj = this.getDate(list)
        this.timeLineOption.active = obj.month
        this.timeLineOption.activeChild = obj.week
        today = getWeekStartAndEnd(this.today)
      }
      this.currentDate = {
        startTime: `${today.startYear} 00:00:00`,
        endTime: `${today.endYear} 00:00:00`,
      }
      // 赋值时间轴
      getTableData(this.currentDate).then(({data}) => {
        this.$refs['detail'].weeklyList = data.data
        this.$refs['detail'].activeName = -1
      })
    },
  },
  created () {
    // 获取当前的时间，默认显示当前年-当前月
    let date = this.today
    if (getWeekOfYear() == 0) {
      this.today = new Date(date.getFullYear() - 1, 11, 31)
      date = this.today
    }
    // 初始化时间轴，获取到当前的周
    this.loadList(date.getFullYear())
  },
}
</script>

<style lang="scss" scoped>
.project {
  padding: 20px 0 0;
  .search {
    margin-bottom: 20px;
    .item {
      display: inline-block;
      width: 150px;
      margin-right: 15px;
    }
  }
  .content {
    display: flex;
    .timeline {
      width: 180px;
    }
    .form {
      width: calc(100% - 180px);
    }
  }
}
</style>
