<template>
  <div class="iep-page-form">
    <page-header title="新建文档" :backOption="backOption"></page-header>
    <el-form :model="formData" :rules="rules" size="small" ref="form" label-width="100px" style="margin-bottom: 50px;">
      <el-form-item label="名称：" prop="materialName">
        <el-input v-model="formData.materialName" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="介绍：" prop="intro">
        <el-input v-model="formData.intro" type="textarea" rows="5" maxlength="200"></el-input>
      </el-form-item>
      <el-form-item label="正文：" prop="content">
        <!-- <iep-editor v-model="formData.content"></iep-editor> -->
        <el-input type="textarea" v-model="formData.content" rows=5 maxlength="3000"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span=12>
          <el-form-item label="分类：" prop="firstClass">
            <el-select v-model="formData.firstClass" placeholder="请选择" @change="firstClassChange">
              <el-option v-for="item in firstClass" :key="item.id" :label="item.levelName" :value="''+item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="" prop="secondClass" label-width="50px">
            <el-select v-model="formData.secondClass" placeholder="请选择">
              <el-option v-for="item in secondClass" :key="item.id" :label="item.levelName" :value="''+item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="类型：" prop="materialType">
        <el-select v-model="formData.materialType" placeholder="请选择">
          <el-option v-for="item in dicData.select" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签：" prop="tagKeyWords">
        <iep-tag v-model="formData.tagKeyWords"></iep-tag>
      </el-form-item>
      <el-form-item label="是否投稿：" prop="isContri">
        <el-switch v-model="formData.isContri" :active-value="dictsMap.isYes[1].value" :inactive-value="dictsMap.isYes[0].value"></el-switch>
      </el-form-item>
      <el-form-item label="是否开放：" prop="isOpen">
        <el-switch v-model="formData.isOpen" :active-value="dictsMap.isOpen[0].value" :inactive-value="dictsMap.isOpen[1].value"></el-switch>
        <!-- <el-radio-group v-model="formData.isOpen">
          <el-radio v-for="(item, index) in dictsMap.isOpen" :key="index" :label="index">{{item}}</el-radio>
        </el-radio-group> -->
      </el-form-item>
      <el-form-item label="是否保密：" prop="secrecyLevel">
        <el-switch v-model="formData.secrecyLevel" :active-value="dictsMap.secrecyLevel[1].value" :inactive-value="dictsMap.secrecyLevel[0].value"></el-switch>
        <!-- <el-radio-group v-model="formData.secrecyLevel">
          <el-radio v-for="(item, index) in dictsMap.secrecyLevel" :key="index" :label="index">{{item}}</el-radio>
        </el-radio-group> -->
      </el-form-item>

    </el-form>

    <footer-tool-bar>
      <iep-button type="primary" @click="submitForm('form')">保存</iep-button>
      <iep-button @click="resetForm('form')">重置</iep-button>
    </footer-tool-bar>

  </div>
</template>
<script>
import { initLocalForm, rules, dictsMap } from './option'

export default {
  components: {},
  props: {
    firstClass: {
      type: Array,
      default: () => { },
    },
  },
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      formData: initLocalForm(),
      rules: rules,
      secondClass: [],
      dictsMap,
      dicData: {
        select: [
          { value: '1', label: '选项1' },
          { value: '2', label: '选项2' },
        ],
      },
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$emit('load-page', true)
        },
      },
    }
  },
  methods: {
    loadPage () {
      this.$emit('load-page')
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.formData = initLocalForm()
      this.dialogShow = false
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formData.type = 1
          this.formRequestFn(this.formData).then(() => {
            this.$notify({
              title: '成功',
              message: `${this.methodName}成功`,
              type: 'success',
              duration: 2000,
            })
            this.loadPage()
            this.dialogShow = false
          })
        } else {
          return false
        }
      })
    },
    // 分类配置
    firstClassChange (val) {
      for (let item of this.firstClass) {
        if (item.id == val) {
          this.secondClass = item.childrens
          return
        }
      }
    },
  },
}
</script>
