<template>
  <iep-app-layout>
    <div class="project-pk">
      <iep-page-header title="项目PK" :backOption="backOption"></iep-page-header>
      <div class="contianBox">
        <div class="header">
          <span v-for="(item,index) in formData" :key="index">
            <div v-if="item.projectName!=''">{{item.projectName}}</div>
            <iep-button v-else style="font-size:18px;color:#999;vertical-align: text-top;margin-left: 30%;display: block;" @click="add()">+</iep-button>
          </span>
        </div>
        <div class="title">
          <div class="data">基本信息资源</div>
        </div>
        <div class="counter">
          <div class="left">
            <span>项目标签</span>
            <span>项目阶段</span>
            <span>项目等级</span>
            <span>客户名称</span>
            <span>项目经理</span>
            <span>项目督导</span>
            <span>市场经理</span>
            <span>执行项目经理</span>
            <span>项目成员</span>
            <!-- <span>相关资源</span>
          <span>相关产品</span> -->
          </div>
          <div class="right" v-for="(item,index) in formData" :key="index">
            <span>
              <span type='info' v-for="(tag, index) in item.projectTagList" :key="index" class="tag">{{tag}}</span>
              <span v-if="item.projectTagList.length==0">-</span>
            </span>
            <span>
              <span v-if="item.projectStage==0">-</span>
              <span v-else-if="item.projectStage==1">初步意向</span>
              <span v-else-if="item.projectStage==2">方案提交</span>
              <span v-else-if="item.projectStage==3">正在执行</span>
              <span v-else>项目完结</span>
            </span>
            <span>
              <span v-if="item.projectLevel==0">-</span>
              <span v-else-if="item.projectLevel==1" class="red">重要项目</span>
              <span v-else-if="item.projectLevel==2">中级项目</span>
              <span v-else>一般项目</span>
            </span>
            <span>
              <span v-if="item.relatedClientList">{{item.relatedClientList.name}}</span>
              <span v-else>-</span>
            </span>
            <span>
              <span v-if="item.projectManagerList">{{item.projectManagerList.name}}</span>
              <span v-else>-</span>
            </span>
            <span>
              <span v-if="item.projectMentorList.length==0||!item.projectMentorList">-</span>
              <span v-for="a in item.projectMentorList" :key="a.id" class="people">{{a.name}}</span>
            </span>
            <span>
              <span v-if="item.mktManagerList.length==0||!item.mktManagerList">-</span>
              <span v-for="a in item.mktManagerList" :key="a.id" class="people">{{a.name}}</span>
            </span>
            <span>
              <span v-if="item.projectHandlesList.length==0||!item.projectHandlesList">-</span>
              <span v-for="a in item.projectHandlesList" :key="a.id" class="people">{{a.name}}</span>
            </span>
            <span>
              <span v-if="item.membersList.length==0||!item.membersList">-</span>
              <span v-for="a in item.membersList.slice(0,5)" :key="a.id" class="people">{{a.name}}</span>
              <span :class="item.membersList.length==maxList.membersListMax?'red':''" v-if="item.membersList.length>5">{{`等${item.membersList.length}人`}}</span>
            </span>
          </div>
        </div>
        <div class="title">
          <div class="data">基本信息资源</div>
        </div>
        <div class="counter">
          <div class="left">
            <span>项目签约周期</span>
            <span>项目总周期</span>
            <span>项目成本（元）</span>
            <span>项目金额（元）</span>
            <span>项目利润率</span>
            <span>项目收款率</span>
            <span>收款时间</span>
          </div>
          <div class="right" v-for="(item,index) in formData" :key="index">
            <span :class="item.contractCycle==maxList.contractCycleMax?'red':''">{{item.contractCycle}}天</span>
            <span :class="item.totalCycle==maxList.totalCycleMax?'red':''">{{item.totalCycle}}天</span>
            <span :class="item.projectBudget==maxList.projectBudgetMax?'red':''">{{item.projectBudget}}</span>
            <span :class="item.projectAmount==maxList.projectAmountMax?'red':''">{{item.projectAmount}}</span>
            <span :class="item.profitMargin==maxList.profitMarginMax?'red':''">{{item.profitMargin*100}}%</span>
            <span :class="item.receiptRate==maxList.receiptRateMax?'red':''">{{item.receiptRate*100}}%</span>
            <span :class="item.paymentTime==maxList.paymentTimeChangeMax?'red':''">
              <div v-if="item.paymentTime!=0">{{item.paymentTime}}</div>
              <div v-else>-</div>
            </span>
          </div>
        </div>
      </div>
      <add-dialog ref="addDialog" @load-page="loadPage"></add-dialog>
    </div>
  </iep-app-layout>
