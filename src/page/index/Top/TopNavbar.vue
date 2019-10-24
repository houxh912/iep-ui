<template>
  <div class="nav">
    <div class="navbar">
      <el-menu ref="navMenu" v-if="keyCollapse" class="menu-collapse" :default-active="activeIndex" mode="horizontal" menu-trigger="click" router>
        <el-submenu index="">
          <template slot="title">导航</template>
          <el-menu-item v-for="(item) in navList" :key="item.id" :index="item.id"><span class="sub-menu">{{item.name}}</span></el-menu-item>
        </el-submenu>
      </el-menu>
      <el-menu ref="navMenu" v-else :default-active="activeIndex" mode="horizontal" router>
        <el-menu-item v-for="(item) in navListFront" :key="item.id" :index="item.id" :class="item.show">
          <span class="sub-menu">{{item.name}}</span>
          <resource-con ref="resource" class="sub-nav-menu" v-if="item.show=='show'"></resource-con>
          <policy-con ref="policyCenter" class="sub-nav-menu" v-if="item.id =='/app/policyCenter'"></policy-con>
        </el-menu-item>
        <a-dropdown v-if="navListEnd.length">
          <a-icon class="ant-dropdown-link" type="ellipsis" />
          <a-menu slot="overlay">
            <a-menu-item v-for="item in navListEnd" :key="item.id" @click="$openPage(item.id)">
              <a href="javascript:;">{{item.name}}</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
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
import remove from 'lodash/remove'
import displayMixins from '@/mixins/displayMixins'
import ResourceCon from './ResourceCon'
import PolicyCon from './PolicyCon'
import { navList, navPathList } from '@/router/app/navList.js'
export default {
  components: { ResourceCon, PolicyCon },
  mixins: [displayMixins],
  data () {
    const navListRaw = [...navList]
    const nextList = remove(navListRaw, (v, i) => {
      return i < 7
    })
    return {
      isShow: false,
      navList,
      navListFront: nextList,
      navListEnd: navListRaw,
    }
  },
  // components: { TopSearch },
  computed: {
    activeIndex () {
      const matchedPath = this.$route.matched[1].path
      if (navPathList.includes(matchedPath)) {
        return matchedPath
      }
      return ''
    },
    keyCollapse () {
      if (this.isDesktop()) {
        return false
      } else {
        return true
      }
    },
  },
  methods: {
    handleInput () {
      this.isShow = !this.isShow
    },
    menuItemEnter () {
      this.$nextTick(() => {
        this.$refs['resource'][0].getCount()
      })
    },
  },
  mounted () {
    if (!this.keyCollapse) {
      this.menuItemEnter()
    }
  },
  watch: {
    'activeIndex': function (n) {
      this.$refs['navMenu'].activeIndex = n
    },
  },
}
</script>
<style lang="scss" scoped>
.ant-dropdown-link {
  display: inline-flex;
  width: 30px;
  height: 60px;
  margin-left: 10px;
  padding: 5px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
}
</style>

<style lang="scss" scoped>
.sub-nav-menu {
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 0;
  overflow: hidden;
  left: 0;
  top: 60px;
  background: rgba(252, 252, 252, 0.99);
  box-shadow: 1px 1px 3px #ccc;
  box-sizing: border-box;
  transition: all 0.5s;
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
      color: #444;
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
        padding: 4px 10px;
        transition: all 0.5s;
        font-size: 16px;
        .nav-bar {
          display: flex;
          margin: 0 20px;
          transition: all 0.5s;
          justify-content: center;
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
        transition: all 0.5s;
      }
      .btn-search {
        margin-left: 10px;
        font-size: 20px;
        line-height: 60px;
        cursor: pointer;
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
.show {
  &:hover .sub-nav-menu {
    height: 132px;
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
