<template>
  <steps-content>
    <el-form class="content-wrapper" ref="form" size="small" :model="data" label-width="150px" disabled>
      <a-alert :closable="true" type="error" message="确认投资申请后，将向资产委员会发出投资申请。" style="margin-bottom: 24px;" />
      <iep-form-item label-name="投资组织">
        <iep-select v-model="data.investmentId" autocomplete="off" prefix-url="admin/org/all" placeholder="请选择向哪个组织投资"></iep-select>
      </iep-form-item>
      <iep-form-item label-name="投资股份比例">
        <iep-div-detail :value="`${data.orgInterest}%`"></iep-div-detail>
      </iep-form-item>
      <iep-form-item label-name="支付方式">
        <el-radio-group v-model="data.investmentMoneyType">
          <el-radio v-for="(item, idx) in dictsMap.investmentMoneyType" :key="idx" :label="idx">{{item}}</el-radio>
        </el-radio-group>
      </iep-form-item>
      <iep-form-item label-name="投资金额">
        <iep-input-number v-model="data.totalAmount"></iep-input-number>
      </iep-form-item>
    </el-form>
    <template v-slot:action>
      <a-button type="primary" :loading="submitLoading" @click="handleSubmit">
        提交
      </a-button>
      <a-button style="margin-left: 8px" @click="handlePrev">
        上一步
      </a-button>
    </template>
  </steps-content>

</template>
<script>
import StepsContent from './StepsContent'
import { joinInvestment } from '@/api/fams/investment'
import { dictsMap } from './options'
export default {
  props: ['data'],
  components: { StepsContent },
  data () {
    return {
      dictsMap,
      submitLoading: false,
    }
  },
  computed: {
  },
  created () {
    this.data.orgInterest = this.data.totalAmount * 100
  },
  methods: {
    handlePrev () {
      this.$emit('prev')
    },
    async handleSubmit () {
      this.submitLoading = true
      try {
        const { data } = await joinInvestment(this.data)
        if (data.data) {
          this.$emit('on-data', data.data)
        } else {
          this.$message(data.msg)
        }
      } catch (error) {
        this.$message('似乎出现了一些问题')
      }
      this.submitLoading = false
    },
  },
}
</script>
<style lang="scss" scoped>
@import "./borrow.scss";
</style>