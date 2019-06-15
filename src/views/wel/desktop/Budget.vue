<template>
  <div class="gird-item">
    <el-card shadow="never" class="box-card" :body-style="bodyStyle">
      <div slot="header" class="clearfix">
        <h2 class="sub-title">组织收支</h2>
      </div>
      <el-form ref="form" class="form-detail" :model="form" size="small" label-width="80px">
        <iep-form-item label-name="组织">
          <iep-dict-select v-model="form.organization" dict-name=""></iep-dict-select>
        </iep-form-item>
        <iep-form-item label-name="日期">
          <iep-date-picker v-model="form.birthday" type="date" placeholder="--"></iep-date-picker>
        </iep-form-item>
        <el-button class="search-btn" type="primary" size="small">搜索</el-button>
      </el-form>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column prop="organizationName" label="组织名称"></el-table-column>
        <el-table-column prop="person" label="负责人"></el-table-column>
        <el-table-column prop="income" label="本月实际收入"></el-table-column>
        <el-table-column prop="incomeBudget" label="本月收入预算"></el-table-column>
        <el-table-column prop="apply" label="本月实际支出"></el-table-column>
        <el-table-column prop="applyBudget" label="本月支出预算"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        organization: '',
        birthday: '',
      },
      bodyStyle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
      },
      tableData: [{
        date: '--',
        organizationName: '--',
        person: '--',
        income: '--',
        incomeBudget: '--',
        apply: '--',
        applyBudget: '--',
      }, {
        date: '--',
        organizationName: '--',
        person: '--',
        income: '--',
        incomeBudget: '--',
        apply: '--',
        applyBudget: '--',
      }, {
        date: '--',
        organizationName: '--',
        person: '--',
        income: '--',
        incomeBudget: '--',
        apply: '--',
        applyBudget: '--',
      }],
    }
  },
}
</script>
<style scoped lang='scss'>
.sub-title {
  font-size: 16px;
}
.form-detail {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .search-btn {
    margin-left: 10px;
    margin-bottom: 18px;
  }
}
.gird-item .el-card {
  padding: 0 20px;
}
</style>
<style scoped>
.gird-item >>> .el-table .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.gird-item >>> .el-card__body {
  height: 288px;
}
.gird-item >>> .el-table::before {
  background: none;
}
.gird-item >>> .el-table th {
  background-color: #f5f7fa;
}
.gird-item >>> .el-card__header,
.gird-item >>> .el-card__body {
  padding: 18px 0;
}
</style>
