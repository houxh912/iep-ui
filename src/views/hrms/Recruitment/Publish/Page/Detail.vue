<template>
  <div class="edit-wrapper">
    <basic-container>
      <page-header title="发布招聘" :backOption="backOption"></page-header>
      <el-form class="form-detail" ref="form" :model="form" label-width="120px" size="small" disabled>
        <el-row>
          <el-col :span="12">
            <el-form-item label="岗位名称：">
              <label>产品总监</label>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属部门：">
              <label>技术部</label>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="招聘人数：">
              <label>{{form.recruitsCount}}人</label>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="目标人数：">
              <label>{{form.targetCount}}人</label>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="学历要求：" class="form-half">
              <iep-dict-detail :current-value="form.academicId" dict-name="hrms_highest_educational"></iep-dict-detail>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工作类型：" class="form-half">
              <iep-dict-detail :current-value="form.jobTypeId" dict-name="hrms_work_type"></iep-dict-detail>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="工作年限：">
              <label>{{form.years}}年</label>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="专业要求：">
              <label>{{form.profession}}</label>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="工作地点：" class="form-half">
              <label>{{form.place}}</label>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别：" class="form-half">
              <label>男</label>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="工资待遇：" class="form-half">
              <label>{{form.treatment}}</label>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="外语要求：" class="form-half">
              <label>{{form.language}}</label>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="招聘期限：" class="form-half">
              <label>{{form.term}}</label>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="福利待遇：" class="form-half">
              <label>{{form.welfare}}</label>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="岗位职责：">
          <label>{{form.duties}}</label>
        </el-form-item>
        <el-form-item label="岗位要求：">
          <label>{{form.claim}}</label>
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