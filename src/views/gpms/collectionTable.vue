<template>
  <div>
    <iep-table :isLoadTable="false" border :pagedTable="dataList" :isPagination="false">
      <el-table-column prop="artificialCost" label="人工成本" align='center'>
        <template slot-scope="scope">
          {{ scope.row.artificialCost }}
        </template>
      </el-table-column>
      <el-table-column prop="projectCommission" label="项目提成" align='center'>
        <template slot-scope="scope">
          {{ scope.row.projectCommission }}
        </template>
      </el-table-column>
      <el-table-column label="项目费用" align='center'>
        <el-table-column prop="taxes" label="税费" align='center'>
          <template slot-scope="scope">
            {{ scope.row.taxes }}
          </template>
        </el-table-column>
        <el-table-column prop="bidWinning" label="中标服务费" align='center'>
          <template slot-scope="scope">
            {{ scope.row.bidWinning }}
          </template>
        </el-table-column>
        <el-table-column prop="outsourcingCost" align='center'>
          <template slot="header">
            <span class="column-header">外包费用</span>
          </template>
          <template slot-scope="scope">
            {{ scope.row.outsourcingCost }}
          </template>
        </el-table-column>
        <el-table-column prop="expertsFee" label="项目评审专家费" align='center' width="150">
          <template slot-scope="scope">
            {{ scope.row.expertsFee }}
          </template>
        </el-table-column>
        <el-table-column prop="commission" align='center'>
          <template slot="header">
            <span class="column-header">佣金</span>
          </template>
          <template slot-scope="scope">
            {{ scope.row.commission }}
          </template>
        </el-table-column>
        <el-table-column prop="otherFees" label="其他" align='center'>
          <template slot-scope="scope">
            {{ scope.row.otherFees }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="managementFee" label="项目管理费" align='center'>
        <template slot-scope="scope">
          {{ scope.row.managementFee }}
        </template>
      </el-table-column>
      <el-table-column prop="invoiceFee" label="开票费用" align='center'>
        <template slot-scope="scope">
          {{ scope.row.invoiceFee }}
        </template>
      </el-table-column>
      <el-table-column prop="travelFee" label="差旅费" align='center'>
        <template slot-scope="scope">
          {{ scope.row.travelFee }}
        </template>
      </el-table-column>
      <el-table-column prop="projectBudget" align='center'>
          <template slot="header">
            <span class="column-header">费用总预算</span>
          </template>
        <template slot-scope="scope">
          {{ scope.row.projectBudget }}
        </template>
      </el-table-column>
      <el-table-column prop="forecastProfits" label="预估利润" align='center'>
        <template slot-scope="scope">
          {{ scope.row.forecastProfits }}
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>
<script>
export default {
  name: 'collectionTable',
  props: {
    dataList: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data () {
    return {

    }
  },
  methods: {
  },
}
</script>
