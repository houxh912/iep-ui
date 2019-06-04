<template>
  <div class="containerRight" v-loading="loading">
    <div class="box">
      <div>
        <h4>指标概述：</h4>
        <p v-if="formData.indexSystemRelationVO">{{formData.indexSystemRelationVO.summarize}}</p>
      </div>
      <div>
        <h4>指标细则：</h4>
        <p v-if="formData.indexSystemRelationVO">{{formData.indexSystemRelationVO.detail}}</p>
      </div>
      <div>
        <h4>指标依据：</h4>
        <p v-if="formData.indexSystemRelationVO">{{formData.indexSystemRelationVO.accord}}</p>
      </div>
      <div>
        <h4>
          指标权重：
          <span>{{formData.indexSystemRelationVO ? formData.indexSystemRelationVO.weight : ""}}</span>
          <!-- <el-input v-else size="small" style="width:200px" v-model="work.weight" placeholder="请输入内容"></el-input> -->
        </h4>
      </div>
      <div>
        <h4>
          指标得分：
          <el-input v-if="state1 && editable" size="small" style="width:200px" v-model="work.indexScore" placeholder="请输入内容" type="number" :min="0" :max="formData.indexSystemRelationVO ? formData.indexSystemRelationVO.weight : 0 "></el-input>
          <span v-else>{{formData.indexScore >= 0 ? formData.indexScore : ''}}</span>
        </h4>
      </div>
      <div>
        <h4>
          问题属性：
          <el-select v-if="state1 && editable" size="small" style="width:200px!important" v-model="work.problemProperties" placeholder="请选择">
            <el-option v-for="item in getDic('EVA_PROBLEM_PROPERRIES')" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <span v-else>{{this.getDicValue(formData.problemProperties,'EVA_PROBLEM_PROPERRIES')}}</span>
        </h4>
      </div>
      <div>
        <h4>
          问题发现时间：
          <el-date-picker v-if="state1  && editable" v-model="work.problemDiscoveryTime" type="datetime" style="width:200px" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
          </el-date-picker>
          <span v-else>{{formData.problemDiscoveryTime}}</span>
        </h4>
      </div>
      <div>
        <h4>
          整改期限：
          <el-date-picker v-if="state1  && editable" v-model="work.rectificationPeriod" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" style="width:200px" placeholder="选择日期">
          </el-date-picker>
          <span v-else>{{formData.rectificationPeriod}}</span>
        </h4>
      </div>
      <div>
        <h4>
          评测说明以及建议：
          <iep-froala-editor v-if="state1  && editable" v-model="work.reviewInstructions"></iep-froala-editor>
          <iep-html v-else :htmlStr="formData.reviewInstructions"></iep-html>
          <!-- <div v-if="state1  && editable">
            <el-input type="textarea" size="small" v-model="work.reviewInstructions" placeholder="请输入内容"></el-input>
          </div>
          <span v-else>{{formData.reviewInstructions}}</span> -->
        </h4>
      </div>
      <gov-layout-button-group style="text-align:right" v-if="state1  && editable">
        <gov-button type="primary" @click="handleSubmit" text="提交审核"></gov-button>
      </gov-layout-button-group>
    </div>
    <div class="box" v-if="formData.processState">
      <h4>审核流转</h4>
      <div class="circulation" v-for="item in formData.evaluateReviewFlowList" :key="item">
        <p>{{item.reviewTime}} {{item.reviewDescription}}<span class="status">{{item.auditOpinion}}</span></p>
      </div>
    </div>
    <div class="box" v-if="!state1 && editable">
      <div>
        <h4>审核意见：</h4>
        <el-input type="textarea" v-model="work.opinion" placeholder="请输入内容" maxlength="200"></el-input>
      </div>
      <gov-layout-button-group>
        <gov-button v-if="state2" type="primary" @click="handleNext(1)" text="提交参评单位"></gov-button>
        <gov-button v-if="state2" type="primary" @click="handleNext(2)" text="驳回"></gov-button>
        <gov-button v-if="state2" type="primary" @click="handleNext(3)" text="督导审核"></gov-button>
        <gov-button v-if="state3" type="primary" @click="handleNext(4)" text="提交意见"></gov-button>
        <gov-button v-if="state4 || state5" type="primary" @click="handleNext(5)" text="工单申诉"></gov-button>
        <gov-button v-if="state4" type="primary" @click="handleNext(6)" text="工单整改"></gov-button>
        <gov-button v-if="state5" type="primary" @click="handleNext(7)" text="我已阅读"></gov-button>
        <gov-button v-if="state6" type="primary" @click="handleNext(8)" text="反馈整改情况，提交项目经理"></gov-button>
        <gov-button v-if="state7" type="primary" @click="handleNext(9)" text="确认申诉"></gov-button>
        <gov-button v-if="state7" type="primary" @click="handleNext(10)" text="驳回申诉"></gov-button>
        <gov-button v-if="state8" type="primary" @click="handleNext(11)" text="工单结束"></gov-button>
      </gov-layout-button-group>
    </div>
  </div>
