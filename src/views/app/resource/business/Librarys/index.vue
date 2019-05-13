<template>
  <div class="most">
    <librarys-header :total="total" @load_page="getBusinessPage"></librarys-header>
    <librarys-content :list="list"></librarys-content>
  </div>
</template>
<script>
import LibrarysHeader from './LibrarysHeader'
import LibrarysContent from './LibrarysContent'
import { getBusinessPage } from '@/api/app/crms/'

export default {
  components: { LibrarysHeader, LibrarysContent },
  data () {
    return {
      total: 0,
      list: [],
    }
  },
  methods: {
    getBusinessPage (params = {}) {
      getBusinessPage(params).then(({data}) => {
        this.total = data.data.total
        this.list = data.data.records
      })
    },
  },
  created () {
    this.getBusinessPage()
  },
}
</script>
