<template>
  <steps-content>
    <el-form class="form-detail" ref="form" size="small" :model="data" label-width="150px" disabled>
      <el-alert style="margin-bottom: 24px;" title="集团核准通过后，将无法撤回！" type="warning" show-icon></el-alert>
      <iep-form-item label-name="支付方式">
        <iep-div-detail :value="dictsMap.borrowMoneyType[data.borrowMoneyType]"></iep-div-detail>
      </iep-form-item>
      <iep-form-item v-if="companyOption" label-name="收款公司">
        <iep-div-detail :value="data.borrowInCompany"></iep-div-detail>
      </iep-form-item>
      <iep-form-item v-if="!bankAmountOption.disabled" label-name="收款账户">
        <iep-div-detail :value="data.borrowInCompanyBank"></iep-div-detail>
      </iep-form-item>
      <iep-form-item label-name="借款天数">
        <iep-div-detail :value="`${data.borrowDays}天`"></iep-div-detail>
      </iep-form-item>
      <iep-form-item label-name="还款时间">
        <iep-div-detail :value="data.repaymentTime"></iep-div-detail>
      </iep-form-item>
      <iep-form-item label-name="借款利息(日)">
        <iep-div-detail :value="`${data.orgInterest}%`"></iep-div-detail>
      </iep-form-item>
      <iep-form-item label-name="借款金额">
        <iep-div-detail :value="`${data.amount}元`"></iep-div-detail>
      </iep-form-item>
    </el-form>
    <template v-slot:action>
      <template v-if="isApproval">
        <a-button type="primary" :loading="submitLoading" @click="handleSubmit">
          通过
        </a-button>
        <a-button style="margin-left: 8px" :loading="submitLoading" @click="handleReject">
          拒绝
        </a-button>
      </template>
      <a-button style="margin-left: 8px" @click="handleBack">
        返回
      </a-button>
    </template>
  </steps-content>

</template>
<script>
import StepsContent from './StepsContent'
import { groupConfirmBorrow, groupRejectBorrow } from '@/api/fams/org_borrow'
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
    isApproval () {
      return this.$route.query.approval === 'true'
    },
    companyOption () {
      if (this.data.borrowMoneyType === 0) {
        return false
      } else {
        return true
      }
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
  },
  created () {
  },
  methods: {
    handleBack () {
      this.$emit('back')
    },
    async handleSubmit () {
      try {
        const { res } = await this.handleCommon('确认核准', groupConfirmBorrow)
        if (res) {
          this.$emit('add', this.data)
        }
      } catch (error) {
        console.log(error)
      }

    },
    async handleReject () {
      try {
        const { res } = await this.handleCommon('拒绝核准', groupRejectBorrow)
        if (res) {
          this.handleBack()
        }
      } catch (error) {
        console.log(error)
      }
    },
    async handleCommon (text, requestFunction) {
      try {
        await this.$confirm(`此操作将${text}, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        this.submitLoading = true
        try {
          const { data } = await requestFunction(this.data.id)
          if (data.data) {
            this.$message('操作成功')
            return {
              res: true,
              data: data.data,
            }
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
