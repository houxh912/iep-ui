<template>
  <iep-dialog :dialog-show="dialogShow" title="新增工资单" width="520px" @close="close">
    <el-form size="small" ref="form" :model="form" label-width="100px">
      <el-form-item label="名称:">
        <el-input v-model="form.title" placeholder="请输入工资单名称"></el-input>
      </el-form-item>
      <el-form-item label="时间:">
        <iep-date-picker v-model="form.date" type="month" placeholder="请输入工资单时间"></iep-date-picker>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm">提交</iep-button>
      <iep-button @click="close">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { addSalary } from '@/api/fams/salary'
import { getYear, getMonth } from '@/util/date'
function initForm () {
  return {
    title: '',
    date: '',
  }
}
const toDtoForm = (row) => {
  const newForm = { ...row }
  newForm.payrollYear = getYear(newForm.date)
  newForm.payrollMonth = getMonth(newForm.date)
  return newForm
}
export default {
  data () {
    return {
      dialogShow: false,
      form: initForm(),
    }
  },
  methods: {
    submitForm () {
      addSalary(toDtoForm(this.form)).then(({ data }) => {
        if (data.data) {
          this.$message.success('操作成功')
          this.close()
        } else {
          this.$message(data.msg)
        }
      })
    },
    close () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
  },
}
</script>

