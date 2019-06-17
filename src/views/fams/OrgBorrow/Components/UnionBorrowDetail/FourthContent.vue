<template>
  <iep-result type="success" :description="description" :title="title">
    <el-form class="content-wrapper" ref="form" size="small" :model="data" label-width="150px" disabled>
      <iep-form-item label-name="支付方式">
        <iep-div-detail :value="dictsMap.borrowMoneyType[data.borrowMoneyType]"></iep-div-detail>
      </iep-form-item>
      <iep-form-item label-name="调入组织线下公司">
        <iep-div-detail :value="data.borrowInCompany"></iep-div-detail>
      </iep-form-item>
      <iep-form-item label-name="调入组织银行账户">
        {{data.borrowInCompanyBank}}
      </iep-form-item>
      <iep-form-item label-name="调出组织">
        <iep-div-detail :value="data.outOrgName"></iep-div-detail>
      </iep-form-item>
      <iep-form-item label-name="调出组织线下公司">
        <iep-div-detail :value="data.borrowOutCompany"></iep-div-detail>
      </iep-form-item>
      <iep-form-item label-name="调出组织银行账户">
        {{data.borrowOutCompanyBank}}
      </iep-form-item>
      <iep-form-item label-name="借款天数">
        <iep-div-detail :value="`${data.borrowDays}天`"></iep-div-detail>
      </iep-form-item>
      <iep-form-item label-name="还款时间">
        {{data.repaymentTime|parseToDay}}
      </iep-form-item>
      <iep-form-item label-name="借款利息(日)">
        <iep-div-detail :value="`${data.orgInterest}%`"></iep-div-detail>
      </iep-form-item>
      <iep-form-item label-name="借款金额">
        <iep-div-detail :value="`${data.amount}元`"></iep-div-detail>
      </iep-form-item>
    </el-form>
    <template v-slot:action>
      <a-button v-if="isApproval" type="primary" @click="handleAdd">去填写资金调拨</a-button>
      <a-button v-if="!isApproval && data.isOut" type="primary" @click="handleFinishAccount">转账完成</a-button>
      <a-button style="margin-left: 8px" @click="handleBack">返回列表</a-button>
    </template>
  </iep-result>
</template>
<script>
import {
  finishFundTransferById,
  // confirmFundTransferById
} from '@/api/fams/fund_transfer'
import { dictsMap } from './options'
export default {
  props: ['data'],
  data () {
    return {
      dictsMap,
      title: '操作成功',
      description: '集团财政资金调拨审核通过，等待其调拨。',
      submitLoading: false,
    }
  },
  computed: {
    isApproval () {
      return this.$route.query.approval === 'true'
    },
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
    handleFinishAccount () {
      this.$confirm('是否确认', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const { data } = await finishFundTransferById(this.data.id)
        if (data.data) {
          this.$message({
            type: 'success',
            message: '操作成功!',
          })
        } else {
          this.$message({
            type: 'info',
            message: `${data.msg}`,
          })
        }
      }).catch(() => {
      })
    },
    handleAdd () {
      this.$emit('add', this.data)
    },
    handleBack () {
      this.$emit('back')
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../borrow.scss";
</style>
