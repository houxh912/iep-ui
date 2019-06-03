<template>
  <gov-dialog ref="dialog" width="90%" @open="handleOpen" :btnGroup="[]" @closed="handleClosedDialog" :title="'综合评测'" :isBtnGroup="false" @handleSubmit="dialogSubmit">
    <layout-form>
      <gov-layout-main>
        <gov-layout-header>
        </gov-layout-header>
        <gov-layout-body>
          <el-row>
            <el-col :span="3">
              <div class="company">
                <h4>参评单位</h4>
                <div class="c-item" v-for="(item,index) in groupData" :key="item.value">
                  <el-tag :title="item.label" class="item-tag" :type="group == index ? 'default' : 'info'" @click="changeGroup(index,item)">{{item.label}}</el-tag>
                </div>
              </div>
            </el-col>
            <el-col :span="21">
              <el-row>
                <div style="margin:5px">
                  <el-tag style="cursor:pointer" :type="state == 0 ? 'default' : 'info'" @click="changeState(0)">全部（{{statistical["0"]||0}}）</el-tag>
                  <el-tag style="cursor:pointer" :type="state == 1 ? 'default' : 'info'" @click="changeState(1)">未评测（{{statistical["1"]||0}}）</el-tag>
                  <el-tag style="cursor:pointer" :type="state == 2 ? 'default' : 'info'" @click="changeState(2)">审核中（{{statistical["2"]||0}}）</el-tag>
                  <el-tag style="cursor:pointer" :type="state == 3 ? 'default' : 'info'" @click="changeState(3)">审核未通过（{{statistical["3"]||0}}）</el-tag>
                  <el-tag style="cursor:pointer" :type="state == 4 ? 'default' : 'info'" @click="changeState(4)">已评测（{{statistical["4"]||0}}）</el-tag>
                  <el-tag style="cursor:pointer" :type="state == 5 ? 'default' : 'info'" @click="changeState(5)">待我审核（{{statistical["5"]||0}}）</el-tag>
                </div>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <div class="containerLeft" v-loading="loading">
                    指标体系
                    <el-tree style="margin:5px 0" :data="treeData" :props="defaultProps" @node-click="handleNodeClick" default-expand-all></el-tree>
                  </div>
                </el-col>
                <el-col :span="18">
                  <div class="containerRight" v-loading="loading">
                    <div class="box">
                      <div>
                        <h4>指标概述：</h4>
                        <p v-if="formData.summarize">{{formData.summarize}}</p>
                      </div>
                      <div>
                        <h4>指标细则：</h4>
                        <p v-if="formData.detail">{{formData.detail}}</p>
                      </div>
                      <div>
                        <h4>指标依据：</h4>
                        <p v-if="formData.accord">{{formData.accord}}</p>
                      </div>
                      <div>
                        <h4>
                          指标权重：
                          <span v-if="weight.type == '1'">{{formData.weight}}</span>
                          <el-input v-else size="small" style="width:200px" v-model="weight.text" placeholder="请输入内容"></el-input>
                        </h4>
                      </div>
                      <div>
                        <h4>
                          指标得分：
                          <span v-if="score.type == '1'">{{upData.indexScore}}</span>
                          <el-input v-else size="small" style="width:200px" v-model="score.text" placeholder="请输入内容" type="number" :max="formData.weight" :min="0"></el-input>
                        </h4>
                      </div>
                      <div>
                        <h4>
                          问题属性：
                          <span v-if="question.type == '1'">{{this.getDicValue(upData.problemProperties,'EVA_PROBLEM_PROPERRIES')}}</span>
                          <el-select v-else size="small" style="width:200px!important" v-model="question.text" placeholder="请选择">
                            <el-option v-for="item in getDic('EVA_PROBLEM_PROPERRIES')" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                          </el-select>
                        </h4>
                      </div>
                      <div>
                        <h4>
                          评测说明：
                          <gov-froala-editor-detail v-if="explain.type == '1'" :htmlStr="upData.reviewInstructions"></gov-froala-editor-detail>
                          <!-- <div ref="isi" v-if="explain.type == '1'"></div> -->
                          <!-- <span v-if="explain.type == '1'">{{upData.reviewInstructions}}</span> -->
                          <gov-froala-editor v-else v-model="explain.text"></gov-froala-editor>
                          <!-- <el-input v-else size="small" style="width:200px" v-model="explain.text" placeholder="请输入内容"></el-input> -->
                        </h4>
                      </div>
                    </div>
                    <div class="box">
                      <h4>审核流转</h4>
                      <div class="circulation" v-for="item in upData.evaluateReviewFlowList" :key="item">
                        <p>{{item.reviewTime}} {{item.reviewDescription}}<span class="status">{{item.auditOpinion}}</span></p>
                      </div>
                    </div>
                    <div class="box" v-if="btnState != 0 && state != 4 && btnState != 5">
                      <div v-if="btnState != 1 && btnState != 4">
                        <h4>审核意见：</h4>
                        <el-input type="textarea" v-model="opinion.text" placeholder="请输入内容"></el-input>
                      </div>
                      <gov-layout-button-group>
                        <gov-button v-if="(btnState == 1 || btnState == 4) && (members.reviewMemberIds.indexOf(userInfo.id.toString()) >-1 || members.projectManagerId == userInfo.id || members.projectSupervisionId == userInfo.id)" type="primary" @click="handleSubmit" text="提交审核"></gov-button>
                        <gov-button v-if="btnState == 2 && members.projectManagerId == userInfo.id" type="primary" @click="handlePass" text="审核通过"></gov-button>
                        <gov-button v-if="btnState == 2 && members.projectManagerId == userInfo.id" type="primary" @click="handleRefuse" text="驳回"></gov-button>
                        <gov-button v-if="btnState == 2 && members.projectManagerId == userInfo.id" type="primary" @click="handleSupervisor" text="督导审核"></gov-button>
                        <gov-button v-if="btnState == 3 && members.projectSupervisionId == userInfo.id" type="primary" @click="handleOpinion" text="提交意见"></gov-button>
                      </gov-layout-button-group>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </gov-layout-body>
      </gov-layout-main>
    </layout-form>
  </gov-dialog>
