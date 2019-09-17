<template>
  <component @onChange='handleChange' @onGoBack="handleGoBack" :record="record" :is="currentComponet"></component>
</template>

<script>
//动态切换组件
import List from './list'
import Page from './Page'

export default {
  name: 'Table',
  components: {
    List,
    Page,
  },
  data () {
    return {
      currentComponet: 'List',
      record: '',
    }
  },
  methods: {
    handleChange (record) {
      this.record = record
      this.currentComponet = 'Page'
    },
    handleGoBack (record) {
      this.record = record
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

