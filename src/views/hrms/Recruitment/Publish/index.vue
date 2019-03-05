<template>
  <div>
    <basic-container>
      <page-header title="发布招聘" :replaceText="replaceText" :data="[10 ,5]"></page-header>
      <component @onEdit="handleEdit" @onGoBack="handleGoBack" :record="record" :is="currentComponet"></component>
    </basic-container>
  </div>
</template>
<script>
import PageHeader from '@/components/Page/Header'
import List from './Page/List'
import Edit from './Page/Edit'

export default {
  name: 'TableListWrapper',
  components: { PageHeader, List, Edit },
  data () {
    return {
      replaceText: (data) => `（本周新增${data[0]}条招聘信息，收到${data[1]}份简历）`,
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
