<template>
  <div>
    <operation-container>
      <template slot="right">
        <iep-button @click="handleBack">返回</iep-button>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :isPagination="false" :columnsMap="columnsMap" :pagedTable="pagedTable" show-summary></iep-table>
  </div>
</template>

<script>
import { getCompanyCurrencyFundDetail } from '@/api/fams/statistics'
import mixins from '@/mixins/mixins'
export default {
  props: ['record'],
  mixins: [mixins],
  data () {
    return {
      columnsMap: [
        {
          prop: 'id',
          label: 'ID',
          width: '55',
        },
        {
          prop: 'companyName',
          label: '关联公司',
          type: 'detail',
        },
        {
          prop: 'name',
          label: '所属组织',
        },
        {
          prop: 'cashBalance',
          label: '现金余额',
          width: '200',
        },
        {
          prop: 'bankBalance',
          label: '银行余额',
          width: '200',
        },
      ],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleBack () {
      this.$emit('onGoBack')
    },
    async loadPage () {
      this.isLoadTable = true
      const { data } = await getCompanyCurrencyFundDetail(this.record.id)
      this.pagedTable = data.data
      this.isLoadTable = false
    },
  },
}
</script>