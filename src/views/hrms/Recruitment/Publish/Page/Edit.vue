<template>
  <div class="edit-wrapper">
    <basic-container>
      <page-header :title="`${methodName}招聘`" :backOption="backOption"></page-header>
      <el-form ref="form" :model="form" label-width="120px" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="岗位名称：">
              <iep-cascader v-model="form.position" prefix-url="hrms/post_type"></iep-cascader>
              <!-- <el-input v-model="form.positionId"></el-input> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属部门：">
              <el-input v-model="form.deptId"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="招聘人数：">
              <el-input-number v-model="form.recruitsCount"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="目标人数：">
              <el-input-number v-model="form.targetCount"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="学历要求：">
              <el-select v-model="form.academicId" placeholder="请选择">
                <el-option v-for="item in dictGroup['hrms_highest_educational']" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工作类型：">
              <el-select v-model="form.jobTypeId" placeholder="请选择">
                <el-option v-for="item in dictGroup['hrms_work_type']" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="工作年限：">
              <el-input-number v-model="form.years"></el-input-number>
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
              <el-date-picker v-model="form.term" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="福利待遇：">
              <el-input v-model="form.welfare"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="岗位职责：">
          <el-input type="textarea" v-model="form.duties" :rows="4"></el-input>
        </el-form-item>
        <el-form-item label="岗位要求：">
          <el-input type="textarea" v-model="form.claim" :rows="4"></el-input>
        </el-form-item>
        <el-form-item label="">
          <iep-button type="primary" @click="handleSubmit">提交</iep-button>
          <iep-button @click="handlePublish">保存并发布</iep-button>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { getPublishRecruitmentById } from '@/api/hrms/publish_recruitment'
import { mapState } from 'vuex'
import PageHeader from '@/components/Page/Header'
import { initForm } from '../options'
import { mergeByFirst } from '@/util/util'
export default {
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  components: { PageHeader },
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
  computed: {
    ...mapState({
      dictGroup: state => state.user.dictGroup,
    }),
  },
  created () {
    this.methodName = this.record.methodName
    this.formRequestFn = this.record.formRequestFn
    this.id = this.record.id
    if (this.id) {
      getPublishRecruitmentById(this.id).then(({ data }) => {
        this.form = mergeByFirst(initForm(), data.data)
      })
    }
  },
  methods: {
    handlePublish () {
      this.handleSubmit(true)
    },
    handleSubmit (isPublish) {
      const publish = isPublish === true ? true : false
      this.formRequestFn(this.form, publish).then(({ data }) => {
        console.log(data.data)
        this.$message({
          message: `招聘信息${this.methodName}成功`,
          type: 'success',
        })
        this.$emit('onGoBack')
      })
    },
  },
}
</script>
<style scoped>
.edit-wrapper >>> .el-form {
  margin-right: 20%;
  margin-top: 50px;
}
</style>

<style lang="scss" scoped>
</style>
