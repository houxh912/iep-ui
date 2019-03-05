<template>
  <div class="avue-sidebar" :style="{width: keyCollapse ? '' : '240px'}">
    <el-scrollbar style="height:100%">
      <main-item :mainMenu="mainMenu" :collapse="keyCollapse"></main-item>
      <el-menu unique-opened :default-active="nowTagValue" mode="vertical" :show-timeout="200" :collapse="keyCollapse">
        <sidebar-item :menu="mainMenu.children" :screen="screen" first :props="website.menu.props" :collapse="keyCollapse"></sidebar-item>
      </el-menu>
      <div class="sub-menu-wrapper" v-if="mainMenu.path === '/wel'">
        <el-menu default-active="-1" :collapse="keyCollapse">
          <el-menu-item :index="omenu.path" v-for="omenu in otherMenus" :key="omenu.path" @click="openModuleMenus(omenu)">
            <i :class="omenu.icon"></i>
            <span slot="title">{{omenu.label}}</span>
          </el-menu-item>
        </el-menu>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import MainItem from './MainItem'
import sidebarItem from './sidebarItem'
import displayMixins from '@/mixins/displayMixins'
export default {
  mixins: [displayMixins],
  name: 'Sidebar',
  components: { sidebarItem, MainItem },
  created () {
    this.$store.dispatch('GetMenu').then(data => {
      if (data.length === 0) return
      this.$router.$avueRouter.formatRoutes(data, true)
    })
  },
  computed: {
    ...mapGetters(['website', 'menu', 'mainMenu', 'otherMenus', 'menusMap', 'screen']),
    nowTagValue: function () {
      return this.$router.$avueRouter.getValue(this.$route)
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
    ...mapMutations({ setMainMenu: 'SET_MAINMENU', setOtherMenus: 'SET_OTHERMENUS', setmenusMap: 'SET_menusMap' }),
    openModuleMenus (menu) {
      function findMenuChidrenPath (cMenu) {
        if (cMenu.children.length) {
          return findMenuChidrenPath(cMenu.children[0])
        } else {
          return cMenu.path
        }
      }
      this.$router.push({
        path: findMenuChidrenPath(menu),
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.sub-menu-wrapper {
  border-top: 2px solid #eee;
  .sub-menu {
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    white-space: nowrap;
    list-style: none;
    background-color: #fafafa;
    color: #666;
    padding: 0 20px;
    cursor: pointer;
    & * {
      vertical-align: middle;
    }
    &:hover {
      background-color: #f9eae7;
      color: #fb4147;
    }
    i {
      margin-right: 5px;
    }
  }
}
</style>
