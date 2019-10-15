<template>
  <el-aside v-show="asideDisplay" :width="asideWidth">
    <div class="avue-sidebar" :style="{width: asideWidth}">
      <main-item :mainMenu="mainMenu" :collapse="keyCollapse"></main-item>
      <el-scrollbar style="height:calc(100vh - 190px);" native>
        <sidebar-item :menu="mainMenu.children" :screen="screen" first :props="website.menu.props" :collapse="keyCollapse"></sidebar-item>
        <div class="sub-menu-wrapper" v-if="mainMenu.path === '/wel'">
          <el-menu default-active="-1" :collapse="keyCollapse">
            <el-menu-item :index="omenu.path" v-for="omenu in otherMenus" :key="omenu.path" @click="openModuleMenus(omenu)" :disabled="!!omenu.isDisable">
              <i :class="omenu.icon"></i>
              <span slot="title">{{omenu.label}}</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-scrollbar>
      <el-menu class="fold-menu" :collapse="keyCollapse">
        <el-menu-item @click="changeCollapse()">
          <i :class="`${keyCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'}`"></i>
          <span slot="title">{{keyCollapse ? '展开':'收起'}}</span>
        </el-menu-item>
      </el-menu>
    </div>
  </el-aside>
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
  data () {
    return {
      matualCollapse: false,
    }
  },
  computed: {
    ...mapGetters(['website', 'menu', 'mainMenu', 'otherMenus', 'menusMap', 'screen']),
    keyCollapse () {
      const deskTop = !this.isDesktop()
      if (this.matualCollapse) {
        return !deskTop
      } else {
        return deskTop
      }
    },
    asideWidth () {
      if (!this.keyCollapse) {
        return '220px'
      } else {
        return '64px'
      }
    },
    asideDisplay () {
      if (this.$route.matched[0].path === '/app') {
        return false
      }
      return true
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
    changeCollapse () {
      this.matualCollapse = !this.matualCollapse
    },
  },
}
</script>
<style lang="scss" scoped>
.fold-menu {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.12);
}
.el-aside {
  margin: 20px 0 20px 20px;
  border-radius: 5px;
  overflow: hidden;
  background-color: #fafafa;
  border: 1px solid #e5e5e5;
}
.sub-menu-wrapper {
  border-top: 1px solid #eee;
  .el-menu-item {
    margin-left: 0 !important;
    height: 36px;
    line-height: 36px;
    border-left: 3px solid #fafafa;
    &:hover,
    &:focus {
      border-color: $--menu-color-primary;
      background: $--menu-color-second;
      color: $--menu-color-primary;
    }
  }
  .sub-menu {
    font-size: 14px;
    height: 36px;
    line-height: 36px;
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
      background-color: $--menu-color-second;
      color: $--menu-color-font;
    }
    i {
      margin-right: 5px;
    }
  }
}
.el-menu {
  background-color: #fafafa;
}
.avue-sidebar ::v-deep .el-scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
}
.avue-sidebar ::v-deep .el-submenu .el-submenu__title {
  border-left: 3px solid #fafafa;
}
.avue-sidebar ::v-deep .el-submenu .el-submenu__title:focus,
.avue-sidebar
  ::v-deep
  .el-menu--collapse
  .el-submenu.is-active
  .el-submenu__title,
.avue-sidebar ::v-deep .el-submenu .el-submenu__title:hover {
  margin-left: 0 !important;
  // border-color: $--menu-color-primary;
  background-color: $--menu-color-second;
  color: $--menu-color-primary;
}
.avue-sidebar ::v-deep .el-submenu .el-submenu__title,
.avue-sidebar ::v-deep .el-menu-item {
  height: 36px;
  line-height: 36px;
  color: #444;
}
.avue-sidebar ::v-deep .el-menu-item i,
.avue-sidebar ::v-deep .el-submenu__title i {
  color: #666;
}
.avue-sidebar ::v-deep .el-menu {
  border-right: none;
}
</style>
