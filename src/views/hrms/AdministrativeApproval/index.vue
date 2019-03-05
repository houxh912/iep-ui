<template>
  <component @onView="handleView" @onGoBack="handleGoBack" :record="record" :is="currentComponet"></component>
</template>

<script>
// 动态切换组件
import List from './Page/List'
import View from './Page/View'

export default {
  name: 'TableListWrapper',
  components: {
    List,
    View,
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
    handleView (record) {
      this.record = record
      this.currentComponet = 'View'
    },
    handleGoBack () {
      this.record = ''
      this.currentComponet = 'List'
    },
  },
  watch: {
    '$route.path' () {
      this.record = ''
      this.currentComponet = 'List'
    },
  },
}
</script>
