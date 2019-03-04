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
      <div class="searchBar">
        <el-select v-model="value8" filterable size="mini">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
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
  computed: {
    keyCollapse () {
      if (this.isDesktop()) {
        return false
      } else {
        return true
      }
    },
  },
  methods: {
    handelSelect (index) {
      this.classIndex = index
    },
    search () {
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
