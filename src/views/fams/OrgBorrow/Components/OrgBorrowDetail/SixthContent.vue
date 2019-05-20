<template>
  <iep-result type="success" :description="description" :title="title">
    <el-form class="content-wrapper" ref="form" size="small" :model="data" label-width="150px" disabled>
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
      <a-button @click="handleBack">返回列表</a-button>
    </template>
  </iep-result>
</template>
<script>
import { cancelOrgBorrow } from '@/api/fams/org_borrow'
import { dictsMap } from './options'
export default {
  props: ['data'],
  data () {
    return {
      dictsMap,
      submitLoading: false,
    }
  },
  computed: {
    title () {
      if (this.data.status === 8) {
        return '借款失败'
      } else if (this.data.status === 6) {
        return '确认成功'
      } else {
        return '操作成功'
      }
    },
    description () {
      if (this.data.status === 8) {
        return '具体原因请与借入方联系'
      } else if (this.data.status === 6) {
        return '已到账，请及时还款，切勿逾期！'
      } else {
        return ''
      }
    },
    bankAmountOption () {
      if (this.data.borrowInCompanyId && this.data.borrowMoneyType === '1') {
        return {
          disabled: false,
        }
      } else {
        return {
          disabled: true,
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
