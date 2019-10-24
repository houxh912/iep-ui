<template>
  <div class="ican-wrapper">
    <ican-content class="ican-content"></ican-content>
    <ican-aside class="ican-aside"></ican-aside>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import IcanAside from './IcanAside/index'
import IcanContent from './IcanContent/index'
export default {
  components: {
    IcanContent,
    IcanAside,
  },
  // TODO: 统一放在一处
  created () {
    if (this.noOrg) {
      this.$router.push({
        name: '选择组织',
      })
    }
  },
  computed: {
    ...mapGetters(['noOrg']),
  },
}
</script>
<style lang="scss" scoped>
.ican-wrapper {
  display: flex;
  .ican-content {
    width: calc(100% - 280px);
  }
  .ican-aside {
    width: 280px;
  }
}
</style>
