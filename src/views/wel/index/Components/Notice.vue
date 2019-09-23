<template>
  <list-wrapper title="通知公告" :requestFunc="getNotice" @open="handleOpen">
  </list-wrapper>
</template>

<script>
import ListWrapper from './ListWrapper'
import { getNotice } from '@/api/wel/index'
export default {
  components: {
    ListWrapper,
  },
  data () {
    return {
      ListWrapper,
      getNotice,
    }
  },
  methods: {
    handleOpen (row) {
      this.$openPage(`/ims_spa/announcement_detail/${row.id}`)
    },
  },
}
</script>
