<template>
  <keep-alive include="List">
    <component @onDetail="handleDetail" @onGoBack="handleGoBack" :record="record" :is="currentComponet"></component>
  </keep-alive>
</template>

<script>
// 动态切换组件
import List from './List'
import Detail from './Detail'

export default {
  name: 'TableListWrapper',
  components: {
    List,
    Detail,
  },
  data () {
    return {
      currentComponet: 'List',
      record: '',
    }
  },
  methods: {
    handleDetail (record) {
      this.record = record
      this.currentComponet = 'Detail'
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
