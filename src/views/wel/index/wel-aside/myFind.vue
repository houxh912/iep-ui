<template>
  <div class="find">
    <div class="title">
      <div class="inline">{{findList.title}}</div>
      <div class="more inline" @click="getMore">
        <span>更多</span>
        <span><i class="el-icon-d-arrow-right"></i></span>
      </div>
    </div>
    <div class="find-content">
      <div class="cursor" v-for="(item,index) in findList.details" :key="index" @click="hadelSelect(index)">
        <div class="icon"><i :class="item.icon"></i></div>
        <div class="subtitle">{{item.subtitle}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      findList: { title: '我要找', details: [{ icon: 'el-icon-picture-outline', subtitle: '方案' }, { icon: 'el-icon-share', subtitle: '模板' }, { icon: 'el-icon-rank', subtitle: '项目' }, { icon: 'el-icon-picture-outline', subtitle: '师傅' }] },
    }
  },
  methods: {
    getMore () {

    },
    hadelSelect (index) {
      console.log(index)
    },
  },
}
</script>
<style  lang="scss" scoped>
.find-content {
  content: "";
  clear: both;
  display: flex;
  > div {
    flex-grow: 1;
    text-align: center;
  }
  .icon {
    padding: 10px 0;
  }
}
.more {
  float: right;
  font-size: 12px;
  vertical-align: middle;
  cursor: pointer;
  color: #7e7e7e;
  &:hover {
    color: #cb132d;
  }
}
.inline {
  display: inline-block;
}
.title {
  padding: 10px 0;
  font-size: 16px;
  font-weight: 500;
}
.cursor {
  cursor: pointer;
}
</style>


