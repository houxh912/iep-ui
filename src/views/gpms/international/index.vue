<template>
  <keep-alive include="List">
    <component @onEdit="handleDetail" @onGoBack="handleGoBack" :record="record" :is="currentComponet"></component>
  </keep-alive>
</template>

<script>
// 动态切换组件
import List from './List'
import detail from '../detail'

export default {
  name: 'TableListWrapper',
  components: {
    List,
    detail,
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
      this.currentComponet = 'detail'
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
