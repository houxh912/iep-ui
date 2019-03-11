<template>
  <div>
    <basic-container>
      <page-header title="岗位库" :replaceText="replaceText" :data="[20]"></page-header>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='PostLibrary'" v-slot:PostLibrary>
          <post-library v-loading="activeTab !=='PostLibrary'"></post-library>
        </template>
        <template v-if="activeTab ==='JobClassification'" v-slot:JobClassification>
          <post-type v-loading="activeTab !=='JobClassification'"></post-type>
        </template>
      </iep-tabs>
    </basic-container>
  </div>
</template>
<script>
import PageHeader from '@/components/Page/Header'
import IepTabs from '@/components/IepCommon/Tabs'
import PostLibrary from './PostLibrary/'
import PostType from './PostType/'
export default {
  components: { PageHeader, IepTabs, PostLibrary, PostType },
  data () {
    return {
      replaceText: (data) => `（共有${data[0]}个岗位)`,
      tabList: [{
        label: '岗位库',
        value: 'PostLibrary',
      }, {
        label: '岗位分类',
        value: 'PostType',
      }],
      activeTab: 'PostLibrary',
    }
  },
}
</script>
