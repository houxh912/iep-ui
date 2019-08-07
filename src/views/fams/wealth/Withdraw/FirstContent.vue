<template>
  <steps-content>
    <el-form class="form-detail" ref="form" size="small" :rules="rules" :model="form" label-width="150px">
      <iep-form-item label-name="提现金额" prop="amount">
        <a-tooltip :trigger="['focus']" placement="topLeft" overlayClassName="numeric-input">
          <template slot="title">
            可提现金额 {{maxAmount}} 元，最低 100
          </template>
          <iep-input-amount v-model="form.amount" :min="100" :max="maxAmount"></iep-input-amount>
        </a-tooltip>
      </iep-form-item>
      <iep-form-item label-name="发票抵税" prop="deductionInvoice">
        <a-tooltip :trigger="['focus']" placement="topLeft" overlayClassName="numeric-input">
          <template slot="title">
            可发票抵税 {{maxDeductionInvoice}} 元
          </template>
          <iep-input-amount v-model="form.deductionInvoice" :min="0" :max="maxDeductionInvoice"></iep-input-amount>
        </a-tooltip>
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
import { getTotal } from '@/api/fams/total'
import formMixins from '@/mixins/formMixins'
function initForm () {
  return {
    amount: 100,
    deductionInvoice: 0,
  }
}
export default {
  mixins: [formMixins],
  components: { StepsContent },
  data () {
    return {
      rules: {
        amount: [
          { required: true, message: '请输入提现金额', trigger: 'blur' },
        ],
        deductionInvoice: [
          { required: true, message: '请输入发票抵税', trigger: 'blur' },
        ],
      },
      maxAmount: 0,
      withInvoice: 0,
      form: initForm(),
    }
  },
  computed: {
    maxDeductionInvoice () {
      return Math.min(this.withInvoice, this.form.amount)
    },
  },
  created () {
    this.loadTotal()
  },
  methods: {
    async loadTotal () {
      const { data } = await getTotal()
      if (data.data) {
        this.maxAmount = data.data.withdrawableCash >= 0 ? data.data.withdrawableCash : 0
        this.withInvoice = data.data.withInvoice
      } else {
        this.$message('请先开通并领取 1000 国脉贝')
        this.$router.history.go(-1)
        return
      }
    },
    async handleSubmit () {
      try {
        await this.mixinsValidate()
        this.$emit('on-data', { ...this.form })
      }
      catch (object) {
        this.mixinsMessage(object)
      }
    },
  },
}
</script>
<style scoped>
/* to prevent the arrow overflow the popup container,
or the height is not enough when content is empty */
.numeric-input >>> .ant-tooltip-inner {
  min-width: 32px;
  min-height: 37px;
}

.numeric-input >>> .numeric-input-title {
  font-size: 14px;
}
</style>

<style lang="scss" scoped>
.content-wrapper {
  width: 60%;
}
</style>
