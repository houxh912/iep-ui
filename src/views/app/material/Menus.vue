<template>
  <div class="menus">
    <a-menu @click="handleClick" :defaultSelectedKeys="['1']" :openKeys.sync="openKeys" mode="inline">
      <a-sub-menu v-for="(item, index) in menuList" :key="index" @titleClick="titleClick">
        <span slot="title"><span>{{item.levelName}}{{item.materialCount}}</span></span>
        <a-menu-item v-for="t in item.childrens" :key="t.id">{{t.levelName}}</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
import { getMenuList } from '@/api/app/mlms/index'

export default {
  data () {
    return {
      menuList: [],
      current: ['mail'],
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
    loadMenu () {
      getMenuList().then(({data}) => {
        this.menuList = data.data
      })
    },
  },
  created () {
    this.loadMenu()
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


