<template>
  <div>
    <iepAppTabCard :title="title">
      <div class="learning-resources-list">
        <div v-for="(item,index) in learningResourcesList" :key="index" class="piece">
          {{item}}
        </div>
        <iep-button type="" plain class="lr-btn">JAVA规范认定</iep-button>
        <iep-button type="" plain class="lr-btn">产品能力认证</iep-button>
      </div>
    </iepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '学习资源',
      learningResourcesList: [
        '20190323北京市政务服务事项标准化和主题事项持续优化项目介绍',
        '20190314研发中心测试组赵雨晨培训如何应用阿里云和腾讯云云测试工具进行性能测试',
        '20190306研发中心俞泽益培训如何提高人员文档撰写能力及撰写规范',
        '20190226陈振辉给佛山技术团队培训国脉GDS微服务开发框架',
        '20190226区块链点对点技术实现电子现金系统技术培训',
        '北京市政务服务（公共服务）事项规范填报说明培训'],
    }
  },
}
</script>
<style lang="scss" scoped>
.learning-resources-list {
  .piece {
    cursor: pointer;
    height: 32px;
    line-height: 32px;
    position: relative;
    margin-left: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    &:hover {
      color: #cb3737;
      &:before {
        background-color: #cb3737;
      }
    }
    &:before {
      content: "";
      position: absolute;
      left: -15px;
      top: 14px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #999;
    }
  }
  .lr-btn {
    margin: 10px 30px 5px;
  }
}
</style>
