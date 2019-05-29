<template>
  <iep-dialog :dialog-show="dialogShow" :title="methodName" width="400px" @close="close">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="100px">
      <el-form-item label="金额：" prop="amount">
        <iep-input-number v-model="form.amount"></iep-input-number>
      </el-form-item>
      <el-form-item label="方式：" prop="isReward">
        <el-radio-group v-model="form.isReward" size="medium">
          <el-radio v-for="(v,k) in dictsMap.isReward" :key="k" :label="k">{{v}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="类型：" prop="type">
        <iep-dict-select v-model="form.type" dict-name="fams_reward_reason" placeholder="选择打赏类型"></iep-dict-select>
      </el-form-item>
      <el-form-item label="对象：" prop="targetUser">
        <iep-contact-select v-model="form.targetUser"></iep-contact-select>
      </el-form-item>
      <el-form-item label="备注：" prop="message">
        <iep-input-area v-model="form.message"></iep-input-area>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">保存</iep-button>
      <iep-button @click="dialogShow = false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm, dictsMap, dtoForm, rules } from './options'
export default {
  data () {
    return {
      dictsMap,
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '打赏/扣减',
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
          this.formRequestFn(dtoForm(this.form)).then(({ data }) => {
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

