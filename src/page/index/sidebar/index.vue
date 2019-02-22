<template>
  <div class="avue-sidebar">
    <!-- <logo></logo> -->
    <el-scrollbar style="height:100%">
      <div v-if="validatenull(menu)" class="avue-sidebar--tip">
        没有发现菜单
      </div>
      <main-item :mainMenu="mainMenu"></main-item>
      <el-menu unique-opened :default-active="nowTagValue" mode="vertical" :show-timeout="200" :collapse="keyCollapse">
        <sidebar-item :menu="mainMenu.children" :screen="screen" first :props="website.menu.props" :collapse="keyCollapse"></sidebar-item>
      </el-menu>
      <div v-if="mainMenu.path === '/wel'">
        <div v-for="omenu in otherMenus" :key="omenu.path" @click="openModuleMenus(omenu)">{{omenu.label}}</div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import MainItem from './MainItem'
import sidebarItem from './sidebarItem'
export default {
  name: 'Sidebar',
  components: { sidebarItem, MainItem },
  data () {
    return {}
  },
  created () {
    this.$store.dispatch('GetMenu').then(data => {
      if (data.length === 0) return
      this.$router.$avueRouter.formatRoutes(data, true)
    })
  },
  computed: {
    ...mapGetters(['website', 'menu', 'mainMenu', 'otherMenus', 'otherMenusMap', 'keyCollapse', 'screen']),
    nowTagValue: function () {
      return this.$router.$avueRouter.getValue(this.$route)
    },
  },
  mounted () { },
  methods: {
    ...mapMutations({ setMainMenu: 'SET_MAINMENU', setOtherMenus: 'SET_OTHERMENUS', setOtherMenusMap: 'SET_OTHERMENUSMAP' }),
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
      // let Menus = [this.mainMenu, ...this.otherMenus]
      // Menus = orderBy(Menus, ['sort'], ['asc'])
      // const otherMenus = Menus.filter(m => m.path !== menu.path)
      // const otherMenusMap = keyBy(Menus, 'path')
      // this.setMainMenu(menu)
      // this.setOtherMenus(otherMenus)
      // this.setOtherMenusMap(otherMenusMap)
    },
  },
}
</script>
<style lang="scss" scoped>
@media (min-width: 1025px) {
  .avue-sidebar {
    width: 240px;
  }
}
@media (min-width: 0px) and (max-width: 1025px) {
  .avue-sidebar {
    width: 150px;
  }
}
</style>
