<template>
  <div class="gov-person-content">
    <div class="top-content">
      <busines-system></busines-system>
    </div>
    <div class="block">
    </div>
    <div class="copies">
    </div>
    <div class="block">
    </div>
    <div class="copies copies2">
    </div>
  </div>
</template>
<script>
import BusinesSystem from './BusinesSystem'
export default {
  components: { BusinesSystem },
  data () {
    return {
    }
  },
}
</script>
<style lang="scss" scoped>
.gov-person-content {
  margin: 0 auto;
  width: 1200px;
  .top-content {
    display: grid;
    grid-auto-flow: row dense;
    grid-row-gap: 30px;
    grid-column-gap: 30px;
    grid-template-columns: minmax(100px, 5fr) minmax(100px, 2fr);
  }
  .block {
    margin-top: 30px;
    width: 100%;
  }
  .copies {
    display: grid;
    margin-top: 30px;
    grid-auto-flow: row dense;
    grid-row-gap: 30px;
    grid-column-gap: 30px;
    grid-template-columns: minmax(100px, 2fr) minmax(100px, 2fr) minmax(
        100px,
        2fr
      );
  }
  .copies2 {
    margin-bottom: 60px;
  }
}
</style>

