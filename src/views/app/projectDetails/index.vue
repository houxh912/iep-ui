<template>
  <div class="project-details">
    <left></left>
    <right></right>
  </div>
</template>
<script>
import Left from './Left'
import Right from './Right'
export default {
  components: { Left, Right },
  data () {
    return {
    }
  },
  created () {

  },
}
</script>
<style lang="scss" scoped>
.project-details {
  width: 1200px;
  margin: 0 auto 20px;
  border-top: 1px solid #eee;
  display: grid;
  grid-column-gap: 30px;
  grid-auto-flow: row dense;
  grid-template-columns: minmax(100px, 9000px) minmax(100px, 300px);
}
</style>
<style scoped>
</style>
