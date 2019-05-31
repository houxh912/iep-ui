<template>
  <div>
    <div class="header">
      <img src="./IG.png" style="margin-top: -2px;float: left;">
      <span style="font-size:19px;float: left;color: #fff;"><b>在线考试系统</b></span>
      <span style="height: 20px;width:2px;background: #fff;margin: 6px 15px 0 15px;float: left;"></span>
      <span style="font-size:17px;float:left;color: #fff;margin-top:3px;">内网考试</span>
      <span style="font-size:15px;float:left;color: #fff;margin-top:3px;margin-left:150px">
        评分进度<span style="color: rgb(65, 153, 248);margin-left:15px">5</span> / 23</span>
    </div>

    <div class="examShow" style="background-color:#fff">
      <div style="float: left; width: 70%;">
        <span style="font-size: 20px;"><b>填空题</b></span>
        <span style="font-size: 15px;margin-left: 25px;">共 5 题，合计 5 分，已完成 {{count}} / {{resdata.questionTotalNum}}</span>
        <hr>
        <div style="margin-top: 15px;font-size: 15px;">
          <div style="margin-bottom: 10px;">
            <span>1、 </span>
            <span>公司共有战略决策委员会、__人力与技术委员会____、市场与营销委员会、_______________、项目执行与质量委员会五大委员会。</span>
            <span> （ 1 分）</span>
          </div>

          <!-- <div>
            <li v-for="(item,index) in fillAreaList" :key="index" style="list-style-type:none;margin-left:28px;">
              <el-input type="textarea" v-model="fillInput" style="width: 70%;margin-top:10px" :rows="3"></el-input>
              <el-input v-model="freeInput" class="give-mark"></el-input>
              <span style="margin-left:10px;">分</span>
            </li>
          </div> -->

          <!-- <div>
            <li v-for="(item,index) in inputAreaList" :key="index" style="list-style-type:none;margin-left:28px;">
              <el-input type="textarea" v-model="freeInput" style="width: 75%;margin-top:10px" :rows="6"></el-input>
              <el-input v-model="freeInput" class="give-mark-two"></el-input>
              <span style="margin-left:-20px;">分</span>
            </li>
          </div> -->

          <div>
            <li v-for="(item,index) in operationList" :key="index" style="list-style-type:none;margin-left:28px;">
              <iep-froala-editor v-model="operation"></iep-froala-editor>
              <el-input v-model="freeInput" class="give-mark-three"></el-input>
              <span style="margin-left:-27px;">分</span>
            </li>
          </div>

          <div align="center" style="width:100%;margin:50px 0 50px 0;">
            <iep-button style="margin:0 10px;" @click="prv" :disabled="resdata.questionNum === 1">上一题</iep-button>
            <iep-button style="margin:0 10px;" @click="next" :disabled="resdata.questionNum === resdata.questionTotalNum">下一题</iep-button>
            <iep-button style="margin:0 10px;" @click="saveAndGoBack">保存并退出</iep-button>
          </div>
        </div>
      </div>

      <div style="float:right;width: 28%;border-left: 1px solid #eee;padding-bottom: 75px;">
        <div style="float:right;width: 250px;background: linear-gradient(to bottom right, rgb(55, 15, 68) , rgb(107, 174, 246));">
          <div style="text-align: center;position: relative;top: 65px;">
            <span style="color: white;font-size: 30px;">本题得分</span><br>
            <span style="color: rgb(65, 153, 248);font-size: 40px;">8</span>
            <span style="color: white;font-size: 20px;"> / </span>
            <span style="color: white;font-size: 20px;">12</span>
          </div>

          <ve-ring style="padding-top: 15px;margin-top: -75px;" height="200px" :data="chartData" :settings="chartSettings" :tooltip-visible="false" :legend-visible="false" :colors="colors"></ve-ring>

          <div style="text-align: left;padding: 0 18px;">
            <div>
              <span class="answerSheet">填空题</span>
              <div class="answerSheetTop">
                <iep-button class="choices" v-for="(item,index) in resdata.radioMap" :key="index" @click="handleTypeOne(item)" :style="statusColor(item.answerOrNot)">{{item.id}}</iep-button>
              </div><br>
            </div>

            <div>
              <span class="answerSheet">简答题</span>
              <div class="answerSheetTop">
                <iep-button class="choices" v-for="(item,index) in resdata.checkboxMap" :key="index" @click="handleTypeTwo(item)" :style="statusColor(item.answerOrNot)">{{item.id}}</iep-button>
              </div><br>
            </div>

            <div>
              <span class="answerSheet">实操题</span>
              <div class="answerSheetTop">
                <iep-button class="choices" v-for="(item,index) in resdata.checkedMap" :key="index" @click="handleTypeThree(item)" :style="statusColor(item.answerOrNot)">{{item.id}}</iep-button>
              </div><br>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { getTestPageById } from '@/api/exam/testPage/subjectTest/examStart'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  props: ['formData'],
  data () {
    this.colors = ['#409AF9', '#FFFFFF']
    this.chartSettings = {
      radius: [40, 50],
      offsetY: 100,
    }
    return {
      fillInput: '',           //填空(v-model绑定的值)
      freeInput: '',           //简答(v-model绑定的值)
      operation: '',           //实操(v-model绑定的值)
      //inputList: ['', ''],  
      fillAreaList: ['', ''],  //填空
      inputAreaList: [''],     //简答
      operationList: [''],       //实操
      questionExplain: '本题来源于国脉内网、水巢、数据基因、技能类、知识类、数据能力类、基本能力类、项目管理类、公司常识类、人力资源类等。',
      examNo: '2019052568969',
      chartData: {
        columns: ['是否完成', '进度'],
        rows: [
          { '是否完成': '已完成', '进度': '' },
          { '是否完成': '未完成', '进度': '' },
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

  },
  computed: {
    count: function () {
      return this.offNum()
    },
    residueCount: function () {
      return this.resdata.questionTotalNum - this.count
    },
  },
  created () {
    this.loadPage()
    console.log('formData', this.formData.id)
  },
  methods: {
    /**
     * 判断题型(公用方法)
     */
    judgeType (params) {
      params.examId = this.formData.id
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
        this.resdata = res.data
        this.resdata.questionOffNum = res.data.questionNumList
        this.resdata.questionTotalNum = res.data.questionNumList.checkboxMap.length + res.data.questionNumList.checkedMap.length + res.data.questionNumList.radioMap.length + res.data.questionNumList.textMap.length
        this.resdata.titleOptions = res.data.titleOptions ? JSON.parse(res.data.titleOptions) : ''
        this.resdata.radioMap = res.data.questionNumList.radioMap
        this.resdata.checkboxMap = res.data.questionNumList.checkboxMap
        this.resdata.checkedMap = res.data.questionNumList.checkedMap
        this.resdata.textMap = res.data.questionNumList.textMap
        if (res.data.questionTypeName === '单选题') {
          this.answerRadio = res.data.userAnswer
        }
        if (res.data.questionTypeName === '复选题') {
          this.checksList = JSON.parse(res.data.userAnswer)
        }
        if (res.data.questionTypeName === '判断题') {
          this.trueOrFalseRadio = res.data.userAnswer
        }
        if (res.data.questionTypeName === '简答题') {
          this.freeInput = res.data.userAnswer
        }
      })
    },

    /**
     * 首次进入页面加载题目
     */
    loadPage () {
      const params = {
        examId: this.formData.id,
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
      //console.log('counts22', arr)
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
     * 点击填空题答题卡
     */
    handleTypeOne (item) {
      const params = {
        examId: this.formData.id,
        currentQuestionNum: this.resdata.questionNum,
        questionNum: item.id,
        userAnswer: this.answerRadio,
      }
      this.getSubjectById(params)
    },

    /**
     * 点击简答题答题卡
     */
    handleTypeTwo (item) {
      const params = {
        examId: this.formData.id,
        currentQuestionNum: this.resdata.questionNum,
        questionNum: item.id,
        userAnswer: JSON.stringify(this.checksList),
      }
      this.getSubjectById(params)
    },

    /**
     * 点击实操题答题卡
     */
    handleTypeThree (item) {
      const params = {
        examId: this.formData.id,
        currentQuestionNum: this.resdata.questionNum,
        questionNum: item.id,
        userAnswer: this.trueOrFalseRadio,
      }
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
          remainingTime: this.min + '-' + this.sec,
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
.examShow {
  margin: 20px auto;
  width: 89%;
  overflow: hidden;
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
<style lang="scss">
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
.give-mark {
  width: 10%;
  height: 71px;
  margin-left: 100px;
  .el-input__inner {
    height: 71px;
    color: #ff6666;
    font-size: 20px;
    text-align: center;
  }
}
.give-mark-two {
  width: 15%;
  height: 74px;
  margin-left: 50px;
  .el-input__inner {
    width: 80px;
    height: 74px;
    margin-top: -25px;
    color: #ff6666;
    font-size: 20px;
    text-align: center;
  }
}
.give-mark-three {
  width: 15%;
  height: 74px;
  margin-left: 350px;
  margin-top: 25px;
  .el-input__inner {
    width: 80px;
    height: 74px;
    color: #ff6666;
    font-size: 20px;
    text-align: center;
  }
}
</style>

