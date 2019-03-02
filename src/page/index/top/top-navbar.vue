<template>
  <div class="nav">
    <div class="navbar">
      <div class="navItem" v-if="showItem">
        <div class="inline" :class="classIndex==index?'active':''" v-for="(item,index) in navList" :key="index" @click="handelSelect(index)">{{item.name}}</div>
      </div>
      <div class="showItem" @click="showItem=!showItem"><i class="el-icon-tickets"></i></div>
      <div class="searchBar">
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
      timer: null,
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
    this.$nextTick(() => {
      if (this.screenWidth >= 1270) {
        this.showItem = true
        this.$store.commit('SHOW')
      }
      if (1025 < this.screenWidth && this.screenWidth < 1270) {
        this.showItem = true
        this.$store.commit('RESPONSE')
      }
      if (this.screenWidth <= 1025) {
        this.$store.commit('HIDE')
        this.showItem = false
      }
    })
  },
  mounted () {
    const that = this
    window.addEventListener('resize', function () {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      })()
    })
  },
  watch: {
    screenWidth (val) {
      if (this.screenWidth >= 1270) {
        this.showItem = true
        this.$store.commit('SHOW')
      }
      if (1025 < this.screenWidth && this.screenWidth < 1270) {
        this.showItem = true
        this.$store.commit('RESPONSE')
      }
      if (this.screenWidth < 1025) {
        this.$store.commit('HIDE')
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
  width: 100%;
  height: 100%;
  font-size: 16px;
  color: #444;
  .navbar {
    height: 100%;
    width: 100%;
    position: relative;
    .navItem {
      height: 100%;
      display: flex;
      width: 100%;
      align-items: center;
      padding-right: 280px;
      box-sizing: border-box;
      text-align: center;
      div {
        flex-grow: 1;
      }
      .inline {
        display: inline-block;
        padding: 5px 0;
        margin: 0 15px;
        border-radius: 15px;
        cursor: pointer;
        &:hover {
          color: #cb3737;
        }
      }
    }
    .searchBar {
      height: 100%;
      width: 280px;
      display: flex;
      align-items: center;
      position: absolute;
      right: 0;
      top: 0;
    }
    .showItem {
      display: none;
    }

    .search {
      padding: 0 20px;
      color: #444;
    }
    .el-select {
      width: 180px !important;
      padding: 0 20px;
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
@media (min-width: 1024px) and (max-width: 1270px) {
  .nav {
    font-size: 14px;
    .navbar {
      .navItem {
        padding-right: 200px;
        .inline {
          margin: 0 5px;
        }
      }
      .searchBar {
        height: 100%;
        width: 200px;
        display: flex;
        align-items: center;
        position: absolute;
        right: 0;
        top: 0;
      }
      .el-select {
        width: 120px !important;
        padding: 0 10px;
      }
    }
  }
}
@media (min-width: 0px) and (max-width: 1023px) {
  .nav {
    padding: 0;
    .navbar {
      .showItem {
        display: inline-block;
        position: absolute;
        left: 0;
        width: 55px;
        height: 100%;
        background: #fafafa;
        text-align: center;
        line-height: 64px;
        font-size: 20px;
      }
      .navItem {
        position: absolute;
        width: 160px;
        height: auto;
        background: #fff;
        top: 64px;
        left: -48px;
        box-shadow: 0 0 10px #eee;
        padding: 5px 10px;
        border-radius: 5px;
        display: block;
        .inline {
          display: block;
          border-radius: 1px;
          margin: 5px 0;
          text-align: left;
          padding: 5px 10px;
          font-size: 14px;
        }
      }
      .searchBar {
        height: 100%;
        width: 280px;
        display: flex;
        align-items: center;
        position: relative;
        margin: 0 0 0 55px;
      }
      .el-select {
        width: 180px !important;
        padding: 0 10px;
        position: relative;
      }
    }
  }
}
</style>
