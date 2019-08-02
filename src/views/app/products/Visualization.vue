<template>
  <div class="visualization">
    <img :src="img">
    <div class="visualization-list">
      <div class="piece">
        <div class="name">产品售额<!-- i class="iconfont icon-wenhao"></i> --></div>
        <div class="data">-</div>
        <div class="chart">
          <ve-histogram :extend="chartExtend3" :colors="colors1" width="240px" height="60px"></ve-histogram>
        </div>
      </div>
      <div class="piece">
        <div class="name">项目数量<!-- i class="iconfont icon-wenhao"></i> --></div>
        <div class="data">{{this.visualizationList.countProject}}</div>
        <div class="chart">
          <ve-line :extend="chartExtend2" :colors="colors2" width="240px" height="60px"></ve-line>
        </div>
      </div>
      <div class="piece">
        <div class="name">荣誉资质<!-- i class="iconfont icon-wenhao"></i> --></div>
        <div class="data">{{this.visualizationList.countHonor}}</div>
        <div class="chart">
          <ve-histogram :extend="chartExtend3" :colors="colors3" width="240px" height="60px"></ve-histogram>
        </div>
      </div>
      <div class="piece">
        <div class="name">技术能力<!-- i class="iconfont icon-wenhao"></i> --></div>
        <div class="data">{{this.visualizationList.countTechnology}}</div>
        <div class="chart">
          <ve-histogram :extend="chartExtend3" :colors="colors4" width="240px" height="60px"></ve-histogram>
        </div>
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
      visualizationList: { countHonor: '', countProject: '', countTechnology: '' },
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
  width: 100%;
  position: relative;
  img {
    width: 100%;
    height: 205px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  .visualization-list {
    width: 1200px;
    margin: 0 auto;
    padding: 30px 15px;
    display: grid;
    grid-auto-flow: row dense;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    .piece {
      padding: 0 20px;
      .name {
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        i {
          height: 40px;
          line-height: 40px;
          color: #999;
          float: right;
        }
      }
      .data {
        font-size: 30px;
      }
    }
  }
}
</style>
<style>
</style>


