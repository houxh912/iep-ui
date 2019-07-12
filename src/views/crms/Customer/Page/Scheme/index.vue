<template>
  <component ref="component" @onEdit="handleEdit" @onNewly="handleNewly" @onGoBack="handleGoBack" :record="record" @load-page="loadPage" :is="currentComponet" :data="data"></component>
</template>

<script>
// 动态切换组件
import List from './List'
import Edit from './Edit'
import NewlyDialog from './NewlyDialog'
export default {
  components: {
    List,
    Edit,
    NewlyDialog,
  },
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      data: '',
      currentComponet: 'List',
    }
  },
  methods: {
    handleEdit (val) {
      this.data = val
      this.currentComponet = 'Edit'
    },
    handleNewly (val) {
      this.data = val
      this.currentComponet = 'NewlyDialog'
    },
    handleGoBack () {
      this.currentComponet = 'List'
    },
    loadPage () {
      this.$emit('load-page')
    },
  },
}
</script>
