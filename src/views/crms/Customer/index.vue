<template>
  <keep-alive include="list">
    <component ref="component"  @onEdit="handleEdit" @onGoBack="handleGoBack" :record="record" :is="currentComponet"></component>
  </keep-alive>
</template>

<script>
// 动态切换组件
import List from './Page/List'
import Edit from './Page/Edit'
export default {
  name: 'CustomerComponents',
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
    handleEdit (record) {
      this.record = record
      this.currentComponet = 'Edit'
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
