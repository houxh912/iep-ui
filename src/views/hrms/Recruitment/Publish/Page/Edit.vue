<template>
  <div class="iep-page-form">
    <basic-container>
      <iep-page-header :title="`${methodName}招聘`" :backOption="backOption"></iep-page-header>
      <el-form class="form-detail" ref="form" :model="form" :rules="rules" label-width="140px" size="small">
        <el-form-item class="form-half" label="岗位名称：" prop="position">
          <iep-cascader ref="IepCascader" v-model="form.position" prefix-url="hrms/post_type" @change="handlePositionChange"></iep-cascader>
        </el-form-item>
        <iep-form-item class="form-half" prop="dept" label-name="所属部门" tip="请准确选择人才需求部门">
          <iep-cascader v-model="form.dept" prefix-url="admin/dept" change-on-select></iep-cascader>
        </iep-form-item>
        <el-form-item class="form-half" label="招聘人数：" prop="recruitsCount">
          <iep-input-number v-model="form.recruitsCount" :min="1"></iep-input-number>
        </el-form-item>
        <el-form-item class="form-half" label="是否紧缺：" prop="targetCount">
          <el-radio-group v-model="form.targetCount">
            <el-radio v-for="(item,i) in dictsMap.targetCount" :key="i" :label="+i">{{item}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="form-half" label="学历要求：" prop="academicId">
          <iep-dict-select v-model="form.academicId" dict-name="hrms_highest_educational"></iep-dict-select>
        </el-form-item>
        <el-form-item class="form-half" label="工作类型：" prop="jobTypeId">
          <iep-dict-select v-model="form.jobTypeId" dict-name="hrms_work_type"></iep-dict-select>
        </el-form-item>
        <el-form-item class="form-half" label="工作年限：" prop="years">
          <iep-dict-select v-model="form.years" dict-name="hrms_working_life"></iep-dict-select>
        </el-form-item>
        <iep-form-item class="form-half" prop="profession" label-name="专业要求" tip="多项内容时使用“/”分开，如无要求则填“无”">
          <el-input v-model="form.profession" :maxlength="2010"></el-input>
        </iep-form-item>
        <el-form-item class="form-half" label="工作地点：" prop="place">
          <iep-dict-select v-model="form.place" dict-name="hrms_work_place"></iep-dict-select>
        </el-form-item>
        <el-form-item class="form-half" label="性别：" prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
            <el-radio :label="3">不限</el-radio>
          </el-radio-group>
        </el-form-item>
        <iep-form-item class="form-half" prop="treatment" label-name="工资待遇" tip="请务必以区间形式体现且标明年薪还是月薪，如3000-5000元/月，5-6万/年">
          <iep-dict-select v-model="form.treatment" dict-name="hrms_wages_salaries"></iep-dict-select>
        </iep-form-item>
        <iep-form-item class="form-half" prop="language" label-name="外语要求" tip="此处填写语种+等级，如大学英语四级，日语二级">
          <iep-dict-select v-model="form.language" dict-name="hrms_foreign_language"></iep-dict-select>
        </iep-form-item>
        <iep-form-item class="form-half" prop="term" label-name="招聘期限" tip="此处为招聘截止日期，请务必明确到具体日期，如2019年5月10日">
          <iep-date-picker v-model="form.term" type="date" placeholder="选择日期"></iep-date-picker>
        </iep-form-item>
        <iep-form-item class="form-half" prop="welfare" label-name="福利待遇" tip="此处如需填写多项内容时，请用“/”分开">
          <iep-dict-select v-model="form.welfare" multiple dict-name="hrms_fringe_benefits"></iep-dict-select>
        </iep-form-item>

        <iep-form-item prop="duties" label-name="岗位职责" tip="请务必准确规范填写且不少于6条：<br />1、内容要有条理性，次序性，以1、2、3、4.....序列的形式描述；<br />2、岗位职责清晰，语言简练，忌口语化描述；<br />3、岗位职责为该岗位的工作方向，而非具体内容的操作方法；">
          <iep-input-area v-model="form.duties"></iep-input-area>
        </iep-form-item>

        <iep-form-item prop="claim" label-name="岗位要求" tip="请务必准确规范填写：<br/>1、内容要有条理性，次序性，以1、2、3、4.....序列的形式描述；<br/>2、岗位要求具体内容与岗位职责描述相匹配，切记不搭边。">
          <iep-input-area v-model="form.claim"></iep-input-area>
        </iep-form-item>

        <el-form-item label="">
          <operation-wrapper>
            <iep-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">保存</iep-button>
            <iep-button :loading="submitFormLoading" @click="handlePublish">保存并发布</iep-button>
          </operation-wrapper>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import formMixins from '@/mixins/formMixins'
import { getPublishRecruitmentById, postPublishRecruitment, putPublishRecruitment } from '@/api/hrms/publish_recruitment'
import { initForm, formToDto, rules, dictsMap } from '../options'
import _ from 'lodash'
export default {
  mixins: [formMixins],
  data () {
    return {
      dictsMap,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.onGoBack() },
      },
      rules,
      form: initForm(),
      isPublish: false,
    }
  },
  computed: {
    id () {
      return +this.$route.params.id
    },
    methodName () {
      return this.id ? '编辑' : '发布'
    },
  },
  created () {
    if (this.id) {
      getPublishRecruitmentById(this.id).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
      })
    }
  },
  mounted () {
    if (this.$route.query.position) {
      const position = this.$route.query.position.map(m => +m) || []
      this.form.position = position || []
      setTimeout(() => {
        this.$refs['IepCascader'].handleChange(position)
      }, 2000)
    }
  },
  methods: {
    onGoBack () {
      this.$router.history.go(-1)
    },
    handlePositionChange (item, options) {
      const value = item[item.length - 1]
      const position = _(options)
        .thru(function (coll) {
          return _.union(coll, _.map(coll, 'children'))
        })
        .flatten()
        .find({ value })
      if (position) {
        this.form.duties = position.duty
        this.form.claim = position.rqmt
      }
    },
    handlePublish () {
      this.isPublish = true
      this.mixinsSubmitFormGen()
    },
    async submitForm () {
      const submitFunction = this.id ? putPublishRecruitment : postPublishRecruitment
      this.isPublish = false
      const publish = this.isPublish
      const { data } = await submitFunction(formToDto(this.form), publish)
      if (data.data) {
        this.$message.success(`招聘信息${this.methodName}成功`)
        this.onGoBack()
      } else {
        this.$message.error(data.msg)
      }
    },
  },
}
</script>
