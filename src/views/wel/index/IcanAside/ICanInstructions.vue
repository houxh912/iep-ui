<template>
  <i-can-content class="my-content" title-name="领导批示">
    <div class="my-wrapper">
      <div class="title-con" v-for="(item,index) in tabList" :key="item+index">
        <span class="title">{{item.title}}</span>
        <span class="time">{{item.time}}</span>
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
      tabList: [
        { title: '111', time: '2018-10-20' },
        { title: '111', time: '2018-10-20' },
        { title: '111', time: '2018-10-20' },
      ],
    }
  },
  methods: {

  },
}
</script>
<style lang="scss" scoped>
.title-con {
  display: flex;
  line-height: 26px;
  justify-content: space-between;
  &:hover span {
    color: #cb132d;
    cursor: pointer;
  }
  &:nth-child(1) {
    margin-top: 15px;
  }
}
.title {
  flex: 2;
  font-size: 16px;
  color: #888;
  margin: 0 4px;
  height: 22px;
  line-height: 22px;
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


