<template>
  <keep-alive include="List">
    <component :record="record" :is="currentComponet" @onForm="handleForm" @onGoBack="handleGoBack"></component>
  </keep-alive>
</template>

<script>
// 动态切换组件
import List from './Page/List'
import Edit from './Page/Edit'

export default {
  name: 'TableListWrapper',
  components: {
    List,
    Edit,
  },
  data () {
    return {
      currentComponet: 'List',
      record: '',
    }
  },
  methods: {
    handleForm (record) {
      this.record = record
      this.currentComponet = 'Edit'
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
