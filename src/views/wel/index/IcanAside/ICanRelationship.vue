<template>
  <i-can-content class="my-content" title-name="我的关系">
    <div slot="stitle" class="stitle">找师父</div>
    <div class="my-wrapper">
      <div class="title-con">
        <div class="title">我的师傅：</div>
        <span class="time">{{relationList[0].map(m=>m.name).join('/')}}</span>
      </div>
      <div class="title-con">
        <div class="title">我的徒弟：</div>
        <span class="time">{{relationList[1].map(m=>m.name).join('/')}}</span>
      </div>
      <div class="title-con">
        <div class="title">我的关注：</div>
        <span class="time">{{relationList[2].map(m=>m.name).join('/')}}</span>
      </div>
      <slot></slot>
    </div>
  </i-can-content>
</template>
<script>
import { getUserRelationList } from '@/api/wel/et'
import ICanContent from './ICanContent'
export default {
  components: { ICanContent },
  data () {
    return {
      relationList: [
        [],
        [],
        [],
      ],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    async loadPage () {
      const { data } = await getUserRelationList()
      console.log(data.data)
      this.relationList = data.data
    },
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


