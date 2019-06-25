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
        <template slot="right">
          <iep-button @click="handlePreClick">上周</iep-button>
          <iep-button @click="handleNextClick">下周</iep-button>
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
export default {
  data () {
    return {
      backOption: {
        isBack: true,
      },
      form: initForm(),
      useId: '',
      reportInfo: {
        reportType: '',
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
    this.reportInfo.userId = this.id
    getStaffReport(this.id).then(({ data }) => {
      this.form = this.$mergeByFirst(initForm(), data.data)
      this.reportInfo.startTime = data.data.createTime
    })
    putStaffReport(this.reportInfo).then(({ data }) => {
      console.log(data.data)
    })
  },
  methods: {
    // dataReduce () {
    //   let data = new Data(this.reportInfo.startTime)
    //   let time = data.getTime()
    //   return time
    // },
    // resultData (timeStamp) {
    //   console.log(timeStamp)
    // },
    // handlePreClick () {
    //   this.resultData(this.dataReduce()-7 * 24 * 60 * 60 *1000)
    // },
    // handleNextClick () {
    //   this.resultData(this.dataReduce()+7 * 24 * 60 * 60 *1000)
    // },
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
