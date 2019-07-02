<template>
  <component :is="currentComponet" @change-tab="changeTab" :deptData="deptData" @load-page="loadPage"></component>
</template>

<script>
import tables from './table'
import tab from './tab'

export default {
  components: { tables, tab },
  data () {
    return {
      currentComponet: 'tables',
      deptData: {},
    }
  },
  methods: {
    changeTab (row) {
      if (this.$route.query.type == 1) {
        this.deptData = row
        this.currentComponet = 'tab'
      }
    },
    loadPage () {
      this.currentComponet = 'tables'
    },
  },
}
</script>
