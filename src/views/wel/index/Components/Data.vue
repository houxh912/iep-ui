<template>
  <wrapper title="我的指数">
    <div class="data-wrapper iep-basic-scroll">
      <iep-charts class="echarts" :options="scoreRadar" :init-options="initOptions" autoresize />
    </div>
  </wrapper>
</template>

<script>
import { getRadar } from '@/api/app/hrms/index.js'
import Wrapper from './Wrapper'
export default {
  components: {
    Wrapper,
  },
  data () {
    return {
      scores: [
        { name: '财富增值', max: 1000, value: 0 },
        { name: '服务创新', max: 1000, value: 0 },
        { name: '工作', max: 1000, value: 0 },
        { name: '学习', max: 1000, value: 0 },
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
      this.scores[0].value = data.data.cfzz
      this.scores[1].value = data.data.cxfw
      this.scores[2].value = data.data.gz
      this.scores[3].value = data.data.xx
      this.scores[4].value = data.data.gl
      this.scores[5].value = data.data.xz
    },
  },
}
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  min-width: 300px;
  height: 300px;
}
.data-wrapper {
  width: 100%;
  height: 165px;
  overflow-y: scroll;
}
</style>
