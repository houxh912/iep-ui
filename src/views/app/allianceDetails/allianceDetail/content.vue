<template>
  <div class="group">
    <group v-if="index == 1"></group>
    <culture v-if="index == 2"></culture>
  </div>
</template>

<script>
import group from './detail/group'
import culture from './detail/culture'

export default {
  components: { group, culture },
  props: {
    index: {
      type: String,
      default: '1',
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
