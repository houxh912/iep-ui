<template>
  <div :style="isEdit ? '': 'margin-top:40px'">
    <div class="steps-content">
      <el-card shadow="never" class="content-wrapper">
        <div slot="header">
          <span>试卷信息</span>
          <iep-button type="primary" @click="handleEdit(testPaper.id)" v-if="readOnly===false" style="float:right; margin-top: -5px;">编辑试卷</iep-button>
        </div>
        <el-form :model="data" label-width="100px">
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="试卷名称">
                <el-input readonly v-model="testPaper.title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属科目">
                <el-input readonly v-model="testPaper.fieldName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="12">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="试题数量">
                    <el-input v-model="testPaper.choiceNum" readonly>
                      <template slot="append">道</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="总分">
                    <el-input v-model="testPaper.score" readonly>
                      <template slot="append">分</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <!-- <el-col :span="4">
              <el-form-item label="试题难度:">
                <el-input v-model="testPaper.difficulty" readonly></el-input>
              </el-form-item>
            </el-col> -->
          </el-row>
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="创建者" style="margin-bottom: 0">
                <el-input readonly v-model="testPaper.createName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="创建时间" style="margin-bottom: 0">
                <el-input readonly v-model="testPaper.creatTime"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>

      <el-card shadow="never" class="content-wrapper">
        <div slot="header">
          <span>考试信息</span>
        </div>
        <el-form label-width="100px" :model="examForm" ref="examForm" :rules="examFormRules">
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="考试名称" prop="title">
                <el-input v-model="examForm.title" placeholder="请输入考试名称" :readonly="readOnly">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属科目" prop="field">
                <el-select placeholder="请选择所属科目" v-model="examForm.field" :disabled="readOnly" style="width:100%">
                  <el-option v-for="(item, index) in res.exms_subjects" :key="index" :label="item.label" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="考卷模式" prop="examType">
                <el-radio-group v-model="examForm.examType">
                  <el-radio :label="0" :disabled="readOnly">考试模式</el-radio>
                  <el-radio :label="1" :disabled="readOnly">练习模式</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="提交答案" prop="showResult">
                <el-radio-group v-model="examForm.showResult">
                  <el-radio :label="1" :disabled="readOnly">考后显示成绩</el-radio>
                  <el-radio :label="0" :disabled="readOnly">批改后显示成绩</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40" v-if="showsubmitPaper">
            <el-col :span="12">
              <el-form-item label="答题次数" prop="datiFrequency">
                <el-radio-group v-model="examForm.datiFrequency">
                  <el-radio :label="0" :disabled="readOnly">无限次</el-radio>
                  <el-radio :label="1" :disabled="readOnly">一次</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40" v-if="showTime">
            <el-col :span="12">
              <el-form-item label="报名时间">
                <el-row>
                  <el-col :span="3">
                    <el-form-item prop="applyTimeSwitch">
                      <el-switch v-model="examForm.applyTimeSwitch" :active-value="1" :inactive-value="0" @change="applySwitchChange" :disabled="readOnly"></el-switch>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" style="padding:0" v-if="showTime && examForm.applyTimeSwitch == 1">
                    <el-form-item prop="signBeginTime">
                      <iep-date-picker v-model="examForm.signBeginTime" type="datetime" placeholder="开始时间" style="width:100%" :readonly="readOnly" :picker-options="pickerOptionsSignBegin" value-format="yyyy-MM-dd HH:mm:ss">
                      </iep-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col class="line" :span="1" v-if="showTime && examForm.applyTimeSwitch == 1">-</el-col>
                  <el-col :span="10" v-if="showTime && examForm.applyTimeSwitch == 1" style="padding:0">
                    <el-form-item prop="signEndTime">
                      <iep-date-picker v-model="examForm.signEndTime" type="datetime" placeholder="结束时间" style="width:100%" :readonly="readOnly" :picker-options="pickerOptionsSignEnd" value-format="yyyy-MM-dd HH:mm:ss">
                      </iep-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="showTime && examForm.applyTimeSwitch == 1">
              <el-form-item label="报名消耗" prop="consume">
                <el-input v-model.number="examForm.consume" :readonly="readOnly">
                  <template slot="append">贝</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40" v-if="showTime">
            <el-col :span="12">
              <el-form-item label="考试时间">
                <el-row>
                  <el-col :span="3">
                    <el-form-item prop="examTimeSwitch">
                      <el-switch v-model="examForm.examTimeSwitch" :active-value="1" :inactive-value="0" @change="examSwitchChange" :disabled="readOnly"></el-switch>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" v-if="showTime && examForm.examTimeSwitch == 1" style="padding:0">
                    <el-form-item prop="signBeginTime">
                      <iep-date-picker v-model="examForm.beginTime" type="datetime" placeholder="开始时间" style="width:100%" :picker-options="pickerOptionsBegin" :readonly="readOnly"></iep-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col class="line" :span="1" v-if="showTime && examForm.examTimeSwitch == 1">-</el-col>
                  <el-col :span="10" v-if="showTime && examForm.examTimeSwitch == 1" style="padding:0">
                    <el-form-item prop="endTime">
                      <iep-date-picker v-model="examForm.endTime" type="datetime" placeholder="结束时间" style="width:100%" :picker-options="pickerOptionsEnd" :readonly="readOnly">
                      </iep-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="12"></el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="答卷时长" prop="timeLong">
                <el-input v-model="examForm.timeLong" :readonly="readOnly">
                  <template slot="append">
                    分
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="难度系数" prop="examDifficulty">
                <el-select placeholder="请选择考试难度系数" v-model="examForm.examDifficulty" :disabled="readOnly" clearable style="width:100%">
                  <el-option v-for="(item, index) in res.exms_difficulty" :key="index" :label="item.label" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="及格线" prop="passScore">
                <el-input :value="examForm.passScore" v-if="readOnly" :readonly="readOnly">
                </el-input>
                <iep-input-number controls-position="right" :min="0" :max="testPaper.score-1" v-model="examForm.passScore" v-else style="width:100%">
                </iep-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="优秀线" prop="excellentLine">
                    <el-input :value="examForm.passScore" v-if="readOnly" :readonly="readOnly">
                    </el-input>
                    <iep-input-number controls-position="right" :min="0" :max="testPaper.score-1" v-model="examForm.excellentLine" v-else style="width:100%">
                    </iep-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="奖励" prop="reward">
                    <el-input v-model.number="examForm.reward" :readonly="readOnly">
                      <template slot="append">
                        贝
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-form-item label="考试说明" prop="description">
            <!-- <iep-input-area v-model="examForm.description" :readonly="readOnly"></iep-input-area> -->
            <el-input type="textarea" rows="4" v-model="examForm.description" :readonly="readOnly" maxlength="200" show-word-limit></el-input>
          </el-form-item>
          <hr>
          <el-form-item>
            <!-- <el-col :span="6">
              <el-form-item prop="showResult">
                <el-switch active-text="考后显示成绩" v-model="examForm.showResult" :active-value="1"
                  :inactive-value="0" :disabled="readOnly"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="showAnswer">
                <el-switch active-text="考后显示答案和解析" v-model="examForm.showAnswer" :active-value="1"
                  :inactive-value="0" :disabled="readOnly"></el-switch>
              </el-form-item>
            </el-col> -->
            <el-col :span="12">
              <el-form-item prop="addInterview">
                <el-switch active-text="添加面试判分" v-model="examForm.addInterview" :active-value="1" :inactive-value="0" :disabled="readOnly"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="registrationState">
                <el-switch active-text="报名自动审核通过" v-model="examForm.registrationState" :active-value="1" :inactive-value="0" :disabled="readOnly"></el-switch>
              </el-form-item>
            </el-col>

          </el-form-item>
          <el-form-item label="证书信息" prop="iepCertiFicate">
            <dialog-certificate v-model="examForm.iepCertiFicate" :isShowContactBtn="readOnly">
            </dialog-certificate>
          </el-form-item>
          <el-form-item label="结束语" prop="oncludingRemarks">
            <!-- <iep-input-area v-model="examForm.oncludingRemarks" :readonly="readOnly"></iep-input-area> -->
            <el-input type="textarea" rows="4" v-model="examForm.oncludingRemarks" placeholder="感谢您的作答！" :readonly="readOnly" maxlength="200" show-word-limit></el-input>
          </el-form-item>
          <hr>
          <el-form-item label="权限设置" required>
            <div class="permissionSettings">
              <el-form-item label="考试人员" label-width="150px" :class="readOnly ? 'readOnly' : ''">
                <el-radio-group>
                  <el-radio :label="3">全部人员</el-radio>
                  <el-radio :label="6">按部门/人员参与</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="operateUserids" label="报名管理&考卷管理" label-width="150px" :class="readOnly ? 'readOnly' : ''">
                <iep-contact-multiple-user v-model="examForm.operateUserids" :filter-user-list="filterUserList" :disabled="readOnly">
                </iep-contact-multiple-user>
              </el-form-item>
              <el-form-item prop="writeUserids" label="试卷审阅权限" label-width="150px" :class="readOnly ? 'readOnly' : ''">
                <iep-contact-multiple-user v-model="examForm.writeUserids" :filter-user-list="filterUserList" :disabled="readOnly">
                </iep-contact-multiple-user>
              </el-form-item>
              <el-form-item prop="faceUserIds" label="面试判分权限" label-width="150px" :class="readOnly ? 'readOnly' : ''" v-if="examForm.addInterview===1">
                <iep-contact-multiple-user v-model="examForm.faceUserIds" :filter-user-list="filterUserList" :disabled="readOnly">
                </iep-contact-multiple-user>
              </el-form-item>
            </div>
          </el-form-item>

        </el-form>
      </el-card>
    </div>
    <div class="steps-action">
      <el-button style="margin-left: 8px" :loading="saveLoading" @click="handleSave()" v-if="data.methodName != '查看'">
        保存
      </el-button>
      <el-button type="primary" :loading="submitLoading" @click="handleRelease()" v-if="data.methodName != '查看'">
        发布
      </el-button>
    </div>

  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import mixins from '@/mixins/mixins'
