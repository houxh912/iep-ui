<template>
  <keep-alive include="List">
    <component ref="component" :record="record" :is="currentComponet" @onDetail="handleDetail" @onForm="handleForm" @onGoBack="handleGoBack"></component>
  </keep-alive>
</template>

<script>
// 动态切换组件
import List from './Page/List'
import Edit from './Page/Edit'
import Detail from './Page/Detail'

export default {
  name: 'TableListWrapper',
  components: {
    List,
    Edit,
    Detail,
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
    handleDetail (record) {
      this.record = record
      this.currentComponet = 'Detail'
    },
    handleGoBack () {
      this.record = ''
      this.currentComponet = 'List'
      this.$nextTick(() => {
        this.$refs['component'].loadPage()
      })
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
