
<template>
  <iep-table :isLoadTable="isLoadTable" :is-pagination="false" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable">
    <template slot="before-columns">
      <el-table-column label="时间">
        <template slot-scope="scope">
          {{scope.row.time|parseToDay}}
        </template>
      </el-table-column>
    </template>
  </iep-table>
</template>
<script>
import { getProjectDetailPageById } from '@/api/fams/statistics'
export default {
  data () {
    return {
      dictsMap: {
        payType: {
          0:'现金',
          1:'银行',
          2:'国脉贝',
        },
      },
      columnsMap: [
        {
          prop: 'typeName',
          label: '类型',
        },
        {
          prop: 'amount',
          label: '费用金额',
        },
        {
          prop: 'payType',
          label: '支付方式',
          type:'dict',
        },
        {
          prop: 'orgName',
          label: '组织名称',
        },
        {
          prop: 'companyName',
          label: '公司名称',
        },
        {
          prop: 'bankName',
          label: '银行账户',
        },
        {
          prop: 'remarks',
          label: '备注',
        },
      ],
      isLoadTable: true,
      pagedTable: [],
      isIncome:1,
    }
  },
  computed: {
    id () {
      return +this.$route.params.id
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      if (this.id) {
        this.isLoadTable = true
        getProjectDetailPageById(this.id,this.isIncome).then(({ data }) => {
          this.pagedTable = data.data
          this.isLoadTable = false
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.is-red {
  color: red;
}
</style>
