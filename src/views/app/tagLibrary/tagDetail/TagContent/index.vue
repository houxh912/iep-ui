<template>
  <div class="tag-content piece">
    <tag-desc :form="form"></tag-desc>
    <about-person :form="form"></about-person>
    <datas></datas>
  </div>
</template>
<script>
import TagDesc from './TagDesc'
import AboutPerson from './AboutPerson'
import Datas from './Datas'
export default {
  props: ['form'],
  components: {
    TagDesc,
    AboutPerson,
    Datas,
  },
}
</script>
<style lang="scss" scoped>
.tag-content {
  padding: 25px 30px 25px 0;
  border-right: 1px solid #eee;
  border-top: 1px solid #eee;
}
.piece {
  grid-column-start: 1;
  grid-column-end: 3;
}
</style>
