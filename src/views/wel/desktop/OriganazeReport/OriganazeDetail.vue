<template>
  <div>
    <basic-container>
      <page-header :title="title">
        <span class="to-reward" @click="handleReturn">返回</span>
      </page-header>
      <operation-container style="border-bottom: 1px solid #eee;padding-bottom:15px;">
        <template slot="left">
          <span style="margin-right:15px;">组织：{{orgName}}</span>
          <span>发布人：{{realName}}</span>
        </template>
        <template slot="right">
          <el-date-picker v-model="updateTime" type="date" placeholder="选择日期"></el-date-picker>
        </template>
      </operation-container>
      <div class="container">
        <div class="con-item" v-for="(item,index) in pageList" :key="index">
          <div class="title">{{index}}</div>
          <iep-div-detail class="content" :value="item"></iep-div-detail>
        </div>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { getOgrReport } from '@/api/mlms/leader_report/'
export default {
  data () {
    return {
      updateTime: '',
      title: '',
      orgName: '',
      realName: '',
      pageList: {
        领导指示: '',
        本月工作总结: '',
        下月工作计划: '',
        总结与感想: '',
        市场拓展: '',
        相关产品: '',
        相关项目: '',
      },
      id: '',
    }
  },
  created () {
    this.id = this.$route.params.id
    getOgrReport(this.id).then(({ data }) => {
      this.title = data.data.title
      this.updateTime = data.data.updateTime
      this.orgName = data.data.orgName
      this.realName = data.data.realName
      this.pageList.领导指示 = data.data.leaderIndication
      this.pageList.本月工作总结 = data.data.workSummary
      this.pageList.下月工作计划 = data.data.workPlan
      this.pageList.总结与感想 = data.data.summarySentiment
      this.pageList.市场拓展 = data.data.meetingSummary.map(m => m.name).join(',')
      this.pageList.相关产品 = data.data.productList.map(m => m.name).join(',')
      this.pageList.相关项目 = data.data.projectList.map(m => m.name).join(',')
    })
  },
  methods: {
    handleReturn () {
      this.$router.go(-1)
    },
  },
}
</script>
<style scoped lang='scss'>
.to-reward {
  padding: 3px 8px;
  color: #ccc;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    border-color: #aaa;
    color: #aaa;
  }
}
.container {
  padding: 0 10px;
  .con-item {
    margin-bottom: 15px;
    .title {
      font-size: 15px;
      color: #333;
    }
    .content {
      padding: 15px;
      font-size: 14px;
      color: #999;
    }
  }
}
</style>
