<template>
  <div class="nav">
    <div class="navbar">
      <el-menu v-if="keyCollapse" class="menu-collapse" :default-active="activeIndex" mode="horizontal" menu-trigger="click" router>
        <el-submenu index="">
          <template slot="title">导航</template>
          <el-menu-item v-for="(item) in navList" :key="item.id" :index="item.id"><span class="sub-menu">{{item.name}}</span></el-menu-item>
        </el-submenu>
      </el-menu>
      <el-menu v-else :default-active="activeIndex" mode="horizontal" router>
        <el-menu-item v-for="(item) in navList" :key="item.id" :index="item.id"><span class="sub-menu">{{item.name}}</span></el-menu-item>
      </el-menu>
      <!-- <div class="search-con">
        <top-search class="search-con-input" :style="{top: isTop}" :class="{inactive:!isShow }">
          <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
          <el-button type="primary" size="small" @click="handleInput">确定</el-button>
        </top-search>
        <i class="el-icon-search btn-search" @click="handleInput"></i>
      </div> -->
    </div>
  </div>
</template>

<script>
// import TopSearch from './TopSearch'
import displayMixins from '@/mixins/displayMixins'
export default {
  mixins: [displayMixins],
  data () {
    return {
      isShow: false,
      input: '',
      classIndex: 1,
      activeIndex: this.$route.fullPath,
      navList: [
        {
          id: '/app/index',
          name: '首页',
        }, {
          id: '/app/person',
          name: '国脉人',
        }, {
          id: '/app/news',
          name: '要闻',
        }, {
          id: '/app/resource',
          name: '资源',
        }, {
          id: '/app/data',
          name: '数据',
        }, {
          id: '/app/wealth',
          name: '财富',
        }, {
          id: '/app/college',
          name: '学院',
        },
      ],
    }
  },
  // components: { TopSearch },
  methods: {
    handleInput () {
      this.isShow = !this.isShow
    },
  },
  computed: {
    keyCollapse () {
      if (this.isDesktop()) {
        return false
      } else {
        return true
      }
    },
    // isTop () {
    //   if (this.isTablet()) {
    //     return '66px'
    //   }
    //   return this.isShow ? '66px' : '-66px'
    // },
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
    display: flex;
    height: 60px;
    .el-menu.el-menu--horizontal {
      border-bottom: none;
    }
    .el-menu--horizontal > .el-menu-item.is-active,
    .el-menu--horizontal > .el-menu-item:hover {
      border: 0;
      .sub-menu {
        border-radius: 20px;
        background-color: #eee;
      }
    }
    .el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
    .el-menu--horizontal .el-menu-item:not(.is-disabled):hover,
    .el-menu--horizontal > .el-menu-item {
      padding: 0 10px;
      border: 0;
      .sub-menu {
        padding: 4px 15px;
        -webkit-transition: all 0.5s;
        transition: all 0.5s;
        font-size: 16px;
      }
    }
    .el-select {
      line-height: 60px;
    }
    .search-con {
      position: relative;
      margin-left: 10px;
      .search-con-input {
        position: absolute;
        right: -150px;
        width: 300px;
        border-radius: 3px;
        background-color: #fff;
        box-shadow: 0px 0px 1px 2px #eee;
        -webkit-transition: all 0.5s;
        transition: all 0.5s;
      }
      .btn-search {
        margin-left: 10px;
        font-size: 20px;
        line-height: 60px;
        cursor: pointer;
        -webkit-transition: all 0.5s;
        transition: all 0.5s;
        &:hover,
        &:focus {
          color: #999;
        }
      }
    }
    .showItem {
      display: none;
    }

    .search {
      padding: 0 20px;
      color: #444;
    }
    .el-select {
      width: 260px !important;
      padding: 0 20px 0 30px;
    }
  }
}
</style>
<style lang="css" scoped>
.nav >>> .el-submenu.is-active .el-submenu__title {
  height: 59px;
  border: none;
}
.nav >>> .el-select .el-input__suffix {
  right: 15px;
}
.search-con >>> .el-input {
  padding: 10px;
  box-sizing: border-box;
}
.navbar >>> .el-range-editor.is-active .el-input__inner,
.navbar >>> .el-range-editor.is-active:hover .el-input__inner,
.navbar >>> .el-range-editor:focus .el-input__inner,
.navbar >>> .el-select .el-input.is-focus .el-input__inner,
.navbar >>> .el-select .el-input__inner:focus,
.navbar >>> .el-input__inner:hover,
.navbar >>> .el-input__inner:focus {
  border-color: #c0c4cc;
}
</style>
