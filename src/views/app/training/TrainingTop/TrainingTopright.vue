<template>
  <div class="training-top-right">
    <el-row>
      <el-col>
        <el-card :body-style=" { padding: '0px' }" shadow="never">
          <div class="sub-title clearfix" slot="header">
            <span class="cardTitle">{{title}}</span>
            <el-button class="more" type="text" @click="getMore">更多></el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="block">
      <el-timeline>
        <el-timeline-item v-for="(activity, index) in activities" :key="index" :icon="activity.icon" :type="activity.type" :color="activity.color" :size="activity.size">
          <div><span class="item-title">{{activity.title}}</span><strong>{{activity.important}}</strong></div>
          <p class="content">{{activity.content}}</p>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '培训预告',
      activities: [{
        title: '04-06 • 张云飞 • 国脉人微信培训 • ',
        important: '即将开始',
        content: '河北人口库项目',
        color: '#cb3737',
        icon: 'el-icon-time',
        size: 'large',
      }, {
        title: '04-10 • 刘晓燕 • 海洋科学城12楼会议室',
        content: '北京市政务服务事项标准化和主题事项持续优化项目',
      }, {
        title: '04-12 • 应琪瑜 • 国脉人微信培训',
        content: '区块链点对点技术实现电子现金系统技术培训',
      }, {
        title: '04-15 • 俞泽益 • 舟山国脉集团10楼1002会议室',
        content: '如何提高人员文档撰写能力及撰写规范',
      }, {
        title: '04-19 • 温迎璐 • 舟北京市丰台区党委',
        content: '北京市政务服务（公共服务）事项规范填报说明培训',
      }],
    }
  },
  methods: {
    getMore () {
      this.$router.push({
        path: 'app/training_list',
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.block {
  margin-top: 20px;
  .el-timeline {
    margin: 0 10px;
    padding: 0;
    .el-timeline-item {
      padding-bottom: 10px;
    }
    .content {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .item-title {
      color: #999;
    }
    span {
      margin-right: 3px;
    }
    strong {
      font-weight: 400;
      color: #cb3737;
    }
  }
}
</style>
<style scoped>
.training-top-right >>> .el-card {
  border: 0;
}
</style>
