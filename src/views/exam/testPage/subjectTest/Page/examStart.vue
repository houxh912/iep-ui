<template>
  <div>
    <basic-container>
      <iep-page-header title="在线考试系统"></iep-page-header>
      <div class="examShow" v-loading="loading">
        <el-row :gutter="30">
          <el-col class="left" :span="18">
            <div class="tasks-info" v-if="resdata.description">
              <p>{{resdata.description}}</p>
            </div>

            <el-card class="box-card" shadow="never">
              <div slot="header" class="clearfix">
                <strong>{{resdata.questionTypeName}}</strong>
                <span class="fieldName">（科目: {{resdata.fieldName}}）</span>
                <span class="title" style="float: right;">合计{{resdata.typeScore}}
                  分，已完成 {{kindOffCount}} / {{resdata.kindTotalNum}}</span>
              </div>
              <div class="question">
                <div style="margin-bottom: 10px;">
                  <span>{{resdata.questionNum}}）</span>
                  <span>{{resdata.title}}</span>
                  <span> （ {{resdata.single}} 分）</span>
                </div>

                <div v-if="resdata.questionTypeName ==='单选题'">
                  <li v-for="(item,index) in resdata.titleOptions" :key="index">
                    <el-radio v-model="answerRadio" :label="item.key"></el-radio>
                    <span>{{item.value}}</span>
                  </li>
                </div>

                <div v-if="resdata.questionTypeName ==='复选题'">
                  <el-checkbox-group v-model="checksList" style="margin-left: 28px;">
                    <el-checkbox style="margin-right: 100%;" v-for="item in resdata.titleOptions" :label="item.key" :key="item.key">
                      <span>{{item.key}} . {{item.value}}</span>
                    </el-checkbox>
                  </el-checkbox-group>
                </div>

                <div v-if="resdata.questionTypeName ==='判断题'">
                  <li v-for="(item,index) in trueOrFalseList" :key="index">
                    <el-radio v-model="trueOrFalseRadio" :label="item" @change="handleTrueOrFalse ()">
                    </el-radio>
                  </li>
                </div>

                <div v-if="resdata.questionTypeName ==='简答题'">
                  <li v-for="(item,index) in inputAreaList" :key="index" style="margin-left:28px;">
                    <iep-froala-editor v-model="freeInput" placeholder=""></iep-froala-editor>
                  </li>
                </div>

                <div v-if="resdata.questionTypeName ==='操作题'">
                  <li v-for="(item,index) in operAreaList" :key="index" style="margin-left:28px;">
                    <iep-froala-editor v-model="operInput" placeholder=""></iep-froala-editor>
                  </li>
                </div>
              </div>
            </el-card>

            <div class="center" align="center">
              <iep-button style="margin:0 10px;" @click="prv" :disabled="resdata.questionNum === 1">
                上一题
              </iep-button>
              <iep-button style="margin:0 10px;" @click="next" :disabled="resdata.questionNum === resdata.questionTotalNum">下一题</iep-button>
            </div>
          </el-col>

          <el-col class="right" v-if="resdata.title" :span="6">

            <div class="container">
              <div class="explain">
                <span style="color: #595959;">当前进度</span><br>
                <span class="count">{{count}}</span>
                <span class="line"> / </span>
                <span class="TotalNum">{{resdata.questionTotalNum}}</span>
              </div>

              <ve-ring class="ring" height="200px" :data="chartData" :settings="chartSettings" :tooltip-visible="false" :legend-visible="false" :colors="colors"></ve-ring>

              <div class="card">
                <div v-if="resdata.radioMap.length > 0">
                  <span class="answerSheet">{{resdata.radioMap[0].questionType}}</span>
                  <div class="answerSheetTop">
                    <iep-button class="choices" v-for="(item,index) in resdata.radioMap" :key="index" @click="handleCard(item)" :class="{'activess':item.answerOrNot===1,'active': item.questionNum == resdata.questionNum}">
                      {{item.questionNum}}</iep-button>
                  </div><br>
                </div>

                <div v-if="resdata.checkboxMap.length > 0">
                  <span class="answerSheet">{{resdata.checkboxMap[0].questionType}}</span>
                  <div class="answerSheetTop">
                    <iep-button class="choices" v-for="(item,index) in resdata.checkboxMap" :key="index" @click="handleCard(item)" :class="{'activess':item.answerOrNot===1,'active': item.questionNum == resdata.questionNum}">
                      {{item.questionNum}}</iep-button>
                  </div><br>
                </div>

                <div v-if="resdata.checkedMap.length > 0">
                  <span class="answerSheet">{{resdata.checkedMap[0].questionType}}</span>
                  <div class="answerSheetTop">
                    <iep-button class="choices" v-for="(item,index) in resdata.checkedMap" :key="index" @click="handleCard(item)" :class="{'activess':item.answerOrNot===1,'active': item.questionNum == resdata.questionNum}">
                      {{item.questionNum}}</iep-button>
                  </div><br>
                </div>

                <div v-if="resdata.operationMap.length > 0">
                  <span class="answerSheet">{{resdata.operationMap[0].questionType}}</span>
                  <div class="answerSheetTop">
                    <iep-button class="choices" v-for="(item,index) in resdata.operationMap" :key="index" @click="handleCard(item)" :class="{'activess':item.answerOrNot===1,'active': item.questionNum == resdata.questionNum}">
                      {{item.questionNum}}</iep-button>
                  </div><br>
                </div>

                <div v-if="resdata.textMap.length > 0">
                  <span class="answerSheet">{{resdata.textMap[0].questionType}}</span>
                  <div class="answerSheetTop">
                    <iep-button class="choices" v-for="(item,index) in resdata.textMap" :key="index" @click="handleCard(item)" :class="{'activess':item.answerOrNot===1,'active': item.questionNum == resdata.questionNum}">
                      {{item.questionNum}}</iep-button>
                  </div><br>
                </div>
              </div>
            </div>

          </el-col>
        </el-row>
      </div>

      <iep-dialog :dialog-show="dialogShow" title="" class="success-box" width="420px" @close="handleCancel" center>
        <div class="center-box">
          <p class="success-title"><i class="el-icon-success"></i>交卷成功！</p>
          <p style="margin-bottom: 10px">很感谢你参加本场考试</p>
          <p>预祝考试成功！</p>
        </div>
        <template slot="footer">
          <iep-button @click="handleCancel" style="margin-bottom: 10px">关闭</iep-button>
        </template>
      </iep-dialog>

      <footer-tool-bar>
        <template slot="extra">
          <span style="padding-right: 30px;">考试名称：{{record.title}}</span>
          <span>准考证号：{{resdata.examinationNumber}}</span>
        </template>
        <span class="headerTxt">剩余时间：{{min}} 分：{{sec}} 秒</span>
        <!-- <iep-button @click="handleSave">暂停</iep-button> -->
        <iep-button @click="backhome">返回</iep-button>
        <iep-button @click="saveAndGoBack">保存并退出</iep-button>
        <iep-button type="primary" @click="handleExamination">交卷</iep-button>
      </footer-tool-bar>
    </basic-container>
  </div>
