<template>
  <keep-alive include="List">
    <component @onGoBack="handleGoBack" :record="record" :is="currentComponet"></component>
  </keep-alive>
</template>

<script>
// 动态切换组件
import List from './Page/List'
// import Edit from './Page/Edit'
// import Detail from './Page/Detail'

export default {
  name: 'TableListWrapper',
  components: {
    List,
    // Edit,
    // Detail,
  },
  data () {
    return {
      currentComponet: 'List',
      record: '',
    }
  },
  created () {

  },
  methods: {
    // handleEdit (record) {
    //   this.record = record
    //   this.currentComponet = 'Edit'
    // },
    handleGoBack () {
      this.record = ''
      this.currentComponet = 'List'
    },
    // handleDetail (record) {
    //   this.record = record
    //   this.currentComponet = 'Detail'
    // },
  },
  watch: {
    '$route.path' () {
      this.record = ''
      this.currentComponet = 'List'
    },
  },
}
</script>
