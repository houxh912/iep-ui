<template>
  <component @onGoBack="handleGoBack" :record="record" :is="currentComponet"></component>
</template>

<script>
// 动态切换组件
import List from './Page/List'


export default {
  name: 'TableListWrapper',
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  components: {
    List,
  },
  data () {
    return {
      currentComponet: 'List',
    }
  },
  created () {

  },
  methods: {

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
