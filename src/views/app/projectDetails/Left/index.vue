<template>
  <div class="project-details-con">
    <h3 class="title">{{title}}</h3>
    <div class="post-con">
      <span class="post">{{post1}}：<span class="name">{{name1}}</span></span>
      <span class="post">{{post2}}：<span class="name">{{name2}}</span></span>
    </div>
    <div class="leaderBoard">
      <IepAppTabsCard :linkName="linkName">
        <iep-tabs v-model="activeTab" :tab-list="tabList">
          <template v-if="activeTab ==='Survey'" v-slot:Survey>
            <survey v-loading="activeTab !=='Survey'"></survey>
          </template>
          <template v-if="activeTab ==='Set'" v-slot:Set>
            <set-it v-loading="activeTab !=='Set'"></set-it>
          </template>
          <template v-if="activeTab ==='Material'" v-slot:Material>
            <material v-loading="activeTab !=='Material'"></material>
          </template>
        </iep-tabs>
      </IepAppTabsCard>
    </div>
  </div>
</template>
<script>
import Survey from './Survey'
import SetIt from './SetIt'
import Material from './Material'
export default {
  components: { Survey, SetIt, Material },
  data () {
    return {
      title: '北京市政务服务管理办公室五个主体事项梳理',
      post1: '市场经理',
      post2: '项目经理',
      name1: '李凯',
      name2: '胡浩',
      tabList: [{
        label: '项目概况',
        value: 'Survey',
      }, {
        label: '立项阶段',
        value: 'Set',
      }, {
        label: '项目材料',
        value: 'Material',
      }],
      activeTab: 'Survey',
    }
  },
}
</script>
<style lang="scss" scoped>
.project-details-con {
  padding-right: 20px;
  border-right: 1px solid #eee;
  .title {
    margin-top: 20px;
    font-size: 20px;
  }
  .post-con {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
    .post {
      margin-right: 20px;
    }
  }
}
.iep-tabs >>> .el-tabs__content {
  padding: 0 20px 20px 20px;
}
</style>
<style scoped>
.leaderBoard >>> .el-card {
  padding: 0;
  border: 0;
}
.leaderBoard >>> .item .el-card {
  border: 1px solid #ebeef5;
  padding: 20px;
}
</style>
