<template>
  <div class="library">
    <library ref="library" @load-page="loadPage" :dataList="dataList" :params="params"></library>
  </div>
</template>

<script>
import library from '../library/'
export default {
  components: { library },
  data () {
    return {
      listList: [],
      params: {
        current: 1,
      },
      dataList: [],
    }
  },
  beforeRouteUpdate (to, from, next) {
    next()
  },
  methods: {
    loadPage () {},
  },
  created () {
    
  },
}
</script>
<style lang="scss" scoped>
.library {
  padding: 0 20px;
  border-right: 1px solid #ebeef5;
}
</style>
