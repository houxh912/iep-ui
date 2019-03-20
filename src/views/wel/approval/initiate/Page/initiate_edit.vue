<template>
  <iep-dialog :dialog-show="dialogShow" title="发起请求" width="500px" @close="loadPage">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="100px">
      <el-form-item label="申请人" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="申请类型" prop="applyType">
        <el-input v-model="form.applyType"></el-input>
      </el-form-item>
      <el-form-item label="开始时间" prop="startTime">
        <el-input v-model="form.startTime"></el-input>
      </el-form-item>
      <el-form-item label="批阅时间" prop="markingTime">
        <el-input v-model="form.markingTime"></el-input>
      </el-form-item>
      <el-form-item label="批阅人" prop="approver">
        <el-input v-model="form.approver"></el-input>
      </el-form-item>
      <el-form-item label="批阅结果" prop="approveRes">
        <el-input v-model="form.approveRes"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">提交</iep-button>
      <iep-button @click="loadPage">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
// import IepSelect from '@/components/IepCommon/Select'
import IepDialog from '@/components/IepDialog/'
import { initEditForm } from '../options'
export default {
  components: { IepDialog },
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '发起请求',
      form: initEditForm(),
      rules: {
        name: [
          { required: true, message: '请输入岗位名称', trigger: 'blur' },
        ],
        applyType: [
          { required: true, message: '请选择岗位类型', trigger: 'blur' },
        ],
        markingTime: [
          { required: true, message: '请输入岗位职责', trigger: 'blur' },
        ],
         approver: [
          { required: true, message: '请输入岗位职责', trigger: 'blur' },
        ],
         approveRes: [
          { required: true, message: '请输入岗位职责', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    loadPage () {
      this.form = initEditForm()
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

