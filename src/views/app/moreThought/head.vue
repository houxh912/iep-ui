<template>
  <div class="head">
    <div class="title">早晚五分钟，为<span class="akey">智慧</span>加油</div>
    <search></search>
  </div>
</template>

<script>
import search from './search'

export default {
  components: { search },
}
</script>

<style lang="scss" scoped>
.head {
  background-color: #f8f8f8;
  text-align: center;
  padding: 30px 0 5px;
  .title {
    font-size: 24px;
    margin-bottom: 20px;
    .akey {
      color: #c74c50;
    }
  }
}
</style>
