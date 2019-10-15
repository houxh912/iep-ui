<template>
  <el-tooltip class="item" effect="dark" content="即时消息" placement="bottom">
    <el-badge :hidden="!imUnreadTotal" :max="99" :value="imUnreadTotal || 0" class="item">
      <iep-button @click="chatShow()"><i class="iconfont icon-liaotian"></i></iep-button>
    </el-badge>
  </el-tooltip>
</template>
<script>
import { mapState } from 'vuex'
export default {
  methods: {
    chatShow () {
      this.$eventBus.$emit('chatShow')
    },
  },
  computed: {
    ...mapState({
      imUnreadTotal: state => state.im.unreadTotal,
    }),
  },
}
</script>

<style lang="css" scoped>
.item >>> .el-badge__content.is-fixed {
  z-index: 1;
  top: 20px;
  right: 22px;
}
</style>
<style lang="scss" scoped>
button {
  border: 0;
  height: 60px;
  i {
    font-size: 20px;
  }
  &:focus,
  &:hover {
    background-color: #eee;
    color: #333;
  }
}
</style>
