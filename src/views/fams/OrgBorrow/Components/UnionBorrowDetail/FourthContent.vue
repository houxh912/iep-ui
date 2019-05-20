<template>
  <result type="success" :description="description" :title="title">
    <el-form class="content-wrapper" ref="form" size="small" :model="data" label-width="150px" disabled>
      <a-alert :closable="true" type="error" message="借出方组织审核通过后，将无法撤回！" style="margin-bottom: 24px;" />
      <iep-form-item label-name="借出组织">
        <iep-div-detail :value="data.outOrgName"></iep-div-detail>
      </iep-form-item>
      <iep-form-item label-name="支付方式">
        <iep-div-detail :value="dictsMap.borrowMoneyType[data.borrowMoneyType]"></iep-div-detail>
      </iep-form-item>
      <iep-form-item label-name="收款公司">
        <iep-div-detail :value="data.borrowInCompany"></iep-div-detail>
      </iep-form-item>
      <iep-form-item v-if="!bankAmountOption.disabled" label-name="收款账户">
        <iep-div-detail :value="data.borrowInCompanyBank"></iep-div-detail>
      </iep-form-item>
      <iep-form-item label-name="还款天数">
        <iep-div-detail :value="`${data.borrowDays}天`"></iep-div-detail>
      </iep-form-item>
      <iep-form-item label-name="还款时间">
        <iep-div-detail :value="data.repaymentTime"></iep-div-detail>
      </iep-form-item>
      <iep-form-item label-name="借款利息">
        <iep-div-detail :value="`${data.orgInterest}%`"></iep-div-detail>
      </iep-form-item>
      <iep-form-item label-name="借款金额">
        <iep-div-detail :value="`${data.amount}元`"></iep-div-detail>
      </iep-form-item>
    </el-form>
    <template v-slot:action>
      <a-button type="primary" @click="handleBack">返回列表</a-button>
      <a-button @click="handleBack">撤销</a-button>
    </template>
  </result>
</template>
<script>
import { cancelOrgBorrow } from '@/api/fams/org_borrow'
import { dictsMap } from './options'
export default {
  props: ['data'],
  data () {
    return {
      dictsMap,
      title: '提交成功',
      description: '等待财务审核，财务审核通过后提现资金将被冻结。同时在财务未审核通过前撤销申请。',
      submitLoading: false,
    }
  },
  computed: {
    bankAmountOption () {
      if (this.data.borrowInCompanyId && this.data.borrowMoneyType === '1') {
        return {
          disabled: false,
          prefixUrl: `fams/bank_account/${this.data.borrowInCompanyId}`,
        }
      } else {
        return {
          disabled: true,
          prefixUrl: `fams/bank_account/${this.data.borrowInCompanyId}`,
        }
      }
    },
  },
  created () {
  },
  methods: {
    handleBack () {
      this.$emit('back')
    },
    async handleSubmit () {
      try {
        await this.$confirm('此操作将取消借款, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        this.submitLoading = true
        try {
          const { data } = await cancelOrgBorrow(this.data.id)
          if (data.data) {
            this.$message('操作成功')
            this.$emit('on-data', data.data)
          } else {
            this.$message(data.msg)
          }
        } catch (error) {
          this.$message('似乎出现了一些问题')
        }
      } catch (error) {
        this.$message('操作取消')
      } finally {
        this.submitLoading = false
      }

    },
  },
}
</script>

<style lang="scss" scoped>
.content-wrapper {
  width: 500px;
}
</style>
