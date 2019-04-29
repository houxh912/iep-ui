<template>
  <div class="iep-page-form">
    <page-header :title="`${methodName}荣誉资质`" :backOption="backOption"></page-header>
    <el-form :model="formData" :rules="rules" size="small" ref="form" label-width="130px" style="margin-bottom: 50px;">
      <el-form-item label="名称：" prop="honorQualName">
        <el-input v-model="formData.honorQualName" :maxlength="50"></el-input>
        <span slot="label">
          名称
          <iep-tip :content="tipContent.honorQualName"></iep-tip>：
        </span>
      </el-form-item>
      <el-form-item label="介绍：" prop="intro">
        <span slot="label">
          介绍
          <iep-tip :content="tipContent.intro"></iep-tip>：
        </span>
        <el-input v-model="formData.intro" rows="5" :maxlength="200"></el-input>
      </el-form-item>
      <el-form-item label="分类：" prop="type">
        <span slot="label">
          分类
          <iep-tip :content="tipContent.type"></iep-tip>：
        </span>
        <iep-dict-select v-model="formData.type" dict-name="mlms_honor_qual_type"></iep-dict-select>
      </el-form-item>
      <el-form-item label="专利号/证书号：" prop="number">
        <span slot="label">
          专利号/证书号
          <iep-tip :content="tipContent.type"></iep-tip>：
        </span>
        <el-input v-model="formData.number" :maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="获得时间：" prop="acquireTime">
        <span slot="label">
          获得时间
          <iep-tip :content="tipContent.acquireTime"></iep-tip>：
        </span>
        <IepDatePicker v-model="formData.acquireTime"></IepDatePicker>
      </el-form-item>
      <el-form-item label="下载贝额：" prop="downloadCost">
        <span slot="label">
          下载贝额
          <iep-tip :content="tipContent.downloadCost"></iep-tip>：
        </span>
        <iep-dict-select v-model="formData.downloadCost" dict-name="mlms_download_cost"></iep-dict-select>
      </el-form-item>
      <el-form-item label="标签：" prop="tagKeyWords">
        <span slot="label">
          标签
          <iep-tip :content="tipContent.tagKeyWords"></iep-tip>：
        </span>
        <iep-tag v-model="formData.tagKeyWords"></iep-tag>
      </el-form-item>
      <el-form-item label="附件：">
        <span slot="label">
          附件
          <iep-tip :content="tipContent.tagKeyWords"></iep-tip>：
        </span>
        <iep-upload v-model="formData.attachFileList" :limit="limit"></iep-upload>
      </el-form-item>

    </el-form>
    <footer-tool-bar>
      <iep-button type="primary" @click="submitForm('form')">保存</iep-button>
      <iep-button @click="resetForm('form')">重置</iep-button>
    </footer-tool-bar>
  </div>
</template>
<script>
import { initFormData, rules, tipContent } from './option'

export default {
  components: {},
  data () {
    return {
      methodName: '新增',
      tipContent,
      formRequestFn: () => { },
      formData: initFormData(),
      rules: rules,
      dicData: {
        select: [
          { value: 1, label: '选项1' },
          { value: 2, label: '选项2' },
        ],
        dept: [
          { value: 1, label: '部门1' },
          { value: 2, label: '部门2' },
        ],
      },
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$emit('load-page', true)
        },
      },
      limit: 1,
    }
  },
  methods: {
    loadPage () {
      this.$emit('load-page')
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.formData = initFormData()
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.formData.attachFileList.length > 0) {
            this.formData.attachFile = this.formData.attachFileList[0].url
          }
          this.formRequestFn(this.formData).then(() => {
            this.$message({
              message: `${this.methodName}成功`,
              type: 'success',
            })
            this.loadPage()
          })
        } else {
          return false
        }
      })
    },
  },
}
</script>
