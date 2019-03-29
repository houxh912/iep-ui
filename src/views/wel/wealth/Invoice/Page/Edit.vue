<template>
  <div>
    <basic-container>
      <page-header title="新增发票"></page-header>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Project'" v-slot:Project>
          <project v-loading="activeTab !=='Project'"></project>
        </template>
        <template v-if="activeTab ==='Daily'" v-slot:Daily>
          <daily v-loading="activeTab !=='Daily'"></daily>
        </template>
        <template v-if="activeTab ==='Other'" v-slot:Other>
          <other v-loading="activeTab !=='Other'"></other>
        </template>
      </iep-tabs>
      <footer-tool-bar>
        <iep-button @click="handleGoBack">返回</iep-button>
      </footer-tool-bar>
    </basic-container>
  </div>
</template>
<script>
import FooterToolBar from '@/components/FooterToolbar'
import PageHeader from '@/components/Page/Header'
import IepTabs from '@/components/IepCommon/Tabs'
import Project from './Project/'
import Daily from './Daily/'
import Other from './Other/'
export default {
  components: { PageHeader, IepTabs, FooterToolBar, Project, Daily, Other },
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: this.handleGoBack,
      },
      tabList: [
        {
          label: '项目管理类',
          value: 'Project',
        },
        {
          label: '日常管理类',
          value: 'Daily',
        },
        {
          label: '其他类',
          value: 'Other',
        },
      ],
      activeTab: 'Project',
    }
  },
  methods: {
    handleGoBack () {
      this.$emit('onGoBack')
    },
  },
}
</script>
