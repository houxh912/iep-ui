<template>
  <iep-dialog :dialog-show="dialogShow" title="关联回款表" width="700px" @close="close">
    <iep-table :isLoadTable="isLoadTable" :is-pagination="false" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @selection-change="handleSelectionChange" is-mutiple-selection>
    </iep-table>
    <template name="footer">
      <operation-wrapper>
        <iep-button type="primary" @click="handleSubmit()">提交</iep-button>
      </operation-wrapper>
    </template>
  </iep-dialog>
</template>
<script>
import mixins from '@/mixins/mixins'
import { getProjectPaymentPlanList, updatePayment } from '@/api/gpms/fas'
export default {
  mixins: [mixins],
  data () {
    return {
      dialogShow: false,
      dictsMap: {
        paymentStatus: {
          0: '未到',
          1: '已到',
          2: '逾期',
          3: '逾期已到',
        },
      },
      columnsMap: [
        {
          prop: 'paymentAmount',
          label: '预计项目回款金额',
        },
        {
          prop: 'projectPaymentTime',
          label: '预计项目回款时间',
        },
        {
          prop: 'paymentStatus',
          label: '回款状态',
          type: 'dict',
        },
      ],
      incomeId: '',
      actualRepayment: 0,
      dateCash: '',
    }
  },
  methods: {
    close () {
      this.dialogShow = false
      this.multipleSelection = []
    },
    handleSubmit () {
      this.$confirm('是否确定提交', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const { data } = await updatePayment({
          incomeId: this.incomeId,
          ids: this.multipleSelection,
          actualRepayment: this.actualRepayment,
          dateCash: this.dateCash,
        })
        if (data.data) {
          this.$message.success('操作成功')
        } else {
          this.$message('data.msg')
        }
        this.close()
      }).catch(() => {
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    loadPage (id) {
      this.isLoadTable = true
      getProjectPaymentPlanList(id).then(({ data }) => {
        this.isLoadTable = false
        this.pagedTable = data.data
      })
    },
  },
}
</script>
