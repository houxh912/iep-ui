<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}部门`" width="400px" @close="loadPage">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="100px">
      <el-form-item label="上级部门" prop="superiorDepartment">
        <el-input v-model="form.parentName" disabled></el-input>
        <el-input v-show="false" v-model="form.parentId"></el-input>
      </el-form-item>
      <el-form-item label="部门编号" prop="number">
        <el-input v-model="form.number"></el-input>
      </el-form-item>
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="负责人" prop="userId">
        <el-input v-model="form.userName"></el-input>
        <el-input v-show="false" v-model="form.userId"></el-input>
      </el-form-item>
      <el-form-item label="成立时间" prop="establishedTime">
        <iep-date-picker v-model="form.establishedTime" type="date" placeholder="选择日期">
        </iep-date-picker>
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
import { initForm } from './options'
export default {
  components: { IepDialog },
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initForm(),
      rules: {
        number: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        establishedTime: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
      },
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

