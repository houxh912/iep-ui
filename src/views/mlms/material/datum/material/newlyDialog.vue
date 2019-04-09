<template>
  <div class="">
    <page-header title="新建文档" :backOption="backOption"></page-header>
    <el-form :model="formData" :rules="rules" ref="form" label-width="100px" style="margin-bottom: 50px;">

      <el-form-item label="名称：" prop="materialName">
        <el-input v-model="formData.materialName"></el-input>
      </el-form-item>
      <el-form-item label="介绍：" prop="intro">
        <el-input v-model="formData.intro" type="textarea" rows="5"></el-input>
      </el-form-item>
      <el-form-item label="正文：" prop="content">
        <!-- <iep-editor v-model="formData.content"></iep-editor> -->
        <el-input type="textarea" v-model="formData.content" rows=5></el-input>
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
        <el-switch v-model="formData.isContri" :active-value="dicData.isYes[1].value" :inactive-value="dicData.isYes[0].value"></el-switch>
      </el-form-item>
      <!-- <el-form-item label="标题：" prop="biaoti">
        <el-input v-model="formData.biaoti"></el-input>
      </el-form-item>
      <el-form-item label="标题图：" prop="biaotitu">
        <el-input v-model="formData.biaotitu"></el-input>
      </el-form-item>
      <el-form-item label="相关用户：" prop="yonghu">
        <el-input v-model="formData.yonghu"></el-input>
      </el-form-item> -->


    </el-form>

    <footer-tool-bar>
      <iep-button type="primary" @click="submitForm('form')">保存</iep-button>
      <iep-button @click="resetForm('form')">取消</iep-button>
    </footer-tool-bar>

  </div>
</template>
<script>
import { initLocalForm, rules } from './option'

export default {
  components: {  },
  props: {
    firstClass: {
      type: Array,
      default: () => {},
    },
  },
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      formData: initLocalForm(),
      rules: rules,
      secondClass: [],
      dicData: {
        select: [
          {value: '1', label: '选项1'},
          {value: '2', label: '选项2'},
        ],
        isYes: [
          { value: 0, lable: '否' },
          { value: 1, label: '是' },
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
