<template>
  <div class="nav">
    <div class="navbar">
      <el-menu :default-active="activeIndex" mode="horizontal">
        <el-menu-item index="1" disabled>首页</el-menu-item>
        <el-menu-item index="2">国脉人</el-menu-item>
        <el-menu-item index="3">要闻</el-menu-item>
        <el-menu-item index="4">资源</el-menu-item>
        <el-menu-item index="5">数据</el-menu-item>
        <el-menu-item index="6">财富</el-menu-item>
        <el-menu-item index="7">学院</el-menu-item>
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
export default {
  data () {
    return {
      classIndex: 1,
      activeIndex: '1',
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
}
</style>
