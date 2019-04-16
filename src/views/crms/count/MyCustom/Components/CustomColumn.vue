<template>
  <el-card shadow="hover">
    <el-row class="custom">
      <el-col class="head">客户分析</el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <div class="echarts odd">
          <v-chart :forceFit="true" height="300" :data="data" :scale="scale" :padding="[40,20,40,60]">
            <v-tooltip :showTitle="false" dataKey="item*percent" />
            <v-axis />
            <v-legend dataKey="item" />
            <v-pie position="percent" color="item" :v-style="pieStyle" :label="labelConfig" />
            <v-coord type="theta" />
          </v-chart>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="echarts">
          <v-chart :forceFit="true" height="300" :data="data1" :scale="scale1" :padding="[40,20,40,60]">
            <v-tooltip :showTitle="false" dataKey="item*percent" />
            <v-axis />
            <v-legend dataKey="item" />
            <v-pie position="percent" color="item" :v-style="pieStyle" :label="labelConfig" />
            <v-coord type="theta" />
          </v-chart>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="echarts lines">
          <div class="line"></div>
          <div class="msg">您的客户中：</div>
          <div class="msg">园区级，平台类客户居多</div>
          <div class="msg">平均拜访次数：<span class="color">3</span></div>
          <div class="msg">平均方案上传：<span class="color">4</span></div>
          <div class="suggest">建议多寻找省级客户。</div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
import { data, scale } from './chart1'
import { data1, scale1 } from './chart2'
import { getMybusiness } from '@/api/crms/statistics'
export default {
  data () {
    return {
      data,
      scale,
      data1,
      scale1,
      height: 400,
      pieStyle: {
        stroke: '#fff',
        lineWidth: 1,
      },
      labelConfig: ['percent', {
        formatter: (val, item) => {
          return item.point.item + ': ' + val
        },
      }],
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      getMybusiness().then(res => {
      console.log(res)
      // this.$set('this.data1[0]', 'percent', 'res.data.data.consulting')
      // this.$set('this.data1[1]', 'percent', 'res.data.data.information')
      // this.$set('this.data1[2]', 'percent', 'res.data.data.matters')
      // this.$set('this.data1[3]', 'percent', 'res.data.data.platform')
      // this.$set('this.data1[4]', 'percent', 'res.data.data.softwareNumber')

        this.data1[0].percent = res.data.data.consulting / 100
        this.data1[1].percent = res.data.data.information / 100
        this.data1[2].percent = res.data.data.matters / 100
        this.data1[3].percent = res.data.data.platform / 100
        this.data1[4].percent = res.data.data.softwareNumber / 100
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.custom {
  .head {
    font-weight: 700;
    background-color: #eee;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
  }
}
.echarts {
  height: 300px;
  margin-top: 20px;
  margin-right: 20px;
  position: relative;
  .msg {
    padding: 5px 0;
  }
  .suggest {
    margin-top: 20px;
  }
}
.lines {
  padding-left: 20px;
  .line {
    position: absolute;
    left: 0;
    height: 100%;
    width: 2px;
    background: #eee;
  }
}
</style>
