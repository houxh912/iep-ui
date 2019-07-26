<template>
  <div class="most">
    <librarys-header @search_page="loadPage"></librarys-header>
    <librarys-content ref="content" @joinUpOne="joinUpTwo"></librarys-content>
  </div>
</template>
<script>
import LibrarysHeader from './LibrarysHeader'
import LibrarysContent from './LibrarysContent'
export default {
  components: { LibrarysHeader, LibrarysContent },
  data () {
    return {
    }
  },
  methods: {
    loadPage (val) {
      this.$refs['content'].searchData(val)
    },
    joinUpTwo (ids) {
      this.$emit('joinUpTwo', ids)
    },
  },
}
</script>
