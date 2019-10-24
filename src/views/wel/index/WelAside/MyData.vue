<template>
  <my-content class="my-content" title-name="我的指数">
    <iep-charts class="echarts" :options="scoreRadar" :init-options="initOptions" autoresize />
    <h4 style="text-align:center;">内网综合指数：{{sum}}</h4>
  </my-content>
</template>
<script>
import MyContent from './MyContent'
import { getRadar } from '@/api/app/hrms/index.js'
export default {
  components: { MyContent },
  data () {
    return {
      scores: [
        { name: '财富增值', max: 1000, value: 0 },
        { name: '工作', max: 1000, value: 0 },
        { name: '学习', max: 1000, value: 0 },
        { name: '服务创新', max: 1000, value: 0 },
        { name: '管理', max: 1000, value: 0 },
        { name: '协作', max: 1000, value: 0 },
      ],
      initOptions: {
        renderer: 'canvas',
      },
    }
  },
  computed: {
    scoreRadar () {
      return {
        sum: 0,
        tooltip: {},
        radar: {
          indicator: this.scores.map(({ name, max }) => {
            return { name, max }
          }),
        },
        series: [
          {
            name: '能力值',
            type: 'radar',
            data: [{ value: this.scores.map(({ value }) => value) }],
          },
        ],
      }
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    async loadPage () {
      const { data } = await getRadar()
      const sum = data.data.cfzz + data.data.cxfw + data.data.gz + data.data.xx + data.data.gl + data.data.xz
      this.scores.map(m => {
        m.max = sum
      })
      this.sum = sum
      this.scores[0].value = data.data.cfzz
      this.scores[2].value = data.data.gz
      this.scores[3].value = data.data.xx
      this.scores[1].value = data.data.cxfw
      this.scores[4].value = data.data.gl
      this.scores[5].value = data.data.xz
    },
  },
}
</script>
<style  lang="scss" scoped>
.echarts {
  width: 100%;
  min-width: 200px;
  height: 280px;
}
</style>
