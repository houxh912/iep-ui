<template>
  <component @onEdit="handleEdit" @onCreat="handleCreate" @onGoBack="handleGoBack" :record="record" :is="currentComponet" :isAdd="isAdd"></component>
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
      isAdd: '',
    }
  },
  created () {

  },
  methods: {
    // 编辑
    handleEdit (record) {
      this.record = record
      this.isAdd = 'edit'
      this.currentComponet = 'Edit'
    },
    // 新增
    handleCreate (record) {
      this.record = record
      this.isAdd = 'add'
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
