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
        { title: '关于加快熟悉全国数字政府建设工作', time: '01-30' },
        { title: '推荐一份“数字政府主题报告VIP”', time: '01-28' },
        { title: '认识大数据，了解大数据发展', time: '01-27' },
        { title: '关于加快学习数字政府白皮书。专家...', time: '01-20' },
        { title: '关于20190126微信优秀项目分享...', time: '01-15' },
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
  font-size: 14px;
  color: #666;
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


