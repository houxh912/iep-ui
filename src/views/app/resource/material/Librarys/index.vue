<template>
  <div class="most">
    <librarys-header @search_page="searchPage"></librarys-header>
    <librarys-content ref="content"></librarys-content>
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
      this.$refs['content'].loadPage(val)
    },
    searchPage (params) {
      this.$refs['content'].loadPage(params)
    },
  },
}
</script>
