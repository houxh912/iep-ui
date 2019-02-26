<template>
  <div class="nav">
    <div class="left">
      <div class="navbar">
        <div class="navItem" v-if="showItem">
          <div class="inline" :class="classIndex==index?'active':''" v-for="(item,index) in navList" :key="index" @click="handelSelect(index)">{{item.name}}</div>
        </div>
        <div class="showItem" @click="showItem=!showItem"><i class="el-icon-tickets"></i></div>
        <div class="search" @click="search"><i class="el-icon-search"></i></div>
        <el-select v-model="value8" filterable size="mini">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
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
      showItem: false,
      // 节流，防抖变量
      timer:null,
      screenWidth: document.body.clientWidth,
      navList: [{ name: '首页' }, { name: '国脉人' }, { name: '要闻' }, { name: '资源' }, { name: '数据' }, { name: '财富' }, { name: '学院' }],
      options: [{
        value: '选项1',
        label: '国脉集团海洋集团1',
      }, {
        value: '选项2',
        label: '国脉集团海洋集团1',
      }, {
        value: '选项3',
        label: '国脉集团海洋集团1',
      }, {
        value: '选项4',
        label: '国脉集团海洋集团1',
      }, {
        value: '选项5',
        label: '国脉集团海洋集团1',
      }],
      value8: '国脉集团海洋集团1',
    }
  },
  methods: {
    handelSelect (index) {
      this.classIndex = index
    },
    search () {
    },
  },
  created () {
    this.$nextTick(()=>{
      if (this.screenWidth >= 769) {
        this.showItem = true
      } else { 
        this.showItem = false 
      }
    })
  },
  mounted () {
    const that = this
    window.addEventListener('resize', function () {
      return (() => {
        window.screenWidth= document.body.clientWidth
        that.screenWidth= window.screenWidth
      })()
    })
  },
  watch: {
    screenWidth (val) {
      if (this.screenWidth >= 769) {
        this.showItem = true
      } else { 
        this.showItem = false 
      }
      if (!this.timer) {
        this.screenWidth = val
        this.timer = true
        let that = this
        setTimeout(function () {
          that.timer = false
        }, 400)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.nav {
  height: 100%;
  font-size: 16px;
  color: #444;
  padding: 0 0 0 40px;
  .navbar {
    height: 100%;
    position: relative;
    display: flex;
    .showItem {
      width: 64px;
      height: 64px;
      background: #fafafa;
      position: absolute;
      top: -18px;
      left: 0;
      text-align: center;
      display: none;
      font-size: 20px;
      line-height: 64px;
    }
    .inline {
      display: inline-block;
      padding: 3px 15px;
      margin: 0 15px;
      border-radius: 15px;
      cursor: pointer;
      &:hover {
        color: #cb3737;
      }
    }
    .search {
      display: inline-block;
      padding: 0 20px;
      color: #444;
    }
    .el-select {
      width: 180px !important;
      padding: 0 20px;
      // position: absolute;
      // right: 0;
    }
    .left {
      height: 100%;
      display: inline-block;
      box-sizing: border-box;
    }
  }

  .el-icon-search {
    font-size: 20px;
  }
  .active {
    background: #f0f0f0;
  }
}
.el-scrollbar__wrap {
  overflow: auto !important;
}
@media screen and (max-width: 1026px) {
  .nav {
    font-size: 12px;
    .navbar {
      .navItem {
        display: block;
      }
      .inline {
        margin: 0;
        padding: 3px 15px;
      }
      .el-select {
        width: 120px !important;
        padding: 0 15px;
      }
    }
  }
}
@media screen and (max-width: 769px) {
  .nav {
    padding: 0;
    .navbar {
      display: inline-block;
      .showItem {
        display: inline-block;
      }
      .navItem {
        position: absolute;
        width: 160px;
        background: #fff;
        top: 47px;
        left: -48px;
        box-shadow: 0 0 10px #eee;
        padding: 10px;
        border-radius: 5px;
        .inline {
          display: block;
        }
      }
      .search {
        display: inline-block;
        margin-left: 64px;
        padding: 0 10px;
        color: #444;
      }
      .el-select {
        width: 180px !important;
        padding: 0 10px;
        position: relative;
      }
    }
    // .right {
    //   display: inline-block;
    // }
  }
}
</style>
