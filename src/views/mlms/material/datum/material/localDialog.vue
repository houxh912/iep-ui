<template>
  <iep-dialog :dialog-show="dialogShow" title="上传材料" width="40%" @close="resetForm('form')">
    <el-form :model="formData" :rules="rules" ref="form" label-width="100px">

      <el-form-item label="名称：" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="作者：" prop="creator">
        <el-input v-model="formData.creator"></el-input>
      </el-form-item>
      <el-form-item label="介绍：" prop="intro">
        <el-input type="textarea" v-model="formData.intro" rows="5"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span=12>
          <el-form-item label="分类：" prop="firstClass">
            <el-select v-model="formData.firstClass" placeholder="请选择">
              <el-option v-for="item in dicData.select" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="" prop="secondClass" label-width="50px">
            <el-select v-model="formData.secondClass" placeholder="请选择">
              <el-option v-for="item in dicData.select" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="类型：" prop="type">
        <el-select v-model="formData.type" placeholder="请选择">
          <el-option v-for="item in dicData.select" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="下载贝额：" prop="downloadCost">
        <el-select v-model="formData.downloadCost" placeholder="请选择">
          <el-option v-for="item in dicData.select" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签" prop="tagKeyWords">
        <iep-tags v-model="formData.tagKeyWords"></iep-tags>
      </el-form-item>
      <el-form-item label="附件" prop="fileList">
        <el-input v-model="formData.fileList">
          <iep-button>上传</iep-button>
        </el-input>
      </el-form-item>

    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">保存</iep-button>
      <iep-button @click="resetForm('form')">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initLocalForm, rules } from './option'
import IepDialog from '@/components/IepDialog/'
import IepTags from '@/components/IepTags/input'
export default {
  components: { IepDialog, IepTags },
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      formData: initLocalForm(),
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
  },
}
</script>
