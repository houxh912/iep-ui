<template>
  <div class="mark">
    <IepAppTabCard :title="title">
      <ve-radar :data="chartData" :settings="chartSettings" :legendVisible="isTrue" height="220px"></ve-radar>
    </IepAppTabCard>
  </div>
</template>

<script>
import 'v-charts/lib/style.css'
export default {
  props: {
    indexMap: {
      type: Object,
    },
  },
  data () {
    this.chartSettings = {
      dimension: ['服务创新'],
      metrics: ['服务创新', '协作', '管理', '财富增值', '学习', '工作'],
      lineStyle: {
        width: 2,
        type: 'solid',
      },
      shape: 'polygon',
    }
    this.isTrue = false
    return {
      title: 'TA的指数',
    }
  },
  computed: {
    chartData () {
      let num = 0
      for (let item in this.indexMap) {
        if (num < this.indexMap[item]) {
          num = this.indexMap[item]
        }
      }
      return {
        columns: ['服务创新', '协作', '管理', '财富增值', '学习', '工作'],
        rows: [
          { '服务创新': this.indexMap.cxfw, '协作': this.indexMap.xz, '管理': this.indexMap.gl, '财富增值': this.indexMap.cfzz, '学习': this.indexMap.xx, '工作': this.indexMap.gz },
          { '服务创新': num, '协作': num, '管理': num, '财富增值': num, '学习': num, '工作': num },
        ],
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.mark {
  margin-bottom: 30px;
}
</style>
