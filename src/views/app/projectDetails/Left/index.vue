<template>
  <div class="project-details-con">
    <h3 class="title">{{projectData.projectName}}</h3>
    <div class="post-con">
      <span class="post">市场经理：<span class="name">{{projectData.mktManagerName}}</span></span>
      <span class="post">项目经理：<span class="name">{{projectData.projectManagerList.name}}</span></span>
    </div>
    <div class="leaderBoard">
      <basic :projectData="projectData"></basic>
      <approval :projectData="projectData"></approval>
      <material :projectData="projectData"></material>
    </div>
  </div>
</template>

<script>
import Basic from './Basic'
import Approval from './Approval/'
import Material from './Material/'
import { getDataDetail } from '@/api/gpms/'

export default {
  components: { Basic, Approval, Material },
  data () {
    return {
      title: '北京市政务服务管理办公室五个主体事项梳理',
      post1: '市场经理',
      post2: '项目经理',
      name1: '李凯',
      name2: '胡浩',
      projectData: {
        projectManagerList: { id: '', name: '' },
      },
    }
  },
  methods: {
    getDataDetail (id) {
      getDataDetail(id).then(({ data }) => {
        let obj = data.data
        obj.publisherName = obj.publisherList ? obj.publisherList.name : ''
        obj.relatedClientName = obj.relatedClientList ? obj.relatedClientList.name : ''
        console.log('projectData: ', obj)
        this.projectData = obj
      })
    },
  },
  created () {
    this.getDataDetail(this.$route.params.id)
  },
}
</script>

<style lang="scss" scoped>
.project-details-con {
  padding-right: 20px;
  border-right: 1px solid #eee;
  .title {
    margin-top: 20px;
    font-size: 22px;
  }
  .post-con {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
    .post {
      margin-right: 20px;
      color: #666;
      .name {
        color: #333;
      }
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
