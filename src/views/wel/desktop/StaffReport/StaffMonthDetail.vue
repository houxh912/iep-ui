<template>
  <div>
    <basic-container>
      <iep-page-header :title="form.title" :backOption="backOption"></iep-page-header>
      <operation-container style="border-bottom: 1px solid #eee;padding-bottom:15px;">
        <template slot="left">
          <span style="margin-right:15px;">组织：{{form.orgName}}</span>
          <span style="margin-right:15px;">发布人: <iep-hover-card v-if="form.realName" :obj="sender"></iep-hover-card>
          </span>
          <span>发布日期：{{form.createTime|parseToDay}}</span>
        </template>
        <template slot="right">
          <iep-button @click="handlePreClick">上月</iep-button>
          <iep-button @click="handleNextClick">下月</iep-button>
        </template>
      </operation-container>
      <div class="container">
        <div class="con-item">
          <div>
            <span class="title">领导指示</span>
            <span class="leadership" @click="handleLeaderClick">领导批示</span>
          </div>
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
    <leadership ref="leaderShip"></leadership>
  </div>
</template>
<script>
import { getStaffReport, putStaffReport } from '@/api/mlms/leader_report/'
import Leadership from '../Components/Leadership'
function initForm () {
  return {
    title: '',
    orgName: '',
    createTime: '',
    userId: 0,
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
      sender: {
        id: 0,
        name: '',
      },
    }
  },
  components: {
    Leadership,
  },
  computed: {
    id () {
      return + this.$route.params.id
    },
  },
  created () {
    getStaffReport(this.id).then(({ data }) => {
      const newData = data.data
      this.form = this.$mergeByFirst(initForm(), newData)
      this.sender.id = newData.userId
      this.sender.name = newData.realName
      this.reportInfo.startTime = newData.createTime
      this.reportInfo.userId = newData.userId
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
      return { year, month, date }
    },
    putStaffReport () {
      putStaffReport(this.reportInfo).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data[0])
      })
    },
    handleLeaderClick () {
      this.$refs['leaderShip'].dialogShow = true
    },
    handlePreClick () {
      let realMonth = this.fillterData().month - 1
      let { year, date } = this.fillterData()
      if (realMonth <= 0) return
      let resultTime = year + '-' + add0(realMonth) + '-' + add0(date)
      this.reportInfo.startTime = resultTime
      this.putStaffReport()
    },
    handleNextClick () {
      let realMonth = this.fillterData().month + 1
      let { year, date } = this.fillterData()
      if (realMonth > 12) return
      let resultTime = year + '-' + add0(realMonth) + '-' + add0(date)
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
    .leadership {
      float: right;
      padding: 3px 6px;
      border: 1px solid $--color-primary;
      border-radius: 5px;
      color: $--color-primary;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        color: #fff;
        background-color: $--color-primary;
      }
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
