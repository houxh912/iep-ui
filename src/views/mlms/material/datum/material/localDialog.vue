<template>
  <div class="iep-page-form">
    <page-header title="本地上传" :backOption="backOption"></page-header>
    <el-form :model="formData" :rules="rules" size="small" ref="form" label-width="100px" style="margin-bottom: 50px;">
      <el-form-item label="名称：" prop="materialName">
        <span slot="label">
          名称
          <iep-tip :content="tipContent.materialName"></iep-tip>
          ：
        </span>
        <el-input v-model="formData.materialName" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="作者：" prop="uploader">
        <span slot="label">
          作者
          <iep-tip :content="tipContent.uploader"></iep-tip>
          ：
        </span>
        <el-input v-model="formData.uploader" maxlength="40"></el-input>
      </el-form-item>
      <el-form-item label="介绍：" prop="intro">
        <span slot="label">
          介绍
          <iep-tip :content="tipContent.intro"></iep-tip>
          ：
        </span>
        <el-input type="textarea" v-model="formData.intro" rows="5" maxlength="200"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span=12>
          <el-form-item label="分类：" prop="firstClass">
            <span slot="label">
              分类
              <iep-tip :content="tipContent.firstClass"></iep-tip>
              ：
            </span>
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
        <span slot="label">
          类型
          <iep-tip :content="tipContent.materialType"></iep-tip>
          ：
        </span>
        <iep-dict-select v-model="formData.materialType" dict-name="mlms_material_type"></iep-dict-select>
      </el-form-item>
      <el-form-item label="下载贝额：" prop="downloadCost">
        <span slot="label">
          下载贝额
          <iep-tip :content="tipContent.downloadCost"></iep-tip>
        </span>
        <iep-dict-select v-model="formData.downloadCost" dict-name="mlms_download_cost"></iep-dict-select>
      </el-form-item>
      <el-form-item label="标签：" prop="tagKeyWords">
        <span slot="label">
          标签
          <iep-tip :content="tipContent.tagKeyWords"></iep-tip>
          ：
        </span>
        <iep-tag v-model="formData.tagKeyWords"></iep-tag>
      </el-form-item>
      <el-form-item label="是否开放：" prop="isOpen">
        <el-switch v-model="formData.isOpen" :active-value="dictsMap.isOpen[0].value" :inactive-value="dictsMap.isOpen[1].value"></el-switch>
      </el-form-item>
      <el-form-item label="是否保密：" prop="secrecyLevel">
        <el-switch v-model="formData.secrecyLevel" :active-value="dictsMap.secrecyLevel[1].value" :inactive-value="dictsMap.secrecyLevel[0].value"></el-switch>
      </el-form-item>
      <el-form-item label="附件：" prop="attachFileList">
        <span slot="label">
          附件
          <iep-tip :content="tipContent.attachFileList"></iep-tip>
          ：
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
import { initLocalForm, rules, dictsMap, tipContent } from './option'
import { createData, updateData } from '@/api/mlms/material/datum/material'

export default {
  props: {
    firstClass: {
      type: Array,
      default: () => { },
    },
  },
  data () {
    return {
      tipContent,
      dialogShow: false,
      methodName: 'create',
      methodList: {
        create: {
          name: '新增',
          requestFn: createData,
        },
        update: {
          name: '编辑',
          requestFn: updateData,
        },
      },
      formData: initLocalForm(),
      backId: '',
      rules: rules,
      secondClass: [],
      dictsMap,
      limit: 1,
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
          if (this.formData.attachFileList.length > 0) {
            this.formData.attachFile = this.formData.attachFileList[0].url
          }
          this.formData.type = 0
          this.methodList[this.methodName].requestFn(this.formData).then((data) => {
            this.backId = data.id
            if (data.data && data.data.data === false) {
              this.$message.error(data.data.msg)
              return
            }
            let tips = this.methodName == 'create' ? '恭喜您成功上传了一篇材料，成功获得2个国脉贝，继续努力！' : '编辑成功'
            this.$message.success(tips)
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
          this.formData.secondClass = ''
          return
        }
      }
    },
  },
}
</script>
