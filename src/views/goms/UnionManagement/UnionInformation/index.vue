<template>
  <div>
    <basic-container>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='BasicInformation'" v-slot:BasicInformation>
          <basic-information v-loading="activeTab !=='BasicInformation'"></basic-information>
        </template>
        <template v-if="activeTab ==='Memorabilia'" v-slot:Memorabilia>
          <memorabilia v-loading="activeTab !=='Memorabilia'"></memorabilia>
        </template>
        <template v-if="activeTab ==='Development'" v-slot:Development>
          <development v-loading="activeTab !=='Development'"></development>
        </template>
        <template v-if="activeTab ==='Album'" v-slot:Album>
          <album v-loading="activeTab !=='Album'"></album>
        </template>
      </iep-tabs>
    </basic-container>
  </div>
</template>
<script>
import BasicInformation from './BasicInformation/'
import Memorabilia from './Memorabilia/'
import Development from './Development'
import Album from './Album/'
export default {
  components: { BasicInformation, Memorabilia, Development, Album },
  data () {
    return {
      tabList: [{
        label: '联盟基本信息',
        value: 'BasicInformation',
      }, {
        label: '联盟大事记',
        value: 'Memorabilia',
      }, {
        label: '联盟发展历程',
        value: 'Development',
      }, {
        label: '联盟相册',
        value: 'Album',
      }],
      activeTab: 'BasicInformation',
    }
  },
}
</script>
