<template>
  <el-card class="correctrate-box" shadow="never">
    <el-row slot="header" class="rowTop">
      <el-col :span="10">
        <span>正确率</span>
      </el-col>
      <el-col :span="14">
        <el-select class="selectList" placeholder="请选择" multiple collapse-tags v-model="value" size="medium">
          <el-option v-for="item in selectData" :key="item.value" :value="item.value" :label="item.name"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="echarts">
      <ve-ring :data="chartData" :settings="chartSettings" height="350px" :extend="chartExtend"></ve-ring>
    </div>
  </el-card>
</template>

<script>
import Vue from 'vue'
import VePie from 'v-charts/lib/pie.common'
Vue.component(VePie.name, VePie)
const selectData = [
  { value: '1', name: '单选题' },
  { value: '2', name: '复选题' },
  { value: '3', name: '判断题' },
  { value: '4', name: '简答题' },
]

export default {
  data () {
    this.chartSettings = {
      // roseType: 'radius',
      radius: ['40%', '50%'],
    },
      this.chartExtend = {
        series: {
          center: ['50%', '50%'],
        },
        color: ['#F5BA89', '#B7DBF9', '#EF878C','#87CEEB'],
        legend: {
          orient: 'vertical',
          left: 0,
          aligin: 'auto',
        },
        label: {
          show: false,
        },
      }
    return {
      value: '',
      selectData,
      chartData: {
        columns: ['name', 'value'],
        rows: [
          { 'name': '单选题', 'value': 1393 },
          { 'name': '复选题', 'value': 1393 },
          { 'name': '判断题', 'value': 1393 },
          { 'name': '简答题', 'value': 1393 },
        ],
      },
    }
  },
}
</script>
<style lang="scss" scoped>
.el-card__header div {
  display: flex;
  justify-content: space-between;
}
.rowTop {
  .el-col:last-child {
      float: right;
      .selectList {
        position: absolute;
        margin-top: -2.6%;
      }
    }
}
</style>