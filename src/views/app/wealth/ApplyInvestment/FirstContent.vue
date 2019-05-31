<template>
  <steps-content>
    <el-form class="content-wrapper" ref="form" size="small" :rules="rules" :model="form" label-width="150px">
      <iep-form-item label-name="股份数量" prop="sharesNumber">
        <iep-input-number v-model="form.sharesNumber"></iep-input-number>
      </iep-form-item>
      <iep-form-item label-name="投资金额" prop="investmentAmount">
        <iep-input-number v-model="form.investmentAmount"></iep-input-number>
      </iep-form-item>
      <iep-form-item label-name="支付方式" prop="investmentMoneyType">
        <el-radio-group v-model="form.investmentMoneyType">
          <el-radio v-for="(item, idx) in dictsMap.investmentMoneyType" :key="idx" :label="idx">{{item}}</el-radio>
        </el-radio-group>
      </iep-form-item>
      <iep-form-item label-name="投资组织" prop="investmentCompanyId">
        <iep-select v-model="form.investmentCompanyId" autocomplete="off" prefix-url="fams/company" placeholder="请选择收入组织"></iep-select>
      </iep-form-item>
    </el-form>
    <template v-slot:action>
      <a-button type="primary" @click="handleSubmit">
        下一步
      </a-button>
    </template>
  </steps-content>

</template>
<script>
import { mapGetters } from 'vuex'
import StepsContent from './StepsContent'
import formMixins from '@/mixins/formMixins'
import { dictsMap, initForm, rules } from './options'
export default {
  mixins: [formMixins],
  components: { StepsContent },
  data () {
    return {
      form: {},
      dictsMap,
      rules,
    }
  },
  computed: {
    ...mapGetters(['famsConfig']),
  },
  created () {
    this.form = initForm(this.famsConfig)
  },
  methods: {
    async handleSubmit () {
      try {
        await this.mixinsValidate()
        this.$emit('on-data', this.form)
      }
      catch (object) {
        let message = ''
        for (const key in object) {
          if (object.hasOwnProperty(key)) {
            const element = object[key]
            message = element[0].message
          }
        }
        this.$message(message)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import "./borrow.scss";
</style>
