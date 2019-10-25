<template>
  <div class="report">
    <iep-page-header :title="`${record.methodName}试题`" :data="[10, 5]" :backOption="backOption">
    </iep-page-header>
    <el-form :model="form" ref="form" label-width="120px" :rules="rules" size="small">
      <div class="select">
        <el-form-item class="item" label="题型：" prop="questionType">
          <el-select clearable :disabled="questionTypeDisabled" class="selectItem" :value="form.questionType" @input="updateValue(arguments[0])">
            <el-option v-for="(item, index) in res.exms_question_type" :key="index" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="item" label="难度：" prop="difficulty" style="margin-left:4%">
          <el-select v-model="form.difficulty" clearable :disabled="btnDisabled" class="selectItem">
            <el-option v-for="(item, index) in res.exms_difficulty" :key="index" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="item" label="科目：" prop="field">
          <el-select v-model="form.field" clearable :disabled="btnDisabled" class="selectItem">
            <el-option v-for="(item, index) in res.exms_subjects" :key="index" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="item" label="题类：" prop="kind" style="margin-left:4%">
          <el-select v-model="form.kind" clearable :disabled="btnDisabled" class="selectItem">
            <el-option v-for="(item, index) in res.exms_question_category" :key="index" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="item" label="关联：" prop="associatedState">
          <el-select v-model="form.associatedState" clearable :disabled="btnDisabled" class="selectItem">
            <el-option v-for="(item, index) in associatedStateList" :key="index" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="item" label="关联标签：" prop="tagKeyWords" v-if="tabName ==='single'" style="margin-left:4%">
          <iep-tag v-if="!btnDisabled" v-model="form.tagKeyWords"></iep-tag>
          <iep-tag-detail v-else :value="form.tagKeyWords"></iep-tag-detail>
        </el-form-item>
      </div>
    </el-form>

    <div align="center" style="width:100%;">
      <hr>
    </div>

    <el-tabs v-model="tabName">
      <el-tab-pane label=单题输入 name="single">
        <single-dialog ref="single" :postAnswer="postAnswer"></single-dialog>
        <div align="center" style="margin-top:2%;">
          <iep-button v-if="record.examine === true" type="primary" @click="handleExamine">审核
          </iep-button>
          <iep-button v-if="btnSave == 0" type="primary" @click="submitSingle">保存</iep-button>
          <iep-button v-if="btnSave == 1" type="primary" @click="saveSingle" v-show="!btnDisabled">
            保存</iep-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label=批量导入 name="batch" v-if="record.id===''">
        <batch-dialog ref="batch" v-model="form.questionType" @submit-batch="submitBatch">
        </batch-dialog>
      </el-tab-pane>
    </el-tabs>

    <iep-dialog :dialog-show="dialogExamine" title="审核试题" width="520px" @close="handleExamineCancel" center>
      <div style="margin-bottom:16px">
        <span class="explain">说明： </span>
        <span class="explainTxt">每过审入库 1 题，奖励出题人 5 贝 !</span>
      </div>
      <div>
        <el-radio-group v-model="states">
          <el-radio :label="0">审核通过</el-radio>
          <el-radio :label="1">审核不通过</el-radio>
        </el-radio-group>
        <el-input v-if="states === 1" v-model="content" type="textarea" maxlength="250" rows="4" style="margin-top:25px;" placeholder="请输入理由，字数不超过 250 ！" show-word-limit>
        </el-input>
      </div>
      <template slot="footer">
        <operation-wrapper>
          <iep-button type="primary" @click="handleSubmit">提交</iep-button>
          <iep-button @click="handleExamineCancel">取消</iep-button>
        </operation-wrapper>
      </template>
    </iep-dialog>

  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import SingleDialog from './Single.vue'
