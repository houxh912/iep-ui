<template>
  <div>
    <div class="header">
      <img src="../img/IG.png" style="margin-top: -2px;float: left;">
      <span style="font-size:19px;float: left;color: #fff;"><b>在线考试系统</b></span>
      <span style="height: 20px;width:2px;background: #fff;margin: 6px 15px 0 15px;float: left;"></span>
      <span style="font-size:17px;float:left;color: #fff;margin-top:3px;">{{resdata.field}}</span>
    </div>

    <div class="examShow">
      <div style="float: left; width: 70%;">
        <span style="font-size: 20px;"><b>{{resdata.kind}}</b></span>
        <span style="font-size: 15px;margin-left: 25px;">共 {{resdata.questionTotalNum}} 题，合计 45 分，已完成 {{questionTypeOnePer}} / {{resdata.questionTotalNum}}</span>
        <hr>
        <span style="font-size: 15px;"><b>说明：</b></span>
        <span style="font-size: 15px;">{{questionExplain}}</span>
        <div style="margin-top: 15px;font-size: 15px;">
          <div style="margin-bottom: 10px;">
            <span>{{resdata.questionNum}}、 </span>
            <span>{{resdata.title}}</span>
            <span> （ 3 分）</span>
          </div>

          <div v-if="resdata.questionType ==='单选题'">
            <li v-for="(item,index) in resdata.titleOptions" :key="index" style="list-style-type:none;">
              <el-radio v-model="answerRadio" :label="item.key"></el-radio>
              <span> {{item.key}}、{{item.value}}</span>
            </li>
          </div>

          <div v-if="resdata.questionType ==='多选题'">
            <el-checkbox-group v-model="checksList" style="margin-left: 28px;">
              <el-checkbox style="margin-right: 100%;" v-for="item in checkboxList" :label="item.option" :key="item.option">
                <span>{{item.option}} . {{item.answer}}</span>
              </el-checkbox>
            </el-checkbox-group>
          </div>

          <div v-if="resdata.questionType ==='判断题'">
            <li v-for="(item,index) in trueOrFalseList" :key="index" style="list-style-type:none;">
              <el-radio v-model="trueOrFalseRadio" :label="index"></el-radio>
              <span>{{item}}</span>
            </li>
          </div>

          <!-- <div v-if="resdata.questionType ==='填空题'">
            <li v-for="(item,index) in inputList" :key="index" style="list-style-type:none;margin-left:28px;">
              <span>{{index + 1}}、</span>
              <el-input style="width: 79%;"></el-input>
            </li>
          </div> -->

          <div v-if="resdata.questionType ==='简答题'">
            <li v-for="(item,index) in inputAreaList" :key="index" style="list-style-type:none;margin-left:28px;">
              <span>{{index + 1}}、</span>
              <el-input type="textarea" v-model="freeInput" style="width: 79%;" :rows="3"></el-input>
            </li>
          </div>
        </div>

        <div align="center" style="width:100%;margin:50px 0 100px 0;">
          <iep-button style="margin:0 10px;" @click="prv" :disabled="resdata.questionNum === 1">上一题</iep-button>
          <iep-button style="margin:0 10px;" @click="next" :disabled="resdata.questionNum === resdata.questionTotalNum">下一题</iep-button>
        </div>
      </div>

      <div style="float:right;width: 28%;border-left: 1px solid #eee;padding-bottom: 75px;">
        <div style="float:right;width: 250px;background: linear-gradient(to bottom right, rgb(55, 15, 68) , rgb(107, 174, 246));">
          <div style="text-align: center;position: relative;top: 65px;">
            <span style="color: white;">当前进度</span><br>
            <span style="color: rgb(65, 153, 248);font-size: 18px;">{{questionTypeOnePer}}</span>
            <span style="color: white;font-size: 18px;"> / </span>
            <span style="color: white;font-size: 18px;">{{resdata.questionTotalNum}}</span>
          </div>

          <ve-ring style="padding-top: 15px;margin-top: -75px;" height="200px" :data="chartData" :settings="chartSettings" :tooltip-visible="false" :legend-visible="false" :colors="colors"></ve-ring>

          <div style="text-align: left;padding: 0 18px;">
            <div>
              <span class="answerSheet">单选题</span>
              <div class="answerSheetTop">
                <iep-button class="choices" v-for="(item,index) in resdata.radioMap" :key="index" @click="handleTypeOne(index)" :style="statusColor(item.status)">{{index+1}}</iep-button>
              </div><br>
            </div>

            <div>
              <span class="answerSheet">多选题</span>
              <div class="answerSheetTop">
                <iep-button class="choices" v-for="(item,index) in resdata.checkboxMap" :key="index" @click="handleTypeTwo(index)">{{resdata.checkboxCardStartId+index+1}}</iep-button>
              </div><br>
            </div>

            <div>
              <span class="answerSheet">判断题</span>
              <div class="answerSheetTop">
                <iep-button class="choices" v-for="(item,index) in resdata.checkedMap" :key="index" @click="handleTypeThree(index)">{{resdata.checkedCardStartId+index+1}}</iep-button>
              </div><br>
            </div>

            <div>
              <span class="answerSheet">简答题</span>
              <div class="answerSheetTop">
                <iep-button class="choices" v-for="(item,index) in resdata.textMap" :key="index" @click="handleTypeFour(index)">{{resdata.textCardStartId+index+1}}</iep-button>
              </div><br>
            </div>

          </div>
        </div>
      </div>
    </div>
    <footer-tool-bar>
      <span class="headerTxt">准考证号：{{examNo}}</span>
      <span class="headerTxt">剩余时间：{{min}} 分：{{sec}} 秒</span>
      <iep-button>保存</iep-button>
      <iep-button style="margin-right: 30px;">保存并退出</iep-button>
      <iep-button type="primary" @click="handleGoBack">交卷</iep-button>
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
      checksList: [],         //多选(v-model绑定的值)
      trueOrFalseRadio: '',   //判断(v-model绑定的值)
      freeInput: '',          //简答(v-model绑定的值)
      trueOrFalseList: ['正确', '错误'],
      checkboxList: [
        { option: 'A', answer: '123456' },
        { option: 'B', answer: '456789' },
        { option: 'C', answer: '789456' },
        { option: 'D', answer: '123789' },
        { option: 'E', answer: '789123' },
      ],
      //inputList: ['', ''],
      inputAreaList: ['', ''],
      questionExplain: '本题来源于国脉内网、水巢、数据基因、技能类、知识类、数据能力类、基本能力类、项目管理类、公司常识类、人力资源类等。',
      questionTypeOnePer: 1,
      mins: 45,
      secs: 0,
      examNo: '2019052568969',
      chartData: {
        columns: ['是否完成', '进度'],
        rows: [
          { '是否完成': '已完成', '进度': 1 },
          { '是否完成': '未完成', '进度': 23 },
        ],
      },
      statusColor: function (val) {
        if (val === 1) {
          return 'background:#409eff;borderColor:#409eff;color:#fff'
        } else {
          return 'background:#fff;color:#409eff'
        }
      },
      resdata: {
        questionTotalNum: '',//题目总数
        titleOptions: [],    //答案选项数组
        radioMap: [],        //答题卡片的单选题数组集合，从数组中遍历题目出来
        checkboxMap: [],     //答题卡片的多选题数组集合，从数组中遍历题目出来
        checkedMap: [],      //答题卡片的判断题数组集合，从数组中遍历题目出来
        textMap: [],         //答题卡片的简答题数组集合，从数组中遍历题目出来
        checkboxCardStartId: '',  //答题卡多选题的开始题号(单选题的题号直接显示index+1即可)
        checkedCardStartId: '',   //答题卡判断题的开始题号
        textCardStartId: '',      //答题卡简答题的开始题号
      },
      // params: {
      //   examId: this.record.id,
      //   currentQuestionNum: this.resdata.questionNum,
      // }
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
  },
  mounted () {
    this.timer()
  },
  created () {
    this.loadPage()
  },
  methods: {
    /**
     * 判断题型(公用方法)
     */
    judgeSubject (params) {
      const type = this.resdata.questionType
      if (type === '单选题') {
        params.userAnswer = this.answerRadio
      }
      if (type === '多选题') {
        params.userAnswer = this.checksList
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
        this.resdata = res.data
        this.resdata.questionTotalNum = res.data.questionNumList.checkboxMap.length + res.data.questionNumList.checkedMap.length + res.data.questionNumList.radioMap.length + res.data.questionNumList.textMap.length
        this.resdata.titleOptions = JSON.parse(res.data.titleOptions)
        this.resdata.radioMap = res.data.questionNumList.radioMap
        this.resdata.checkboxMap = res.data.questionNumList.checkboxMap
        this.resdata.checkedMap = res.data.questionNumList.checkedMap
        this.resdata.textMap = res.data.questionNumList.textMap
        this.resdata.checkboxCardStartId = res.data.questionNumList.radioMap.length
        this.resdata.checkboxCardStartId = res.data.questionNumList.radioMap.length + res.data.questionNumList.checkboxMap.length
        this.resdata.checkboxCardStartId = res.data.questionNumList.radioMap.length + res.data.questionNumList.checkboxMap.length + res.data.questionNumList.checkedMap.length
        if (res.data.questionType === '单选题') {
          this.answerRadio = res.data.userAnswer
        }
        if (res.data.questionType === '多选题') {
          this.checksList = res.data.userAnswer
        }
        if (res.data.questionType === '判断题') {
          this.trueOrFalseRadio = res.data.userAnswer
        }
        if (res.data.questionType === '简答题') {
          this.freeInput = res.data.userAnswer
        }
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
     * 上一题
     */
    prv () {
      const params = {
        examId: this.record.id,
        currentQuestionNum: this.resdata.questionNum,
        questionNum: this.resdata.questionNum - 1,
      }
      this.judgeSubject(params)
      this.getSubjectById(params)
    },

    /** 
     * 下一题
     */
    next () {
      const params = {
        examId: this.record.id,
        currentQuestionNum: this.resdata.questionNum,
        questionNum: this.resdata.questionNum + 1,
      }
      this.judgeSubject(params)
      this.getSubjectById(params)
    },

    /**
     * 点击单选题答题卡
     */
    handleTypeOne (index) {
      const params = {
        examId: this.record.id,
        currentQuestionNum: this.resdata.questionNum,
        questionNum: index + 1,
        userAnswer: this.answerRadio,
      }
      this.getSubjectById(params)
    },

    /**
     * 点击多选题答题卡
     */
    handleTypeTwo (index) {
      const params = {
        examId: this.record.id,
        currentQuestionNum: this.resdata.questionNum,
        questionNum: this.resdata.checkboxCardStartId + index + 1,
        userAnswer: this.checksList,
      }
      this.getSubjectById(params)
    },

    /**
     * 点击判断题答题卡
     */
    handleTypeThree (index) {
      const params = {
        examId: this.record.id,
        currentQuestionNum: this.resdata.questionNum,
        questionNum: this.resdata.checkedCardStartId + index + 1,
        userAnswer: this.trueOrFalseRadio,
      }
      this.getSubjectById(params)
    },

    /**
     * 点击简答题答题卡
     */
    handleTypeFour (index) {
      const params = {
        examId: this.record.id,
        currentQuestionNum: this.resdata.questionNum,
        questionNum: this.resdata.textCardStartId + index + 1,
        userAnswer: this.freeInput,
      }
      this.getSubjectById(params)
    },

    /**
     * 交卷并返回主界面
     */
    handleGoBack () {
      this.$confirm('此操作将提交试卷，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        const params = {
          examId: this.record.id,
          currentQuestionNum: this.resdata.questionNum,
          questionNum: this.resdata.questionNum + 1,
          remainingTime: this.min + '-' + this.sec,
        }
        this.judgeSubject(params)
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

    num (n) {
      return n < 10 ? '0' + n : '' + n
    },

    /**
     * 倒计时,时间为零则自动交卷并返回主界面
     */
    timer () {
      var _this = this  //声明一个变量指向this，保证作用域一致，只在当前作用域
      var time = window.setInterval(function () {
        if (_this.secs === 0 && _this.mins !== 0) {
          _this.secs = 59
          _this.mins -= 1
        }
        else if (_this.mins === 0 && _this.secs === 0) {
          _this.secs = 0
          window.clearInterval(time)
          const params = {
            examId: _this.record.id,
            currentQuestionNum: _this.resdata.questionNum,
            questionNum: _this.resdata.questionNum + 1,
            remainingTime: _this.min + '-' + _this.sec,
          }
          _this.judgeSubject(params)
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
.examShow {
  margin: 20px auto;
  width: 89%;
}
.header {
  background: -webkit-linear-gradient(left, rgb(64, 156, 252), rgb(100, 6, 10));
  background: -moz-linear-gradient(right, rgb(64, 156, 252), rgb(100, 6, 10));
  background: -o-linear-gradient(right, rgb(64, 156, 252), rgb(100, 6, 10));
  background: linear-gradient(to right, rgb(64, 156, 252), rgb(100, 6, 10));
  padding: 15px 20px;
  width: 100%;
  height: 60px;
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

