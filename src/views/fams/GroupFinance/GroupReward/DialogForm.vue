<template>
  <iep-dialog :dialog-show="dialogShow" :title="methodName" width="500px" @close="close">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="100px">
      <el-form-item label="金额：" prop="amount">
        <iep-input-amount v-model="form.amount"></iep-input-amount>
      </el-form-item>
      <el-form-item label="方式：" prop="isReward">
        <el-radio-group v-model="form.isReward" size="medium" @change="form.type=''">
          <el-radio v-for="(v,k) in dictsMap.isReward" :key="k" :label="k">{{v}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="类型：" prop="type">
        <iep-dict-select v-model="form.type" :dict-name="dictName" placeholder="选择打赏类型"></iep-dict-select>
      </el-form-item>
      <el-form-item label="打赏组织：" prop="targetOrgId">
        <iep-select v-model="form.targetOrgId" autocomplete="off" prefix-url="admin/org/all" placeholder="请选择打赏组织"></iep-select>
      </el-form-item>
      <el-form-item label="备注：" prop="message">
        <iep-input-area v-model="form.message"></iep-input-area>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">保存</iep-button>
      <iep-button @click="dialogShow = false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import formMixins from '@/mixins/formMixins'
import { initForm, dictsMap, dtoForm, rules } from './options'
export default {
  mixins: [formMixins],
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
  computed: {
    dictName () {
      return this.form.isReward === '1' ? 'fams_reward_reason' : 'fams_reduce_reason'
    },
  },
  methods: {
    close () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    async submitForm () {
      const { data } = await this.formRequestFn(dtoForm(this.form))
      if (data.data) {
        this.$message.success('操作成功')
        this.close()
      } else {
        this.$message(data.msg)
      }
    },
  },
}
</script>

