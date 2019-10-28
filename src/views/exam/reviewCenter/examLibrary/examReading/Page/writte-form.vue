<template>
  <!-- <el-dialog :visible.sync="dialogVisible" title="阅卷进度" width="90%" :before-close="saveAndGoBack"> -->
  <div v-loading="loading">
    <div class="header">
      <span class="title1"><b>在线考试系统</b></span>
      <span class="title2"></span>
      <span class="title3">{{resdata.fieldName}}</span>
      <span class="title4">
        评分进度<span class="title5">{{count}}</span> / {{resdata.questionTotalNum}}
      </span>
      <iep-button class="button" @click="giveZero">一键零分</iep-button>
    </div>

    <div class="examShowss" style="background-color:#fff">
      <div class="left">
        <span style="font-size: 20px;"><b>{{resdata.questionTypeName}}</b></span>
        <span class="title1">共 {{resdata.kindTotalNum}} 题，合计 {{resdata.kindMark}} 分，已完成
          {{kindOffCount}} / {{resdata.kindTotalNum}}</span>
        <hr>
        <div class="container">
          <div style="margin-bottom: 10px;">
            <span>{{resdata.questionNum}}、 </span>
            <span>{{resdata.title}}</span>
            <span> （ {{resdata.single}} 分）</span>
          </div>

          <div>
            <div class="setScore">
              <el-form :model="ruleForm" :rules="rules" ref="form" label-width="56px">
                <el-form-item label="答案 :">
                  <iep-html v-model="userByAnswer"></iep-html>
                </el-form-item>
                <el-form-item label="打分 :" prop="single">
                  <el-input-number v-model="ruleForm.single" controls-position="right" :min="0" :max="resdata.single"></el-input-number>
                </el-form-item>
              </el-form>
            </div>
          </div>

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
            <p class="titleone">本题得分</p>
            <span class="fen"><em>{{showScore}}</em> / {{resdata.single}}</span>
          </div>

          <div class="card">
            <div v-if="resdata.completionMap.length > 0">
              <span class="answerSheet">{{resdata.completionMap[0].questionType}}</span>
              <div class="answerSheetTop">
                <iep-button class="choices" v-for="(item,index) in resdata.completionMap" :key="index" @click="handleCard(item)" :class="{'activess':item.answerOrNot===1,'active': item.questionNum == resdata.questionNum}">
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
      </div>
    </div>

  </div>
  <!-- </el-dialog> -->
