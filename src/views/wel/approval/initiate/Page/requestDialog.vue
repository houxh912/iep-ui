<template>
  <iep-dialog :dialog-show="dialogShow" title="发起请求" width="500px" @close="loadPage">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="100px">
      <el-form-item label="人事管理" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="行政管理" prop="typeId">
        <iep-select prefix-url="hrms/post_type" v-model="form.typeId"></iep-select>
      </el-form-item>
      <el-form-item label="费用管理" prop="duties">
        <el-input v-model="form.duties" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">提交</iep-button>
      <iep-button @click="loadPage">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import IepSelect from '@/components/IepCommon/Select'
import IepDialog from '@/components/IepDialog/'
import { initForm } from '../options'
export default {
  components: { IepDialog, IepSelect },
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '发起请求',
      form: initForm(),
      rules: {
        name: [
          { required: true, message: '请输入岗位名称', trigger: 'blur' },
        ],
        typeId: [
          { required: true, message: '请选择岗位类型', trigger: 'blur' },
        ],
        duties: [
          { required: true, message: '请输入岗位职责', trigger: 'blur' },
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

