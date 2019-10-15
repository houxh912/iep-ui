<template>
  <basic-container class="iep-page-form">
    <iep-page-header title="新建问答" :backOption="backOption"></iep-page-header>
    <el-form :model="formData" :rules="rules" size="small" ref="form" label-width="150px" style="margin-bottom: 50px;" class="form-detail">
      <el-form-item label="标准问题：" prop="question">
        <el-input v-model="formData.question"></el-input>
      </el-form-item>
      <el-form-item label="相似问法：">
        <el-input v-model="formData.lalalalalalalala"></el-input>
      </el-form-item>
      <el-form-item label="答案：" prop="reply">
        <iep-froala-editor v-model="formData.reply"></iep-froala-editor>
      </el-form-item>
      <el-form-item label="标签：" prop="tagKeyWords">
        <iep-tag v-model="formData.tagKeyWords" plus @selectTags="selectTags"></iep-tag>
      </el-form-item>

      <el-row>
        <el-col :span=12>
          <el-form-item label="问题分类：" prop="type">
            <el-input v-model="formData.type"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="是否禁用：" prop="isUsed">
            <el-radio-group v-model="formData.isUsed">
              <el-radio label="0">是</el-radio>
              <el-radio label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <footer-tool-bar>
      <iep-button type="primary" @click="submitForm('form')" :loading="loadState">保存</iep-button>
      <iep-button @click="resetForm('form')">重置</iep-button>
    </footer-tool-bar>
  </basic-container>
</template>
<script>
import { initFormData, rules, dictsMap } from './options'

export default {
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
          this.$emit('load_page', false)
        },
      },
    }
  },
  methods: {
    loadPage () {
      this.$emit('load_page', true)
    },
    resetForm () {
      this.formData = initFormData()
    },
    open () {
      
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loadState = true
          console.log('formData: ', this.formData)
        } else {
          return false
        }
      })
    },
  },
  created () {
    
  },
}
</script>

<style lang="scss" scoped>

</style>
