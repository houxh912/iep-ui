<template>
  <div class="index">
    <indexTpl :deptData="data"></indexTpl>
  </div>
</template>

<script>
import indexTpl from './index'
export default {
  data () {
    return {
      data: {
        name: '',
        id: '',
      },
    }
  },
  components: { indexTpl },
  created () {
    this.data = this.$route.query
  },
}
</script>

<style lang="scss" scoped>
.index {
  width: 1200px;
  padding: 30px 0;
  margin: auto;
}
</style>
