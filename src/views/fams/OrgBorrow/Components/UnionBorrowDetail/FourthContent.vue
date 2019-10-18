<template>
  <iep-result type="success" :description="description" :title="title">
    <el-form class="form-detail" ref="form" size="small" :model="data" label-width="150px">
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
      <template v-if="is还款">
        <iep-divider />
        <iep-form-item label-name="还款公司">
          <iep-select v-model="borrowInRepayCompanyId" autocomplete="off" prefix-url="fams/company" placeholder="请选择收入公司"></iep-select>
        </iep-form-item>
        <iep-form-item v-if="!repayBankAmountOption.disabled" label-name="还款账户">
          <iep-select v-model="borrowInRepayCompanyBankId" autocomplete="off" :prefix-url="repayBankAmountOption.prefixUrl" placeholder="请选择银行账户"></iep-select>
        </iep-form-item>
      </template>
    </el-form>
    <template v-slot:action>
      <a-button v-if="is还款" type="primary" @click="handleRepay">还款</a-button>
      <a-button v-if="data.isOut && data.status === 10 && isRepayment" type="primary" @click="handleConfirm">确认收款</a-button>

      <a-button v-if="isApproval && data.status!==6 && data.status!==10" type="primary" @click="handleAdd">去填写资金调拨</a-button>

      <a-button v-if="!isApproval && data.isOut && data.status===1" type="primary" @click="handleFinishAccount">转账完成</a-button>
      <a-button v-if="!isApproval && !data.isOut && data.status===2" type="primary" @click="handleConfirmAccount">确认收款</a-button>

      <a-button style="margin-left: 8px" @click="handleBack">返回列表</a-button>
    </template>
  </iep-result>
</template>
<script>
import { repayOrgBorrow, confirmRepayOrgBorrow } from '@/api/fams/org_borrow'
import { finishFundTransferById, confirmFundTransferById } from '@/api/fams/fund_transfer'
import { dictsMap } from './options'
export default {
  props: ['data'],
  data () {
    return {
      dictsMap,
      title: '操作成功',
      description: '集团财政资金调拨核准通过，等待其调拨。',
      submitLoading: false,
      borrowInRepayCompanyId: '',
      borrowInRepayCompanyBankId: '',
    }
  },
  computed: {
    is还款 () {
      return !this.data.isOut && [3, 6, 9].includes(this.data.status) && this.isRepayment
    },
    isApproval () {
      return this.$route.query.approval === 'true'
    },
    isRepayment () {
      return this.$route.query.repayment === 'true'
    },
    bankAmountOption () {
      if (this.data.borrowInCompanyId && this.data.borrowMoneyType === 1) {
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
    repayBankAmountOption () {
      if (this.borrowInRepayCompanyId) {
        return {
          disabled: false,
          prefixUrl: `fams/bank_account/${this.borrowInRepayCompanyId}`,
        }
      } else {
        return {
          disabled: true,
          prefixUrl: `fams/bank_account/${this.borrowInRepayCompanyId}`,
        }
      }
    },
  },
  created () {
  },
  methods: {
    async handleConfirm () {
      try {
        await this.$confirm('此操作将已收款, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        this.submitLoading = true
        try {
          const { data } = await confirmRepayOrgBorrow(this.data.id)
          if (data.data) {
            this.$message('操作成功')
            this.handleBack()
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
    async handleRepay () {
      try {
        await this.$confirm('此操作将还款, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        this.submitLoading = true
        try {
          const { data } = await repayOrgBorrow({
            id: this.data.id,
            borrowInRepayCompanyId: this.borrowInRepayCompanyId,
            borrowInRepayCompanyBankId: this.borrowInRepayCompanyBankId,
          })
          if (data.data) {
            this.$message('操作成功')
            this.handleBack()
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
    handleConfirmAccount () {
      this._handleConfirm(this.data.id, confirmFundTransferById, '收款')
    },
    handleFinishAccount () {
      this._handleConfirm(this.data.id, finishFundTransferById, '转账')
    },
    _handleConfirm (id, functionName, msg) {
      this.$confirm(`是否确认${msg}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const { data } = await functionName(id)
        if (data.data) {
          this.$message({
            type: 'success',
            message: '操作成功!',
          })
          this.handleBack()
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
