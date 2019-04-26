<template>
  <component ref="component" @onEdit="handleEdit" @onGoBack="handleGoBack" :record="record" @load-page="loadPage" :is="currentComponet"></component>
</template>

<script>
// 动态切换组件
import List from './List'
import Edit from './Edit'
export default {
  components: {
    List,
    Edit,
  },
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      currentComponet: 'List',
    }
  },
  methods: {
    handleEdit (val) {
      this.currentComponet = 'Edit'
      this.$nextTick(() => {
        this.$refs['component'].record = val
      })
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
