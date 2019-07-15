<template>
  <div>
    <basic-container>
      <iep-page-header :title="form.title" :backOption="backOption"></iep-page-header>
      <operation-container style="border-bottom: 1px solid #eee;padding-bottom:15px;">
        <template slot="left">
          <span style="margin-right:15px;">组织：{{form.orgName}}</span>
          <span>发布人：{{form.realName}}</span>
          <span>发布日期：{{form.createTime|parseToDay}}</span>
        </template>
        <template slot="right">
          <iep-button @click="handlePreClick">上周</iep-button>
          <iep-button @click="handleNextClick" :disabled="isdisabled">下周</iep-button>
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
        <div class="con-item">
          <div class="title">市场拓展</div>
          <iep-div-detail
            v-if="!form.meetingSummary.length"
            class="content"
            :value="form.meetingSummary"
          ></iep-div-detail>
          <relation-list class="content" v-else :value="form.meetingSummary"></relation-list>
        </div>
        <div class="con-item">
          <div class="title">相关产品</div>
          <iep-div-detail v-if="!form.productList.length" class="content" :value="form.productList"></iep-div-detail>
          <relation-list class="content" v-else :value="form.productList"></relation-list>
        </div>
        <div class="con-item">
          <div class="title">相关项目</div>
          <iep-div-detail v-if="!form.projectList.length" class="content" :value="form.projectList"></iep-div-detail>
          <relation-list class="content" v-else :value="form.projectList"></relation-list>
        </div>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { getOgrReport, putOrgReport } from '@/api/mlms/leader_report/'
import RelationList from '@/views/wel/desktop/Components/RelationList.vue'
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
  components: { RelationList },
  data () {
    return {
      backOption: {
        isBack: true,
      },
      form: initForm(),
      isdisabled: false,
      useId: '',
      reportInfo: {
        reportType: 0,
        startTime: '',
        orgId: '',
      },
    }
  },
  computed: {
    id () {
      return + this.$route.params.id
    },
  },
  created () {
    getOgrReport(this.id).then(({ data }) => {
      this.form = this.$mergeByFirst(initForm(), data.data)
      this.reportInfo.startTime = data.data.createTime
      this.reportInfo.orgId = data.data.orgId
    })
  },
  methods: {
    dataReduce () {
      let data = new Date(this.reportInfo.startTime)
      let time = data.getTime()
      return time
    },
    resultData (timeStamp) {
      const time = new Date(timeStamp)
      const year = time.getFullYear()
      const month = time.getMonth() + 1
      const date = time.getDate()
      const resultTime = year + '-' + add0(month) + '-' + add0(date)
      this.reportInfo.startTime = resultTime
    },
    putOrgReport () {
      putOrgReport(this.reportInfo).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data[0])
      })
    },
    handlePreClick () {
      this.resultData(this.dataReduce() - 7 * 24 * 60 * 60 * 1000)
      let flag = this.dataReduce() <= new Date().getTime()
      if (flag) this.isdisabled = false
      this.putOrgReport()
    },
    handleNextClick () {
      this.resultData(this.dataReduce() + 7 * 24 * 60 * 60 * 1000)
      let flag = this.dataReduce() > new Date().getTime()
      flag ? this.isdisabled = true : this.putOrgReport()
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
