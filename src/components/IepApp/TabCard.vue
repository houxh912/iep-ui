<template>
  <el-card class="index-card" shadow="never">
    <div slot="header" class="clearfix">
      <span class="title">{{title}}<span class="datas">{{data}}</span></span>
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
    data: {
      type: String,
      default: '',
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
.datas {
  font-size: 16px;
  color: #999;
}
</style>
<style scoped>
.iep-tabs >>> .el-tabs__nav {
  line-height: 53px;
}
.iep-tabs >>> .el-tabs__item {
  font-size: 18px;
}
</style>


