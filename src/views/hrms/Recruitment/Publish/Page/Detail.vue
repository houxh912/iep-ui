<template>
  <div class="edit-wrapper">
    <basic-container>
      <page-header title="发布招聘" :backOption="backOption"></page-header>
      <el-form ref="form" :model="form" label-width="120px" size="small" disabled>
        <el-row>
          <el-col :span="12">
            <el-form-item label="岗位名称：">
              <el-input v-model="form.positionId"></el-input>
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
            <el-form-item label="学历要求：" class="form-half">
              <el-select v-model="form.academicId" placeholder="请选择">
                <el-option v-for="item in dictGroup['hrms_highest_educational']" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工作类型：" class="form-half">
              <el-select v-model="form.jobTypeId" placeholder="请选择">
                <el-option v-for="item in dictGroup['hrms_work_type']" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="工作地点：" class="form-half">
              <el-input v-model="form.place"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别：" class="form-half">
              <el-radio-group v-model="form.sex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="工资待遇：" class="form-half">
              <el-input v-model="form.treatment"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="外语要求：" class="form-half">
              <el-input v-model="form.language"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="招聘期限：" class="form-half">
              <el-date-picker v-model="form.term" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="福利待遇：" class="form-half">
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
    this.load()
  },
  methods: {
    load () {
      getPublishRecruitmentById(this.record.id).then(({ data }) => {
        this.form = mergeByFirst(initForm(), data.data)
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