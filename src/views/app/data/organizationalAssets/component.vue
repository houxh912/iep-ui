<template>
  <div class="index">
    <indexTpl></indexTpl>
  </div>
</template>

<script>
import indexTpl from './index'
export default {
  components: { indexTpl },
}
</script>

<style lang="scss" scoped>
.index {
  width: 1200px;
  padding: 30px 0;
  margin: auto;
}
</style>
