<template>
  <div class="daily">

    <div class="search">
      <div class="item">
        <el-date-picker v-model="searchData.date" type="date" placeholder="选择日期" size="small"></el-date-picker>
      </div>
      <div class="item">
        <el-input v-model="searchData.title" placeholder="请输入关键词" size="small"></el-input>
      </div>
      <iep-button @click="search">搜索</iep-button>
    </div>
    <div class="content">
      <div class="timeline">
        <time-line ref="timeline" @actively="actively" :option="timeLineOption"></time-line>
      </div>
      <div class="form">
        <weekly-form ref="dislog" v-if="contentType==='week'" :data="formData" @success-submit="successSubmit"></weekly-form>
        <monthly-form ref="dislog" v-else :data="formData" @success-submit="successSubmit"></monthly-form>
      </div>
    </div>
      
  </div>
</template>

<script>
import TimeLine from '../timeline'
import weeklyForm from './weekly'
import monthlyForm from './monthly'
import { createWeeks, getWeekOfYear, formatDig } from '../util'
import { getTableData } from '@/api/mlms/material/report/personal'

export default {
  name: 'daily',
  components: { TimeLine, weeklyForm, monthlyForm },
  data () {
    return {
      activeIndex: [],
      timeLineOption: {
        list: [],
        isParentClick: true,
      },
      formData: {},
      validate: false,
      searchData: {
        date: '',
        title: '',
      },
      contentType: 'week',
      params: '',
    }
  },
  methods: {
    activeChange (val) {
      this.activeIndex = [val[val.length-1]]
      this.$refs['timeline'].active = this.activeIndex[0]
    },
    submit () {
      
    },
    search () {},
    actively (item, type) {
      this.contentType = type
      this.$nextTick(() => {
        this.$refs['dislog'].dislogState = 'detail'
        this.formData = item
      })
      // 点击月份进行数据的获取
      if (type == 'month') {
        this.params = new Date(item.timeStamp)
        this.loadList(this.params)
      }
    },
    loadList (date, type) {
      let month = date.getMonth() + 1
      getTableData({ yearMonthTime: `${date.getFullYear()}-${formatDig(month)}` }).then((res) => {
        let obj = this.timeLineOption.list[month]
        let resObj = {}
        for (let index in obj.children) {
          for (let t of res.data.data) {
            let timeStamp = new Date(t.createTime) - obj.children[index].timeStamp
            // 此条数据生成的时间在一周之内
            if (timeStamp >= 0 && timeStamp < 7*24*60*60*1000 && t.reportType == 0) {
              this.timeLineOption.list[month].children[index] = Object.assign({}, obj.children[index], t)
            }
            if (t.reportType == 1) {
              resObj = t
            }
          }
        }
        obj = Object.assign({}, obj, resObj)
        this.$set(this.timeLineOption.list, month, obj)
        // 是否是初次
        if (type) {
          this.formData = this.timeLineOption.list[this.timeLineOption.active].children[this.timeLineOption.activeChild]
        }
      })
    },
    // 获取当前时间轴上面的月、周
    getDate (row) {
      let day = +new Date()
      let month = new Date().getMonth() + 1
      let week = -1
      let list = row[month]
      // 两种情况，首先上个月的周报，timeStamp 应该是小于这个月最小的周的时间戳
      for (let item of list.children) {
        if (day > item.timeStamp) {
          week++
        } else  {
          if (week == -1) {
            // 上个月的最后一周
            if (month == 1) {
              // 上个月是去年的12月
              return { month: 12, week: list.children.length-1 }
            } else {
              month = month-1
              return { month: month, week: list.children.length-1 }
            }
          } else {
            return { month, week }
          }
        }
      }
    },
    successSubmit () {
      this.loadList(this.params)
      this.$refs['dislog'].dislogState = 'detail'
    },
  },
  created () {
    // 获取当前的时间，默认显示当前年-当前月
    let date = new Date()
    if (getWeekOfYear() == 0) {
      date = new Date(date.getFullYear() - 1, 11, 31)
    }
    // 初始化时间轴，获取到当前的周
    let list = createWeeks(date.getFullYear())
    let obj = this.getDate(list)
    this.timeLineOption.active = obj.month
    this.timeLineOption.activeChild = obj.week
    // 赋值时间轴
    this.timeLineOption.list = list
    this.params = date
    this.loadList(this.params, 'start')
  },
}
</script>

<style lang="scss" scoped>
.daily {
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
      flex: 1;
    }
  }
}
</style>
