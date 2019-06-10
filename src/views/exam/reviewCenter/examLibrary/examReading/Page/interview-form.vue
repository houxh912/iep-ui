<template>
  <el-form :model="ruleForm" ref="ruleForm" :rules="rules" :label-position="labelPosition" label-width="100px">
    <el-form-item label="面试成绩" prop="interviewScore">
      <el-input v-model="ruleForm.interviewScore" maxlength="255" placeholder="请输入面试成绩" clearable></el-input>
    </el-form-item>
    <!-- <el-form-item label="面试考官" prop="interviewer">
      <el-input v-model="ruleForm.interviewer" maxlength="255" placeholder="请输入面试考官" clearable></el-input>
    </el-form-item> -->
    <el-form-item label="面试评语" prop="comments">
      <el-input v-model="ruleForm.comments" type="textarea" rows="4" maxlength="255" placeholder="请输入面试评语" clearable></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="handleSubmit('ruleForm')">保存</el-button>
      <el-button type="primary" plain @click="$emit('close', false)">关闭</el-button>
    </el-form-item>
  </el-form>

</template>
<script>
import { getInterviewById, passInterviewById } from '@/api/exam/examLibrary/examReading/examReading'

//校验规则
const allRules = {
  interviewScore: [{ required: true, message: '请输入面试成绩', trigger: 'blur' }],
  //interviewer: [{ required: true, message: '请输入面试考官', trigger: 'blur' }],
  comments: [{ required: true, message: '请输入面试评语', trigger: 'blur' }],
}
export default {
  components: {},
  props: ['formData'],
  data () {
    return {
      labelPosition: 'right',
      ruleForm: {
        id: '',
        interviewScore: '',
        //interviewer: '',
        comments: '',
      },
      rules: allRules,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    /**
     * 首次进入界面获取面试信息
     */
    loadPage () {
      getInterviewById(this.formData.examId).then(res => {
        this.ruleForm = res.data.data
        // this.ruleForm.id = res.data.data.id
        // this.ruleForm.interviewScore = res.data.data.interviewScore
        // this.ruleForm.comments = res.data.data.comments
        console.log('hhhh', this.ruleForm.id)
      })
    },

    /**
     * 保存提交
     */
    handleSubmit (formName) {
      this.ruleForm.id = this.ruleForm.id
      console.log('ppp', this.formData.examId)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          passInterviewById(this.ruleForm).then(() => {
            this.$emit('close', false)
            this.$message({
              showClose: true,
              message: '判分成功',
              type: 'success',
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
</style>