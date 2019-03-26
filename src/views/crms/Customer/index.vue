<template>
  <keep-alive include="list">
    <component @onDetail="handleDetail" @onForm="handleForm" @onCooper="handleCooper" @onGoBack="handleGoBack" :record="record" :is="currentComponet"></component>
  </keep-alive>
</template>

<script>
// 动态切换组件
import List from './Page/List'
import Edit from './Page/Edit'
import Detail from './Page/Detail'
import Collaborator from './Page/Collaborator/'
export default {
  name: 'TableListWrapper',
  components: {
    List,
    Edit,
    Detail,
    Collaborator,
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
    handleCooper (record) {
      this.record = record
      this.currentComponet = 'Collaborator'
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
