<template>
  <div class="right">
    <mostTpl class="most"></mostTpl>
    <praiseTpl class="praise"></praiseTpl>
    <subjectTpl class="subject"></subjectTpl>
  </div>
</template>

<script>
import mostTpl from './Most'
import praiseTpl from './praise'
import subjectTpl from './subject'
export default {
  components: { mostTpl, praiseTpl, subjectTpl },
}
</script>

<style lang="scss" scoped>
.most, .praise, .subject {
  margin-bottom: 30px;
}
</style>
