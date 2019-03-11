<template>
  <iep-dialog :dialog-show="dialogShow" title="上传材料" width="40%" @close="resetForm('form')">
    <el-form :model="formData" :rules="rules" ref="form" label-width="130px">

      <el-form-item label="名称：" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="介绍：">
        <el-input v-model="formData.jieshao" rows="5"></el-input>
      </el-form-item>
      <el-form-item label="分类：" porp="fenlei">
        <el-select v-model="formData.fenlei" placeholder="请选择">
          <el-option v-for="item in dicData.select" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="专利号/证书号：" prop="zhengshu">
        <el-input v-model="formData.zhengshu"></el-input>
      </el-form-item>
      <el-form-item label="获得时间：" prop="huodeshijian">
        <el-date-picker v-model="formData.huodeshijian" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="下载贝额：" porp="beie">
        <el-select v-model="formData.beie" placeholder="请选择">
          <el-option v-for="item in dicData.select" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签：" prop="biaoqian">
        <el-input v-model="formData.biaoqian"></el-input>
      </el-form-item>
      <el-form-item label="附件：" prop="fujian">
        <el-input v-model="formData.fujian"></el-input>
      </el-form-item>


    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">保存</iep-button>
      <iep-button @click="resetForm('form')">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initFormData, rules } from './option'
import IepDialog from '@/components/IepDialog/'
export default {
  components: { IepDialog },
  data () {
    return {
      dialogShow: false,
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
    }
  },
  methods: {
    loadPage () {
      this.$emit('load-page')
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.formData = initFormData()
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
