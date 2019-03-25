<template>
  <component ref="component" @onEdit="handleEdit" @onCreate="handleCreate" @onDetail="handleDetail" @onGoBack="handleGoBack" :record="record" :is="currentComponet"></component>
</template>

<script>
// 动态切换组件
import List from './Page/List'
import Edit from './Page/Edit'
import Detail from './Page/Detail'
import { createData, updateData } from '@/api/crms/contract'

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
  created () {

  },
  methods: {
    handleCreate (record) {
      this.record = record
      this.currentComponet = 'Edit'
      this.$nextTick(() => {
        this.$refs['component'].formRequestFn = createData
      })
    },
    handleEdit (record) {
      this.record = record
      this.currentComponet = 'Edit'
      this.$nextTick(() => {
        this.$refs['component'].formRequestFn = updateData
        this.$refs['component'].formData = record
      })
    },
    handleDetail (record) {
      this.record = record
      this.currentComponet = 'Detail'
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
