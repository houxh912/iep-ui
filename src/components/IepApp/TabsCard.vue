<template>
  <el-card class="index-card" shadow="never">
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
<style scoped>
.el-card >>> .el-card__body {
  position: relative;
  padding: 0;
}
.btn {
  position: absolute;
  right: 20px;
  top: 33px;
  padding: 5px 0;
  color: #999;
}
</style>

