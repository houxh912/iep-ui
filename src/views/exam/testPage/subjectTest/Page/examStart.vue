<template>
  <div>
    <div class="header">
      <img src="../img/IG.png">
      <span class="title-one"><b>在线考试系统</b></span>
      <span class="line"></span>
      <span class="title-two">{{resdata.fieldName}}</span>
    </div>

    <div class="examShow">
      <div class="left">
        <span style="font-size: 20px;"><b>{{resdata.kindName}}</b></span>
        <span class="title">共 {{resdata.questionTotalNum}} 题，合计 45 分，已完成 {{count}} / {{resdata.questionTotalNum}}</span>
        <hr>
        <span style="font-size: 15px;"><b>说明：</b></span>
        <span style="font-size: 15px;">{{questionExplain}}</span>
        <div class="question">
          <div style="margin-bottom: 10px;">
            <span>{{resdata.questionNum}}、 </span>
            <span>{{resdata.title}}</span>
            <span> （ {{resdata.single}} 分）</span>
          </div>

          <div v-if="resdata.questionTypeName ==='单选题'">
            <li v-for="(item,index) in resdata.titleOptions" :key="index">
              <el-radio v-model="answerRadio" :label="item.key"></el-radio>
              <span> {{item.key}}、{{item.value}}</span>
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
            <li v-for="(item,index) in resdata.titleOptions" :key="index">
              <el-radio v-model="trueOrFalseRadio" :label="item.value"></el-radio>
              <span>{{item.value}}</span>
            </li>
          </div>

          <!-- <div v-if="resdata.questionType ==='填空题'">
            <li v-for="(item,index) in inputList" :key="index" style="list-style-type:none;margin-left:28px;">
              <span>{{index + 1}}、</span>
              <el-input style="width: 79%;"></el-input>
            </li>
          </div> -->

          <div v-if="resdata.questionTypeName ==='简答题'">
            <li v-for="(item,index) in inputAreaList" :key="index" style="margin-left:28px;">
              <el-input type="textarea" v-model="freeInput" style="width: 79%;" :rows="4"></el-input>
            </li>
          </div>
        </div>

        <div class="center" align="center">
          <iep-button style="margin:0 10px;" @click="prv" :disabled="resdata.questionNum === 1">上一题</iep-button>
          <iep-button style="margin:0 10px;" @click="next" :disabled="resdata.questionNum === resdata.questionTotalNum">下一题</iep-button>
        </div>
      </div>

      <div class="right" style="" v-if="resdata.title">
        <div class="container">
          <div class="explain">
            <span style="color: white;">当前进度</span><br>
            <span class="count">{{count}}</span>
            <span class="line"> / </span>
            <span class="TotalNum">{{resdata.questionTotalNum}}</span>
          </div>

          <ve-ring class="ring" height="200px" :data="chartData" :settings="chartSettings" :tooltip-visible="false" :legend-visible="false" :colors="colors"></ve-ring>

          <div class="card">
            <div v-if="resdata.radioMap.length > 0">
              <span class="answerSheet">单选题</span>
              <div class="answerSheetTop">
                <iep-button class="choices" v-for="(item,index) in resdata.radioMap" :key="index" @click="handleTypeOne(item)" :style="statusColor(item.answerOrNot)">{{item.id}}</iep-button>
              </div><br>
            </div>

            <div v-if="resdata.checkboxMap.length > 0">
              <span class="answerSheet">复选题</span>
              <div class="answerSheetTop">
                <iep-button class="choices" v-for="(item,index) in resdata.checkboxMap" :key="index" @click="handleTypeTwo(item)" :style="statusColor(item.answerOrNot)">{{item.id}}</iep-button>
              </div><br>
            </div>

            <div v-if="resdata.checkedMap.length > 0">
              <span class="answerSheet">判断题</span>
              <div class="answerSheetTop">
                <iep-button class="choices" v-for="(item,index) in resdata.checkedMap" :key="index" @click="handleTypeThree(item)" :style="statusColor(item.answerOrNot)">{{item.id}}</iep-button>
              </div><br>
            </div>

            <div v-if="resdata.textMap.length > 0">
              <span class="answerSheet">简答题</span>
              <div class="answerSheetTop">
                <iep-button class="choices" v-for="(item,index) in resdata.textMap" :key="index" @click="handleTypeFour(item)" :style="statusColor(item.answerOrNot)">{{item.id}}</iep-button>
              </div><br>
            </div>

          </div>
        </div>
      </div>
    </div>

    <footer-tool-bar>
      <span class="headerTxt">准考证号：{{examNo}}</span>
      <span class="headerTxt">剩余时间：{{min}} 分：{{sec}} 秒</span>
      <!-- <iep-button @click="handleSave">暂停</iep-button> -->
      <iep-button @click="backhome">返回</iep-button>
      <iep-button style="margin-right: 30px;" @click="saveAndGoBack">保存并退出</iep-button>
      <iep-button type="primary" @click="handleExamination">交卷</iep-button>
    </footer-tool-bar>
  </div>
