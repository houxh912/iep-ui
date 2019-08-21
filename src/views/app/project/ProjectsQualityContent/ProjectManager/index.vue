<template>
  <div class="project">
    <IepAppTabsCard isMore :linkName="linkName">
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='ProjectManager'" v-slot:ProjectManager>
          <project-manager 
            v-loading="activeTab !=='ProjectManager'" 
            :tagList="tagList" 
            @fresh="handleFresh" 
            ref="project" 
            :list="list" 
            :activeIndex="activeIndex"
            @activeTag="activeTag"></project-manager>
        </template>
        <template v-if="activeTab ==='ProjectExecutive'" v-slot:ProjectExecutive>
          <project-executive 
            v-loading="activeTab !=='ProjectExecutive'" 
            :tagList="tagList" 
            @fresh="handleFresh" 
            ref="project" 
            :list="list" 
            :activeIndex="activeIndex"
            @activeTag="activeTag"></project-executive>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import ProjectManager from './ProjectManager'
import ProjectExecutive from './ProjectExecutive'
import { getProjectTag, getProjectEmployee } from '@/api/app/prms/'
export default {
  components: {
    ProjectManager,
    ProjectExecutive,
  },
  data () {
    return {
      tabList: [{
        label: '项目经理',
        value: 'ProjectManager',
      }, {
        label: '项目督导',
        value: 'ProjectExecutive',
      }],
      tagList: [],
      params: {
        current: 1,
        size: 7,
      },
      projectParmas: {
        type: 'manager',
      },
      list: [],
      activeIndex: -1,
      activeTab: 'ProjectManager',
      linkName: '/app/project_list',
    }
  },
  methods: {
    getProjectEmployee () {
      getProjectEmployee(this.projectParmas).then(({ data }) => {
        this.list = data.data.records.slice(0, 4)
      })
    },
    activeTag (index, tagId) {
      if (index === this.activeIndex) {
        this.activeIndex = -1
        tagId = ''
      } else {
        this.activeIndex = index
      }
      // 根据返回的数据进行项目经理的查询
      this.projectParmas.tagId = tagId
      this.getProjectEmployee()
    },
    handleFresh () {
      this.activeIndex = -1
      this.params.current += 1
      this.loadPage()
    },
    loadPage () {
      getProjectTag(this.params).then(({ data }) => {
        this.tagList = data.data.records
        this.$refs['project'].isLoading = false
      })
    },
  },
  created () {
    this.loadPage()
    this.getProjectEmployee()
  },
  watch: {
    activeTab (newVal) {
      this.projectParmas.type = newVal === 'ProjectManager' ? 'manager' : 'mentor',
      this.getProjectEmployee()
    },
  },
}
</script>
<style lang="css" scoped>
.project >>> .el-card__body {
  height: 410px;
}
</style>
