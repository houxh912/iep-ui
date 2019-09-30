<template>
  <wrapper title="我的指数">
    <div class="grid-btn-group">
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
        { name: '进攻', max: 20, value: 19 },
        { name: '防守', max: 20, value: 9 },
        { name: '速度', max: 20, value: 18 },
        { name: '力量', max: 20, value: 16 },
        { name: '耐力', max: 20, value: 16 },
        { name: '敏捷', max: 20, value: 20 },
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
      console.log(data)
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
  height: 200px;
}
</style>
