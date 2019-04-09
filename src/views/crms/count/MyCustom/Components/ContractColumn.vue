<template>
  <el-card shadow="hover">
    <el-row class="contract">
      <el-col class="head" :span=24>合同概况<span class="sub">（本月已签订合同金额共￥260,000）</span>
        <span class="dropdown">
          <el-select v-model="value" @change="change">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
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
      value: 1,
      data: [
        { date: '01.01', count: 10000 },
        { date: '01.02', count: 30000 },
        { date: '01.03', count: 25000 },
        { date: '01.04', count: 30000 },
        { date: '01.05', count: 35000 },
        { date: '01.06', count: 20000 },
        { date: '01.07', count: 45000 },
        { date: '01.08', count: 35000 }],
      options: [
        {
          label: '1月', value: 1,
        },
        {
          label: '2月', value: 2,
        },
        {
          label: '3月', value: 4,
        },
        {
          label: '5月', value: 5,
        },
        {
          label: '6月', value: 6,
        },
        {
          label: '7月', value: 7,
        },
        {
          label: '8月', value: 8,
        },
        {
          label: '9月', value: 9,
        },
        {
          label: '10月', value: 10,
        },
        {
          label: '11月', value: 11,
        },
        {
          label: '12月', value: 12,
        },
      ],
    }
  },
  methods: {
    change () {
      this.$message.success('功能开发中')
    },
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
.el-select {
  width: 120px !important;
}
</style>
