<template>
  <iep-dialog :dialog-show="dialogShow" title="期初值设置" width="500px" @close="close">
    <el-form class="form-detail" :model="form" size="small" ref="form" :rules="rules" label-width="120px">
      <el-form-item label="项目收入(元)：" prop="projectIncome">
        <iep-input-amount v-model="form.projectIncome" :min="-99999999"></iep-input-amount>
      </el-form-item>
      <el-form-item label="内部收入(元)：" prop="internalRevenue">
        <iep-input-amount v-model="form.internalRevenue" :min="-99999999"></iep-input-amount>
      </el-form-item>
      <el-form-item label="费用(元)：" prop="cost">
        <iep-input-amount v-model="form.cost" :min="-99999999"></iep-input-amount>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen">提交</iep-button>
      <iep-button @click="close">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import formMixins from '@/mixins/formMixins'
import { putinitial } from '@/api/fams/initial'
function initForm () {
  return {
    id: 0,
    projectIncome: 0,
    internalRevenue: 0,
    cost: 0,
  }
}
export default {
  mixins: [formMixins],
  data () {
    return {
      dialogShow: false,
      form: initForm(),
      rules: {
        projectIncome: [
          { required: true, message: '请输入项目收入', trigger: 'blur', type: 'number' },
        ],
        internalRevenue: [
          { required: true, message: '请输入内部收入', trigger: 'blur', type: 'number' },
        ],
        cost: [
          { required: true, message: '请输入费用', trigger: 'blur', type: 'number' },
        ],
      },
    }
  },
  methods: {
    async submitForm () {
      const { data } = await putinitial(this.form)
      if (data.data) {
        this.$message.success('操作成功')
        this.close()
      } else {
        this.$message(data.msg)
      }
    },
    close () {
      this.dialogShow = false
      this.$emit('load-page')
    },
  },
}
</script>
