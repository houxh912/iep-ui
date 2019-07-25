<template>
  <div class="visiting">
    <vis-content></vis-content>
  </div>
</template>
<script>
import VisContent from './Content.vue'
export default {
  components: {
    VisContent,
  },
}
</script>
<style scoped lang='scss'>
.visiting {
  display: grid;
  grid-template-columns: 6fr 2fr;
  grid-auto-flow: row dense;
}
</style>
