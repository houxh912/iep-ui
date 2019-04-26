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
<<<<<<< HEAD
=======

<style lang="scss" scoped>
.program-name {
  padding: 10px 0;
}
.download {
  color: #409eff;
  cursor: pointer;
  i {
    margin-left: 5px;
  }
}
.item {
  display: inline-block;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #d4d4d4;
  padding: 3px 10px;
  margin-right: 10px;
  &:hover {
    color: #ba1b21;
    border: 1px solid #ba1b21;
  }
}
.line {
  display: inline-block;
  vertical-align: middle;
}
.create-name {
  vertical-align: middle;
  padding-left: 5px;
}
</style>
>>>>>>> f9e05875d6f6650234154e99ca9c0a440cd632e7
