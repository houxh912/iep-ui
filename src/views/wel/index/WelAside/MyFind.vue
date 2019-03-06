<template>
  <div class="find">
    <!-- <span class="btn " @click="hideAside"><i class="el-icon-caret-right"></i></span> -->
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
      findList: { title: '我要找', details: [{ icon: 'icon-fangan', subtitle: '方案' }, { icon: 'icon-moban', subtitle: '模板' }, { icon: 'icon-xiangmu', subtitle: '项目' }, { icon: 'icon-shifu', subtitle: '师傅' }] },
    }
  },
  methods: {
    getMore () {

    },
    hadelSelect () {
      // console.log(index)
    },
    showAside () {
      // console.log(222)
      this.$store.commit('SHOWASIDE')
    },
  },
  computed: {

  },
}
</script>
<style  lang="scss" scoped>
.sssss {
  position: fixed;
  top: 100px;
  left: 500px;
  background: #7e7e7e;
  display: inline-block;
}
.find {
  box-sizing: border-box;
  position: relative;
  margin: 10px;
  border-bottom: 1px solid #ccc;
  .btn {
    position: absolute;
    display: inline-block;
    width: 25px;
    height: 30px;
    color: #bfbfbf;
    background: #fafafa;
    font-size: 20px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #eee;
    bottom: -15px;
    left: -10px;
    z-index: 999;
  }
}
.find-content {
  content: "";
  clear: both;
  display: flex;
  > div {
    flex-grow: 1;
    text-align: center;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
    &:hover {
      opacity: .6;
    }
  }
  .icon {
    padding: 10px 0;
    .icon-fangan {
      color: #5c79a5;
    }
    .icon-moban {
      color: #c78a53;
    }
    .icon-xiangmu {
      color: #47a1bb;
    }
    .icon-shifu {
      color: #cc8082;
    }
  }
}
.more {
  float: right;
  font-size: 12px;
  vertical-align: middle;
  cursor: pointer;
  color: #999;
  &:hover {
    color: #cb132d;
  }
}
.inline {
  display: inline-block;
}
.title {
  padding: 0 0 10px;
  font-size: 16px;
  font-weight: 500;
}
.cursor {
  cursor: pointer;
}
</style>