</template>
<script>
/*eslint-disable*/
import mixin from '@/wenjuan/mixins/mixin'
import scopeMixin from './const/mixin'
import govFroalaEditor from '@/wenjuan/Components/govFroalaEditor'
import govFroalaEditorDetail from '@/wenjuan/Components/govFroalaEditor/detail'
import { getIndexSydtems, getGroups, getInfo, updateReviewFlow, statistical, getMembers } from '@/api/evaluate/management'
import { getDept, getDic } from '@/wenjuan/util/dic'
export default {
  components: { govFroalaEditor, govFroalaEditorDetail },
  mixins: [mixin, scopeMixin],
  data () {
    return {
      value: '',
      state: 0,
      btnState: 0,
      group: 0,
      selectId: 0,
      formData: {},
      upData: {},
      statistical: {},
      members: {},
      params: {
        projectId: 0,
        deptId: 0,
        state: 0,
        groupId: 0,
      },
      score: {//分数
        type: 1,
        text: '',
      },
      weight: {//权重
        type: 1,
        text: '',
      },
      opinion: {//审核意见
        type: 1,
        text: '',
      },
      question: { //问题属性
        type: 1,
        text: '1',
      },
      explain: { //说明
        type: 1,
        text: '',
      },
      treeData: [],
      groupData: [],
      defaultProps: {
        children: 'relationList',
        label: 'name',
      },
      loading: false,
      groups: [],//分组
    }
  },
  created () {
    // this.initApi()
  },
  computed: {

  },
  watch: {
    "score.text": { //监听不能让输入负数的得分
      deep: true,
      handler (val) {
        if (val || val == 0) {
          if (val < 0) {
            this.$set(this.score, 'text', 0)
          }
        }
      },
    }
  },

  methods: {
    initApi (id) {
      this.changeProject(id)
    },
    // 提交成功后
    successForm (msg) {
      msg && this.$message.success(msg)
      this.getList()
    },
    //改变菜单状态
    changeState (state) {
      this.state = state
      this.params.state = state
      if (this.params.eligibleUnitsId != 0 && this.params.projectId != 0) {
        this.loading = true
        getIndexSydtems({
          eligibleUnitsId: this.params.deptId,
          projectId: this.params.projectId,
          state: this.params.state,
        }).then(({ data }) => {
          this.loading = false
          this.treeData = data.data
          // console.log(this.treeData,"treedata")
        })
      }
      // this.initData()
    },
    //树形点击事件
    handleNodeClick (data) {
      // console.log("点击了",data)
      this.$set(this.question, "text", "")
      this.$set(this.explain, "text", "")
      this.$set(this.score, "text", "")
      this.$set(this.opinion, "text", "")
      if (!data.relationList) {
        this.formData = Object.assign({}, data)
        // console.log("哈哈哈",this.formData.indexScore)
        if (this.formData.indexScore !== -1) {
          this.$set(this.score, 'text', this.formData.indexScore)
        }
        this.loading = true
        this.selectId = data.id || 0
        this.getDetailInfo()
      }
    },
    //封装获取工单详情
    getDetailInfo () {
      this.statist()
      getInfo({
        projectId: this.params.projectId,
        eligibleUnitsId: this.params.deptId,
        indexSystemId: this.selectId,
        state: this.state,
      }).then(({ data }) => {
        this.loading = false
        if (data.data) {
          this.upData = data.data
          let status = data.data.processState
          this.btnState = status
          // console.log("this.state",status)
          if (status == 1 || status == 4) {
            if (status == 4) {
              this.question = {
                text: this.upData.problemProperties,
                type: '2',
              }
              this.explain = {
                text: this.upData.reviewInstructions,
                type: '2',
              }
              this.score = {
                text: this.upData.indexScore,
                type: '2',
              }
            } else {
              this.$set(this.question, "type", "2")
              this.$set(this.score, "type", "2")
              this.$set(this.explain, "type", "2")
            }
          } else {
            if (this.upData.reviewInstructions) {
              this.$refs['isi'] ? this.$refs['isi'].innerHTML = this.upData.reviewInstructions : ""
            }
            this.$set(this.question, "type", "1")
            this.$set(this.score, "type", "1")
            this.$set(this.explain, "type", "1")
          }
        } else {
          this.initData()
        }
        // console.log("结果",data)
      })
    },
    //选择部门
    changeGroup (index, item) {
      this.group = index
      this.params.deptId = item.value
      this.params.groupId = item.groupId
      this.params.state = 0
      this.formData = {}
      this.getSystemData()
      this.initData()
    },
    //选择项目
    changeProject (id) {
      this.params.projectId = id
      this.formData = {}
      this.initData()
      getGroups({
        projectId: this.params.projectId,
      }).then(({ data }) => {
        this.group = 0
        // this.groupData = data.data||[]
        this.getInfoMembers()
        let arr = []
        for (let item of data.data || []) {
          arr = arr.concat(item.eligibleUnitsList)
        }
        let deptDic = getDept()
        let groupData = []
        for (let id of arr) {
          for (let item of deptDic) {
            if (id == item.value) {
              groupData.push({
                ...item,
                groupId: item.id,
              })
            }
          }
        }
        this.groupData = groupData
        console.log("哈哈哈哈哈", this.groupData)
        if (this.groupData.length > 0) {
          this.params.deptId = this.groupData[0].value
          this.params.groupId = this.groupData[0].groupId
          this.getSystemData()
        } else {
          this.treeData = []
        }
      })
    },
    //封装的获取工单方法
    getSystemData () {
      this.statist()
      this.loading = true
      getIndexSydtems({
        eligibleUnitsId: this.params.deptId,
        projectId: this.params.projectId,
        state: this.params.state,
      }).then(({ data }) => {
        this.loading = false
        this.state = 0
        this.treeData = data.data
        // console.log(this.treeData,"treedata")
      })
    },
    //获取统计
    statist () {
      console.log("this.groupId", this.params.groupId)
      statistical({
        eligibleUnitsId: this.params.deptId,
        projectId: this.params.projectId,
      }).then(({ data }) => {
        this.statistical = data.data
      })
    },
    handleSubmit () {
      let form = Object.assign({}, this.upData)
      // form.auditOpinion = this.opinion.text
      form.indexScore = this.score.text
      form.problemProperties = this.question.text
      form.reviewInstructions = this.explain.text
      if ((!this.score.text && this.score.text !== 0) || !this.question.text || !this.explain.text) {
        this.$message.warning("请填写完整工单！")
        return
      }
      if (form.indexScore > this.formData.weight || form.indexScore < 0) {
        this.$message.warning("得分范围为0-权重之间！")
        return
      }
      if (this.btnState == 1) {
        form.reviewDescription = '在线评测  ' + this.userInfo.realName + ' 流程发起!  '
        form.eligibleUnitsId = this.params.deptId
        form.projectId = this.params.projectId
        form.reviewMemberId = this.userInfo.id
      } else {
        form.reviewDescription = '在线评测  评测员重新评测!  ' + this.userInfo.realName
      }
      form.processState = 2
      updateReviewFlow(form).then(({ data }) => {
        this.getDetailInfo()
        this.opinion = {
          type: 1,
          text: '',
        }
      })
    },
    //通过
    handlePass () {
      let form = Object.assign({}, this.upData)
      form.reviewDescription = '指标通过-项目经理 !   ' + this.userInfo.realName
      form.auditOpinion = this.opinion.text
      form.processState = 5
      updateReviewFlow(form).then(({ data }) => {
        this.getDetailInfo()
        this.getSystemData()
        this.opinion = {
          type: 1,
          text: '',
        }
      })
    },
    //驳回
    handleRefuse () {
      let form = Object.assign({}, this.upData)
      form.reviewDescription = '指标复测-项目经理 !   ' + this.userInfo.realName
      form.auditOpinion = this.opinion.text
      if (!form.auditOpinion) {
        this.$message.warning('请填写驳回理由')
        return
      }
      form.processState = 4
      updateReviewFlow(form).then(({ data }) => {
        this.getDetailInfo()
        this.opinion = {
          type: 1,
          text: '',
        }
      })
    },
    //督导
    handleSupervisor () {
      let form = Object.assign({}, this.upData)
      form.reviewDescription = '指标复审-项目经理 !   ' + this.userInfo.realName
      form.auditOpinion = this.opinion.text
      if (!form.auditOpinion) {
        this.$message.warning('请填写理由')
        return
      }
      form.processState = 3
      updateReviewFlow(form).then(({ data }) => {
        this.getDetailInfo()
        this.opinion = {
          type: 1,
          text: '',
        }
      })
    },
    //督导意见
    handleOpinion () {
      let form = Object.assign({}, this.upData)
      form.reviewDescription = "督导意见-项目督导 !   " + this.userInfo.realName
      form.auditOpinion = this.opinion.text
      if (!form.auditOpinion) {
        this.$message.warning('请填写意见')
        return
      }
      form.processState = 2
      updateReviewFlow(form).then(({ data }) => {
        this.getDetailInfo()
        this.opinion = {
          type: 1,
          text: '',
        }
      })
    },
    //获取dic的中文
    getDicValue (value, dic) {
      let dicArr = getDic(dic)
      for (let item of dicArr) {
        if (item.value == value) {
          return item.label
        }
      }
    },
    //获取成员
    getInfoMembers () {
      getMembers(this.params.projectId).then(({ data }) => {
        this.members = {
          projectManagerId: data.data.projectManagerId, //项目经理id
          projectSupervisionId: data.data.projectSupervisionId, //项目督导id
          reviewMemberIds: data.data.reviewMemberIds ? data.data.reviewMemberIds.substring(0, data.data.reviewMemberIds.length - 1).split(",") : [], //评测员ids
          projectDeptId: data.data.projectDeptId, //项目单位id
          eligibleUnitsIds: data.data.eligibleUnitsIds ? data.data.eligibleUnitsIds.substring(0, data.data.eligibleUnitsIds.length - 1).split(",") : [],  //参评单位ids,
        }
        // console.log("members",this.members)
      })
    },
    //初始化数据
    initData () {
      this.question = {
        type: 1,
        text: '1',
      }
      this.explain = {
        type: 1,
        text: '',
      }
      this.score = {
        type: 1,
        text: '',
      }
      this.opinion = {
        type: 1,
        text: '',
      }
      this.btnState = 0
      this.selectId = 0
      this.upData = {}
      this.statistical = {}
    },
    handleOpen () {

    },
    open (row) {
      this.initApi(row.projectId)
      this.$nextTick(() => {
        this.$refs['dialog'].open()
      })
    },
    close () {
      this.$refs['dialog'].close()
    },
  },
}
</script>
<style scoped lang="scss">
.company {
  .c-item {
    margin: 15px 0;
    cursor: pointer;
    .item-tag {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 100%;
    }
  }
}
.containerLeft {
  border: 1px solid #ebeef5;
  margin: 5px;
  padding: 5px;
  min-height: 400px;
}
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