</template>

<script>
import { getTestPageById } from '@/api/exam/testPage/subjectTest/examStart'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  props: ['record'],
  data () {
    this.colors = ['$--color-primary', '#999']
    this.chartSettings = {
      radius: [50, 60],
      offsetY: 100,
    }
    return {
      dialogShow: false,
      loading: false,      //加载圈圈
      answerRadio: '',        //单选(v-model绑定的值)
      checksList: [],         //复选(v-model绑定的值)
      trueOrFalseRadio: '',   //判断(v-model绑定的值)
      freeInput: '',          //简答(v-model绑定的值)
      operInput: '',          //操作(v-model绑定的值)
      trueOrFalseList: ['正确', '错误'],
      inputAreaList: [''],
      operAreaList: [''],
      // questionExplain: '本题来源于国脉内网、水巢、数据基因、技能类、知识类、数据能力类、基本能力类、项目管理类、公司常识类、人力资源类等。',
      mins: '',
      secs: '',
      time: '',   //定义定时器
      // examNo: '2019052568969',
      chartData: {
        columns: ['是否完成', '进度'],
        rows: '',
      },
      // statusColor: function (val) {
      //   if (val.answerOrNot === 1) {
      //     return 'background:#409eff;borderColor:#409eff;color:#fff'
      //   } else {
      //     return 'background:#fff;color:#409eff'
      //   }
      // },
      resdata: {
        kindTotalNum: '',    //每种题型合计题数
        kindMark: '',        //每种题型合计分数
        questionOffNum: [],  //全部已完成的题目总数
        questionTotalNum: '',//全部的题目总数
        titleOptions: [],    //答案选项数组
        radioMap: [],        //答题卡片的单选题数组集合，从数组中遍历题目出来
        checkboxMap: [],     //答题卡片的复选题数组集合，从数组中遍历题目出来
        checkedMap: [],      //答题卡片的判断题数组集合，从数组中遍历题目出来
        textMap: [],         //答题卡片的简答题数组集合，从数组中遍历题目出来
        operationMap: [],    //答题卡片的操作题数组集合，从数组中遍历题目出来
      },
    }
  },
  watch: {
    sec: {
      handler (newVal) {
        this.num(newVal)
      },
    },
    min: {
      handler (newVal) {
        this.num(newVal)
      },
    },
  },
  computed: {
    sec: function () {
      return this.num(this.secs)
    },
    min: function () {
      return this.num(this.mins)
    },
    kindOffCount: function () {
      return this.kindOffNum()
    },
    count: function () {
      return this.offNum()
    },
  },
  mounted () {
    // this.timer()
  },
  created () {
    // console.log('record => ', this.record)
    this.loadPage()
  },
  beforeDestroy () {
    // this.saveAll()   //去到其他界面将自动保存
    clearInterval(this.time)
    this.time = null

  },
  destroyed () {

  },
  methods: {

    /**
     * 判断题
     */
    handleTrueOrFalse () {
      // console.log('handleTrueOrFalse => ' + item)
    },

    /**
     * 判断题型(公用方法)
     */
    judgeType (params) {
      params.examId = this.record.id
      params.currentQuestionNum = this.resdata.questionNum
      const type = this.resdata.questionTypeName
      if (type === '单选题') {
        params.userAnswer = this.answerRadio
      }
      if (type === '复选题') {
        params.userAnswer = this.checksList.length > 0 ? JSON.stringify(this.checksList.sort()) : ''
        // console.log('111', params.userAnswer)
      }
      if (type === '判断题') {
        params.userAnswer = this.trueOrFalseRadio
      }
      if (type === '简答题') {
        params.userAnswer = this.freeInput
      }
      if (type === '操作题') {
        params.userAnswer = this.operInput
      }
    },

    /**
     * 获取题目的详细数据(公用请求方法)
     */
    getSubjectById (params, times) {
      this.loading = true
      getTestPageById(params).then(res => {
        if (res.data.code === 0) {
          const record = res.data.data
          if (times === true) {
            const timeAll = record.remainingTime ? record.remainingTime.split('-') : []
            this.mins = Number(timeAll[0])
            this.secs = Number(timeAll[1])
            this.timer()
          }
          if (this.mins + this.secs === 0) {
            this.tip()
          } else {
            this.chartData.rows = record.questionStatus
            this.resdata = record
            this.resdata.questionOffNum = record.questionNumList
            this.resdata.questionTotalNum = record.questionNumList.checkboxMap.length + record.questionNumList.checkedMap.length + record.questionNumList.radioMap.length + record.questionNumList.textMap.length + record.questionNumList.operationMap.length
            this.resdata.titleOptions = record.titleOptions ? JSON.parse(record.titleOptions) : []
            this.resdata.radioMap = record.questionNumList.radioMap
            this.resdata.checkboxMap = record.questionNumList.checkboxMap
            this.resdata.checkedMap = record.questionNumList.checkedMap
            this.resdata.textMap = record.questionNumList.textMap
            this.resdata.operationMap = record.questionNumList.operationMap
            if (record.questionTypeName === '单选题') {
              this.answerRadio = record.userAnswer
              this.resdata.kindTotalNum = record.questionNumList.radioMap.length
              this.resdata.kindMark = record.questionNumList.radioMap[0].grade * this.resdata.kindTotalNum
            }

            if (record.questionTypeName === '复选题') {
              // console.log('222', this.checksList)
              this.checksList = record.userAnswer && record.userAnswer.length > 0 ? JSON.parse(record.userAnswer) : []
              // console.log('333', this.checksList)
              this.resdata.kindTotalNum = record.questionNumList.checkboxMap.length
              this.resdata.kindMark = record.questionNumList.checkboxMap[0].grade * this.resdata.kindTotalNum
            }
            if (record.questionTypeName === '判断题') {
              this.trueOrFalseRadio = record.userAnswer
              this.resdata.kindTotalNum = record.questionNumList.checkedMap.length
              this.resdata.kindMark = record.questionNumList.checkedMap[0].grade * this.resdata.kindTotalNum
            }
            if (record.questionTypeName === '简答题') {
              this.freeInput = record.userAnswer || ''
              this.resdata.kindTotalNum = record.questionNumList.textMap.length
              this.resdata.kindMark = record.questionNumList.textMap[0].grade * this.resdata.kindTotalNum
            }
            if (record.questionTypeName === '操作题') {
              this.operInput = record.userAnswer || ''
              this.resdata.kindTotalNum = record.questionNumList.operationMap.length
              this.resdata.kindMark = record.questionNumList.operationMap[0].grade * this.resdata.kindTotalNum
            }
          }
          this.loading = false
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg,
          })
        }
      })
    },

    /**
     * 提示语加自动保存(公用方法)
     */
    saveAll () {
      const params = {
        remainingTime: this.mins + '-' + this.secs,
      }
      this.judgeType(params)
      this.getSubjectById(params)
      this.$message({
        type: 'success',
        message: '自动保存成功!',
      })
    },

    /**
     *考试时间已结束，再次进入时提示时间为零
     */
    tip () {
      this.$message({
        type: 'warning',
        message: '剩余考试时间已为零!',
      })
      this.$emit('onGoBack')
    },

    /**
     * 首次进入页面加载题目
     */
    loadPage () {
      //const times = true
      const params = {
        examId: this.record.id,
        datiFrequency: this.record.answerNumber,
        currentQuestionNum: this.resdata.questionNum,
        questionNum: this.resdata.questionNum,
      }
      this.getSubjectById(params, true)
    },

    /**
     *计算每种题型已完成的题数
     */
    kindOffNum () {
      let kindcount = 0
      const type = this.resdata.questionTypeName
      if (type === '单选题') {
        for (let i = 0; i < this.resdata.radioMap.length; i++) {
          if (this.resdata.radioMap[i].answerOrNot > 0) {
            kindcount++
          }
        }
      }
      if (type === '复选题') {
        for (let i = 0; i < this.resdata.checkboxMap.length; i++) {
          if (this.resdata.checkboxMap[i].answerOrNot > 0) {
            kindcount++
          }
        }
      }
      if (type === '判断题') {
        for (let i = 0; i < this.resdata.checkedMap.length; i++) {
          if (this.resdata.checkedMap[i].answerOrNot > 0) {
            kindcount++
          }
        }
      }
      if (type === '简答题') {
        for (let i = 0; i < this.resdata.textMap.length; i++) {
          if (this.resdata.textMap[i].answerOrNot > 0) {
            kindcount++
          }
        }
      }
      if (type === '操作题') {
        for (let i = 0; i < this.resdata.operationMap.length; i++) {
          if (this.resdata.operationMap[i].answerOrNot > 0) {
            kindcount++
          }
        }
      }
      return kindcount
    },

    /**
     *计算已完成的题数总数
     */
    offNum () {
      let arr = []
      let counts = 0
      for (let item in this.resdata.questionOffNum) {
        arr = this.resdata.questionOffNum[item]   //将父对象赋给新定义的数组
        for (let i = 0; i < arr.length; i++) {    //判断每一个子数组里是否有值
          if (arr.length > 0) {                   //若长度>0,则继续判断子数组里的answerOrNot字段是否>0,>0则自动+1
            if (arr[i].answerOrNot > 0) {
              counts++
            }
          }
        }
      }
      //console.log('counts33', counts)
      return counts

      // for (let i = 0; i < this.resdata.questionOffNum.length; i++) {
      //   if (this.resdata.questionOffNum[i].length > 0) {
      //     let resultArr = this.resdata.questionOffNum[i]
      //     for (let j = 0; j < resultArr.length; j++) {
      //       if (resultArr[j].answerOrNot > 0) {
      //         counts++
      //       }
      //     }
      //   }
      // }
    },

    /** 
     * 上一题
     */
    prv () {
      const params = {
        questionNum: this.resdata.questionNum - 1,
      }
      this.judgeType(params)
      this.getSubjectById(params)
    },

    /** 
     * 下一题
     */
    next () {
      const params = {
        questionNum: this.resdata.questionNum + 1,
      }
      this.judgeType(params)
      this.getSubjectById(params)
    },

    /** 
     * 点击答题卡作答
     */
    handleCard (item) {
      const params = {
        questionNum: item.questionNum,
      }
      this.judgeType(params)
      this.getSubjectById(params)
    },

    /**
     * 暂停
     */
    // handleSave () {
    //   clearInterval(this.time)
    // },

    /**
     * 返回
     */
    backhome () {
      this.$confirm('此操作将不保存试卷所选答案，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$message({
          type: 'success',
          message: '已成功返回到主界面!',
        })
        this.saveAll()
        this.$emit('onGoBack')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消返回',
        })
      })
    },

    /**
     * 保存并退出
     */
    saveAndGoBack () {
      this.$confirm('此操作将保存试卷，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.saveAll()
        this.$emit('onGoBack')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消',
        })
      })
    },

    /**
     * 交卷并返回主界面
     */
    handleExamination () {
      this.$confirm('此操作将提交试卷，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        const params = {
          ifCommit: 1,
          remainingTime: this.mins + '-' + this.secs,
        }
        this.judgeType(params)
        this.loading = true
        getTestPageById(params).then(res => {
          if (res.data.code === 0) {
            this.loading = false
            this.dialogShow = true
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消交卷',
        })
      })
    },

    handleCancel () {
      this.$emit('onGoBack')
    },

    /**
     * 小于10自动补零
     */
    num (n) {
      return n < 10 ? '0' + n : '' + n
    },

    /**
     * 倒计时,时间为零则自动交卷并返回主界面
     */
    timer () {
      const _this = this  //声明一个变量指向this，保证作用域一致，只在当前作用域
      this.time = window.setInterval(function () {
        if (_this.secs === 0 && _this.mins > 0) {
          _this.secs = 59
          _this.mins -= 1
        }
        else if (_this.mins === 0 && _this.secs === 0) {
          _this.secs = 0
          window.clearInterval(this.time)
          const params = {
            ifCommit: 1,
            remainingTime: _this.mins + '-' + _this.secs,
          }
          _this.judgeType(params)
          // _this.getSubjectById(params)
          getTestPageById(params).then(res => {
            if (res.data.code === 0) {
              _this.$message({
                type: 'warning',
                message: '考试时间已到，自动交卷！',
              })
              _this.$emit('onGoBack')
            }
            // console.log('时间到啦')
          })
        }
        else {
          _this.secs -= 1
        }
      }, 1000)
    },
  },
}
</script>

