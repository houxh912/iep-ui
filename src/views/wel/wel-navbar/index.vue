<template>
  <div class="nav">
    <div class="left">
      <div class="navbar">
        <div class="inline" :class="classIndex==index?'active':''" v-for="(item,index) in navList" :key="index" @click="handelSelect(index)">{{item.name}}</div>
        <!-- <transition name="fade"> -->
        <el-input calss="input" size="mini" v-model="inputValue" v-if="activeInput"></el-input>
        <!-- </transition> -->
        <div class="search" @click="search"><i class="el-icon-search"></i></div>
      </div>
    </div>
    <div class="right">
      <div class="item">
        <span class="message"><i class="el-icon-star-off"></i></span>
        <span class="dot dot1" v-if="showDot1"></span>
      </div>
      <div class="item">
        <span class="message bell"><i class="el-icon-bell"></i></span>
        <span class="dot dot2" v-if="showDot2"></span>

      </div>
      <div class="item">
        <span class="message"><i class="el-icon-message"></i></span>
        <span class="dot  dot3" v-if="showDot3"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '',
      classIndex: 1,
      inputValue: '',
      activeInput: false,
      showDot1: true,
      showDot2: true,
      showDot3: true,
      navList: [{ name: '首页' }, { name: '国脉人' }, { name: '要闻' }, { name: '资源' }, { name: '数据' }, { name: '财富' }, { name: '学院' }],
    }
  },
  methods: {
    handelSelect (index) {
      this.classIndex = index
    },
    search () {
      this.activeInput = true
      console.log(this.activeInput)
    },
  },
}
</script>

<style lang="scss" scoped>
.left {
  height: 100%;
  display: inline-block;
}
.right {
  display: flex;
  align-items: center;
  height: 100%;
  float: right;
  .item {
    display: inline-block;
    padding: 0 10px;
    font-size: 20px;
    position: relative;
    .dot {
      width: 6px;
      height: 6px;
      border-radius: 12px;
      position: absolute;
      top: 2px;
      right: 0;
    }
    .dot1 {
      background: #bf051a;
    }
    .dot2 {
      background: #ff9d4c;
    }
    .dot3 {
      background: #ffc34a;
    }
  }
}
.nav {
  height: 100%;
  font-size: 16px;
  color: #444;
  .navbar {
    height: 100%;
    width: auto;
    display: flex;
    align-items: center;
  }
  .inline {
    display: inline-block;
    margin: 0 5px;
    padding: 3px 15px;
    border-radius: 15px;
    cursor: pointer;
    &:hover {
      color: #cb3737;
    }
  }

  .search {
    display: inline-block;
    padding: 0 15px;
    color: #444;
  }
  .el-input {
    width: 180px;
    padding: 0 15px;
    transition: all 2s;
  }
  .el-icon-search {
    font-size: 20px;
  }
  .active {
    background: #f0f0f0;
  }
}
</style>
