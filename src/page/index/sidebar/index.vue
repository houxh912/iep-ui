<template>
  <div class="avue-sidebar">
    <el-scrollbar style="height:100%">
      <main-item :mainMenu="mainMenu"></main-item>
      <el-menu unique-opened :default-active="nowTagValue" mode="vertical" :show-timeout="200" :collapse="keyCollapse">
        <sidebar-item :menu="menu" :screen="screen" first :props="website.menu.props" :collapse="keyCollapse"></sidebar-item>
      </el-menu>
      <div class="sub-menu-wrapper" v-if="mainMenu.path === '/wel'">
        <li class="sub-menu" v-for="omenu in otherMenus" :key="omenu.path" @click="openModuleMenus(omenu)">
          <i :class="omenu.icon"></i>
          <span>{{omenu.label}}</span>
        </li>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import logo from '../logo'
import sidebarItem from './sidebarItem'
export default {
  name: 'Sidebar',
  components: { sidebarItem },
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
    ...mapGetters(['website', 'menu', 'tag', 'keyCollapse', 'screen']),
    nowTagValue: function () {
      return this.$router.$avueRouter.getValue(this.$route)
    },
  },
  mounted () { },
  methods: {},
}
</script>
<style lang="scss" scoped>
.avue-sidebar {
  width: 240px;
}
@media (min-width: 769px) and (max-width: 1026px) {
  .avue-sidebar {
    width: 150px;
  }
}
@media (min-width: 0px) and (max-width: 769px) {
  .avue-sidebar {
    width: 150px;
  }
}
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
    color: #303133;
    padding: 0 20px;
    cursor: pointer;
    & * {
      vertical-align: middle;
    }
    i {
      color: #666;
      margin-right: 5px;
    }
    span {
      color: #666;
    }
  }
}
</style>
