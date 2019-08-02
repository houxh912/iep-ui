<template>
  <div class="iep-page-form">
    <basic-container>
      <iep-page-header :title="`编辑-${form.ruleName}-规则`" :backOption="backOption"></iep-page-header>
      <el-form ref="form" :model="form" :rules="rules" label-width="150px" size="small">
        <iep-form-item label-name="国脉贝数量" prop="score">
          <iep-input-amount v-model="form.score"></iep-input-amount>
        </iep-form-item>
        <iep-form-item label-name="每日上限次数" prop="dailyLimit">
          <iep-input-number v-model="form.dailyLimit"></iep-input-number>
        </iep-form-item>
        <iep-form-item label-name="动作" prop="action">
          <iep-dict-select v-model="form.action" dict-name="fams_wealth_action" disabled></iep-dict-select>
        </iep-form-item>
        <iep-form-item label-name="描述" prop="remarks">
          <iep-input-area v-model="form.remarks"></iep-input-area>
        </iep-form-item>
        <el-form-item label="">
          <operation-wrapper>
            <iep-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen">保存</iep-button>
          </operation-wrapper>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { getBellBalanceById } from '@/api/fams/balance_rule'
import { initForm, rules } from '../options'
import formMixins from '@/mixins/formMixins'
export default {
  mixins: [formMixins],
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      id: false,
      rules,
      formRequestFn: () => { },
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.$emit('onGoBack') },
      },
      form: initForm(),
    }
  },
  created () {
    this.formRequestFn = this.record.formRequestFn
    this.id = this.record.id
    if (this.id) {
      getBellBalanceById(this.id).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
      })
    }
  },
  methods: {
    async submitForm () {
      const { data } = await this.formRequestFn(this.form)
      if (data.data) {
        this.$message.success('操作成功')
        this.$emit('onGoBack')
      } else {
        this.$message(data.msg)
      }
    },
  },
}
</script>
<style scoped>
.edit-wrapper >>> .el-form {
  margin-right: 20%;
  margin-top: 50px;
}
</style>

<style lang="scss" scoped>
</style>
