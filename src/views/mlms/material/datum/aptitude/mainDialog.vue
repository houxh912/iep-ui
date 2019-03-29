<template>
  <div>
    <page-header :title="`${methodName}荣誉资质`" :backOption="backOption"></page-header>
    <el-form :model="formData" :rules="rules" ref="form" label-width="130px" style="margin-bottom: 50px;">

      <el-form-item label="名称：" prop="honorQualName">
        <el-input v-model="formData.honorQualName"></el-input>
      </el-form-item>
      <el-form-item label="介绍：" prop="intro">
        <el-input v-model="formData.intro" rows="5"></el-input>
      </el-form-item>
      <el-form-item label="分类：" prop="type">
        <iep-dict-select v-model="formData.type" dict-name="mlms_honor_qual_type"></iep-dict-select>
      </el-form-item>
      <el-form-item label="专利号/证书号：" prop="number">
        <el-input v-model="formData.number"></el-input>
      </el-form-item>
      <el-form-item label="获得时间：" prop="acquireTime">
        <IepDatePicker v-model="formData.acquireTime"></IepDatePicker>
      </el-form-item>
      <el-form-item label="下载贝额：" prop="downloadCost">
        <iep-dict-select v-model="formData.downloadCost" dict-name="mlms_download_cost"></iep-dict-select>
      </el-form-item>
      <el-form-item label="标签：" prop="tagKeyWords">
        <iep-tags v-model="formData.tagKeyWords"></iep-tags>
      </el-form-item>
      <el-form-item label="附件：" prop="fileList">
        <iep-upload v-model="formData.fileList" :limit="limit"></iep-upload>
      </el-form-item>

    </el-form>
    <footer-toolbar>
      <iep-button type="primary" @click="submitForm('form')">保存</iep-button>
      <iep-button @click="resetForm('form')">取消</iep-button>
    </footer-toolbar>
  </div>
</template>
<script>
import { initFormData, rules } from './option'
import IepTags from '@/components/IepTags/input'
import FooterToolbar from '@/components/FooterToolbar/'

export default {
  components: { FooterToolbar, IepTags },
  data () {
    return {
      methodName: '新增',
      formRequestFn: () => { },
      formData: initFormData(),
      rules: rules,
      dicData: {
        select: [
          {value: 1, label: '选项1'},
          {value: 2, label: '选项2'},
        ],
        dept: [
          {value: 1, label: '部门1'},
          {value: 2, label: '部门2'},
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
          this.formData.attachFile = this.formData.fileList[0].url
          this.formRequestFn(this.formData).then(() => {
            this.$notify({
              title: '成功',
              message: `${this.methodName}成功`,
              type: 'success',
              duration: 2000,
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