</template>
<script>
import { passWrittenById, setZeroAll } from '@/api/exam/examLibrary/examReading/examReading'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  props: ['formData'],
  data () {
    var checkSingle = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('分数不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value > this.resdata.single) {
            callback(new Error('本题所得分数不能大于该题总分 !'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    this.colors = ['#409AF9', '#FFFFFF']
    this.chartSettings = {
      radius: [50, 60],
      offsetY: 80,
    }
    return {
      loading: false,
      dialogVisible: true,
      disabled: false,
      userByAnswer: '',        //显示用户答案的输入框(v-model绑定的值)
      showScore: 0,            //答题卡上显示的分数(v-model绑定的值)
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
        questionTotalNum: 0,//题目总数
        textMap: [],         //答题卡片的简答题数组集合，从数组中遍历题目出来
        operationMap: [],    //答题卡片的操作题数组集合，从数组中遍历题目出来
        completionMap: [],   //答题卡片的填空题数组集合，从数组中遍历题目出来
      },
      ruleForm: {
        single: '',
      },
      rules: {
        single: [
          { validator: checkSingle, trigger: 'blur' },
        ],
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
    qtTotalNum: function () {
      return this.totalNum()
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

      if (this.ruleForm.single >= 0) {
        params.score = this.ruleForm.single
        params.judgeId = this.formData.judgeId
      } else {
        params.score = ''
      }
    },

    /**
     * 获取题目的详细数据(公用请求方法)
     */
    getSubjectById (params) {
      this.loading = true
      passWrittenById(params).then(res => {
        const record = res.data.data
        this.userByAnswer = record.userAnswer
        this.showScore = record.score || 0
        this.resdata = record
        this.ruleForm.single = record.score
        this.resdata.questionOffNum = record.questionNumList
        this.resdata.completionMap = record.questionNumList.completionMap || []
        this.resdata.textMap = record.questionNumList.textMap
        this.resdata.operationMap = record.questionNumList.operationMap        

        if (this.resdata.questionTypeName === '填空题') {
          this.resdata.kindTotalNum = record.questionNumList.completionMap ? record.questionNumList.completionMap.length : []
          this.resdata.kindMark = record.fillScore || 0
        }
        if (this.resdata.questionTypeName === '简答题') {
          this.resdata.kindTotalNum = record.questionNumList.textMap.length
          this.resdata.kindMark = record.textScore || 0
        }
        if (this.resdata.questionTypeName === '操作题') {
          this.resdata.kindTotalNum = record.questionNumList.operationMap.length
          this.resdata.kindMark = record.operationScore || 0
        }
        this.loading = false
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
     *一键零分
     */
    giveZero () {
      const params = {
        examId: this.formData.examId,
      }
      this.$confirm('此操作将一键设置为零分, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        setZeroAll(params).then(res => {
          this.$message({
            type: 'success',
            message: res.data.msg,
          })
          this.loadPage()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消设置',
        })
      })
    },

    /**
     *计算每种题型已完成的题数
     */
    kindOffNum () {
      let kindcount = 0
      let typelist = []
      const type = this.resdata.questionTypeName
      if(type === '填空题') { typelist = this.resdata.completionMap }
      if(type === '简答题') { typelist = this.resdata.textMap }
      if(type === '操作题') { typelist = this.resdata.operationMap } 
      
      for (let i = 0; i < typelist.length; i++) {
        if (typelist[i].answerOrNot > 0) {
          kindcount++
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
     *计算总的题数总数
     */
    totalNum () {
      let total = 0
      for (const key in this.resdata.questionOffNum) {
        if(this.resdata.questionOffNum.hasOwnProperty(key)){
          const element = this.resdata.questionOffNum[key]
          total += element.length
        }
      }
      this.resdata.questionTotalNum = total
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
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$confirm('此操作将保存得分，是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(async () => {
            const params = {
              ifCommit: 1,
            }
            this.judgeType(params)
            // const isSuccess = this.getSubjectById(params)
            await passWrittenById(params)
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
        }
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
  .button {
    margin-left: 50px;
    background: #f8e8e9;
    border-color: #e3a4a6;
    color: #ba1b21;
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
      .setScore {
        margin: 20px -8px;
        .el-input {
          width: 6%;
        }
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
      padding: 15px 0 0;
      background: #fffbf6;
      border: 1px solid #ffdbc1;
      .top {
        text-align: center;
        margin: 0 0 15px;
        .titleone {
          font-size: 20px;
          margin-bottom: 0;
        }
        .fen {
          font-size: 20px;
          em {
            color: #ba1b21;
            font-style: normal;
            font-size: 36px;
          }
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
          color: $--color-primary;
        }
        .active {
          background: $--color-primary;
          border-color: $--color-primary;
          color: #fff;
        }
        .answerSheet {
          font-size: 18px;
          color: #595959;
        }
        .answerSheetTop {
          border-top: solid 1px #eee;
          padding-top: 6px;
        }
      }
    }
  }
}
.headerTxt {
  padding: 0 20px;
}
</style>
<style  scoped>
.giveinput >>> .el-input__inner {
  width: 80px;
  height: 40px;
  line-height: 40px;
  color: #e6a23c;
  font-size: 18px;
}
.fr-view {
  border: 1px solid #dcdfe6;
  padding: 6px 15px;
  border-radius: 4px;
  min-height: 40px;
}
</style>
<style lang="scss">
.examShowss {
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

  .choices + .choices {
    margin: 1px;
  }
  .choices {
    width: 41.6px;
    margin-right: 1px;
  }
}
</style>
