<template>
  <steps-content>
    <el-form ref="form" :model="form" :rules="{rules:resourceReadonly}" size="small" label-width="100px"
      class="content-wrapper">
      <el-form-item prop="resource">
        <el-radio-group v-model="form.resource" @change="resourceChange">
          <el-radio :label="0">创建新试卷</el-radio>
          <el-radio :label="1">从试卷库中抽取</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="试卷名称：" prop="title">
        <el-input v-model="form.title" :disabled="resourceReadonly" :readonly="readOnly"></el-input>
      </el-form-item>
      <el-form-item label="试卷分类：" prop="field">
        <el-select v-model="form.field" :disabled="resourceReadonly || readOnly">
          <el-option value="0" label="国脉内网"></el-option>
          <el-option value="1" label="数据基因"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template v-slot:action>
      <a-button type="primary" @click="handleNext()">
        下一步
      </a-button>
    </template>
  </steps-content>

</template>
<script>
import StepsContent from '@/views/exam/reviewCenter/testPaperLibrary/StepsContent'
export default {
  props: ['data'],
  components: { StepsContent },
  data () {
    return {
      form: {
        title: '',
        field: '',
        resource: '',
      },
      rules: {
        title: [
          { required: true, message: '请输入试卷名称', trigger: 'blur' },
        ],
        field: [
          { required: true, message: '请选择试卷类型', trigger: 'change' },
        ],
        resource: [
          { required: true, message: '请选择考试创建方式', trigger: 'change' },
        ],
      },
    }
  },
  watch: {
    'data.id': {
      handler (newName) {
        console.log('data1', this.data)
        if (newName === false) {
          this.$nextTick(() => {
            this.$refs['form'].resetFields()
          })

        }
        //  else {
        //   this.getTestPaper(this.data.id)
        // }
      },
      immediate: true,
    },
  },
  computed: {
    isEdit () {
      return this.data.id ? true : false
    },
    readOnly () {
      if (this.isEdit) {
        return this.data.methodName === '查看考试' ? true : false
      } else {
        return false
      }
    },
    resourceReadonly () {
      if (this.form.resource === 1) {
        return true
      } else {
        return false
      }
    },
  },
  methods: {

    /**
     * 单选框change
     */
    resourceChange (val) {
      if (val === 1) {
        this.form.title = ''
        this.form.field = ''
      }
    },
    /**
     * 下一步
     */
    handleNext () {
      this.$refs.form.validate(valid => {
        if (valid) {
          let _form = Object.assign(this.data, this.form)
          this.$emit('on-data', _form)
        }
      })
    },

  },
}
</script>

<style lang="scss" scoped>
.content-wrapper {
  width: 50%;
}
</style>

<style scoped>
.content-wrapper >>> .el-radio__inner {
  width: 25px;
  height: 25px;
}
.content-wrapper >>> .el-radio__label {
  font-size: 16px;
  display: inline;
}
</style>