</template>
<script>
/*eslint-disable*/
import mixin from '@/views/wenjuan/mixins/mixin'
import { getDic } from '@/views/wenjuan/util/dic'
import { saveWork, updateWork } from '@/api/evaluate/management'
export default {
  mixins: [mixin],
  props: {
    formData: {
      type: Object,
      default: () => { },
    },
    members: {
      type: Object,
      default: () => { },
    },
    ids: {
      type: Object,
      default: () => { },
    },
    editable: {
      type: Boolean,
      default: () => true,
    },
  },
  data () {
    return {
      work: {

      },
      loading: false,
    }
  },
  watch: {
    "work.indexScore": { //监听不能让输入负数的得分
      deep: true,
      handler (val) {
        if (val || val == 0) {
          if (val < 0) {
            this.$set(this.work, 'indexScore', 0)
          }
        }
      },
    },
    "formData": {
      deep: true,
      handler (val) {
        if (val.indexScore !== -1) {
          this.$set(this.work, 'indexScore', val.indexScore)
        }
        if (val.processState == 4) {
          this.work = { ...val }
        }

      },
    },
  },
  computed: {
    state1 () { //创建工单是否为评测员
      if (this.members.reviewMemberIds && this.formData.id && this.members.reviewMemberIds.indexOf(this.userInfo.id.toString()) > -1 && (!this.formData.processState || this.formData.processState == 4)) {
        return true
      } else {
        return false
      }
    },
    state2 () { //工单审核-项目经理 //工单申诉-项目经理
      if (this.formData.processState == 2 || this.formData.processState == 6) {
        return true
      } else {
        return false
      }
    },
    state3 () { //督导审核
      if (this.formData.processState == 1) {
        return true
      } else {
        return false
      }
    },
    state4 () { //参评单位审核 整改型
      if (this.formData.processState == 3 && this.formData.workOrderType == 1) {
        return true
      } else {
        return false
      }
    },
    state5 () { //参评单位审核 告知型
      if (this.formData.processState == 3 && this.formData.workOrderType == 2) {
        return true
      } else {
        return false
      }
    },
    state6 () { // 整改反馈处理-评测员
      if (this.formData.processState == 8) {
        return true
      } else {
        return false
      }
    },
    state7 () { //工单申诉-项目单位
      if (this.formData.processState == 5) {
        return true
      } else {
        return false
      }
    },
    state8 () { //整改反馈审核-项目经理
      if (this.formData.processState == 9) {
        return true
      } else {
        return false
      }
    },
  },
  created () {
  },
  mounted () {
    console.log("member22s", this.members)
  },
  methods: {
    getDicValue (value, dic) {
      let dicArr = getDic(dic)
      for (let item of dicArr) {
        if (item.value == value) {
          return item.label
        }
      }
    },
    handleSubmit () {
      // console.log("ids",this.ids)
      let subData = {
        ...this.ids,
        ...this.work,
        reviewMemberId: this.userInfo.id,
        indexSystemId: this.formData.id,
        reviewDescription: '在线评测  ' + this.userInfo.realName + ' 流程发起!',
        processState: 2,
      }
      if ((!this.work.indexScore && this.work.indexScore !== 0) || !this.work.reviewInstructions || !this.work.rectificationPeriod || !this.work.problemProperties) {
        this.$message.warning("请填写完整工单！")
        return
      }
      if (this.work.indexScore > this.formData.indexSystemRelationVO.weight || this.work.indexScore < 0) {
        this.$message.warning("得分范围为0-权重之间！")
        return
      }
      if (this.formData.processState) {
        this.handleNext(12)
      } else {
        if (subData.workOrderType && subData.eligibleUnitsId) {
          saveWork(subData).then(({ data }) => {
            if (data) {
              this.$message.success("创建成功")
              this.work = {}
              this.$emit("createSucess")
            }
          })
        } else {
          this.$message.warning("请选择工单类型和参评单位")
        }
      }
      console.log("subData", subData)
    },
    handleNext (type) {
      let upData = { ...this.formData }
      if (type == 1) {
        upData.reviewDescription = '工单审核通过！-项目经理 ' + this.userInfo.realName
        upData.auditOpinion = this.work.opinion
        upData.processState = 3
      }
      if (type == 2) {
        upData.reviewDescription = '工单审核驳回 - 项目经理 ' + this.userInfo.realName
        upData.auditOpinion = this.work.opinion
        if (!upData.auditOpinion) {
          this.$message.warning('请填写驳回理由')
          return
        }
        upData.processState = 4
      }
      if (type == 3) {
        upData.reviewDescription = '工单复审 - 项目经理 ' + this.userInfo.realName
        upData.auditOpinion = this.work.opinion
        if (!upData.auditOpinion) {
          this.$message.warning('请填写理由')
          return
        }
        upData.processState = 1
      }
      if (type == 4) {
        upData.reviewDescription = '督导意见 - 项目督导 ' + this.userInfo.realName
        upData.auditOpinion = this.work.opinion
        if (!upData.auditOpinion) {
          this.$message.warning('请填写意见')
          return
        }
        upData.processState = 2
      }
      if (type == 5) {
        upData.reviewDescription = '工单申诉 - 参评单位 ' + this.userInfo.realName
        upData.auditOpinion = this.work.opinion
        if (!upData.auditOpinion) {
          this.$message.warning('请填写申诉理由')
          return
        }
        upData.processState = 5
      }
      if (type == 6) {
        upData.reviewDescription = '工单整改 - 参评单位 ' + this.userInfo.realName
        upData.auditOpinion = this.work.opinion
        if (!upData.auditOpinion) {
          this.$message.warning('请填写整改意见')
          return
        }
        upData.processState = 8
      }
      if (type == 7) {
        upData.reviewDescription = '工单已阅读 - 参评单位 ' + this.userInfo.realName
        upData.auditOpinion = this.work.opinion
        upData.processState = 10
      }
      if (type == 8) {
        upData.reviewDescription = '整改反馈处理 - 评测员 ' + this.userInfo.realName
        upData.auditOpinion = this.work.opinion
        if (!upData.auditOpinion) {
          this.$message.warning('请填写反馈意见')
          return
        }
        upData.processState = 9
      }
      if (type == 9) {
        upData.reviewDescription = '工单申诉通过 - 项目单位 ' + this.userInfo.realName
        upData.auditOpinion = this.work.opinion
        upData.processState = 6
      }
      if (type == 10) {
        upData.reviewDescription = '工单申诉驳回 - 项目单位 ' + this.userInfo.realName
        upData.auditOpinion = this.work.opinion
        if (!upData.auditOpinion) {
          this.$message.warning('请填写驳回理由')
          return
        }
        upData.processState = 3
      }
      if (type == 11) {
        upData.reviewDescription = '整改反馈审核 - 项目经理 ' + this.userInfo.realName
        upData.auditOpinion = this.work.opinion
        upData.processState = 10
      }
      if (type == 12) {
        upData = Object.assign(upData, this.work)
        upData.reviewDescription = '重新评测 - 评测员 ' + this.userInfo.realName
        upData.processState = 2
      }
      updateWork(upData).then(({ data }) => {
        this.$message.success("操作成功!")
        this.work = {}
        this.$emit("close")
      })
    },
    //清空输入项
    clearData () {
      this.work = {}
    },
  },
}
</script>
<style lang="scss" scoped>
.containerRight {
  .box {
    margin: 5px;
    padding: 5px;
    border: 1px solid #ebeef5;
    .circulation {
      margin-left: 50px;
      .status {
        color: red;
        margin-left: 15px;
      }
    }
    > div {
      margin: 5px 0;
    }
    h4 {
      font-size: 15px;
      font-weight: 600;
    }
    p {
      font-size: 14px;
    }
  }
}
</style>
