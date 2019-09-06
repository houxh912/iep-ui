<template>
  <div class="right">
    <subjectTpl class="subject" ref="subject"></subjectTpl>
    <mostTpl class="most" ref="most"></mostTpl>
    <praiseTpl class="praise" ref="praise"></praiseTpl>
    <commentTpl class="praise" ref="commentTpl"></commentTpl>
  </div>
</template>

<script>
import mostTpl from './Most'
import praiseTpl from './praise'
import subjectTpl from './subject'
import commentTpl from './comment'
export default {
  components: { mostTpl, praiseTpl, subjectTpl, commentTpl },
  methods: {
    loadData () {
      this.$refs['most'].loadData()
      this.$refs['praise'].loadData()
      this.$refs['subject'].loadData()
    },
  },
}
</script>

<style lang="scss" scoped>
.most, .praise, .subject {
  margin-bottom: 30px;
}
</style>
