<template>
  <div>
    <div class="examExamine-wrapper">
      <el-card shadow="never" class="examExamine-elCard" v-loading="loading">

        <el-container class="examExamine-container">
          <div class="examExamine-left">
            <h1><span style="padding-right:30px;">{{record.title}}</span>
              成绩:
              <span style="color: #cb132d; font-size: 26px; padding-left:5px;">{{totalScore}}</span>
            </h1>
            <div class="examExamine-header">
              <el-table :data="performanceInfor.examBankTypeTranlVos" border style="width: 100%"
                :header-cell-style="getRowClass" header-align="center">
                <el-table-column label="考试项目" align="center">
                  <template slot-scope="scope">
                    {{scope.row.title}}
                  </template>
                </el-table-column>
                <el-table-column label="单选题" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.radio">{{Number.isNaN(Number(scope.row.radio)) ?
                      scope.row.radio : Number(scope.row.radio)}}</span>
                    <span v-else>/</span>
                  </template>
                </el-table-column>
                <el-table-column label="复选题" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.checkbox">{{Number.isNaN(Number(scope.row.checkbox)) ?
                      scope.row.checkbox : Number(scope.row.checkbox)}}</span>
                    <span v-else>/</span>
                  </template>
                </el-table-column>
                <el-table-column label="判断题" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.checked">{{Number.isNaN(Number(scope.row.checked)) ?
                      scope.row.checked : Number(scope.row.checked)}}</span>
                    <span v-else>/</span>
                  </template>
                </el-table-column>
                <el-table-column label="填空题" align="center" v-if="completionMap.length>0">
                  <template slot-scope="scope">
                    <span v-if="scope.row.completion">{{Number.isNaN(Number(scope.row.completion)) ?
                      scope.row.completion : Number(scope.row.completion)}}</span>
                    <span v-else>/</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作题" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.operation">{{Number.isNaN(Number(scope.row.operation)) ?
                      scope.row.operation : Number(scope.row.operation)}}</span>
                    <span v-else>/</span>
                  </template>
                </el-table-column>
                <el-table-column label="简答题" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.text">{{Number.isNaN(Number(scope.row.text)) ?
                      scope.row.text : Number(scope.row.text)}}</span>
                    <span v-else>/</span>
                  </template>
                </el-table-column>
                <el-table-column label="卷面总分" align="center">
                  <template slot-scope="scope">
                    <span
                      v-if="scope.$index!=2">{{Number(scope.row.radio)+Number(scope.row.checkbox)+Number(scope.row.checked)+Number(scope.row.completion?scope.row.completion:'')+Number(scope.row.operation)+Number(scope.row.text)}}</span>
                    <span v-else>/</span>
                  </template>
                </el-table-column>
                <el-table-column label="面试" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.face">{{scope.row.face}}</span>
                    <span v-else>/</span>
                  </template>
                </el-table-column>
              </el-table>

              <div class="comments" v-if="performanceInfor.comments">
                <label>面试评语:</label>
                <iep-input-area readonly v-model="performanceInfor.comments"
                  style="margin-top: 10px;"></iep-input-area>
              </div>
            </div>

            <div class="examExamine-content">
              <el-card class="question-result" shadow="hover" v-if="radioMap.length>0">
                <div slot="header" class="clearfix">
                  <h3>单选题 (共{{radioMap.length}}题)</h3>
                </div>
                <ul>
                  <li v-for="(radioItem,index) in radioMap" :key="index+1" :id="'radio_'+(index+1)">
                    <div class="question-title">{{radioItem.questionNum}}）{{radioItem.title}}
                      <span>({{radioItem.grade}}分)</span></div>
                    <el-checkbox-group v-model="radioItem.userAnswer" disabled>
                      <el-checkbox v-for="radioOption in radioItem.itemOptions"
                        :key="radioOption.key" :label="radioOption.key">{{radioOption.key}} .
                        {{radioOption.value}}</el-checkbox>
                    </el-checkbox-group>
                    <div class="question-analysis">
                      <p>考生答案：<span>{{radioItem.userAnswer.toString()}}</span></p>
                      <p>正确答案：<span>{{radioItem.itemAnswer}}</span></p>
                      <p>答案解析：<span>{{radioItem.itemExplain}}</span></p>
                    </div>
                  </li>
                </ul>
              </el-card>

              <el-card class="question-result" shadow="hover" v-if="checkboxMap.length>0">
                <div slot="header" class="clearfix">
                  <h3>复选题 (共{{checkboxMap.length}}题)</h3>
                </div>
                <ul>
                  <li v-for="(checkboxItem,index) in checkboxMap" :key="index+1"
                    :id="'checkbox_'+(index+1)">
                    <div class="question-title">{{checkboxItem.questionNum}}）{{checkboxItem.title}}
                      <span>({{checkboxItem.grade}}分)</span></div>
                    <el-checkbox-group v-model="checkboxItem.userAnswer" disabled>
                      <el-checkbox v-for="checkOptions in checkboxItem.itemOptions"
                        :key="checkOptions.key" :label="checkOptions.key">
                        <span>{{checkOptions.key}} . {{checkOptions.value}}</span>
                      </el-checkbox>
                    </el-checkbox-group>
                    <div class="question-analysis">
                      <p>考生答案：<span>{{checkboxItem.userAnswer.toString()}}</span></p>
                      <p>正确答案：<span>{{checkboxItem.itemAnswer.toString()}}</span></p>
                      <p>答案解析：<span>{{checkboxItem.itemExplain}}</span></p>
                    </div>
                  </li>
                </ul>
              </el-card>

              <el-card class="question-result" shadow="hover" v-if="checkedMap.length>0">
                <div slot="header" class="clearfix">
                  <h3>判断题 (共{{checkedMap.length}}题)</h3>
                </div>
                <ul>
                  <li v-for="(checkedItem,index) in checkedMap" :key="index+1"
                    :id="'checked_'+(index+1)">
                    <div class="question-title">{{checkedItem.questionNum}}）{{checkedItem.title}}
                      <span>({{checkedItem.grade}}分)</span></div>
                    <el-checkbox-group v-model="checkedItem.userAnswer" disabled>
                      <el-checkbox v-for="checkedOption in checkedItem.itemOptions"
                        :key="checkedOption.key" :label="checkedOption.key">{{checkedOption.value}}
                      </el-checkbox>
                    </el-checkbox-group>
                    <div class="question-analysis">
                      <p>考生答案：<span>{{checkedItem.userAnswer.toString()}}</span></p>
                      <p>正确答案：<span>{{checkedItem.itemAnswer}}</span></p>
                      <p>答案解析：<span>{{checkedItem.itemExplain}}</span></p>
                    </div>
                  </li>
                </ul>
              </el-card>

              <el-card class="question-result" shadow="hover" v-if="completionMap.length>0">
                <div slot="header" class="clearfix">
                  <h3>填空题 (共{{completionMap.length}}题)</h3>
                </div>
                <ul>
                  <li v-for="(textItem,index) in completionMap" :key="index+1"
                    :id="'completion_'+(index+1)">
                    <div class="question-title">
                      {{textItem.questionNum}}）{{textItem.title}}<span>({{textItem.grade}}分)</span>
                    </div>
                    <iep-html v-model="textItem.userAnswer"></iep-html>
                    <div class="question-analysis">
                      <p>正确答案：<span>{{textItem.itemAnswer}}</span></p>
                      <p>答案解析：<span>{{textItem.itemExplain}}</span></p>
                    </div>
                  </li>
                </ul>
              </el-card>

              <el-card class="question-result" shadow="hover" v-if="operationMap.length>0">
                <div slot="header" class="clearfix">
                  <h3>操作题 (共{{operationMap.length}}题)</h3>
                </div>
                <ul>
                  <li v-for="(textItem,index) in operationMap" :key="index+1"
                    :id="'operation_'+(index+1)">
                    <div class="question-title">
                      {{textItem.questionNum}}）{{textItem.title}}<span>({{textItem.grade}}分)</span>
                    </div>
                    <iep-html v-model="textItem.userAnswer"></iep-html>
                    <div class="question-analysis">
                      <p>正确答案：<span>{{textItem.itemAnswer}}</span></p>
                      <p>答案解析：<span>{{textItem.itemExplain}}</span></p>
                    </div>
                  </li>
                </ul>
              </el-card>

              <el-card class="question-result" shadow="hover" v-if="textMap.length>0">
                <div slot="header" class="clearfix">
                  <h3>简答题 (共{{textMap.length}}题)</h3>
                </div>
                <ul>
                  <li v-for="(textItem,index) in textMap" :key="index+1" :id="'text_'+(index+1)">
                    <div class="question-title">
                      {{textItem.questionNum}}）{{textItem.title}}<span>({{textItem.grade}}分)</span>
                    </div>
                    <iep-html v-model="textItem.userAnswer"></iep-html>
                    <div class="question-analysis">
                      <p>正确答案：<span>{{textItem.itemAnswer}}</span></p>
                      <p>答案解析：<span>{{textItem.itemExplain}}</span></p>
                    </div>
                  </li>
                </ul>
              </el-card>
            </div>
          </div>

          <el-aside width="25%" class="examExamine-aside">
            <div class="response-card">
              <div class="response-header">
                <h2 style="text-align: center">答题卡</h2>
                <!-- <el-checkbox-group>
                  <el-checkbox label="正确"></el-checkbox>
                  <el-checkbox label="错误"></el-checkbox>
                </el-checkbox-group> -->
              </div>

              <div class="response-content" v-if="radioMap.length>0">
                <div class="response-questionTitle">
                  <span>{{radioMap[0].questionTypeName}}</span>
                </div>
                <div class="response-questionMark">
                  <a class="choices" v-for="(item,index) in radioMap" :key="index+1"
                    :href="'#radio_'+(index+1)"
                    :class="item.score === item.grade ? '' : 'error'">{{item.questionNum}}</a>
                </div>
              </div>

              <div class="response-content" v-if="checkboxMap.length>0">
                <div class="response-questionTitle">
                  <span>{{checkboxMap[0].questionTypeName}}</span>
                </div>
                <div class="response-questionMark">
                  <a class="choices" v-for="(item,index) in checkboxMap" :key="index+1"
                    :href="'#checkbox_'+(index+1)"
                    :class="item.score === item.grade ? '' : 'error'">{{item.questionNum}}</a>
                </div>
              </div>

              <div class="response-content" v-if="checkedMap.length>0">
                <div class="response-questionTitle">
                  <span>{{checkedMap[0].questionTypeName}}</span>
                </div>
                <div class="response-questionMark">
                  <a class="choices" v-for="(item,index) in checkedMap" :key="index+1"
                    :href="'#checked_'+(index+1)"
                    :class="item.score === item.grade ? '' : 'error'">{{item.questionNum}}</a>
                </div>
              </div>

              <div class="response-content" v-if="completionMap.length>0">
                <div class="response-questionTitle">
                  <span>{{completionMap[0].questionTypeName}}</span>
                </div>
                <div class="response-questionMark">
                  <a class="choices text" v-for="(item,index) in completionMap" :key="index+1"
                    :href="'#completion_'+(index+1)">{{item.questionNum}}</a>
                </div>
              </div>

              <div class="response-content" v-if="operationMap.length>0">
                <div class="response-questionTitle">
                  <span>{{operationMap[0].questionTypeName}}</span>
                </div>
                <div class="response-questionMark">
                  <a class="choices text" v-for="(item,index) in operationMap" :key="index+1"
                    :href="'#operation_'+(index+1)">{{item.questionNum}}</a>
                </div>
              </div>

              <div class="response-content" v-if="textMap.length>0">
                <div class="response-questionTitle">
                  <span>{{textMap[0].questionTypeName}}</span>
                </div>
                <div class="response-questionMark">
                  <a class="choices text" v-for="(item,index) in textMap" :key="index+1"
                    :href="'#text_'+(index+1)">{{item.questionNum}}</a>
                </div>
              </div>
            </div>
          </el-aside>
        </el-container>
      </el-card>
      <footer-tool-bar>
        <iep-button @click="handleBack">返回</iep-button>
      </footer-tool-bar>
    </div>
  </div>

