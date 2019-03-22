<template>
  <div class="evaluation">
    <div class="title">{{evaluation.title}}</div>
    <div class="block">
      <el-timeline>
        <el-timeline-item v-for="(activity, index) in activities" :key="index" :icon="activity.icon" :type="activity.type" :color="activity.color" :size="activity.size">
          {{activity.content}}
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      evaluation: { title: '收到评价' },
      activities: [{
        content: '领导能力强',
      }, {
        content: '工作负责，执行力强',
        color: '#cb3737',
      }, {
        content: '优秀的程序员',
      }, {
        content: '友好',
      }],
    }
  },
  methods: {
    evaluationDetail () {
      // console.log(index)
    },
  },
}
</script>
<style lang="scss" scoped>
.evaluation {
  box-sizing: border-box;
  margin: 10px;
  ul {
    margin: 0;
    padding: 0;
  }
}
.title {
  padding: 0 0 10px;
  font-size: 16px;
  font-weight: 500;
}
.cursor {
  cursor: pointer;
}
</style>

<style lang="css" scoped>
.evaluation >>> .el-timeline-item__node--normal {
  top: 4px;
  left: 1px;
  width: 8px;
  height: 8px;
}
.evaluation >>> .el-timeline-item__tail {
  left: 5px;
}
.evaluation >>> .el-timeline-item__content {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.evaluation >>> .block {
  padding: 5px 0;
}
.evaluation >>> .el-timeline-item {
  padding-bottom: 5px;
}
.evaluation >>> .el-timeline-item:last-child {
  padding: 0;
}
.evaluation >>> .el-timeline-item__node {
  background-color: #fff;
  border: 1px solid #d7d7d7;
}
.evaluation
  >>> .el-timeline
  .el-timeline-item:last-child
  .el-timeline-item__tail {
  display: block;
}
</style>