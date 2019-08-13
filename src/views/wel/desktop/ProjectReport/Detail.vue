<template>
  <div>
    <basic-container>
      <iep-page-header :title="form.projectName" :backOption="backOption"></iep-page-header>
      <operation-container style="border-bottom: 1px solid #eee;padding-bottom:15px;">
        <template slot="left">
          <span style="margin-right:15px;">组织：{{form.orgName}}</span>
          <span style="margin-right:15px;">发布人: <iep-hover-card v-if="form.realName" :obj="sender"></iep-hover-card>
          </span>
          <span>发布日期：{{form.createTime|parseToDay}}</span>
        </template>
        <!-- <template slot="right">
          <iep-button class="el-icon-arrow-left" @click="handlePreClick"></iep-button>
          <iep-button class="el-icon-arrow-right" @click="handleNextClick"></iep-button>
        </template> -->
      </operation-container>
      <div class="container">
        <div class="con-item">
          <div class="title">客户需求</div>
          <iep-div-detail class="content" :value="form.clientRqmt"></iep-div-detail>
        </div>
        <div class="con-item">
          <div class="title">本周工作总结</div>
          <iep-div-detail class="content" :value="form.workSummary"></iep-div-detail>
        </div>
        <div class="con-item">
          <div class="title">下周工作计划</div>
          <iep-div-detail class="content" :value="form.workPlan"></iep-div-detail>
        </div>
        <div class="con-item">
          <div class="title">备注</div>
          <iep-div-detail class="content" :value="form.remark"></iep-div-detail>
        </div>
      </div>
    </basic-container>
  </div>
</template>
<script>
function initForm () {
  return {
    projectName: '',
    userId: 0,
    realName: '',
    orgName: '',
    clientRqmt: '',
    createTime: '',
    workSummary: '',
    workPlan: '',
    remark: '',
  }
}
// function add0 (m) { return m < 10 ? '0' + m : m }
import { getProjectReportById } from '@/api/mlms/leader_report/'
export default {
  data () {
    return {
      backOption: {
        isBack: true,
      },
      form: initForm(),
      useId: '',
      reportInfo: {
        time: '',
        orgId: '',
        userId: '',
      },
      sender: {
        id: 0,
        name: '',
      },
    }
  },
  computed: {
    id () {
      return + this.$route.params.id
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      getProjectReportById(this.id).then(({ data }) => {
        const newData = data.data
        this.form = this.$mergeByFirst(initForm(), newData)
        this.sender.id = newData.userId
        this.sender.name = newData.realName
        this.reportInfo.time = newData.createTime
        this.reportInfo.orgId = newData.orgId
        this.reportInfo.userId = newData.userId
      })
    },
    // dataReduce () {
    //   let data = new Date(this.reportInfo.time)
    //   let time = data.getTime()
    //   return time
    // },
    // resultData (timeStamp) {
    //   const time = new Date(timeStamp)
    //   const year = time.getFullYear()
    //   const month = time.getMonth() + 1
    //   const date = time.getDate()
    //   const resultTime = year + '-' + add0(month) + '-' + add0(date)
    //   this.reportInfo.time = resultTime
    // },
    // putProjectReport () {
    //   putProjectReport(this.reportInfo).then(({ data }) => {
    //     this.form = this.$mergeByFirst(initForm(), data.data)
    //   })
    // },
    // handlePreClick () {
    //   this.resultData(this.dataReduce() - 7 * 24 * 60 * 60 * 1000)
    //   let flag = this.dataReduce() <= new Date().getTime()
    //   if (flag) this.isdisabled = false
    //   this.putProjectReport()
    // },
    // handleNextClick () {
    //   this.resultData(this.dataReduce() + 7 * 24 * 60 * 60 * 1000)
    //   let flag = this.dataReduce() > new Date().getTime()
    //   flag ? this.isdisabled = true : this.putProjectReport()
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
