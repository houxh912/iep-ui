<template>
  <div class="project-details-con">
    <h3 class="title">{{projectData.projectName}}</h3>
    <div class="post-con">
      <span class="post">市场经理：
        <span v-if="projectData.mktManagerList.length==0">无</span>
        <span v-for="(a,index) in projectData.mktManagerList" :key="a.id" class="people">{{a.name}}<span v-show="index!=projectData.mktManagerList.length-1">、</span></span>
      </span>
      <span class="post">项目经理：<span class="name">{{projectData.projectManagerName}}</span></span>
      <span class="post">所属组织：<span class="name">{{projectData.orgName}}</span></span>
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
  beforeRouteUpdate (to, from, next) {
    // console.log(to, from)
    this.$nextTick(() => {
      this.getDataDetail()
    })
    next()
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
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
    getDataDetail () {
      getDataDetail(this.$route.params.id).then(({ data }) => {
        let obj = data.data
        obj.publisherName = obj.publisherList ? obj.publisherList.name : ''
        obj.relatedClientName = obj.relatedClientList ? obj.relatedClientList.name : ''
        obj.approverName = obj.approverList ? obj.approverList.name : ''
        obj.projectManagerName = obj.projectManagerList ? obj.projectManagerList.name : ''
        obj.applicantName = obj.applicantList ? obj.applicantList.name : ''
        this.projectData = obj
      })
    },
  },
  created () {
    this.getDataDetail()
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
