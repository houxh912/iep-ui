<template>
  <el-card shadow="hover">
    <el-row class="contract">
      <el-col class="head" :span=24>合同概况<span class="sub">（本月已签订合同金额共￥1,000,000）</span>
        <span class="dropdown">
          <el-dropdown>
            <el-button>
              本月<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>上月</el-dropdown-item>
              <el-dropdown-item>上月</el-dropdown-item>
              <el-dropdown-item>上月</el-dropdown-item>
              <el-dropdown-item>上月</el-dropdown-item>
              <el-dropdown-item>上月</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </el-col>
    </el-row>
    <div class="echarts">
      <v-chart :forceFit="true" height="280" :data="data" :scale="scale" :padding="[40,20,40,60]">
        <v-tooltip />
        <v-axis />
        <v-bar position="date*count" shape='interval ' color="#D56368" size="15" label='count' />
      </v-chart>
    </div>
  </el-card>
</template>
<script>
const scale = [{
  dataKey: '数量',
  tickInterval: 10000,
  position: 'top',
  line: {
    stroke: 'red',
  },
}]

export default {
  data () {
    return {
      scale,
      infoList: {
        num: 12,
      },
      data: [
        { date: '01.01', count: 10000 },
        { date: '01.02', count: 20000 },
        { date: '01.03', count: 25000 },
        { date: '01.04', count: 30000 },
        { date: '01.05', count: 35000 },
        { date: '01.06', count: 40000 },
        { date: '01.07', count: 45000 },
        { date: '01.08', count: 55000 }],
    }
  },
}
</script>
<style lang="scss" scoped>
.contract {
  .head {
    font-weight: 700;
    background-color: #eee;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    .sub {
      font-weight: 500;
      font-size: 14px;
      color: #666;
    }
  }
  .btn {
    text-align: right;
  }
}
.echarts {
  height: 300px;
  width: 100%;
  padding: 10px 0;
  margin-top: 20px;
}
.dropdown {
  float: right;
}
</style>
