<template>
  <div>
    <div class="header">
      <span class="title1"><b>在线考试系统</b></span>
      <span class="title2"></span>
      <span class="title3">{{resdata.fieldName}}</span>
      <span class="title4">
        评分进度<span class="title5">{{count}}</span> / {{resdata.questionTotalNum}}</span>
    </div>

    <div class="examShowss" style="background-color:#fff">
      <div class="left">
        <span style="font-size: 20px;"><b>{{resdata.questionTypeName}}</b></span>
        <span class="title1">共 {{resdata.kindTotalNum}} 题，合计 {{resdata.kindMark}} 分，已完成 {{kindOffCount}} / {{resdata.kindTotalNum}}</span>
        <hr>
        <div class="container">
          <div style="margin-bottom: 10px;">
            <span>{{resdata.questionNum}}、 </span>
            <span>{{resdata.title}}</span>
            <span> （ {{resdata.single}} 分）</span>
          </div>

          <!-- <div>
            <li v-for="(item,index) in fillAreaList" :key="index" style="margin-left:28px;">
              <el-input type="textarea" v-model="userByAnswer" style="width: 70%;margin-top:10px" :rows="2"></el-input>
              <el-input  class="give-mark" v-model="fillInput"></el-input>
              <span style="margin-left:10px;">分</span>
            </li>
          </div> -->

          <div>
            <li v-for="(item,index) in inputAreaList" :key="index" style="margin-left:28px;">
              <el-input type="textarea" v-model="userByAnswer" style="width: 80%;margin-top:10px" :rows="6"></el-input>
              <el-input class="give-mark-two" v-model="freeInput"></el-input>
              <span style="margin-left:10px;">分</span>
            </li>
          </div>

          <!-- <div>
            <li v-for="(item,index) in operationList" :key="index" style="margin-left:28px;display:flex">
              <iep-froala-editor v-model="userByAnswer" style="width:80%"></iep-froala-editor>
              <el-input  class="give-mark-three" v-model="operation"></el-input>
              <span style="margin-left:15px;margin-top:175px">分</span>
            </li>
          </div> -->

          <div class="center" align="center">
            <iep-button style="margin:0 10px;" @click="prv" :disabled="resdata.firstOrLastQuestion === 0">上一题</iep-button>
            <iep-button style="margin:0 10px;" @click="next" :disabled="resdata.firstOrLastQuestion === 1">下一题</iep-button>
            <iep-button style="margin:0 10px;" @click="saveAndGoBack">保存并退出</iep-button>
          </div>
        </div>
      </div>

      <div class="right" v-if="resdata.title">
        <div class="container">
          <div class="top">
            <span class="titleone">本题得分</span><br>
            <span class="titletwoss">
              <el-input class="fen" v-model="showScore"></el-input>
            </span>
            <span class="titlethree"> / </span>
            <span class="titlefour">{{resdata.single}}</span>
          </div>

          <ve-ring style="padding-top: 15px;margin-top: -75px;" height="160px" :data="chartData" :settings="chartSettings" :tooltip-visible="false" :legend-visible="false" :colors="colors"></ve-ring>

          <div class="card">
            <!-- <div v-if="resdata.textMap.length > 0">
              <span class="answerSheet">填空题</span>
              <div class="answerSheetTop">
                <iep-button class="choices" v-for="(item,index) in resdata.textMap" :key="index" @click="handleCard(item)" :class="{'activess':item.answerOrNot===1,'active': item.questionNum == resdata.questionNum}">{{item.questionNum}}</iep-button>
              </div><br>
            </div> -->

            <div v-if="resdata.textMap.length > 0">
              <span class="answerSheet">简答题</span>
              <div class="answerSheetTop">
                <iep-button class="choices" v-for="(item,index) in resdata.textMap" :key="index" @click="handleCard(item)" :class="{'activess':item.answerOrNot===1,'active': item.questionNum == resdata.questionNum}">{{item.questionNum}}</iep-button>
              </div><br>
            </div>

            <!-- <div v-if="resdata.Map.length > 0">
              <span class="answerSheet">实操题</span>
              <div class="answerSheetTop">
                <iep-button class="choices" v-for="(item,index) in resdata.checkedMap" :key="index" @click="handleCard(item)" :class="{'activess':item.answerOrNot===1,'active': item.questionNum == resdata.questionNum}">{{item.questionNum}}</iep-button>
              </div><br>
            </div> -->
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { passWrittenById } from '@/api/exam/examLibrary/examReading/examReading'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  props: ['formData'],
  data () {
    this.colors = ['#409AF9', '#FFFFFF']
    this.chartSettings = {
      radius: [50, 60],
      offsetY: 80,
    }
    return {
      userByAnswer: '',        //显示用户答案的输入框(v-model绑定的值)
      showScore: '',           //答题卡上显示的分数(v-model绑定的值)
      fillInput: '',           //填空(v-model绑定的值)
      freeInput: '',           //简答(v-model绑定的值)
      operation: '',           //实操(v-model绑定的值)
      fillAreaList: ['', ''],  //填空
      inputAreaList: [''],     //简答
      operationList: [''],     //实操
      chartData: {
        columns: ['是否完成', '进度'],
        rows: [
          { '是否完成': '已完成', '进度': '' },
          { '是否完成': '未完成', '进度': '' },
        ],
      },
      resdata: {
        kindTotalNum: '',    //每种题型合计题数
        kindMark: '',        //每种题型合计分数
        questionOffNum: [],  //已完成的题数
        questionTotalNum: '',//题目总数
        titleOptions: [],    //答案选项数组
        textMap: [],         //答题卡片的简答题数组集合，从数组中遍历题目出来
      },
    }
  },
  watch: {

  },
  computed: {
    kindOffCount: function () {
      return this.kindOffNum()
    },
    count: function () {
      return this.offNum()
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    /**
     * 判断题型(公用方法)
     */
    judgeType (params) {
      params.examId = this.formData.examId
      params.currentQuestionNum = this.resdata.questionNum
      const type = this.resdata.questionTypeName
      if (type === '填空题') {
        if (this.fillInput > 0) {
          params.score = this.fillInput
          params.judgeId = this.formData.judgeId
        } else {
          params.score = ''
        }
      }
      if (type === '简答题') {
        if (this.freeInput > 0) {
          params.score = this.freeInput
          params.judgeId = this.formData.judgeId
        } else {
          params.score = ''
        }
      }
      if (type === '实操题') {
        if (this.operation > 0) {
          params.score = this.operation
          params.judgeId = this.formData.judgeId
        } else {
          params.score = ''
        }
      }
    },

    /**
     * 获取题目的详细数据(公用请求方法)
     */
    getSubjectById (params) {
      passWrittenById(params).then(res => {
        const record = res.data.data
        this.userByAnswer = record.userAnswer
        this.showScore = record.score
        this.resdata = record
        this.resdata.questionOffNum = record.questionNumList
        this.resdata.questionTotalNum = record.questionNumList.textMap.length
        this.resdata.textMap = record.questionNumList.textMap
        if (this.resdata.questionTypeName === '简答题') {
          this.freeInput = record.score
          this.resdata.kindTotalNum = record.questionNumList.textMap.length
          this.resdata.kindMark = record.questionNumList.textMap[0].grade * this.resdata.kindTotalNum
        }
        //console.log('hhh', this.resdata.questionTotalNum)
      })
    },

    /**
     * 首次进入页面获取题目的详细数据
     */
    loadPage () {
      const params = {
        examId: this.formData.examId,
      }
      this.getSubjectById(params)
    },

    /**
     *计算每种题型已完成的题数
     */
    kindOffNum () {
      let kindcount = 0
      const type = this.resdata.questionTypeName
      if (type === '简答题') {
        for (let i = 0; i < this.resdata.textMap.length; i++) {
          if (this.resdata.textMap[i].answerOrNot > 0) {
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
      return counts
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
     * 点击答题卡
     */
    handleCard (item) {
      const params = {
        questionNum: item.questionNum,
      }
      this.judgeType(params)
      this.getSubjectById(params)
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
        const params = {
          ifCommit: 1,
        }
        this.judgeType(params)
        this.getSubjectById(params)
        this.$message({
          type: 'success',
          message: '保存成功!',
        })
        this.$emit('close', false)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消',
        })
      })
    },

  },
}
</script>
<style lang="scss" scoped>
.header {
  background-color: #fafafa;
  // background: -webkit-linear-gradient(left, rgb(64, 156, 252), rgb(100, 6, 10));
  // background: -moz-linear-gradient(right, rgb(64, 156, 252), rgb(100, 6, 10));
  // background: -o-linear-gradient(right, rgb(64, 156, 252), rgb(100, 6, 10));
  // background: linear-gradient(to right, rgb(64, 156, 252), rgb(100, 6, 10));
  padding: 15px 20px;
  width: 100%;
  height: 60px;
  img {
    margin-top: -2px;
    float: left;
  }
  .title1 {
    font-size: 19px;
    float: left;
    color: #595959;
  }
  .title2 {
    height: 20px;
    width: 2px;
    background: #595959;
    margin: 6px 15px 0 15px;
    float: left;
  }
  .title3 {
    font-size: 17px;
    float: left;
    color: #595959;
    margin-top: 3px;
  }
  .title4 {
    font-size: 15px;
    float: left;
    color: #595959;
    margin-top: 3px;
    margin-left: 150px;
    .title5 {
      color: rgb(65, 153, 248);
      margin-left: 15px;
    }
  }
}
.examShowss {
  margin: 20px auto;
  width: 89%;
  overflow: hidden;
  .left {
    float: left;
    width: 70%;
    .title1 {
      font-size: 15px;
      margin-left: 25px;
    }
    .container {
      margin-top: 15px;
      font-size: 15px;
      li {
        list-style-type: none;
      }
      .center {
        width: 100%;
        margin: 50px 0 0 0;
      }
    }
  }
  .right {
    float: right;
    width: 28%;
    border-left: 0px solid #eee;
    padding-bottom: 75px;
    .container {
      float: right;
      width: 280px;
      margin-top: 30px;
      background: #fffbf6;
      border: 1px solid #ffdbc1;
      // background: linear-gradient(
      //   to bottom right,
      //   rgb(55, 15, 68),
      //   rgb(107, 174, 246)
      // );
      .top {
        text-align: center;
        position: relative;
        top: 40px;
        .titleone {
          color: #595959;
          font-size: 30px;
        }
        .titletwoss {
          color: #e6a23c;
          font-size: 40px;
          .fen {
            width: 22%;
            font-size: 40px;
          }
        }
        .titlethree {
          color: #595959;
          font-size: 20px;
          margin-left: -2px;
        }
        .titlefour {
          color: #595959;
          font-size: 20px;
        }
      }
      .card {
        text-align: left;
        padding: 0 18px;
        .activess {
          background: #f8e8e9;
          border-color: #e3a4a6;
          color: #ba1b21;
        }
        .active {
          background: #ba1b21;
          border-color: #ba1b21;
          color: #fff;
        }
      }
    }
  }
}
.headerTxt {
  padding: 0 20px;
}
</style>
<style lang="scss">
.examShowss {
  .give-mark {
    width: 7%;
    height: 50px;
    //margin-top: 20px;
    margin-left: 100px;
    .el-input__inner {
      height: 50px;
      color: #ff6666;
      font-size: 20px;
      text-align: center;
    }
  }
  .give-mark-two {
    width: 8%;
    height: 70px;
    margin-left: 50px;
    .el-input__inner {
      width: 60px;
      height: 50px;
      margin-top: -40px;
      color: #ff6666;
      font-size: 20px;
      text-align: center;
    }
  }
  .give-mark-three {
    width: 10%;
    height: 74px;
    margin-left: 30px;
    margin-top: 150px;
    .el-input__inner {
      width: 80px;
      height: 74px;
      color: #ff6666;
      font-size: 20px;
      text-align: center;
    }
  }
  .titletwoss {
    .el-input__inner {
      width: 139%;
      color: #e6a23c;
      border: 0px solid #494884;
      background: none;
    }
  }
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