</template>

<script>
import { getResultInfo } from '@/api/exam/testPage/subjectTest/subjectTest'
export default {
  props: ['record'],
  data () {
    return {
      errorBgColor: {
        backgroundColor: '#ab2b22',
      },
      successBgColor: {
        backgroundColor: '#64ad42',
      },
      performanceInfor: {},
      loading: false,
      checkboxMap: [],
      radioMap: [],
      checkedMap: [],
      textMap: [],
      operationMap: [],
      completionMap:[],
      totalScore: '',
    }
  },
  created () {
    this.resultPaper()
  },
  // computed: {
  //   totalScore () {
  //     console.log('his.performanceInfor.examBankTypeTranlVos', this.performanceInfor.examBankTypeTranlVos)
  //     const score = this.performanceInfor.examBankTypeTranlVos[0]

  //   },
  // },
  methods: {
    /**
     * 表格第一行变色
     */
    getRowClass ({ rowIndex }) {
      if (rowIndex == 0) {
        return 'background:#F2F4F5;color:#333;'
      } else {
        return ''
      }
    },

    /**
     * 获取成绩信息
     */
    async resultPaper () {
      this.loading = true
      const data = await getResultInfo({ examinationmanagementId: this.record.id })
      const resultInfo = data.data.data
      if (resultInfo) {
        this.performanceInfor = resultInfo

        // 单选题
        this.radioMap = resultInfo.result.radioMap.map(function (item) {
          item.userAnswer = item.userAnswer ? [item.userAnswer] : []
          item.itemOptions = item.itemOptions ? JSON.parse(item.itemOptions) : []
          return item
        })

        // 多选题
        this.checkboxMap = resultInfo.result.checkboxMap.map(function (item) {
          item.userAnswer = item.userAnswer ? JSON.parse(item.userAnswer) : []
          item.itemAnswer = item.itemAnswer ? JSON.parse(item.itemAnswer) : []
          item.itemOptions = item.itemOptions ? JSON.parse(item.itemOptions) : []
          return item
        })

        // 判断题
        this.checkedMap = resultInfo.result.checkedMap.map(function (item) {
          item.userAnswer = item.userAnswer ? [item.userAnswer] : []
          item.itemOptions = [{ key: '正确', value: '正确' }, { key: '错误', value: '错误' }]
          return item
        })

        // 总分
        this.textMap = resultInfo.result.textMap
        this.operationMap = resultInfo.result.operationMap
        this.completionMap = resultInfo.result.completionMap ? resultInfo.result.completionMap : []
        const score = this.performanceInfor.examBankTypeTranlVos[0]

        this.totalScore = Number(score.radio) + Number(score.checkbox) + Number(score.checked) + Number(score.operation) + Number(score.text) + Number(score.completion?score.completion:'')
        if (!Number.isNaN(Number(score.face))) {
          this.totalScore += Number(score.face)
        }
        this.loading = false
      }
    },

    /**
     * 返回
     */
    handleBack () {
      this.$emit('onGoBack',{
         field:  this.record.field,
         state:  this.record.state,
         current:  this.record.current,
         size:  this.record.size,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.examExamine-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.examExamine-elCard {
  width: 100%;
  border: none;
  .examExamine-container {
    .examExamine-left {
      flex: 1;
      h1 {
        display: flex;
        align-items: center;
      }
      .examExamine-header {
        border-bottom: 1px solid #ebeef5;
        margin-bottom: 10px;
        .comments {
          margin: 15px 0px;
          label {
            font-size: 16px;
            font-weight: bold;
          }
        }
      }
      .examExamine-content {
        padding-bottom: 50px;
        .question-result {
          margin-top: 20px;
          h3 {
            font-weight: 700;
          }
          ul {
            padding: 0;
            margin: 0;
            list-style: none;
            li {
              margin-top: 30px;
              font-weight: 700;

              &:first-child {
                margin: 0;
              }
              .question-title {
                margin-bottom: 10px;
                span {
                  font-weight: 400;
                }
              }

              .el-radio,
              .el-checkbox {
                display: block;
                margin-bottom: 5px;
                font-weight: 400;
              }
            }
          }
          .question-analysis {
            font-weight: 400;
            margin-top: 15px;
            border: 1px solid #ffdbc1;
            background-color: #fffbf6;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 20px;
          }
        }
      }
    }
    .examExamine-aside {
      .response-card {
        position: absolute;
        right: 35px;
        width: 22%;
        background: #fffbf6;
        border: 1px solid #ffdbc1;
        padding: 18px 20px;

        .response-content {
          margin-bottom: 5px;
          .response-questionTitle {
            display: flex;
            // justify-content: space-between;
            // padding: 0 10px;
            font-size: 16px;
            border-bottom: 1px solid #ffdbc1;
            margin-bottom: 5px;
            align-items: center;
            min-height: 34px;
          }

          .response-questionMark {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            .choices {
              margin: 2px 3px 0px 0px;
              cursor: pointer;
              height: 32px;
              width: 42px;
              line-height: 32px;
              font-size: 12px;
              border-radius: 3px;
              text-align: center;
              box-sizing: border-box;
              transition: 0.1s;
              font-weight: 500;
              border: 1px solid;
              color: #fff;
              background: #64ad42;
              border-color: #64ad42;

              &.error {
                // color: #ba1b21;
                background: #ba1b21;
                border-color: #ba1b21;
              }
            }
            .text {
              color: #999;
              background: #fff;
              border-color: #999;
            }
          }
        }
        .response-header {
          display: flex;
          flex-direction: column;
          text-align: center;
          margin-bottom: 10px;
        }
      }
    }
  }
}
.fr-view {
  border: 1px solid #dcdfe6;
  padding: 15px;
  border-radius: 4px;
  font-weight: 400;
}
</style>
<style scoped>
.examExamine-elCard >>> .el-card__body {
  /* margin-bottom: 50px; */
}

.question-result >>> .el-radio__input.is-disabled .el-radio__inner,
.question-result >>> .el-checkbox__input.is-disabled .el-checkbox__inner {
  background-color: #ffffff;
  border-color: #bbb;
}
.question-result
  >>> .el-checkbox__input.is-disabled.is-checked
  .el-checkbox__inner::after {
  border-color: #555;
}
.question-result >>> .el-radio__input.is-disabled + span.el-radio__label,
.question-result >>> .el-checkbox__input.is-disabled + span.el-checkbox__label {
  color: #606266;
}
.response-header >>> .el-checkbox:first-child .el-checkbox__inner {
  background-color: #64ad42;
  border-color: #64ad42;
}
.response-header >>> .el-checkbox:last-child .el-checkbox__inner {
  background-color: #ba1b21;
  border-color: #ba1b21;
}
</style>
