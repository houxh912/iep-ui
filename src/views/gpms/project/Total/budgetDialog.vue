<template>
    <iep-dialog :dialog-show="dialogShow" title="添加关联" width="80%" @close="resetForm">

    <p>注：外包费用、佣金、项目总预算为必填项，<span style="color: #f00;">如不填，则不发项目提成</span></p>
    
    <el-table :data="tableData" style="width: 100%" class="table">
      <el-table-column prop="date" label="人工成本" align='center' width="150px">
        <template slot-scope="scope">
          <el-input v-model="tableData[scope.$index].artificialCost" maxlength="12" type="number" min=0></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="项目提成" align='center' width="150px">
        <template slot-scope="scope">
          <el-input v-model="tableData[scope.$index].projectCommission" maxlength="12" type="number" min=0></el-input>
        </template>
      </el-table-column>
      <el-table-column label="项目费用" align='center' width="150px">
        <el-table-column prop="province" label="税费" align='center' width="150px">
          <template slot-scope="scope">
            <el-input v-model="tableData[scope.$index].taxes" maxlength="12" type="number" min=0></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="province" label="中标服务费" align='center' width="150px">
          <template slot-scope="scope">
            <el-input v-model="tableData[scope.$index].bidWinning" maxlength="12" type="number" min=0></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="province" align='center' width="150px">
          <template slot="header">
            <span class="column-header">外包费用</span>
          </template>
          <template slot-scope="scope">
            <el-input v-model="tableData[scope.$index].outsourcingCost" maxlength="12" type="number" min=0></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="province" label="项目评审专家费" align='center' width="150px">
          <template slot-scope="scope">
            <el-input v-model="tableData[scope.$index].expertsFee" maxlength="12" type="number" min=0></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="province" align='center' width="150px">
          <template slot="header">
            <span class="column-header">佣金</span>
          </template>
          <template slot-scope="scope">
            <el-input v-model="tableData[scope.$index].commission" maxlength="12" type="number" min=0></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="province" label="其他" align='center' width="150px">
          <template slot-scope="scope">
            <el-input v-model="tableData[scope.$index].otherFees" maxlength="12" type="number" min=0></el-input>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="date" label="项目管理费" align='center' width="150px">
        <template slot-scope="scope">
          <el-input v-model="tableData[scope.$index].managementFee" maxlength="12" type="number" min=0></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="开票费用" align='center' width="150px">
        <template slot-scope="scope">
          <el-input v-model="tableData[scope.$index].invoiceFee" maxlength="12" type="number" min=0></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="差旅费" align='center' width="150px">
        <template slot-scope="scope">
          <el-input v-model="tableData[scope.$index].travelFee" maxlength="12" type="number" min=0></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="date" align='center' width="150px">
          <template slot="header">
            <span class="column-header">费用总预算</span>
          </template>
        <template slot-scope="scope">
          <el-input v-model="tableData[scope.$index].projectBudget" maxlength="12" type="number" min=0></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="预估利润" align='center' width="150px">
        <template slot-scope="scope">
          <el-input v-model="tableData[scope.$index].forecastProfits" maxlength="12" type="number" min=0></el-input>
        </template>
      </el-table-column>
    </el-table>

    <template slot="footer">
      <iep-button type="primary" @click="submitForm">添加</iep-button>
      <iep-button @click="resetForm">取消</iep-button>
    </template>
  </iep-dialog>

</template>

<script>
import { initBudgetForm } from './const'

export default {
  components: {  },
  data () {
    return {
      dialogShow: false,
      tableData: [],
      validate: [
        {
          name: '外包费用',
          prop: 'outsourcingCost',
        },
        {
          name: '佣金',
          prop: 'commission',
        },
        {
          name: '项目总预算',
          prop: 'projectBudget',
        },
      ],
    }
  },
  methods: {
    open (row) {
      this.tableData = []
      let obj = Object.assign({}, initBudgetForm(), row)
      this.tableData.push(obj)
      this.dialogShow = true
    },
    resetForm () {
      this.dialogShow = false
    },
    submitForm () {
      for (let item of this.validate) {
        if (this.tableData[0][item.prop] === '') {
          this.$message.error(`请填写${item.name}，若无，请填写0`)
          return
        }
      }
      this.dialogShow = false
      this.$emit('budgetSubmit', this.tableData[0])
    },
  },
}
</script>
<style scoped>
.table >>> .el-input__inner {
  padding: 0;
  border: 0;
}
.column-header {
  color: #f00;
}
</style>

