<template>
  <div>
    <div style="display:flex;flex-wrap: wrap;">
      <div style="width:50%;">
        <ve-gauge :series="seriesGauge1" height="200px"></ve-gauge>
      </div>
      <div style="width:50%;">
        <ve-gauge :series="seriesGauge2" height="200px"></ve-gauge>
      </div>
      <div style="width:50%;">
        <ve-gauge :series="seriesGauge3" height="200px"></ve-gauge>
      </div>
      <div style="width:50%;">
        <ve-gauge :series="seriesGauge4" height="200px"></ve-gauge>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  data () {
    //担任项目经理或负责项目次数（次）
    return {
      seriesGauge1: {
        type: 'gauge',
        pointer: {
          show: false,
        },
        detail: {
          color: '#444',
          formatter: '{value}',
          offsetCenter: [0, 20],
          textStyle: {
            fontSize: 14,
          },
        },
        title: {
          show: true,
          color: '#666',
          fontSize: '16',
          offsetCenter: [0, '-20%'],
        },
        data: [{ value: 0, name: '重要项目' }],
        axisLine: {
          show: true,
          lineStyle: {
            color: [[0, new echarts.graphic.LinearGradient(
              0, 0, 1, 0, [{
                offset: 0,
                color: '#8dbfac',
              },
              {
                offset: 1,
                color: '#b8d4c7',
              },
            ],
            )], [1, '#eee']],
            width: 15,
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          length: 0,
        },
        axisLabel: {
          show: false,
        },
      },

      seriesGauge2: {
        type: 'gauge',
        pointer: {
          show: false,
        },
        detail: {
          color: '#444',
          formatter: '{value}',
          offsetCenter: [0, 20],
          textStyle: {
            fontSize: 14,
          },
        },
        title: {
          show: true,
          color: '#666',
          fontSize: '16',
          offsetCenter: [0, '-20%'],
        },
        data: [{ value: 0, name: '中级项目' }],
        axisLine: {
          show: true,
          lineStyle: {
            color: [[0, new echarts.graphic.LinearGradient(
              0, 0, 1, 0, [{
                offset: 0,
                color: '#8dbfac',
              },
              {
                offset: 1,
                color: '#b8d4c7',
              },
            ],
            )], [1, '#eee']],
            width: 15,
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          length: 0,
        },
        axisLabel: {
          show: false,
        },
      },

      seriesGauge3: {
        type: 'gauge',
        pointer: {
          show: false,
        },
        detail: {
          color: '#444',
          formatter: '{value}',
          offsetCenter: [0, 20],
          textStyle: {
            fontSize: 14,
          },
        },
        title: {
          show: true,
          color: '#666',
          fontSize: '16',
          offsetCenter: [0, '-20%'],
        },
        data: [{ value: 0, name: '一般项目' }],
        axisLine: {
          show: true,
          lineStyle: {
            color: [[0, new echarts.graphic.LinearGradient(
              0, 0, 1, 0, [{
                offset: 0,
                color: '#7db2ca',
              },
              {
                offset: 1,
                color: '#c6e4f1',
              },
            ],
            )], [1, '#eee']],
            width: 15,
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          length: 0,
        },
        axisLabel: {
          show: false,
        },
      },

      seriesGauge4: {
        type: 'gauge',
        pointer: {
          show: false,
        },
        detail: {
          color: '#444',
          formatter: '{value}',
          offsetCenter: [0, 20],
          textStyle: {
            fontSize: 14,
          },
        },
        title: {
          show: true,
          color: '#666',
          fontSize: '16',
          offsetCenter: [0, '-20%'],
        },
        data: [{ value: 0, name: '外部项目' }],
        axisLine: {
          show: true,
          lineStyle: {
            color: [[0, new echarts.graphic.LinearGradient(
              0, 0, 1, 0, [{
                offset: 0,
                color: '#7db2ca',
              },
              {
                offset: 1,
                color: '#c6e4f1',
              },
            ],
            )], [1, '#eee']],
            width: 15,
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          length: 0,
        },
        axisLabel: {
          show: false,
        },
      },
    }
  },
  computed: {
  },
}
</script>


