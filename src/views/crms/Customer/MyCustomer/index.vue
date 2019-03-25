<template>
  <component @onEdit="handleEdit" @onAdvance="handleAdvance" @onCooper="handleCooperation" @onGoBack="handleGoBack" @onDetail="handleDetail" :record="record" :is="currentComponet" :isAdd="isAdd"></component>
</template>

<script>
// 动态切换组件
import List from './Page/List'
import MainFormDialog from '../component/mainDialog'
import CustomDetail from '../detail/index'
import CollaboratorDialog from '../component/collaborator'

export default {
  name: 'TableListWrapper',
  components: {
    List,
    MainFormDialog,
    CustomDetail,
    CollaboratorDialog,
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
      console.log(record)
      this.isAdd = 'edit'
      this.currentComponet = 'MainFormDialog'
    },
    // 新增
    handleAdvance (record) {
      this.record = record
      this.isAdd = 'add'
      this.currentComponet = 'MainFormDialog'
    },
    handleCooperation (record) {
      this.record = record
      this.currentComponet = 'CollaboratorDialog'
    },
    handleGoBack () {
      this.record = ''
      this.currentComponet = 'List'
    },
    handleDetail (record) {
      this.record = record
      this.currentComponet = 'CustomDetail'
    },
  },
  watch: {
    '$route.path' () {
      this.record = ''
      this.currentComponet = 'List'
      this.isAdd = ''
    },
  },
}
</script>
