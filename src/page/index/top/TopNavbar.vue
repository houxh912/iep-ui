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
        <el-menu-item v-for="(item) in navList" :key="item.id" :index="item.id"><span class="sub-menu" :class="item.show">{{item.name}}<resource-con class="sub-nav-menu"></resource-con></span></el-menu-item>
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
import ResourceCon from './ResourceCon'
export default {
  components: { ResourceCon },
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
          id: '/app/resource',
          name: '资源',
          show: 'show',
        }, {
          id: '/app/products',
          name: '产品',
        }, {
          id: '/app/project',
          name: '项目',
        }, {
          id: '/app/college',
          name: '学堂',
        }, {
          id: '/app/brand',
          name: '品牌',
        }, {
          //   id: '/app/news',
          //   name: '要闻',
          // }, {
          id: '/app/data',
          name: '数据',
          // }, {
          //   id: '/app/wealth',
          //   name: '财富',
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
@-webkit-keyframes fadeIn {
  0% {
    top: 100px;
    opacity: 0; /*初始状态 透明度为0*/
  }
  20% {
    top: 90px;
    opacity: 0.2;
  }
  50% {
    top: 80px;
    opacity: 0.5; /*中间状态 透明度为0.5*/
  }
  70% {
    top: 70px;
    opacity: 0.7;
  }
  100% {
    top: 48px;
    opacity: 1; /*结尾状态 透明度为1*/
  }
}
.sub-nav-menu {
  position: absolute;
  z-index: 100;
  width: 100%;
  left: 0;
  top: 100px;
  width: 100%;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 1px 1px 3px #ccc;
  box-sizing: border-box;
  display: none;
}
.nav {
  width: 100%;
  height: 100%;
  font-size: 16px;
  color: #444;
  .navbar {
    display: flex;
    height: 60px;
    .el-menu,
    .el-menu-item {
      position: inherit;
    }
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
      .sub-menu.show {
        .sub-nav-menu {
          opacity: 0;
          transition: all 0.5s;
        }
        &:hover .sub-nav-menu {
          display: block;
          opacity: 1;
          top: 48px;
          animation-name: fadeIn; /*动画名称*/
          animation-duration: 0.5s; /*动画持续时间*/
          animation-iteration-count: 1; /*动画次数*/
          animation-delay: 0s; /*延迟时间*/
        }
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
