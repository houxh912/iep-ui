<template>
  <div>
    <basic-container>
      <page-header :title="form.title" :backOption="backOption"></page-header>
      <operation-container style="border-bottom: 1px solid #eee;padding-bottom:15px;">
        <template slot="left">
          <span style="margin-right:15px;">组织：{{form.orgName}}</span>
          <span>发布人：{{form.realName}}</span>
          <span>发布日期：{{form.createTime|parseToDay}}</span>
        </template>
        <template slot="right" ref="btn">
          <iep-button @click="handlePreClick">上月</iep-button>
          <iep-button @click="handleNextClick">下月</iep-button>
        </template>
      </operation-container>
      <div class="container">
        <div class="con-item">
          <div class="title">领导指示</div>
          <iep-div-detail class="content" :value="form.leaderIndication"></iep-div-detail>
        </div>
        <div class="con-item">
          <div class="title">本月工作总结</div>
          <iep-div-detail class="content" :value="form.workSummary"></iep-div-detail>
        </div>
        <div class="con-item">
          <div class="title">下月工作计划</div>
          <iep-div-detail class="content" :value="form.workPlan"></iep-div-detail>
        </div>
        <div class="con-item">
          <div class="title">总结与感想</div>
          <iep-div-detail class="content" :value="form.summarySentiment"></iep-div-detail>
        </div>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { getStaffReport, putStaffReport } from '@/api/mlms/leader_report/'
function initForm () {
  return {
    title: '',
    orgName: '',
    createTime: '',
    realName: '',
    leaderIndication: '',
    workSummary: '',
    workPlan: '',
    summarySentiment: '',
    meetingSummary: [],
    productList: [],
    projectList: [],
  }
}
function add0 (m) { return m < 10 ? '0' + m : m }
export default {
  data () {
    return {
      backOption: {
        isBack: true,
      },
      form: initForm(),
      useId: '',
      reportInfo: {
        reportType: 1,
        startTime: '',
        userId: '',
      },
    }
  },
  computed: {
    id () {
      return + this.$route.params.id
    },
  },
  created () {
    getStaffReport(this.id).then(({ data }) => {
      this.form = this.$mergeByFirst(initForm(), data.data)
      this.reportInfo.startTime = data.data.createTime
      this.reportInfo.userId = data.data.userId
    })
  },
  methods: {
    fillterData () {
      const data = new Date(this.reportInfo.startTime)
      const year = data.getFullYear()
      const month = data.getMonth() + 1
      const date = data.getDate()
      // let resultTime = year + '-' + add0(month) + '-' + add0(date)
      // this.reportInfo.startTime = resultTime
      return {year,month,date}
    },
    putStaffReport () {
      putStaffReport(this.reportInfo).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
      })
    },
    handlePreClick () {
      let realMonth = this.fillterData().month-1
      let {year,date} = this.fillterData()
      if(realMonth<0) return
      let resultTime =  year + '-' + add0(realMonth) + '-' + add0(date)
      this.reportInfo.startTime = resultTime
      this.putStaffReport()
    },
    handleNextClick () {
      let realMonth = this.fillterData().month+1
      let {year,date} = this.fillterData()
      if(realMonth>12) return
      let resultTime =  year + '-' + add0(realMonth) + '-' + add0(date)
      this.reportInfo.startTime = resultTime
      this.putStaffReport()
    },
  },
}
</script>
<style scoped lang='scss'>
.container {
  padding: 0 10px;
  .con-item {
    margin-bottom: 15px;
    .title {
      font-size: 15px;
      color: #333;
    }
    .content {
      word-break: break-all;
      word-wrap: break-word;
      white-space: pre-wrap;
      padding: 15px;
      font-size: 14px;
      color: #999;
    }
  }
}
</style>
