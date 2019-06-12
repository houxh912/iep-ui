<template>
  <div>
    <iep-result type="success" :description="description" :title="title">
      <template slot="action">
        <a-button type="primary" @click="handleRevoke">撤销</a-button>
        <a-button style="margin-left: 8px" @click="handleBack">返回列表</a-button>
      </template>
    </iep-result>
  </div>
</template>
<script>
import { revokeWithdrawById } from '@/api/fams/withdraw'
export default {
  props: ['data'],
  data () {
    return {
      title: '提交成功',
      description: '等待财务审核，财务审核及发放过程中提现资金将被冻结。同时在财务未审核通过前撤销申请。',
    }
  },
  methods: {
    handleBack () {
      this.$emit('on-data')
    },
    handleRevoke () {
      revokeWithdrawById(this.data.id).then(({ data }) => {
        if (data.data) {
          this.$message('已撤销')
          this.$emit('on-data')
        } else {
          this.$message(data.msg)
        }
      })
    },
  },
}
</script>
