<template>
  <div class="introduction">
    <introduction-details :data="data"></introduction-details>
  </div>
</template>
<script>
import IntroductionDetails from './IntroductionDetails'
export default {
  props: {
    data: {
      type: Object,
    },
  },
  components: { IntroductionDetails },
}
</script>
<style lang="scss" scoped>
.introduction {
  margin: 0 20px;
}
</style>
