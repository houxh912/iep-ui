<template>
  <div>
    <page-header title="本地上传" :backOption="backOption"></page-header>
    <el-form :model="formData" :rules="rules" ref="form" label-width="100px" style="margin-bottom: 50px;">

      <el-form-item label="名称：" prop="materialName">
        <el-input v-model="formData.materialName"></el-input>
      </el-form-item>
      <el-form-item label="作者：" prop="uploader">
        <el-input v-model="formData.uploader"></el-input>
      </el-form-item>
      <el-form-item label="介绍：" prop="intro">
        <el-input type="textarea" v-model="formData.intro" rows="5"></el-input>
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
      <el-form-item label="下载贝额：" prop="downloadCost">
        <iep-dict-select v-model="formData.downloadCost" dict-name="mlms_download_cost"></iep-dict-select>
      </el-form-item>
      <el-form-item label="标签" prop="tagKeyWords">
        <iep-tags v-model="formData.tagKeyWords"></iep-tags>
      </el-form-item>
      <el-form-item label="附件">
        <iep-upload v-model="formData.attachFileList" :limit="limit"></iep-upload>
      </el-form-item>

    </el-form>
    <footer-toolbar>
      <iep-button type="primary" @click="submitForm('form')">保存</iep-button>
      <iep-button @click="resetForm('form')">取消</iep-button>
    </footer-toolbar>
  </div>
</template>
<script>
import { initLocalForm, rules } from './option'
import IepTags from '@/components/IepTags/input'
import FooterToolbar from '@/components/FooterToolbar/'

export default {
  components: { IepTags, FooterToolbar },
  props: {
    firstClass: {
      type: Array,
      default: () => {},
    },
  },
  data () {
    return {
      dialogShow: false,
      methodName: '新增',
      formRequestFn: () => { },
      formData: initLocalForm(),
      rules: rules,
      secondClass: [],
      dicData: {
        select: [
          {value: '1', label: '选项1'},
          {value: '2', label: '选项2'},
        ],
        dept: [
          {value: 1, label: '部门1'},
          {value: 2, label: '部门2'},
        ],
      },
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
