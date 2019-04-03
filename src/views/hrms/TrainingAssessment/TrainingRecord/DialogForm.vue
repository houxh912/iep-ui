<template>
  <iep-dialog :dialog-show="dialogShow" title="培训信息" width="400px" @close="loadPage">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="100px">
      <el-form-item label="培训主题" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="培训老师" prop="teacher">
        <el-input v-model="form.teacher"></el-input>
      </el-form-item>
      <el-form-item label="开始时间" prop="startTime">
        <iep-date-picker v-model="form.startTime" type="date" placeholder="选择日期"></iep-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="endTime">
        <iep-date-picker v-model="form.endTime" type="date" placeholder="选择日期"></iep-date-picker>
      </el-form-item>
      <el-form-item label="培训类型" prop="typeId">
        <iep-dict-select v-model="form.typeId" dict-name="hrms_training_type"></iep-dict-select>
      </el-form-item>
      <el-form-item label="培训方式" prop="methodId">
        <iep-dict-select v-model="form.methodId" dict-name="hrms_training_mode"></iep-dict-select>
      </el-form-item>
      <el-form-item label="培训地点" prop="place">
        <el-input v-model="form.place"></el-input>
      </el-form-item>
      <el-form-item label="培训材料" prop="material">
        <iep-upload v-model="form.material"></iep-upload>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">提交</iep-button>
      <iep-button @click="loadPage">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import IepDialog from '@/components/IepDialog/'
import { initForm, rules } from './options'
export default {
  components: { IepDialog },
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initForm(),
      rules,
    }
  },
  methods: {
    loadPage () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.form).then(() => {
            this.$notify({
              title: '成功',
              message: '备注',
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

