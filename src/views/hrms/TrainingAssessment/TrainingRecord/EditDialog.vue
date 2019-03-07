<template>
  <iep-dialog :dialog-show="dialogShow" title="培训信息" width="400px" @close="loadPage">
    <el-form :model="editForm" :rules="rules" size="small" ref="editForm" label-width="100px">
      <el-form-item label="培训老师" prop="teacher">
        <el-input v-model="editForm.teacher"></el-input>
      </el-form-item>
      <el-form-item label="培训主体" prop="theme">
        <el-input v-model="editForm.theme"></el-input>
      </el-form-item>
      <el-form-item label="培训时间" prop="time">
        <el-date-picker v-model="editForm.time" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="培训类型" prop="type">
        <el-select v-model="editForm.type" placeholder="请选择">
          <el-option label="业务类" value="业务类">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="培训方式" prop="method">
        <el-input v-model="editForm.method"></el-input>
      </el-form-item>
      <el-form-item label="培训地点" prop="time">
        <el-input v-model="editForm.place"></el-input>
      </el-form-item>
      <el-form-item label="培训材料" prop="material">
        <el-input placeholder="请输入内容" v-model="editForm.material">
          <template slot="append"><span>上传</span></template>
        </el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('editForm')">提交</iep-button>
      <iep-button @click="loadPage">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import IepDialog from '@/components/IepDialog/'
import { initeditForm } from './options'
export default {
  components: { IepDialog },
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      editForm: initeditForm(),
      rules: {
        msg: [
          { required: true, message: '请输入备注', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    loadPage () {
      this.editForm = initeditForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.editForm).then(() => {
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

