<template>
  <basic-container class="iep-page-form">
    <iep-page-header :title="`${methodName === 'create' ? '新增' : '修改'}问答`" :backOption="backOption"></iep-page-header>
    <el-form :model="formData" :rules="rules" size="small" ref="form" label-width="150px" style="margin-bottom: 50px;" class="form-detail">
      <el-form-item label="标准问题：" prop="question">
        <el-input v-model="formData.question"></el-input>
      </el-form-item>
      <el-form-item label="相似问法：">
        <el-input v-model="formData.questionList[index].key" v-for="(item, index) in formData.questionList" :key="index" class="question-list"></el-input>
        <iep-button type="primary" @click="handlePush"> <i class="el-icon-plus"></i> 新增相似问题 </iep-button>
      </el-form-item>
      <el-form-item label="答案：" prop="replyStr">
        <iep-froala-editor v-model="formData.replyStr"></iep-froala-editor>
      </el-form-item>
      <el-form-item label="标签：" prop="tags">
        <iep-tag v-model="formData.tags" plus></iep-tag>
      </el-form-item>

      <el-row>
        <el-col :span=12>
          <el-form-item label="问题分类：" prop="types">
            <el-cascader
              v-model="formData.types"
              :options="options"
              :props="cascaderProps"></el-cascader>
              <!-- <el-input v-model="formData.type"></el-input> -->
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="是否禁用：" prop="isUsed">
            <el-radio-group v-model="formData.isUsed">
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <footer-tool-bar>
      <iep-button type="primary" @click="submitForm('form')" :loading="loadState">保存</iep-button>
      <iep-button @click="resetForm">重置</iep-button>
    </footer-tool-bar>
  </basic-container>
</template>

<script>
import { initFormData, rules, dictsMap } from './options'
import { saveOrUpdateOne } from '@/api/ics/question'

export default {
  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },
  data () {
    return {
      loadState: false,
      formData: initFormData(),
      rules: rules,
      dictsMap,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.resetForm()
          this.$emit('load_page', false)
        },
      },
      cascaderProps: {
        checkStrictly: true,
        value: 'id',
        label: 'typeName',
        children: 'subType',
      },
      methodName: 'create',
    }
  },
  methods: {
    loadPage () {
      this.$emit('load_page', true)
    },
    resetForm () {
      this.formData = initFormData()
    },
    open (state, row) {
      this.methodName = 'state'
      if (state === 'cretae') {
        this.formData = this.initFormData()
      } else {
        row.types = [row.type]
        row.questionList = []
        for (let key in row.likeQuestions) {
          row.questionList.push({
            key: key,
            id: row.likeQuestions[key],
          })
        }
        this.formData = row
        console.log('formData: ', this.formData)
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loadState = true
          this.formData.type = this.formData.types[0]
          this.formData.likeQuestions = {}
          for (let item of this.formData.questionList) {
            this.formData.likeQuestions[item.key] = item.id
          }
          saveOrUpdateOne(this.formData).then(({ data }) => {
            this.loadState = false
            if (data.data) {
              this.$message.success('保存成功')
              this.resetForm()
              this.$emit('load_page')
            } else {
              this.$message.error(data.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    handlePush () {
      let list = this.formData.questionList
      if (list.length > 0 && list[list.length - 1].key === '') {
        this.$message.error('请先完善上一条相似问题')
        return
      }
      this.formData.questionList.push({
        key: '',
        id: '',
      })
    },
  },
  created () {
    
  },
}
</script>

<style lang="scss" scoped>
.question-list {
  margin-bottom: 15px;
}
</style>
