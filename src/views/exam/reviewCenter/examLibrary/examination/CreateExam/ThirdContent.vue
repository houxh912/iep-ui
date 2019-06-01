<template>
  <div>
    <div class="steps-content">
      <el-card shadow="never" class="content-wrapper">
        <el-form size="small" :model="data" label-width="100px">
          <h1>{{data.title}}</h1>
          <el-form-item label="所属科目:" style="width:50%">
            <el-input readonly></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="4">
              <el-form-item label="试题数量:">
                <el-input v-model="data.choiceNum" readonly>
                  <template slot="append">道</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="试题总分:">
                <el-input v-model="data.score" readonly>
                  <template slot="append">分</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="试题难度:">
                <el-input v-model="data.difficulty" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="创建人：">
                <span>{{data.createName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="创建时间：">
                <span>{{data.createTime}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <iep-button type="primary" style="float:right" @click="handleEdit(data)">编辑试卷</iep-button>
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
                <el-input v-model="examForm.title" placeholder="请输入考试名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属科目" prop="field">
                <el-select placeholder="请选择所属科目" v-model="examForm.field">
                  <el-option :value="0" label="国脉内网"></el-option>
                  <el-option :value="1" label="数据基因"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="报名时间" required>
                <el-col :span="11" style="padding:0">
                  <el-form-item prop="signBeginTime">
                    <iep-date-picker v-model="examForm.signBeginTime" type="datetime" placeholder="开始时间"
                      @change="startChange(examForm.signBeginTime)"></iep-date-picker>
                  </el-form-item>

                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11" style="padding:0">
                  <el-form-item prop="signEndTime">
                    <iep-date-picker v-model="examForm.signEndTime" type="datetime" placeholder="结束时间"
                      @change="endChange(examForm.signEndTime)"></iep-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="报名消耗" prop="consume">
                <el-input v-model="examForm.consume">
                  <template slot="append">贝</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="考试时间" required>
                <el-col :span="11" style="padding:0">
                  <iep-date-picker v-model="examForm.beginTime" type="datetime" placeholder="开始时间"
                    @change="startChange(examForm.beginTime,'exam')"></iep-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11" style="padding:0">
                  <iep-date-picker v-model="examForm.endTime" type="datetime" placeholder="开始时间"
                    @change="endChange(examForm.endTime,'exam')"></iep-date-picker>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="答卷时长" prop="timeLong">
                <el-input v-model="examForm.timeLong" disabled>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="及格线" prop="passScore">
                <el-input v-model="examForm.passScore"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="优秀线" prop="excellentLine">
                    <el-input v-model="examForm.excellentLine"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="奖励" prop="reward">
                    <el-input v-model="examForm.reward">
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
            <iep-input-area v-model="examForm.description"></iep-input-area>
          </el-form-item>
          <hr>
          <el-form-item>
            <el-col :span="8">
              <el-form-item prop="showResult">
                <el-switch active-text="考后显示成绩" v-model="examForm.showResult" :active-value="1"
                  :inactive-value="0"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="showAnswer">
                <el-switch active-text="考后显示答案和解析" v-model="examForm.showAnswer" :active-value="1"
                  :inactive-value="0"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="showPlace">
                <el-switch active-text="添加面试判分" v-model="examForm.showComment" :active-value="1"
                  :inactive-value="0"></el-switch>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="证书信息" prop="iepCertiFicate">
            <dialog-certificate v-model="examForm.iepCertiFicate"></dialog-certificate>
          </el-form-item>
          <el-form-item label="结束语" prop="onclidingRemarks">
            <iep-input-area v-model="examForm.onclidingRemarks"></iep-input-area>
          </el-form-item>
          <hr>
          <el-form-item label="权限设置" required>
            <div class="permissionSettings">
              <el-form-item prop="operateUseridsList" label="报名管理&考卷管理">
                <iep-contact-multiple-user v-model="examForm.operateUseridsList" :filter-user-list="filterUserList"></iep-contact-multiple-user>
              </el-form-item>
              <el-form-item prop="writeUseridsList" label="试卷审阅权限">
                <iep-contact-multiple-user v-model="examForm.writeUseridsList" :filter-user-list="filterUserList"></iep-contact-multiple-user>
              </el-form-item>

              <el-form-item prop="faceUserIdsList" label="面试判分权限">
                <iep-contact-multiple-user v-model="examForm.faceUserIdsList" :filter-user-list="filterUserList"></iep-contact-multiple-user>
              </el-form-item>
            </div>
          </el-form-item>

        </el-form>
      </el-card>
    </div>
    <div class="steps-action">
      <el-button style="margin-left: 8px" :loading="saveLoading" @click="handleSave()">
        保存
      </el-button>
      <el-button type="primary" :loading="submitLoading" @click="handleRelease()">
        发布
      </el-button>
    </div>

  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import mixins from '@/mixins/mixins'
import DialogCertificate from '../DialogCertificate'
import { examForm, examFormRules, toDtoForm } from '../option'
import { save, release } from '@/api/exam/createExam/newTest/newTest'
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
    }
  },
  watch: {
    'data.id': {
      handler (newName) {
        console.log('newName3', this.data)
        if (newName === undefined) {
          this.examForm = examForm()
        }
      },
      immediate: true,
    },
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
    filterUserList () {
      return [this.userInfo.userId, ...this.examForm.operateUseridsList.map(m => m.id), ...this.examForm.faceUserIdsList.map(m => m.id), ...this.examForm.writeUseridsList.map(m => m.id)]
    },
  },
  methods: {

    // 处理时间段
    dealTime (val1, val2, type) {
      function parseDate (date) {
        return new Date(date)
      }
      const newDate1 = parseDate(val1)
      const newDate2 = parseDate(val2)
      const between = (Number(newDate2) - Number(newDate1)) / 1000
      if (between < 0) {
        this.$message.error('开始时间不能大于结束时间！！！')
        return
      }
      if (type === 'exam') {
        const hours = parseInt(between / 3600)
        const minutes = parseInt((between - 3600 * hours) / 60)
        this.examForm.timeLong = hours + '小时' + minutes + '分钟'
      }

    },
    startChange (val, type) {
      if (type === 'exam') {
        this.examForm.beginTime = val
      } else {
        this.examForm.signBeginTime = val
      }
      this.dealTime(val, this.examForm.signEndTime, type)
    },
    endChange (val, type) {
      if (type === 'exam') {
        this.examForm.endTime = val
      } else {
        this.examForm.signEndTime = val
      }
      this.dealTime(this.examForm.signBeginTime, val, type)
    },

    /**
     * 编辑试卷
     */
    handleEdit (data) {
      this.$emit('prev', data)
    },

    /**
     * 保存
     */
    handleSave () {
      this.saveLoading = true
      this.$refs['examForm'].validate(async (valid) => {
        if (valid) {
          this.examForm.testPaperId = this.data.id
          const { data } = await save(toDtoForm(this.examForm))
          this.$emit('on-data', data.data)
        }
      })
    },

    /**
     * 发布
     */
    handleRelease () {
      this.submitDisabled = true
      this.$refs['examForm'].validate(async (valid) => {
        if (valid) {
          this.examForm.testPaperId = this.data.testPaperId
          const { data } = await release(toDtoForm(this.examForm))
          this.$emit('on-data', data.data)
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
