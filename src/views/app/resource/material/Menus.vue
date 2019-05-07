<template>
  <div class="menus">
    <a-menu @click="handleClick" :defaultSelectedKeys="['1']" :openKeys="openKeys" @openChange="onOpenChange" mode="inline">
      <a-sub-menu key="sub1" @titleClick="titleClick">
        <span slot="title"><span>规章制度{{data[0]}}</span></span>
        <a-menu-item key="1">集团管理制度</a-menu-item>
        <a-menu-item key="2">委员会管理制度</a-menu-item>
        <a-menu-item key="3">部门管理制度</a-menu-item>
        <a-menu-item key="4">内网管理制度</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2" @titleClick="titleClick">
        <span slot="title"><span>人力学习{{data[1]}}</span></span>
        <a-menu-item key="5">Option 5</a-menu-item>
        <a-menu-item key="6">Option 6</a-menu-item>
        <a-menu-item key="7">Option 7</a-menu-item>
        <a-menu-item key="8">Option 8</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub3">
        <span slot="title"><span>市场项目{{data[2]}}</span></span>
        <a-menu-item key="9">Option 9</a-menu-item>
        <a-menu-item key="10">Option 10</a-menu-item>
        <a-menu-item key="11">Option 11</a-menu-item>
        <a-menu-item key="12">Option 12</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub4">
        <span slot="title"><span>产品与技术{{data[3]}}</span></span>
      </a-sub-menu>
      <a-sub-menu key="sub5">
        <span slot="title"><span>品牌形象{{data[4]}}</span></span>
      </a-sub-menu>
      <a-sub-menu key="sub6">
        <span slot="title"><span>平台材料{{data[5]}}</span></span>
      </a-sub-menu>
      <a-sub-menu key="sub7">
        <span slot="title"><span>智库研究{{data[6]}}</span></span>
      </a-sub-menu>
      <a-sub-menu key="sub8">
        <span slot="title"><span>财务投资{{data[7]}}</span></span>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
// import { getMenuList } from '@/api/app/mlms/index'

export default {
  data () {
    return {
      menuList: [],
      current: ['mail'],
      rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
      openKeys: ['sub1'],
    }
  },
  methods: {
    handleClick (e) {
      this.$emit('change_page', e.key)
    },
    titleClick (e) {
      console.log('titleClick', e)
    },
    onOpenChange (openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
  },
  watch: {
    openKeys (val) {
      console.log('openKeys', val)
    },
  },
}
</script>
<style lang="scss" scoped>
.menus {
  border-right: 1px solid #eee;
  height: 100%;
  .ant-menu-inline {
    border-right: 0;
  }
}
</style>
