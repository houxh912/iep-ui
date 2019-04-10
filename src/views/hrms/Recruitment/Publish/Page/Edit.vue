<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header :title="`${methodName}招聘`" :backOption="backOption"></page-header>
      <el-form ref="form" :model="form" label-width="120px" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="岗位名称：">
              <iep-cascader v-model="form.position" prefix-url="hrms/post_type"></iep-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属部门：">
              <iep-cascader v-model="form.dept" prefix-url="admin/dept" change-on-select></iep-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="招聘人数：">
              <iep-input-number v-model="form.recruitsCount"></iep-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="目标人数：">
              <iep-input-number v-model="form.targetCount"></iep-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="学历要求：">
              <iep-dict-select v-model="form.academicId" dict-name="hrms_highest_educational"></iep-dict-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工作类型：">
              <iep-dict-select v-model="form.jobTypeId" dict-name="hrms_work_type"></iep-dict-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="工作年限：">
              <iep-input-number v-model="form.years"></iep-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="专业要求：">
              <el-input v-model="form.profession"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="工作地点：">
              <el-input v-model="form.place"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别：">
              <el-radio-group v-model="form.sex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
                <el-radio :label="3">不限</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="工资待遇：">
              <el-input v-model="form.treatment"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="外语要求：">
              <el-input v-model="form.language"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="招聘期限：">
              <iep-date-picker v-model="form.term" type="date" placeholder="选择日期"></iep-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="福利待遇：">
              <el-input v-model="form.welfare"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="岗位职责：">
          <iep-input-area v-model="form.duties"></iep-input-area>
        </el-form-item>
        <el-form-item label="岗位要求：">
          <iep-input-area v-model="form.claim"></iep-input-area>
        </el-form-item>
        <el-form-item label="">
          <operation-wrapper>
            <iep-button type="primary" @click="handleSubmit">提交</iep-button>
            <iep-button @click="handlePublish">保存并发布</iep-button>
          </operation-wrapper>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { getPublishRecruitmentById } from '@/api/hrms/publish_recruitment'
import { initForm, formToDto } from '../options'

export default {
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      id: false,
      methodName: '发布',
      formRequestFn: () => { },
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.$emit('onGoBack') },
      },
      form: initForm(),
    }
  },
  created () {
    this.methodName = this.record.methodName
    this.formRequestFn = this.record.formRequestFn
    this.id = this.record.id
    if (this.id) {
      getPublishRecruitmentById(this.id).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
      })
    }
  },
  methods: {
    handlePublish () {
      this.handleSubmit(true)
    },
    handleSubmit (isPublish) {
      const publish = isPublish === true ? true : false
      this.formRequestFn(formToDto(this.form), publish).then(({ data }) => {
        if (data.data) {
          this.$message({
            message: `招聘信息${this.methodName}成功`,
            type: 'success',
          })
          this.$emit('onGoBack')
        }
      })
    },
  },
}
</script>