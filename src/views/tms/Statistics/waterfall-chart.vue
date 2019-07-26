<template>
  <div class="water-fall-wrapper">
    <h1>常用标签瀑布图</h1>
    <no-data v-if="!commontag.length" style="height: 300px;"></no-data>
    <el-menu v-if="commontag.length" :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item v-for="item in commontag" :index="item.id+''" :key="item.id">{{item.name}}</el-menu-item>
    </el-menu>
    <ve-waterfall :data="chartData" :extend="extend"></ve-waterfall>
  </div>
</template>

<script>
import { getTagCommon, getTagRelationList } from '@/api/tms/statistics'
import noData from './no-data'
export default {
  components: { noData },
  data () {
    this.extend = {
      'xAxis.0.axisLabel.rotate': 45,
    }
    return {
      realData: [],
      activeIndex: '1',
      commontag: [],
    }
  },
  computed: {
    chartData () {
      return {
        columns: ['name', 'count'],
        rows: this.realData,
      }
    },
  },
  created () {
    this.loadCommonTag()
  },
  methods: {
    loadCommonTag () {
      getTagCommon().then(res => {
        this.commontag = res.data
        this.activeIndex = res.data[0].id + ''
        this.loadRelationList(this.activeIndex)
      })
    },
    loadRelationList (id) {
      getTagRelationList(id).then(res => {
        this.realData = res.data
      })
    },
    handleSelect (index) {
      this.loadRelationList(index)
    },
  },
}
</script>
<style lang="scss" scoped>
.water-fall-wrapper {
  > .el-menu {
    display: flex;
    justify-content: center;
  }
  > .el-menu--horizontal > .el-menu-item {
    height: 40px;
    line-height: 40px;
  }
}
h1 {
  font-size: 18px;
}
</style>
