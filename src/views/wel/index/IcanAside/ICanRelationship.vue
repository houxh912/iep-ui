<template>
  <i-can-content class="my-content" title-name="我的关系">
    <div slot="stitle" class="stitle">找师傅</div>
    <div class="my-wrapper">
      <div class="title-con">
        <div class="title">我的师傅：</div>
        <span class="time">王某某/李某</span>
      </div>
      <div class="title-con">
        <div class="title">我的徒弟：</div>
        <span class="time">王某某/李某</span>
      </div>
      <div class="title-con">
        <div class="title">我的关注：</div>
        <span class="time">王某某/李某</span>
      </div>
      <slot></slot>
    </div>
  </i-can-content>
</template>
<script>
import ICanContent from './ICanContent'
export default {
  components: { ICanContent },
  data () {
    return {
    }
  },
  methods: {

  },
}
</script>
<style lang="scss" scoped>
.title-con {
  margin-bottom: 10px;
  &:nth-child(1) {
    margin-top: 15px;
  }
}
.stitle {
  font-size: 14px;
  color: #cb132d;
  cursor: pointer;
}
.title {
  font-size: 16px;
  color: #666;
  margin: 0 4px;
  line-height: 22px;
  margin-bottom: 5px;
}
.time {
  margin-left: 5px;
  font-size: 14px;
  color: #999;
}
.iconfont {
  margin-left: 5px;
  color: #999;
  cursor: pointer;
}
</style>
<style scoped>
.index-card >>> .el-card__header {
  padding: 18px 0 18px;
}
.index-card >>> .el-card__body {
  padding: 15px 0;
}
.el-card {
  padding: 0 15px !important;
}
</style>


