<template>
  <div class="document-management">
    <basic-container>
      <page-header title="文档管理" :backOption="backOption"></page-header>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='AllDocument'" v-slot:AllDocument>
          <all-document v-loading="activeTab !=='AllDocument'"></all-document>
        </template>
        <!-- <template v-if="activeTab ==='RecycleBin'" v-slot:RecycleBin>
          <recycle-bin v-loading="activeTab !=='RecycleBin'"></recycle-bin>
        </template> -->
      </iep-tabs>
    </basic-container>
  </div>
</template>
<script>
import AllDocument from './AllDocument'
// import RecycleBin from './RecycleBin'
export default {
  components: {
    AllDocument,
    // RecycleBin,
  },
  data () {
    return {
      backOption: {
        isBack: true,
      },
      tabList: [{
        label: '所有',
        value: 'AllDocument',
      },
      // , {
      //   label: '回收站',
      //   value: 'RecycleBin',
      // }
      ],
      activeTab: 'AllDocument',
    }
  },
  mounted () {
  },
  methods: {
  },
}
</script>
<style scoped lang='scss'>
</style>