import DialogCertificate from '../DialogCertificate'
import { examForm, examFormRules, toDtoForm, selfToVo } from '../option'
import { save, release, getTestOption, getExam, updateSave, updateRelease } from '@/api/exam/createExam/newTest/newTest'
import { initForm } from '../../../testPaperLibrary/option'
import { getTestPaperById } from '@/api/examPaper/examPaperApi'
export default {
  mixins: [mixins],
  props: ['data'],
  components: { DialogCertificate },
  data () {
    return {
      submitLoading: false,
      saveLoading: false,
      examFormRules,
      examForm: examForm(),
      testPaper: initForm(),//试卷信息
      res: {},
      formRequestFn: () => { },
      pickerOptionsSignBegin: this.signBeginDate(),
      pickerOptionsSignEnd: this.signEndDate(),
      pickerOptionsBegin: this.beginDate(),
      pickerOptionsEnd: this.endDate(),
      showTime: false,
      showsubmitPaper: false,
    }
  },
  computed: {
    //新增/编辑
    isEdit () {
      return this.data.id ? true : false
    },
    //是否只读
    readOnly () {
      if (this.isEdit) {
        return this.data.methodName === '查看' ? true : false
      } else {
        return false
      }
    },
    ...mapGetters([
      'userInfo',
    ]),
    filterUserList () {
      return [this.userInfo.userId, ...this.examForm.operateUserids.map(m => m.id), ...this.examForm.faceUserIds.map(m => m.id), ...this.examForm.writeUserids.map(m => m.id)]
    },
  },
  watch: {
    'data': {
      handler () {
        this.loadSelf()
        this.getTestOption()
      },
      immediate: true,
    },
    'examForm.examType' () {
      this.showTime = this.examForm.examType == 0 ? true : false
      this.showsubmitPaper = this.examForm.examType == 1 ? true : false
    },
  },
  methods: {
    /**
     * 报名时间开关
     */    
    applySwitchChange (status) {
      this.examForm.signEndTime = status == 1 ? '' : this.examForm.signEndTime
    },

    /**
     * 考试时间开关
     */
    examSwitchChange (status) {
      this.examForm.endTime = status == 1 ? '' : this.examForm.endTime
    },

    /**
     * 报名开始时间
     */
    signBeginDate () {
      const self = this
      return {
        disabledDate (time) {
          if (self.examForm.signEndTime) {
            return new Date(self.examForm.signEndTime) < time.getTime()
          }
        },
      }
    },

    /**
     * 报名结束时间
     */
    signEndDate () {
      const self = this
      return {
        disabledDate (time) {
          if (self.examForm.signBeginTime) {
            return new Date(self.examForm.signBeginTime) > time.getTime()
          }
        },
      }
    },

    /**
     * 考试开始时间
     */
    beginDate () {
      const self = this
      return {
        disabledDate (time) {
          if (self.examForm.endTime) {
            return new Date(self.examForm.endTime) < time.getTime()
          }
        },
      }
    },

    /**
     * 考试结束时间
     */
    endDate () {
      const self = this
      return {
        disabledDate (time) {
          if (self.examForm.beginTime) {
            return new Date(self.examForm.beginTime) > time.getTime()
          }
        },
      }
    },

    /**
    * 获取科目数据
    */
    async getTestOption () {
      const params = {
        numberList: [
          'exms_subjects',//考试科目
          'exms_difficulty',//难度
        ],
      }
      const { data } = await getTestOption(params)
      this.res = data
    },

    async loadSelf () {
      if (this.data.examInfo) {
        // 获取已填写的考试信息
        this.examForm = this.data.examInfo
      } else {
        if (this.isEdit) {
          await getExam({ id: this.data.id }).then(({ data }) => {
            this.examForm = selfToVo(data.data)
            this.testPaper = data.data.iepTestPaperVO
          })
        } else {
          this.examForm = examForm()
          this.testPaper = this.data.iepTestPaperVO
        }
      }

    },

    /**
     * 编辑/查看试卷
     */
    handleEdit (id) {
      getTestPaperById({ id: id }).then(({ data }) => {
        data.data[0].resource = 0
        let _exam = {
          iepTestPaperVO: data.data[0],
          methodName: this.data.methodName,
          id: this.data.id,
          examInfo: this.examForm, // 保存已填写的考试信息
        }
        this.$emit('prev', _exam)
      })
    },


    /**
     * 保存
     */
    handleSave () {
      this.saveLoading = true
      this.$refs['examForm'].validate((valid) => {
        if (valid) {
          this.examForm.testPaperId = this.testPaper.id
          // this.examForm.showResult = this.showsubmitPaper ? this.examForm.showResult : null
          this.examForm.signEndTime = this.showTime && this.examForm.applyTimeSwitch == 1 ? this.examForm.signEndTime : '2049-09-24 12:00:00'
          this.examForm.endTime = this.showTime && this.examForm.examTimeSwitch == 1 ? this.examForm.endTime : '2049-09-24 12:00:00'
          if (this.isEdit) {
            this.formRequestFn = updateSave
          } else {
            this.formRequestFn = save
          }
          this.formRequestFn(toDtoForm(this.examForm)).then(() => {
            this.$message({
              message: '考试保存成功',
              type: 'success',
            })
            this.$emit('on-data')
          })
        } else {
          this.saveLoading = false
        }
      })
    },

    /**
     * 发布
     */
    handleRelease () {
      this.submitDisabled = true
      this.$refs['examForm'].validate((valid) => {
        if (valid) {
          this.examForm.testPaperId = this.testPaper.id
          // this.examForm.showResult = this.showsubmitPaper ? this.examForm.showResult : null
          this.examForm.signEndTime = this.showTime && this.examForm.applyTimeSwitch == 1 ? this.examForm.signEndTime : '2049-09-24 12:00:00'
          this.examForm.endTime = this.showTime && this.examForm.examTimeSwitch == 1 ? this.examForm.endTime : '2049-09-24 12:00:00'
          if (this.isEdit) {
            this.formRequestFn = updateRelease
          } else {
            this.formRequestFn = release
          }
          this.formRequestFn(toDtoForm(this.examForm)).then(() => {
            this.$message({
              message: '考试发布成功',
              type: 'success',
            })
            this.$emit('on-data')
          })
        } else {
          this.submitDisabled = false
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.steps-content {
  margin-top: 16px;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.steps-action {
  margin-top: 24px;
  text-align: center;
}

.content-wrapper {
  width: 100%;
  &:first-child {
    margin-bottom: 15px;
  }

  .el-form {
    .el-form-item {
      .el-row {
        .line {
          text-align: center;
        }
      }
      .permissionSettings {
        border: 1px solid #c0c4cc;
        padding: 20px;
        .el-form-item {
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>

<style scoped>
.permissionSettings .el-form-item:nth-child(n + 2) >>> .el-form-item__label {
  line-height: 32px;
}
.permissionSettings .readOnly:nth-child(n + 2) >>> .el-form-item__label {
  line-height: 40px;
}
</style>
