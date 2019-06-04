<template>
  <div class="gird-item">
    <el-card shadow="never" class="box-card" :body-style="bodyStyle">
      <div slot="header" class="clearfix">
        <h2>组织收支</h2>
      </div>
        <el-form ref="form" class="form-detail" :model="form" size="small" label-width="80px">
          <iep-form-item label-name="组织">
            <iep-dict-select v-model="form.organization" dict-name=""></iep-dict-select>
          </iep-form-item>
          <iep-form-item label-name="日期">
            <iep-date-picker v-model="form.birthday" type="date" placeholder="--"></iep-date-picker>
          </iep-form-item>
          <el-form-item>
            <el-button class="button" type="primary">搜索</el-button>
          </el-form-item>
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
        organization:'',
        birthday:'',
      },
      bodyStyle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
      },
      tableData: [{
        date: '2016-05-02',
        organizationName: '山口组',
        person: '赵22',
        income: '2344',
        incomeBudget: '2123',
        apply:'2332',
        applyBudget: '3333',
      }, {
        date: '2016-05-04',
        organizationName: '大青山熊出没乐园',
        person: '李12',
        income: '2344',
        incomeBudget: '31',
        apply:'2332',
        applyBudget: '3333',
      }, {
        date: '2016-05-01',
        organizationName: '黑手党',
        person: '王33',
        income: '2344',
        incomeBudget: '441',
        apply:'2332',
        applyBudget: '3333',
      }],
    }
  },
}
</script>
<style scoped lang='scss'>
.form-detail{
    display: flex;
    justify-content: space-around;
}
</style>
