<template>
  <div>
    <basic-container>
      <page-header title="职务职称体系" :replaceText="replaceText" :data="[10,10]"></page-header>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='JobSystem'" v-slot:JobSystem>
          <job-system v-loading="activeTab !=='JobSystem'"></job-system>
        </template>
        <template v-if="activeTab ==='TitleSystem'" v-slot:TitleSystem>
          <title-system v-loading="activeTab !=='TitleSystem'"></title-system>
        </template>
      </iep-tabs>
    </basic-container>
  </div>
</template>
<script>
import JobSystem from './JobSystem/'
import TitleSystem from './TitleSystem/'
export default {
  components: { JobSystem, TitleSystem },
  data () {
    return {
      replaceText: (data) => `（共有${data[0]}个职称，${data[0]}个职务）`,
      tabList: [{
        label: '职务体系',
        value: 'JobSystem',
      }, {
        label: '职称体系',
        value: 'TitleSystem',
      }],
      activeTab: 'JobSystem',
    }
  },
}
</script>