import BatchDialog from './Batch.vue'
import { getTestOption, getExamMsg, postModify, postExaminePass, postExamineFalse, postBatchIteamBank } from '@/api/exam/createExam/newTest/newTest'
export default {
  name: 'report',
  mixins: [mixins],
  components: {
    SingleDialog,
    BatchDialog,
  },
  props: [
    'record',
  ],
  data () {
    return {
      dialogExamine: false,
      content: '',
      states: 0,
      btnExamine: false,
      tagsShow: [],
      btnDisabled: false,
      btnSave: '',
      questionTypeDisabled: false,
      postAnswer: '',
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: this.handleGoBack,
      },
      res: {},
      // fieldList: ['大库','小库'],
      // kindList: ['操作题','客观题'],
      // questionTypeList: ['选择题','判断题'],
      // difficultyList: ['简单','中等','困难'],
      form: {
        field: '',
        questionType: '',
        kind: '',
        difficulty: '',
        associatedState: '',
        tagKeyWords: [],
        tag: '', // 标签
      },
      tabName: 'single',
      associatedStateList: [
        { id: 0, label: '不限' },
        { id: 1, label: '限考试' },
      ],
      rules: {
        field: [
          { required: true, message: '请选择科目', trigger: 'change' },
        ],
        kind: [
          { required: true, message: '请选择题类', trigger: 'change' },
        ],
        questionType: [
          { required: true, message: '请选择题型', trigger: 'change' },
        ],
        difficulty: [
          { required: true, message: '请选择难度', trigger: 'change' },
        ],
        associatedState: [
          { required: true, message: '请选择关联', trigger: 'change' },
        ],
        tagKeyWords: [
          { type: 'array', required: true, message: '请选择关联标签', trigger: 'change' },
        ],
      },
    }
  },
  created () {
    this.getTestOption()
  },
  watch: {
    res: function () {
      // this.getTestPaper ()
    },
  },
  computed: {
    isEdit () {
      return this.record.id ? true : false
    },
  },
  methods: {
    /**
     * 选择题型
     */
    updateValue (value) {
      if (this.form.questionType && this.tabName === 'batch') {
        this.$confirm('输入区试题内容会清空，请确认', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.form.questionType = value
          this.postAnswer = value
          this.$refs.batch.testQuestions = ''
          this.$refs.batch.itemBankList = []
        })
      } else {
        this.$refs.single.clearValidate()
        this.form.questionType = value
        this.postAnswer = value
      }
    },

    /**
     * 获取试题
     */
    getTestPaper () {
      const { id } = this.record
      /**
       * 审核
       */
      // if (this.record.examine === true) {
      //   this.btnExamine = true
      //   this.$confirm('每过审入库 1 题，奖励出题人 5 贝', '提示', {
      //     confirmButtonText: '确定',
      //     type: 'warning',
      //   })
      // }
      /**
       * 查看
       */
      if (this.record.edit == true) {
        this.btnDisabled = this.record.edit
        this.$refs.single.inputDisabled()
      }
      /**
       * 修改试题
       */
      if (this.record.edit == false) {
        this.btnDisabled = this.record.edit
        this.$refs.single.inputUndisabled()
      }
      /**
       * 修改试题
       */
      if (id) {
        this.btnSave = 1
        const param = {
          id: this.record.id,
        }
        getExamMsg(param).then(res => {
          this.questionTypeDisabled = true
          // console.log(res.data.data.tagKeyWords)
          // this.form.tag = res.data.data.tagKeyWords
          // console.log(this.form.tag)
          const { data } = res.data
          this.form = data
          this.form.tagKeyWords = data.tagKeyWords ? data.tagKeyWords : []
          this.$refs.single.ruleForm.title = data.title
          this.$refs.single.ruleForm.analysis = data.analysis
          this.postAnswer = data.questionType
          this.tagsShow = data.tagKeyWords
          if (data.questionType == 13) {
            var arrRadio = JSON.parse(data.titleOptions)
            // console.log(arrRadio)
            this.$refs.single.ruleForm.radioOptions = arrRadio
            this.$refs.single.ruleForm.radioOption = arrRadio.map(i => i.value)
            this.$refs.single.ruleForm.inputRadioAnswer = data.answer
          }
          if (data.questionType == 12) {
            var arrCheckbox = JSON.parse(data.titleOptions)
            // console.log(arrCheckbox)
            this.$refs.single.ruleForm.checkboxOptions = arrCheckbox
            this.$refs.single.ruleForm.checkboxOption = arrCheckbox.map(i => i.value)
            this.$refs.single.ruleForm.inputCheckboxAnswer = JSON.parse(data.answer)
          }
          if (data.questionType == 11) {
            this.$refs.single.ruleForm.inputJudgeAnswer = data.answer
          }
          if (data.questionType == 10 || data.questionType == 10000 || data.questionType == 10011) {
            this.$refs.single.ruleForm.inputShortAnswer = data.answer
          }
          // console.log('data => ',data)
        })
      }
      /**
       * 提交试题
       */
      if (!id) {
        this.btnSave = 0
      }
    },
    /**
     *判断题型
     */
    handleChangeQuestionType (val) {
      this.postAnswer = val
    },
    /**
     * 返回
     */
    handleGoBack () {
      this.$emit('onGoBack', {
        current: this.record.current,
        size: this.record.size,
        search: this.record.search,
      })
    },
    /**
     * 修改保存试题
     */
    saveSingle () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.$refs.single.submitForm() == true) {
            // this.$refs.single.submitForm ()
            this.form.tag = this.form.tagKeyWords.toString()
            let form = this.form
            let ruleForm = this.$refs.single.ruleForm
            let singleBothForm = Object.assign(form, ruleForm)
            singleBothForm = JSON.stringify(singleBothForm)
            postModify(singleBothForm).then(res => {
              if (res.data.data == true) {
                this.$message({
                  type: 'success',
                  message: '修改成功!',
                })
                this.$emit('onGoBack', {
                  current: this.record.current,
                  size: this.record.size,
                  search: this.record.search,
                })
              }
            })
          }
        }
      })
    },
    /**
     * 提交试题
     */
    submitSingle () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.$refs.single.submitForm() == true) {
            // this.$refs.single.submitForm ()
            // this.form.tags = this.form.tagKeyWords
            var tag = this.form.tagKeyWords.toString()
            this.form.tag = tag
            let form = this.form
            let ruleForm = this.$refs.single.ruleForm
            let singleBothForm = Object.assign(form, ruleForm)
            delete singleBothForm.options
            // delete singleBothForm.tagKeyWords
            let postSingleBothForm = {
              itemBankList: [],
            }
            postSingleBothForm.itemBankList.push(singleBothForm)
            postSingleBothForm = JSON.stringify(postSingleBothForm)
            postBatchIteamBank(postSingleBothForm).then(res => {
              if (res.data.data == true) {
                this.$message({
                  type: 'success',
                  message: '提交成功!',
                })
                this.$emit('onGoBack')
              }
            })

            // console.log(postSingleBothForm)
            // this.$router.push('/exam/reviewCenter/testQuestionsLibrary/')
          }
        }
      })

    },
    /**
     * 获取试题数据
     */
    async getTestOption () {
      const params = {
        numberList: [
          'exms_subjects',//考试科目
          'exms_question_type',//题型
          'exms_question_category',//题类
          'exms_difficulty',//难度
        ],
      }
      const { data } = await getTestOption(params)
      this.getTestPaper()

      // const { data } = await getTestOption ('exms_subjects')
      this.res = data
      // console.log(this.res)
      // this.res.exms_subjects = this.res.exms_subjects.map(i => i.label)
      // this.res.exms_question_type = this.res.exms_question_type.map(i => i.label)
      // this.res.exms_question_category = this.res.exms_question_category.map(i => i.label)
      // this.res.exms_difficulty = this.res.exms_difficulty.map(i => i.label)
      // console.log(this.res.data.map(i => i.label))
    },
    /**
     * 审核按钮
     */
    handleExamine () {
      this.dialogExamine = true
      this.examine = this.record.id
    },
    /**
     * 审核取消
     */
    handleExamineCancel () {
      this.dialogExamine = false
      this.states = 0
      this.content = ''
    },
    /**
     * 审核提交
     */
    handleSubmit () {
      if (this.states === 0) {
        // let postExaminePassList = {
        //   id: null,
        // }
        // postExaminePassList.id = this.examine
        postExaminePass([this.record.id]).then(res => {
          if (res.data.data == true) {
            this.dialogExamine = false,
              this.$message({
                message: '该试题审核通过',
                type: 'success',
              }),
              this.$emit('onGoBack', {
                current: this.record.current,
                size: this.record.size,
                search: this.record.search,
              })
          }
        })
      }
      if (this.states === 1 && this.content != '') {
        let postExamineFalseList = {
          id: null,
          reason: '',
        }
        postExamineFalseList.id = this.examine
        postExamineFalseList.reason = this.content
        postExamineFalseList = JSON.stringify(postExamineFalseList)
        postExamineFalse(postExamineFalseList).then(res => {
          if (res.data.data == true) {
            this.dialogExamine = false,
              this.$message({
                message: '该试题审核不通过',
                type: 'success',
              }),
              this.$emit('onGoBack', {
                current: this.record.current,
                size: this.record.size,
                search: this.record.search,
              })
          }
        })
      }
      if (this.states === 1 && this.content == '') {
        this.$message({
          message: '请填写理由！',
          type: 'warning',
        })
      }
    },
    /**
    * 提交批量试题
    */
    submitBatch (value) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let postBatchBothForm = {
            itemBankList: [],
          }
          for (let i = 0; i < value.length; i++) {
            let itemBank = Object.assign({}, this.form, value[i])
            itemBank.titleOptions = JSON.stringify(itemBank.titleOptions)
            itemBank.answer = itemBank.answer instanceof Array ? JSON.stringify(itemBank.answer) : itemBank.answer
            postBatchBothForm.itemBankList.push(itemBank)
          }
          postBatchBothForm = JSON.stringify(postBatchBothForm)
          postBatchIteamBank(postBatchBothForm).then(res => {
            if (res.data.data == true) {
              this.$message({
                type: 'success',
                message: '提交成功!',
              })
              this.$emit('onGoBack')
            }
          })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.report {
  padding: 20px;
  background-color: #fff;
}
.select {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.item {
  width: 45%;
}
</style>
<style scoped>
hr {
  margin: 0 0 10px 0;
}
.select >>> .el-form-item {
  margin-bottom: 16px;
}
.select >>> .el-input .el-select__caret {
  /* line-height: 32px; */
}
.selectItem {
  /* height: 32px; */
  width: 100%;
  /* line-height: 32px; */
}
.relatedTag {
  margin-right: 10px;
}
.explain {
  font-weight: 600;
  font-size: 14px;
}
.explainTxt {
  font-weight: 100;
  font-size: 14px;
}
</style>
