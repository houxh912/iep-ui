<template>
  <iep-dialog :dialog-show="dialogShow" title="培训信息" width="600px" @close="close">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="100px">
      <el-form-item label="培训图片：" prop="themePictures">
        <iep-avatar v-model="form.themePictures"></iep-avatar>
      </el-form-item>
      <el-form-item label="培训主题：" prop="trainingTheme">
        <el-input v-model="form.trainingTheme" placeholder="请填入培训主题"></el-input>
      </el-form-item>
      <el-form-item label="培训老师：" prop="user">
        <iep-contact-select v-model="form.user"></iep-contact-select>
      </el-form-item>
      <el-form-item label="培训时间：" prop="rangeTime">
        <iep-date-picker v-model="form.rangeTime" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
        </iep-date-picker>
      </el-form-item>
      <el-form-item label="培训类型：" prop="typeId">
        <iep-dict-select v-model="form.typeId" dict-name="hrms_training_type" placeholder="选择类型"></iep-dict-select>
      </el-form-item>
      <el-form-item label="培训方式：" prop="methodId">
        <iep-dict-select v-model="form.methodId" dict-name="hrms_training_mode" placeholder="选择方式"></iep-dict-select>
      </el-form-item>
      <el-form-item label="培训地点：" prop="place">
        <el-input v-model="form.place" placeholder="请填入培训地点"></el-input>
      </el-form-item>
      <el-form-item label="培训标签：" prop="trainingTag">
        <iep-tag v-model="form.trainingTag"></iep-tag>
      </el-form-item>
      <el-form-item label="培训简介：" prop="trainingBrief">
        <iep-input-area v-model="form.trainingBrief"></iep-input-area>
      </el-form-item>
      <el-form-item label="培训材料：" prop="material">
        <iep-upload v-model="form.material">请上传培训材料</iep-upload>
      </el-form-item>
      <el-form-item label="关联材料：" prop="material">
        <material-table v-model="form.materialList"></material-table>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">提交</iep-button>
      <iep-button @click="dialogShow = false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm, rules, formToDto } from './options'
import { pickerOptions } from '@/const/formConfig.js'
import formMixins from '@/mixins/formMixins'
import MaterialTable from '@/views/cpms/Components/MaterialTable'
export default {
  components: { MaterialTable },
  mixins: [formMixins],
  data () {
    return {
      pickerOptions,
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initForm(),
      rules,
    }
  },
  methods: {
    close () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    async submitForm () {
      const { data } = await this.formRequestFn(formToDto(this.form))
      if (data.data) {
        this.$message.success('操作成功')
        this.close()
      } else {
        this.$message(data.msg)
      }
    },
  },
}
</script>
