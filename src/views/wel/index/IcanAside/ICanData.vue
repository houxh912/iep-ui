<template>
  <i-can-content class="my-content" title-name="我的指数">
    <ve-radar width="220px" height="220px" :data="chartData" :settings="chartSettings" :legendVisible="isTrue"></ve-radar>
    <h4 style="text-align:center;">内网综合指数：{{sum}}</h4>
  </i-can-content>
</template>
<script>
import ICanContent from './ICanContent'
import { getUserDetail } from '@/api/app/hrms/index'
import { mapGetters } from 'vuex'
export default {
  components: { ICanContent },
  data () {
    this.chartSettings = {
      labelMap: {
        date: '日期',
        work: '工作',
        study: '学习',
        creative: '服务创新',
        weath: '财富增值',
        admin: '管理',
        xz: '协作',
      },
      lineStyle: {
        color: '#fff',
      },
      areaStyle: {
        opacity: 0.2,
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: 'red', // 0% 处的颜色
          }, {
            offset: 1, color: 'orange', // 100% 处的颜色
          }],
          global: false, // 缺省为 false
        },
      },
    }
    return {
      isTrue: false,
      sum: 0,
      chartData: {
        columns: ['date', 'creative', 'work', 'study', 'weath', 'admin', 'xz'],
        rows: [
          {
            date: '去年', 'weath': 100, 'creative': 100, 'work': 100, 'study': 100, 'admin': 100, 'xz': 100,
          },
          {
            date: '今年', 'weath': 0, 'creative': 0, 'work': 0, 'study': 0, 'admin': 0, 'xz': 0,
          },
        ],
      },
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      getUserDetail(this.userInfo.userId).then(({ data }) => {
        const { indexMap } = data.data
        this.sum = 0
        let max = 0
        for (const key in indexMap) {
          if (indexMap.hasOwnProperty(key)) {
            const element = indexMap[key]
            this.sum += element
            if (max < element) {
              max = element
            }
          }
        }
        this.chartData.rows[1].weath = indexMap.cfzz
        this.chartData.rows[1].creative = indexMap.cxfw
        this.chartData.rows[1].work = indexMap.gz
        this.chartData.rows[1].study = indexMap.xx
        this.chartData.rows[1].admin = indexMap.gl
        this.chartData.rows[1].xz = indexMap.xz

        this.chartData.rows[0].weath = max
        this.chartData.rows[0].creative = max
        this.chartData.rows[0].work = max
        this.chartData.rows[0].study = max
        this.chartData.rows[0].admin = max
        this.chartData.rows[0].xz = max
      })
    },
  },
}
</script>
<style  lang="scss" scoped>
.ve-radar {
  margin: 15px auto 0;
}
</style>
