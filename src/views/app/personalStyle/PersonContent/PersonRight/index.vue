<template>
  <div class="person-right">
    <feelings :userId="userId"></feelings>
    <person-mark :userId="userId"></person-mark>
    <relation :userId="userId"></relation>
  </div>
</template>

<script>
import PersonMark from './PersonMark'
import Feelings from './Feelings'
import Relation from './Relation'
export default {
  components: {
    PersonMark, Feelings, Relation,
  },
  props: {
    userId: {
      type: Number,
      default: 0,
    },
  },
  data () {
    return {
    }
  },
}
</script>
<style lang="scss" scoped>
</style>
