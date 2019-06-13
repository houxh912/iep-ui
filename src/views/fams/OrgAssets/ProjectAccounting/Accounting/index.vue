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
          [false]: '是',
          [true]: '否',
        },
      },
      columnsMap: [
        {
          prop: 'signingTime',
          label: '签订时间',
        },
        {
          prop: 'contractAmount',
          label: '合同金额',
        },
        {
          prop: 'contractClosureTime',
          label: '合同完结时间',
        },
        {
          prop: 'projectIncome',
          label: '项目收入',
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
          label: '发票金额',
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