</template>

<script>
import { getProjectPKList } from '@/api/app/prms/project_pk'
import { initForm, maxList } from './option'
import addDialog from './addDialog'

export default {
  components: { addDialog },
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$router.history.go(-1)
        },
      },
      formData: [initForm(), initForm(), initForm()],
      comparison: [
        { before: 'projectBudget', maxValue: '', after: 'projectBudgetMax' },
        { before: 'projectAmount', maxValue: '', after: 'projectAmountMax' },
        { before: 'profitMargin', maxValue: '', after: 'profitMarginMax' },
        { before: 'totalCycle', maxValue: '', after: 'totalCycleMax' },
        { before: 'contractCycle', maxValue: '', after: 'contractCycleMax' },
        { before: 'receiptRate', maxValue: '', after: 'receiptRateMax' },
        // { before: 'paymentTimeChange', maxValue: '', after: 'paymentTimeChangeMax' },
      ],
      maxList: maxList(),
    }
  },
  created () {
    this.loadPage()
  },
  computed: {
    idList () {
      return this.$route.query.ids
    },
  },
  methods: {
    loadPage () {
      getProjectPKList({ ids: this.idList }).then(({ data }) => {
        this.formData = [data.data[0], data.data.length > 1 ? data.data[1] : initForm(), data.data.length == 3 ? data.data[2] : initForm()]
        this.formData.profit = (data.data.projectAmount - data.data.projectBudget) / data.data.projectAmount * 100
        // this.formData.paymentTimeChange = Number(this.formData.paymentTime)
        // this.formData.paymentTime = data.data.paymentTime * 100
        for (let i of this.comparison) {
          let beforeObject = i.before
          i.maxValue = Math.max(this.formData[0][beforeObject], this.formData[1][beforeObject], this.formData[2][beforeObject])
        }
        for (let i of this.comparison) {
          let maxName = i.after
          this.maxList[maxName] = i.maxValue
        }
        this.maxList.membersListMax = Math.max(this.formData[0].membersList.length, this.formData[1].membersList.length, this.formData[2].membersList.length)
      })
    },
    add () {
      this.$refs['addDialog'].idList = this.idList
      this.$refs['addDialog'].dialogShow = true
    },
  },
}
</script>

<style lang="scss" scoped>
.project-pk {
  width: 1200px;
  padding: 20px 0;
  margin: auto;
  .contianBox {
    white-space: nowrap;
    overflow-x: auto;
    .header {
      font-size: 16px;
      height: 100px;
      line-height: 100px;
      > span {
        width: 50%;
        display: inline-block;
        text-align: center;
      }
    }
    .title {
      width: 100%;
      background-color: #f5f5f5;
      border-radius: 5px;
      position: sticky;
      left: 0;
      .data {
        font-size: 16px;
        padding: 10px 20px;
      }
    }
    .counter {
      .left {
        width: 150px;
        display: inline-block;
        vertical-align: top;
        position: sticky;
        left: 0;
        > span {
          width: 100%;
          display: block;
          text-align: left;
          padding-left: 30px;
          height: 46px;
          line-height: 46px;
          border-bottom: 1px solid #eee;
          background-color: #fff;
        }
      }
      .right {
        width: 49%;
        display: inline-block;
        vertical-align: top;
        > span {
          width: 100%;
          display: block;
          text-align: left;
          padding-left: 30px;
          height: 46px;
          line-height: 46px;
          border-bottom: 1px solid #eee;
        }
        .red {
          color: red;
        }
        .tag {
          position: relative;
          margin-right: 15px;
          &:after {
            content: "/";
            position: absolute;
            right: -10px;
            top: -14px;
          }
          &:last-child:after {
            content: "";
            position: absolute;
            right: -10px;
            top: -14px;
          }
        }
        .people {
          margin-right: 10px;
          padding-right: 5px;
          position: relative;
          display: inline-block;
          &:after {
            content: "、";
            position: absolute;
            right: -12px;
            top: -2px;
          }
          &:last-child:after {
            content: "";
            position: absolute;
            right: -12px;
            top: -2px;
          }
        }
      }
    }
  }
}
</style>
<style scoped>
/* .project-pk >>> .el-form-item__content {
  display: flex;
} */
.project-pk >>> .title-wrapper {
  margin-bottom: 0;
}
</style>

