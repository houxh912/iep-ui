<template>
  <el-aside v-show="asideDisplay" :width="asideWidth">
    <div class="avue-sidebar" :style="{width: asideWidth}">
      <main-item :mainMenu="mainMenu" :collapse="keyCollapse"></main-item>
      <el-scrollbar ref="elscrollbar" :style="`height:calc(100vh - ${asideHeight});`" native>
        <div ref="wrap">
          <sidebar-item :menu="mainMenu.children" :screen="screen" first :props="website.menu.props" :collapse="keyCollapse"></sidebar-item>
          <div class="sub-menu-wrapper">
            <el-menu default-active="-1" :collapse="keyCollapse" background-color="#fff" text-color="#666" active-text-color="#e05255">
              <el-menu-item :index="omenu.path" v-for="omenu in otherMenus" :key="omenu.path" @click="openModuleMenus(omenu)" :disabled="!!omenu.isDisable">
                <i :class="omenu.icon"></i>
                <span slot="title">{{omenu.label}}</span>
              </el-menu-item>
            </el-menu>
          </div>
        </div>
      </el-scrollbar>
      <el-menu class="fold-menu" :collapse="keyCollapse" background-color="#fff" text-color="#666" active-text-color="#e05255">
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
        return '160px'
      } else {
        return '64px'
      }
    },
    asideHeight () {
      if (!this.keyCollapse) {
        return '208px'
      } else {
        return '257px'
      }
    },
    asideDisplay () {
      if (this.$route.matched[0].path === '/app') {
        return false
      }
      return true
    },
  },
  mounted () {
    this.init()
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
    init () {
      // 监听调转路由时EventBus操作
      this.$eventBus.$on('SET_SCROLLTOTOP', () => {
        this.$nextTick(() => {
          this.$refs['elscrollbar'].$refs['wrap'].scrollTop = 0
        })
      })
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
  border: 1px solid #e5e5e5;
}
.sub-menu-wrapper {
  border-top: 1px solid #eee;
  .el-menu-item {
    margin-left: 0 !important;
  }
  .sub-menu {
    padding-left: 20px;
    white-space: nowrap;
    list-style: none;
    padding: 0 20px;
    cursor: pointer;
    & * {
      vertical-align: middle;
    }
    i {
      margin-right: 5px;
    }
  }
}
.el-menu {
  background-color: #fff;
}
.avue-sidebar ::v-deep .el-scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
}
.avue-sidebar ::v-deep .el-menu {
  border-right: none;
}
</style>