<style lang="css" scoped>
.success-box >>> .el-dialog__header {
  display: none;
}
</style>


<style lang="scss" scoped>
.tasks-info {
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #ffdbc1;
  background-color: #fffbf6;

  p {
    margin-bottom: 0;
  }
}

.center-box {
  text-align: center;
  p {
    margin: 0;
  }
  .success-title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    margin: 10px 0 20px;

    i {
      color: #67c23a;
      font-size: 2em;
      margin: 0 10px 0 0;
    }
  }
}
.examShow {
  margin: 20px auto;
  .left {
    .fieldName {
      padding-left: 10px;
      color: #999;
    }
    .question {
      font-size: 15px;
      line-height: 2;
      li {
        list-style-type: none;
      }
    }
    .center {
      width: 100%;
      margin: 30px 0 45px;
    }
  }
  .right {
    // float: right;
    // width: 28%;
    border-left: 0px solid #eee;
    // padding-top: 30px;
    padding-bottom: 75px;
    .container {
      background: #fffbf6;
      border: 1px solid #ffdbc1;
      // background: linear-gradient(
      //   to bottom right,
      //   rgb(55, 15, 68),
      //   rgb(107, 174, 246)
      // );
      .explain {
        text-align: center;
        position: relative;
        top: 78px;
        .count {
          color: $--color-primary;
          font-size: 18px;
        }
        .line {
          color: #595959;
          font-size: 18px;
        }
        .TotalNum {
          color: #595959;
          font-size: 18px;
        }
      }
      .ring {
        padding-top: 15px;
        margin-top: -60px;
      }
      .card {
        text-align: left;
        padding: 10px 18px 0;
        .activess {
          background: #f8e8e9;
          border-color: #e3a4a6;
          color: $--color-primary;
        }
        .active {
          background: $--color-primary;
          border-color: $--color-primary;
          color: #fff;
        }
      }
    }
  }
}
.headerTxt {
  // display: inline-block;
  // vertical-align: middle;
  padding: 0 20px;
}
</style>
<style lang="scss" scoped>
/* TODO:scoped */
.examShow {
  .el-radio__label {
    display: none;
  }
  .el-radio {
    margin: 0 10px 0 28px !important;
  }
  .answerSheet {
    font-size: 18px;
    color: #595959;
  }
  .answerSheetTop {
    border-top: solid 1px #eee;
    padding-top: 6px;
  }
  .choices + .choices {
    margin: 1px;
  }
  .choices {
    width: 41.6px;
    margin-right: 1px;
  }
}
</style>
