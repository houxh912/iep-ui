<template>
  <div class="person-right">
    <feelings :userId="userId"></feelings>
    <my-need></my-need>
    <rewards :userId="userId"></rewards>
    <person-mark :userId="userId"></person-mark>
    <relation :userId="userId" :similarUser="similarUser"></relation>
  </div>
</template>

<script>
import PersonMark from './PersonMark'
import MyNeed from './MyNeed'
import Feelings from './Feelings'
import Rewards from './Rewards'
import Relation from './Relation'
export default {
  components: {
    PersonMark, Feelings, Relation, Rewards, MyNeed,
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
