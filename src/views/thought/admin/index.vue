<template>
  <basic-container>
    <iep-page-header title="说说管理"></iep-page-header>
    <iep-tabs v-model="tabName" :tab-list="tabList">
      <template v-if="tabName ==='subject'" v-slot:subject>
        <subject></subject>
      </template>
      <template v-if="tabName ==='thought'" v-slot:thought>
        <thought></thought>
      </template>
    </iep-tabs>
  </basic-container>
</template>

<script>
import subject from './subject/'
import thought from './thought/'
import { mapGetters } from 'vuex'

export default {
  name: 'datum',
  components: { subject, thought },
  computed: {
    ...mapGetters(['permissions']),
  },
  data () {
    return {
      tabName: 'thought',
      tabList: [
        {
          label: '说说管理',
          value: 'thought',
        }, {
          label: '话题管理',
          value: 'subject',
        },
      ],
    }
  },
  created () {
    
  },
}
</script>
