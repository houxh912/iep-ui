<template>
  <el-card class="index-card" shadow="never">
    <div slot="header" class="clearfix">
      <span class="title">{{title}}</span>
      <el-button class="btn" type="text" v-if="isMore" @click="getMore">更多></el-button>
    </div>
    <slot></slot>
  </el-card>
</template>
<script>
export default {
  name: 'IepAppTabCard',
  props: {
    title: {
      type: String,
      default: '标题',
    },
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
.title {
  font-size: 18px;
  color: #303133;
}
.btn {
  float: right;
  padding: 5px 0;
  color: #999;
}
</style>

