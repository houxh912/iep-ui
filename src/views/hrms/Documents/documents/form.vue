<template>
  <div class="iep-page-form">
    <basic-container>
      <iep-page-header :title="`${methodName}纪要`" :backOption="backOption"></iep-page-header>
      <el-form :model="formData" :rules="rules" size="small" ref="form" label-width="130px" style="margin-bottom: 50px;" class="form-detail">

        <el-form-item label="标题：" prop="title">
          <el-input v-model="formData.title" placeholder="请输入文件的标题"></el-input>
        </el-form-item>
        <el-form-item label="类别：" prop="classId">
          <el-input v-model="formData.classId" placeholder="请输入文件的类别"></el-input>
        </el-form-item>
        <el-form-item label="描述：" prop="resume">
          <el-input v-model="formData.resume" placeholder="请输入文件的描述" type="textarea" :rows=5></el-input>
        </el-form-item>
        <el-form-item label="内容：" prop="content">
          <iep-froala-editor v-model="formData.content"></iep-froala-editor>
        </el-form-item>
        <el-form-item label="成文日期：" prop="enterTime">
          <el-date-picker v-model="formData.enterTime" value-format="yyyy-MM-dd 00:00:00" type="date" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="文件状态：" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio v-for="(item, index) in dictsMap.status" :key="index" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标签：" prop="tagKeyWords">
          <iep-tag v-model="formData.tagKeyWords"></iep-tag>
        </el-form-item>
        <el-form-item label="附件：" prop="annexList">
          <iep-upload v-model="formData.annexList" :limit="1"></iep-upload>
        </el-form-item>
        <el-form-item label="置顶显示：" prop="topShow">
          <el-switch
            v-model="formData.topShow"
            active-value="0"
            inactive-value="1"
            active-color="#13ce66">
          </el-switch>
        </el-form-item>

      </el-form>
      <footer-tool-bar>
        <iep-button type="primary" @click="handleSubmit('form')" :loading="loadState">保存</iep-button>
        <iep-button @click="resetForm('form')">取消</iep-button>
      </footer-tool-bar>
    </basic-container>
  </div>
</template>
<script>
import { initFormData, dictsMap, rules } from './option'

export default {
  components: {  },
  data () {
    return {
      loadState: false,
      dictsMap,
      rules,
      formData: initFormData(),
      methodName: '新增',
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.resetForm()
        },
      },
    }
  },
  methods: {
    resetForm () {
      this.formData = initFormData()
      this.$emit('load-page', true)
    },
    handleSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loadState = true
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
.el-tag {
  margin-right: 10px;
}
</style>
