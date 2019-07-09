<template>
  <steps-content>
    <el-form class="content-wrapper" ref="form" size="small" :rules="rules" :model="form" label-width="150px">
      <iep-form-item label-name="股份数量" prop="investmentNumber">
        <iep-input-number v-model="form.investmentNumber"></iep-input-number>
      </iep-form-item>
      <iep-form-item label-name="投资金额" prop="totalAmount">
        <iep-input-number v-model="form.totalAmount"></iep-input-number>
      </iep-form-item>
      <iep-form-item label-name="支付方式" prop="investmentMoneyType">
        <el-radio-group v-model="form.investmentMoneyType">
          <el-radio v-for="(item, idx) in dictsMap.investmentMoneyType" :key="idx" :label="idx">{{item}}</el-radio>
        </el-radio-group>
      </iep-form-item>
      <iep-form-item label-name="投资组织" prop="investmentId">
        <iep-select v-model="form.investmentId" autocomplete="off" prefix-url="admin/org/all" placeholder="请选择向哪个组织投资"></iep-select>
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
import StepsContent from './StepsContent'
import formMixins from '@/mixins/formMixins'
import { dictsMap, initForm, rules, formToDto } from './options'
export default {
  mixins: [formMixins],
  components: { StepsContent },
  props: ['data'],
  data () {
    return {
      form: initForm(),
      dictsMap,
      rules,
    }
  },
  computed: {
  },
  created () {
    this.form = formToDto(this.data)
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