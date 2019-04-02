<template>
  <basic-container class="wages-details">
    <page-header title="工资发放" :backOption="backOption"></page-header>
    <el-table class="first-table" :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="工号">
      </el-table-column>
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="time" label="入职时间">
      </el-table-column>
      <el-table-column prop="post" label="职务">
      </el-table-column>
      <el-table-column prop="title" label="职称">
      </el-table-column>
      <el-table-column prop="wages" label="税后工资/实发工资">
      </el-table-column>
      <el-table-column prop="substitute" label="银行代发">
      </el-table-column>
      <el-table-column prop="iep" label="内网发放">
      </el-table-column>
    </el-table>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="应发工资">
        <el-table-column label="基础工资">
          <el-table-column prop="basePay" label="基本工资">
          </el-table-column>
          <el-table-column prop="jobSubsidies" label="职务补贴">
          </el-table-column>
          <el-table-column prop="subsidy" label="职称补贴">
          </el-table-column>
          <el-table-column prop="post" label="管理津贴">
          </el-table-column>
          <el-table-column prop="city" label="城市补贴">
          </el-table-column>
          <el-table-column prop="subtotal" label="小计">
          </el-table-column>
        </el-table-column>
        <el-table-column label="浮动工资">
          <el-table-column prop="fund" label="感恩基金">
          </el-table-column>
          <el-table-column prop="computer" label="电脑补助">
          </el-table-column>
          <el-table-column prop="full" label="全勤">
          </el-table-column>
          <el-table-column prop="award" label="总经理特别奖" width="180">
          </el-table-column>
          <el-table-column prop="subtotal2" label="小计">
          </el-table-column>
          <el-table-column prop="total" label="合计">
          </el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="扣发事项">
        <el-table-column label="事假">
          <el-table-column prop="data" label="天"></el-table-column>
          <el-table-column prop="sum3" label="金额"></el-table-column>
        </el-table-column>
        <el-table-column label="病假">
          <el-table-column prop="data2" label="天"></el-table-column>
          <el-table-column prop="sum4" label="金额"></el-table-column>
        </el-table-column>
        <el-table-column prop="late" label="迟到早退">
        </el-table-column>
      </el-table-column>
      <el-table-column prop="repair" label="其他扣/补发事项" width="150">
      </el-table-column>
      <el-table-column prop="issued" label="税前工资/应发工资" width="150">
      </el-table-column>
    </el-table>
  </basic-container>
</template>
<script>
export default {
  methods: {
    handleGoBack () {
      this.$emit('onGoBack')
    },
  },
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: this.handleGoBack,
      },
      tableData: [
        {
          date: 'GM000322',
          name: '王小虎',
          time: '2018-03-05',
          post: '中级总监',
          title: '中级',
          wages: '1,8000',
          substitute: '1,2000',
          iep: '6000',
          basePay: '5000',
          jobSubsidies: '2000',
          subsidy: '3000',
          allowance: '1000',
          city: '1200',
          subtotal: '18000',
          fund: '200',
          computer: '100',
          full: '100',
          award: '500',
          subtotal2: '1800',
          total: '19800',
          data: '1',
          sum3: '100',
          sum4: '80',
          data2: '1',
          late: '0',
          repair: '200',
          issued: '18900',
        },
      ],
    }
  },
}
</script>
<style lang="css" scoped>
.wages-details >>> .first-table.el-table--border td:nth-child(6) .cell,
.wages-details >>> .first-table.el-table--border td:nth-child(7) .cell,
.wages-details >>> .first-table.el-table--border td:nth-child(8) .cell {
  color: #cb3737;
}
.wages-details >>> .el-table {
  margin-bottom: 20px;
}
.wages-details >>> .el-table thead th {
  background-color: #f5f7fa;
  text-align: center;
}
.wages-details >>> .el-table td {
  text-align: center;
}
</style>
