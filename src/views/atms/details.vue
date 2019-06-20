<template>
  <div class="details">
    <left></left>
    <right></right>
  </div>
</template>
<script>
import Left from './Left'
import Right from './Right'
export default {
  components: {
    Left,
    Right,
  },
}
</script>
<style lang="scss" scoped>
.details {
  display: grid;
  margin: 20px 0;
  grid-auto-flow: row dense;
  grid-row-gap: 25px;
  grid-column-gap: 25px;
  grid-template-columns: minmax(100px, 5fr) minmax(100px, 2fr);
}
</style>
