<template>
  <iep-dialog :dialog-show="dialogShow" :title="methodName" width="500px" @close="close">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="100px">
      <el-form-item label="金额(元)：" prop="amount">
        <iep-input-number v-model="form.amount" :precision="2"></iep-input-number>
      </el-form-item>
      <el-form-item label="组织：" prop="orgId">
        <iep-select v-model="form.orgId" autocomplete="off" prefix-url="admin/org/all" placeholder="请选择组织"></iep-select>
      </el-form-item>
      <el-form-item label="备注：" prop="remarks">
        <iep-input-area v-model="form.remarks"></iep-input-area>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">保存</iep-button>
      <iep-button @click="dialogShow = false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm, dictsMap, rules } from './options'
export default {
  data () {
    return {
      dictsMap,
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '组织转账',
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
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.form).then(({ data }) => {
            if (data.data) {
              this.$message({
                message: '操作成功',
                type: 'success',
              })
            } else {
              this.$message(data.msg)
            }
            this.close()
          })
        } else {
          return false
        }
      })
    },
  },
}
</script>

