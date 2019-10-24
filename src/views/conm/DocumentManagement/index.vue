<template>
  <div class="document-management">
    <basic-container>
      <iep-page-header title="文档管理" :backOption="backOption"></iep-page-header>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='AllDocument'" v-slot:AllDocument>
          <all-document v-loading="activeTab !=='AllDocument'"></all-document>
        </template>
      </iep-tabs>
    </basic-container>
  </div>
</template>
<script>
import AllDocument from './AllDocument'
export default {
  components: {
    AllDocument,
  },
  data () {
    return {
      backOption: {
        isBack: true,
      },
      nodeName: '',
      tabList: [{
        label: '所有',
        value: 'AllDocument',
      },
      ],
      activeTab: 'AllDocument',
    }
  },
  created () {
    this.nodeName = this.$route.query.nodeName
    this.loadPage()
  },
  methods: {
    loadPage () {
      this.tabList[0].label = `栏目名称：${this.nodeName}`
    },
  },
}
</script>
<style scoped lang='scss'>
</style>