</template>

<script>
import { getTestPageById } from '@/api/exam/testPage/subjectTest/examStart'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  props: ['record'],
  data () {
    this.colors = ['#409AF9', '#FFFFFF']
    this.chartSettings = {
      radius: [40, 50],
      offsetY: 100,
    }
    return {
      answerRadio: '',        //单选(v-model绑定的值)
      checksList: [],         //复选(v-model绑定的值)
      trueOrFalseRadio: '',   //判断(v-model绑定的值)
      freeInput: '',          //简答(v-model绑定的值)
      inputAreaList: [''],
      questionExplain: '本题来源于国脉内网、水巢、数据基因、技能类、知识类、数据能力类、基本能力类、项目管理类、公司常识类、人力资源类等。',
      mins: 45,
      secs: 0,
      time: '',   //定义定时器
      examNo: '2019052568969',
      chartData: {
        columns: ['是否完成', '进度'],
        rows: '',
      },
      statusColor: function (val) {
        if (val === 1) {
          return 'background:#409eff;borderColor:#409eff;color:#fff'
        } else {
          return 'background:#fff;color:#409eff'
        }
      },
      resdata: {
        questionOffNum: [],  //已完成的题数
        questionTotalNum: '',//题目总数
        titleOptions: [],    //答案选项数组
        radioMap: [],        //答题卡片的单选题数组集合，从数组中遍历题目出来
        checkboxMap: [],     //答题卡片的复选题数组集合，从数组中遍历题目出来
        checkedMap: [],      //答题卡片的判断题数组集合，从数组中遍历题目出来
        textMap: [],         //答题卡片的简答题数组集合，从数组中遍历题目出来
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
    count: function () {
      return this.offNum()
    },
    residueCount: function () {
      return this.resdata.questionTotalNum - this.count
    },
  },
  mounted () {
    this.timer()
  },
  created () {
    this.loadPage()
  },
  beforeDestroy () {
    this.saveAll()   //去到其他界面将自动保存
    clearInterval(this.time)
    this.time = null

  },
  destroyed () {

  },
  methods: {
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
        params.userAnswer = JSON.stringify(this.checksList)
      }
      if (type === '判断题') {
        params.userAnswer = this.trueOrFalseRadio
      }
      if (type === '简答题') {
        params.userAnswer = this.freeInput
      }
    },

    /**
     * 获取题目的详细数据(公用请求方法)
     */
    getSubjectById (params) {
      getTestPageById(params).then(res => {
        const record = res.data.data
        this.resdata = record
        this.chartData.rows = record.questionStatus
        this.resdata.questionOffNum = record.questionNumList
        this.resdata.questionTotalNum = record.questionNumList.checkboxMap.length + record.questionNumList.checkedMap.length + record.questionNumList.radioMap.length + record.questionNumList.textMap.length
        this.resdata.titleOptions = record.titleOptions ? JSON.parse(record.titleOptions) : []
        this.resdata.radioMap = record.questionNumList.radioMap
        this.resdata.checkboxMap = record.questionNumList.checkboxMap
        this.resdata.checkedMap = record.questionNumList.checkedMap
        this.resdata.textMap = record.questionNumList.textMap
        if (record.questionTypeName === '单选题') {
          this.answerRadio = record.userAnswer
        }
        if (record.questionTypeName === '复选题') {
          this.checksList = JSON.parse(record.userAnswer)
        }
        if (record.questionTypeName === '判断题') {
          this.trueOrFalseRadio = record.userAnswer
        }
        if (record.questionTypeName === '简答题') {
          this.freeInput = record.userAnswer
        }
        // console.log('ttt', this.resdata)
      })
    },

    /**
     * 提示语加自动保存(公用方法)
     */
    saveAll () {
      const params = {
        remainingTime: this.min + '-' + this.sec,
      }
      this.judgeType(params)
      this.getSubjectById(params)
      this.$message({
        type: 'success',
        message: '自动保存成功!',
      })
    },

    /**
     * 首次进入页面加载题目
     */
    loadPage () {
      const params = {
        examId: this.record.id,
        currentQuestionNum: this.resdata.questionNum,
        questionNum: this.resdata.questionNum,
      }
      this.getSubjectById(params)
    },

    /**
     *计算已完成的题数
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
      console.log('counts33', counts)
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
     * 点击单选题答题卡
     */
    handleTypeOne (item) {
      const params = {
        examId: this.record.id,
        currentQuestionNum: this.resdata.questionNum,
        questionNum: item.id,
        userAnswer: this.answerRadio,
      }
      this.getSubjectById(params)
    },

    /**
     * 点击复选题答题卡
     */
    handleTypeTwo (item) {
      const params = {
        examId: this.record.id,
        currentQuestionNum: this.resdata.questionNum,
        questionNum: item.id,
        userAnswer: JSON.stringify(this.checksList),
      }
      this.getSubjectById(params)
    },

    /**
     * 点击判断题答题卡
     */
    handleTypeThree (item) {
      const params = {
        examId: this.record.id,
        currentQuestionNum: this.resdata.questionNum,
        questionNum: item.id,
        userAnswer: this.trueOrFalseRadio,
      }
      this.getSubjectById(params)
    },

    /**
     * 点击简答题答题卡
     */
    handleTypeFour (item) {
      const params = {
        examId: this.record.id,
        currentQuestionNum: this.resdata.questionNum,
        questionNum: item.id,
        userAnswer: this.freeInput,
      }
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
      this.$confirm('此操作将自动保存试卷并返回主页面，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
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
          remainingTime: this.min + '-' + this.sec,
        }
        this.judgeType(params)
        this.getSubjectById(params)
        this.$message({
          type: 'success',
          message: '交卷成功!',
        })
        this.$emit('onGoBack')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消交卷',
        })
      })
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
        if (_this.secs === 0 && _this.mins !== 0) {
          _this.secs = 59
          _this.mins -= 1
        }
        else if (_this.mins === 0 && _this.secs === 0) {
          _this.secs = 0
          window.clearInterval(this.time)
          const params = {
            remainingTime: _this.min + '-' + _this.sec,
          }
          _this.judgeType(params)
          _this.getSubjectById(params)
          _this.$message({
            type: 'warning',
            message: '考试时间已到，自动交卷！',
          })
          _this.$emit('onGoBack')
        }
        else {
          _this.secs -= 1
        }
      }, 1000)
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  background: -webkit-linear-gradient(left, rgb(64, 156, 252), rgb(100, 6, 10));
  background: -moz-linear-gradient(right, rgb(64, 156, 252), rgb(100, 6, 10));
  background: -o-linear-gradient(right, rgb(64, 156, 252), rgb(100, 6, 10));
  background: linear-gradient(to right, rgb(64, 156, 252), rgb(100, 6, 10));
  padding: 15px 20px;
  width: 100%;
  height: 60px;
  img {
    margin-top: -2px;
    float: left;
  }
  .title-one {
    font-size: 19px;
    float: left;
    color: #fff;
  }
  .line {
    height: 20px;
    width: 2px;
    background: #fff;
    margin: 6px 15px 0 15px;
    float: left;
  }
  .title-two {
    font-size: 17px;
    float: left;
    color: #fff;
    margin-top: 3px;
  }
}
.examShow {
  margin: 20px auto;
  width: 89%;
  .left {
    float: left;
    width: 70%;
    .title {
      font-size: 15px;
      margin-left: 25px;
    }
    .question {
      margin-top: 15px;
      font-size: 15px;
      li {
        list-style-type: none;
      }
    }
    .center {
      width: 100%;
      margin: 50px 0 100px 0;
    }
  }
  .right {
    float: right;
    width: 28%;
    border-left: 1px solid #eee;
    padding-bottom: 75px;
    .container {
      float: right;
      width: 250px;
      background: linear-gradient(
        to bottom right,
        rgb(55, 15, 68),
        rgb(107, 174, 246)
      );
      .explain {
        text-align: center;
        position: relative;
        top: 65px;
        .count {
          color: rgb(65, 153, 248);
          font-size: 18px;
        }
        .line {
          color: white;
          font-size: 18px;
        }
        .TotalNum {
          color: white;
          font-size: 18px;
        }
      }
      .ring {
        padding-top: 15px;
        margin-top: -75px;
      }
      .card {
        text-align: left;
        padding: 0 18px;
      }
    }
  }
}

.headerTxt {
  padding: 0 20px;
}
</style>
<style>
.el-radio__label {
  display: none;
}
.el-radio {
  margin: 0 10px 0 28px !important;
}
.answerSheet {
  font-size: 18px;
  color: white;
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
</style>
