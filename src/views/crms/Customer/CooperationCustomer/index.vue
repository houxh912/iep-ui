<template>
  <component @onEdit="handleEdit" @onGoBack="handleGoBack" :record="record" :is="currentComponet" :isAdd="isAdd"></component>
</template>

<script>
// 动态切换组件
import List from './Page/List'
import MainFormDialog from '../component/mainDialog'
export default {
  name: 'TableListWrapper',
  components: {
    List,
    MainFormDialog,
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
    handleEdit (record) {
      this.record = record
      this.isAdd = 'edit'
      this.currentComponet = 'MainFormDialog'
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
