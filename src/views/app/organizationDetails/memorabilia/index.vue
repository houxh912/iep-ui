<template>
  <div class="events">
    <el-timeline>
      <el-timeline-item v-for="(activity, index) in activities" :key="index" :icon="activity.icon" :type="activity.type" :color="activity.color" :size="activity.size" :timestamp="activity.timestamp">
        {{activity.content}}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activities: [{
        content: '支持使用图标',
        timestamp: '2018-04-12 20:46',
        size: 'large',
        icon: 'el-icon-time',
      }, {
        content: '支持自定义颜色',
        timestamp: '2018-04-03 20:46',
      }, {
        content: '支持自定义尺寸',
        timestamp: '2018-04-03 20:46',
        size: 'large',
      }, {
        content: '默认样式的节点',
        timestamp: '2018-04-03 20:46',
      }],
    }
  },
}
</script>
<style lang="scss" scoped>
.events {
  margin: 40px;
}
</style>
