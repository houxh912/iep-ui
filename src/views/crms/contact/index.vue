<template>
  <component @onEdit="handleEdit" @onAdvance="handleAdvance" @onGoBack="handleGoBack" :record="record" :is="currentComponet"></component>
</template>

<script>
// 动态切换组件
import List from './Page/List'
import Edit from './Page/Edit'
import Advance from './Page/Advance'

export default {
  name: 'TableListWrapper',
  components: {
    List,
    Edit,
    Advance,
  },
  data () {
    return {
      currentComponet: 'List',
      record: '',
    }
  },
  created () {

  },
  methods: {
    handleEdit (record) {
      this.record = record
      this.currentComponet = 'Edit'
    },
    handleAdvance (record) {
      this.record = record
      this.currentComponet = 'Advance'
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
