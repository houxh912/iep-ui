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
import Album from './Album/'
export default {
  components: { BasicInformation, Memorabilia, Album },
  data () {
    return {
      tabList: [{
        label: '基本信息',
        value: 'BasicInformation',
      }, {
        label: '大事记',
        value: 'Memorabilia',
      }, {
        label: '相册',
        value: 'Album',
      }],
      activeTab: 'BasicInformation',
    }
  },
}
</script>
