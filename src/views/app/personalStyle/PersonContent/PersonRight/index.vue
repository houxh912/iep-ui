<template>
  <div class="person-right">
    <feelings :userId="userId"></feelings>
    <rewards :userId="userId"></rewards>
    <person-mark :userId="userId"></person-mark>
    <relation :userId="userId" :similarUser="similarUser"></relation>
  </div>
</template>

<script>
import PersonMark from './PersonMark'
import Feelings from './Feelings'
import Rewards from './Rewards'
import Relation from './Relation'
export default {
  components: {
    PersonMark, Feelings, Relation, Rewards,
  },
  props: {
    userId: {
      type: Number,
      default: 0,
    },
    similarUser: {
      type: Array,
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
