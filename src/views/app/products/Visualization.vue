<template>
  <div class="visualization">
    <img :src="img">
    <div class="visualization-list">
      <div class="piece">
        <div class="data">-<span class="unit">元</span></div>
        <div class="name">产品售额
          <!-- i class="iconfont icon-wenhao"></i> -->
        </div>
        <!-- <div class="chart">
          <ve-histogram :extend="chartExtend3" :colors="colors1" width="240px" height="60px"></ve-histogram>
        </div> -->
      </div>
      <div class="piece">
        <div class="data">{{this.visualizationList.countProject}}<span class="unit">个</span></div>
        <div class="name">项目数量
          <!-- i class="iconfont icon-wenhao"></i> -->
        </div>
        <!-- <div class="chart">
          <ve-line :extend="chartExtend2" :colors="colors2" width="240px" height="60px"></ve-line>
        </div> -->
      </div>
      <div class="piece">
        <div class="data">{{this.visualizationList.countProduct}}<span class="unit">个</span></div>
        <div class="name">产品系列
          <!-- i class="iconfont icon-wenhao"></i> -->
        </div>
      </div>
      <div class="piece">
        <div class="data">{{this.visualizationList.countModule}}<span class="unit">个</span></div>
        <div class="name">模块清单
          <!-- i class="iconfont icon-wenhao"></i> -->
        </div>
      </div>
      <div class="piece">
        <div class="data">{{this.visualizationList.countTechnology}}<span class="unit">个</span></div>
        <div class="name">技术能力
          <!-- i class="iconfont icon-wenhao"></i> -->
        </div>
      </div>
      <div class="piece">
        <div class="data">{{this.visualizationList.countHonor}}<span class="unit">个</span></div>
        <div class="name">荣誉资质
          <!-- i class="iconfont icon-wenhao"></i> -->
        </div>
        <!-- <div class="chart">
          <ve-histogram :extend="chartExtend3" :colors="colors3" width="240px" height="60px"></ve-histogram>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { getproductCountList } from '@/api/app/cpms/channel'
export default {
  data () {
    this.colors1 = ['#db474f']
    this.colors2 = ['#deab8c']
    this.colors3 = ['#3aa1fe']
    this.colors4 = ['#8cc48d']
    this.chartExtend2 = {
      xAxis: {
        show: false,
        type: 'category',
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
      },
      yAxis: {
        show: false,
        type: 'value',
      },
      series: [{
        data: [100, 60, 54, 80, 70, 110, 50, 70, 110, 20, 70, 92, 130, 70, 10],
        type: 'line',
        areaStyle: {},
      }],
      grid: {
        left: '-15%',
        right: '4%',
        top: '0%',
        bottom: '0%',
        containLabel: true,
      },
    }
    this.chartExtend3 = {
      xAxis: {
        show: false,
        type: 'category',
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
      },
      yAxis: {
        show: false,
        type: 'value',
      },
      series: [{
        show: false,
        data: [100, 60, 54, 80, 70, 110, 50, 70, 110, 20, 70, 92, 130, 70, 10],
        type: 'bar',
      }],
      grid: {
        left: '-15%',
        right: '4%',
        top: '0%',
        bottom: '0%',
        containLabel: true,
      },
      barWidth: '10',
    }
    return {
      img: [require('./img/date.jpg')],
      visualizationList: { countHonor: '', countProduct: '', countModule: '', countProject: '', countTechnology: '' },
    }
  },
  created () {
    getproductCountList().then(({ data }) => {
      this.visualizationList = data.data
    })
  },
}
</script>
<style lang="scss" scoped>
.visualization {
  grid-column-start: 1;
  grid-column-end: 4;
  padding: 20px 15px;
  position: relative;
  border: 1px solid #eee;
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  .visualization-list {
    display: grid;
    grid-auto-flow: row dense;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    .piece {
      padding: 0 20px;
      border-right: 1px solid #eee;
      text-align: center;
      &:last-child {
        border-right: 0;
      }
      .name {
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        color: #666;
        i {
          height: 40px;
          line-height: 40px;
          color: #666;
          float: right;
        }
      }
      .data {
        font-size: 30px;
        .unit {
          font-size: 14px;
          color: #666;
        }
      }
    }
  }
}
</style>
<style>
</style>


