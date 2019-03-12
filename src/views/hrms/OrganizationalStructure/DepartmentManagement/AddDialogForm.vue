<template>
  <iep-dialog :dialog-show="dialogShow" title="部门新增" width="400px" @close="loadPage">
    <el-form :model="addForm" :rules="rules" size="small" ref="addForm" label-width="100px">
      <el-form-item label="上级部门" prop="superiorDepartment">
        <el-select v-model="addForm.superiorDepartment" placeholder="请选择">
          <el-option label="666" value="666">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门编号" prop="number">
        <el-input v-model="addForm.number"></el-input>
      </el-form-item>
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="addForm.name"></el-input>
      </el-form-item>
      <el-form-item label="负责人" prop="userName">
        <el-input v-model="addForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="成立时间" prop="establishedTime">
        <el-date-picker v-model="addForm.establishedTime" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('addForm')">提交</iep-button>
      <iep-button @click="loadPage">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import IepDialog from '@/components/IepDialog/'
import { initaddForm } from './options'
export default {
  components: { IepDialog },
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      addForm: initaddForm(),
      rules: {
        superiorDepartment: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        departmentNumber: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        departmentName: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        departmentHead: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        creartedTime: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    loadPage () {
      this.addForm = initaddForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.addForm).then(() => {
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

