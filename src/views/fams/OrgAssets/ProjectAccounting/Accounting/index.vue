<template>
  <iep-table :isLoadTable="isLoadTable" :is-pagination="false" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable">
    <el-table-column label="利润">
      <template slot-scope="scope">
        <div :class="{'is-red': scope.row.profit<=20}">{{scope.row.profit+'%'}}</div>
      </template>
    </el-table-column>
  </iep-table>
</template>
<script>
import { getProjectDetailById } from '@/api/fams/statistics'
export default {
  data () {
    return {
      dictsMap: {
        isCleared: {
          [false]: '否',
          [true]: '是',
        },
      },
      columnsMap: [
        {
          prop: 'contractClosureTime',
          label: '合同完结时间',
          type: 'date',
          formatString: 'YYYY-MM-DD',
          width: '120px',
        },
        {
          prop: 'contractAmount',
          label: '合同金额',
        },
        {
          prop: 'signingTime',
          label: '签订时间',
          type: 'date',
          formatString: 'YYYY-MM-DD',
        },
        {
          prop: 'projectIncome',
          label: '到账金额',
        },
        {
          prop: 'outstandingAmount',
          label: '未到账金额',
        },
        {
          prop: 'projectExpenditure',
          label: '项目支出',
        },
        {
          prop: 'humanCost',
          label: '人力成本',
        },
        {
          prop: 'projectCommission',
          label: '项目提成',
        },
        {
          prop: 'invoicingAmount',
          label: '开票金额',
        },
        {
          prop: 'unInvoicedAmount',
          label: '未开票金额',
        },
        {
          prop: 'isCleared',
          label: '是否结清',
          type: 'dict',
        },
      ],
      isLoadTable: true,
      pagedTable: [],
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
        getProjectDetailById(this.id).then(({ data }) => {
          this.pagedTable = [data.data]
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
