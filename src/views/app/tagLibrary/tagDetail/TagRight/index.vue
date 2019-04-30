<template>
  <div class="piece">
    <about-tags :form="form"></about-tags>
    <statistics :form="form"></statistics>
  </div>
</template>
<script>
import AboutTags from './AboutTags'
import Statistics from './Statistics'
export default {
  props: ['form'],
  components: {
    AboutTags,
    Statistics,
  },
}
</script>
<style lang="scss" scoped>
.piece {
  border-top: 1px solid #eee;
  grid-column-start: 3;
  grid-column-end: 4;
}
</style>
