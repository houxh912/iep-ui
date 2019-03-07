<template>
  <iep-dialog :dialog-show="dialogShow" title="编辑" width="400px" @close="loadPage">
    <el-form :model="editForm" :rules="rules" size="small" ref="editForm" label-width="100px">
      <el-form-item label="岗位名称" prop="positionName">
        <el-input v-model="editForm.positionName"></el-input>
      </el-form-item>
      <el-form-item label="岗位类型" prop="positionType">
        <el-select v-model="editForm.positionType" placeholder="请选择">
          <el-option label="产品" value="产品"></el-option>
          <el-option label="设计" value="设计"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="岗位职责" prop="positionTask">
        <el-input v-model="editForm.positionTask" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="岗位要求" prop="positionRequire">
        <el-input v-model="editForm.positionRequire" type="textarea"></el-input>
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
        positionName: [
          { required: true, message: '请输入岗位名称', trigger: 'blur' },
        ],
        positionType: [
          { required: true, message: '请选择岗位类型', trigger: 'blur' },
        ],
        positionTask: [
          { required: true, message: '请输入岗位职责', trigger: 'blur' },
        ],
        positionRequire: [
          { required: true, message: '请输入岗位要求', trigger: 'blur' },
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

