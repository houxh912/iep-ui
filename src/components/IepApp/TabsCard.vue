<template>
  <el-card class="index-card" shadow="never">
    <slot name="left"></slot>
    <el-button class="btn" type="text" v-if="isMore" @click="getMore">更多></el-button>
    <slot></slot>
  </el-card>
</template>
<script>
export default {
  name: 'IepAppTabsCard',
  props: {
    isMore: {
      type: Boolean,
      default: false,
    },
    linkName: {
      type: String,
      default: '/app/index',
    },
  },
  data () {
    return {
    }
  },
  methods: {
    getMore () {
      this.$router.push({
        path: this.linkName,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.el-card ::v-deep .el-card__body {
  position: relative;
  padding: 0;
}
.btn {
  position: absolute;
  top: 0px;
  right: 5px;
  line-height: 59px;
  padding: 0;
  color: #999;
  z-index: 3;
  transition: all 0.5s;
}
.btn:hover {
  color: $--menu-color-primary;
}
.index-card ::v-deep .el-tabs__nav {
  line-height: 59px;
}
.index-card ::v-deep .el-tabs__item {
  bottom: 0;
  font-size: 18px;
}
.index-card ::v-deep .el-card__body {
  padding: 0 0 15px;
}
.el-card {
  padding: 0 15px;
}
</style>
