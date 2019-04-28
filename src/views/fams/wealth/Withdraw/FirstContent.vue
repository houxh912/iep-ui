<template>
  <steps-content>
    <a-form class="content-wrapper" :form="form">
      <a-form-item label="提现金额：" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
        <a-input-number style="width:100%;" :formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')" :parser="value => value.replace(/\￥\s?|(,*)/g, '')" :min="0" :max="maxAmount" @change="onChange" v-decorator="[ 
            'amount', {
            rules: [{ required: true, message: '请输入提现金额' }]} 
          ]" placeholder="请输入提现金额" />
      </a-form-item>
      <a-form-item label="发票抵税：" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
        <a-input-number style="width:100%;" :formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')" :parser="value => value.replace(/\￥\s?|(,*)/g, '')" :min="0" :max="maxDeductionInvoice" @change=" onChange" v-decorator="[
          'deductionInvoice',
        ]" placeholder="请输入发票抵税" />
      </a-form-item>
    </a-form>
    <template v-slot:action>
      <a-button type="primary" @click="handleSubmit">
        下一步
      </a-button>
    </template>
  </steps-content>

</template>
<script>
import StepsContent from './StepsContent'
import { getTotal } from '@/api/fams/total'
export default {
  components: { StepsContent },
  data () {
    return {
      maxAmount: 0,
      maxDeductionInvoice: 0,
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
    }
  },
  created () {
    this.loadTotal()
  },
  methods: {
    async loadTotal () {
      const { data } = await getTotal()
      console.log(data)
    },
    onChange () {

    },
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.content-wrapper {
  width: 60%;
}
</style>
