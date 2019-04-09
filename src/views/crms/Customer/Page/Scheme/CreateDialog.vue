<template>

  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}方案`" width="60%" @close="loadPage">
    <el-form :model="formData" :rules="rules" ref="formName" label-width="100px" size="small">
      <el-form-item>
        <el-col><i class="el-icon-warning"></i> 是否需要关联材料库？如需要，<span class="relation" @click="relation">请点击此处</span></el-col>
        <el-col>如不需要，请直接填写下方内容</el-col>
      </el-form-item>
      <el-form-item label="方案名称：" prop="programName">
        <el-input v-model="formData.programName"></el-input>
      </el-form-item>
      <el-form-item label="附件上传：">
        <iep-upload v-model="formData.attachs" :limit="1">
          <span>文件类型为excel，每次上传数量不超过一个</span>
        </iep-upload>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('formName')">{{methodName}}</iep-button>
      <iep-button @click="resetForm">取消</iep-button>
    </template>
    <meterial-dialog ref="MeterialDialog" @load-page="loadPage" @add="add"></meterial-dialog>
  </iep-dialog>

</template>
<script>
import { initForm } from './options'
import MeterialDialog from './MeterialDialog'
import { createData } from '@/api/mlms/material/datum/material'
export default {
  components: {
    MeterialDialog,
  },
  data () {
    return {
      dialogShow: false,
      submitFn: () => { },
      methodName: '',
      formData: initForm(),
      record: {},
      rules: {
        programName: [
          { required: true, message: '请填写方案名称', trigger: 'change' },
        ],
      },
    }
  },
  created () {
  },
  methods: {
    relation () {
      this.$nextTick(() => {
        this.$refs['MeterialDialog'].dialogShow = true
        this.$refs['MeterialDialog'].formRequestFn = createData
      })
    },
    add (val) {
      this.formData.programName = val.materialName
      this.formData.attachs = val.attachFileList
    },
    loadPage () {
      this.formData = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    resetForm () {
      this.formData = initForm()
      this.dialogShow = false
    },
    submitForm (formName) {
      if (this.formData.attachs.length == 0) {
        this.$message.error('请选择上传的文件')
        return false
      } else {
        this.formData.atchUpload = this.formData.attachs[0].url
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitFn(this.formData).then(() => {
            this.$notify({
              title: '成功',
              message: `${this.methodName}方案成功`,
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
<style>
.relation {
  color: #be2c31;
  cursor: pointer;
}
</style>


