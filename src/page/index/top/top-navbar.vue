<template>
  <div class="nav">
    <div class="navbar">
      <el-menu v-if="keyCollapse" :default-active="activeIndex" mode="horizontal" menu-trigger="click">
        <el-submenu index="">
          <template slot="title">DETAIL</template>
          <el-menu-item v-for="(item) in navList" :key="item.id" :index="item.id">{{item.name}}</el-menu-item>
        </el-submenu>
      </el-menu>
      <el-menu v-else :default-active="activeIndex" mode="horizontal">
        <el-menu-item v-for="(item) in navList" :key="item.id" :index="item.id">{{item.name}}</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import displayMixins from '@/mixins/displayMixins'
export default {
  mixins: [displayMixins],
  data () {
    return {
      classIndex: 1,
      activeIndex: '0',
      screenWidth: document.body.clientWidth,
      navList: [
        {
          id: '0',
          name: '首页',
        }, {
          id: '1',
          name: '国脉人',
        }, {
          id: '2',
          name: '要闻',
        }, {
          id: '3',
          name: '资源',
        }, {
          id: '4',
          name: '数据',
        }, {
          id: '5',
          name: '财富',
        }, {
          id: '6',
          name: '学院',
        },
      ],
    }
  },
  computed: {
    keyCollapse () {
      if (this.isDesktop()) {
        return false
      } else {
        return true
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
    display: flex;
    .searchBar {
      height: 100%;
      width: 100px;
      display: flex;
      align-items: center;
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
}
</style>
