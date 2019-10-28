<template>
  <el-menu class="menu-wrapper" unique-opened :default-active="nowTagValue" mode="vertical" :show-timeout="200" :collapse="collapse" background-color="#fff" text-color="#666" active-text-color="#e05255">
    <template v-for="item in menu">
      <el-menu-item :disabled="!!item.isDisable" v-if="validatenull(item[childrenKey]) && vaildRoles(item)" :index="'' + item[pathKey]" @click="open(item)" :key="item[labelKey]" :class="{ 'is-active': vaildAvtive(item) }">
        <i :class="item[iconKey]"></i>
        <span slot="title" :alt="item[pathKey]">{{ item[labelKey] }}</span>
      </el-menu-item>
      <el-submenu :disabled="!!item.isDisable" v-else-if="!validatenull(item[childrenKey]) && vaildRoles(item)" :index="item[pathKey]" :key="item[labelKey]">
        <template slot="title">
          <i :class="item[iconKey]"></i>
          <span slot="title" :class="{ 'el-menu--display': collapse && first }">{{ item[labelKey] }}</span>
        </template>
        <template v-for="(child, cindex) in item[childrenKey]">
          <el-menu-item :disabled="!!child.isDisable" :index="'' + child[pathKey]" @click="open(child)" :class="{ 'is-active': vaildAvtive(child) }" v-if="validatenull(child[childrenKey])" :key="child[labelKey]">
            <i :class="child[iconKey]"></i>
            <span slot="title">{{ child[labelKey] }}</span>
          </el-menu-item>
          <sidebar-item v-else :menu="[child]" :key="cindex" :props="props" :screen="screen" :collapse="collapse"></sidebar-item>
        </template>
      </el-submenu>
    </template>
  </el-menu>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import { validatenull } from '@/util/validate'
export default {
  name: 'SidebarItem',
  props: {
    menu: {
      type: Array,
    },
    screen: {
      type: Number,
    },
    first: {
      type: Boolean,
      default: false,
    },
    props: {
      type: Object,
      default: () => {
        return {}
      },
    },
    collapse: {
      type: Boolean,
    },
  },
  computed: {
    ...mapGetters(['roles']),
    labelKey () {
      return this.props.label
    },
    pathKey () {
      return this.props.path
    },
    iconKey () {
      return this.props.icon
    },
    childrenKey () {
      return this.props.children
    },
    nowTagValue () {
      return this.$router.$avueRouter.getValue(this.$route)
    },
  },
  methods: {
    ...mapMutations({ setCollapse: 'SET_COLLAPSE' }),
    vaildAvtive (item) {
      const groupFlag = (item['group'] || []).some(ele =>
        this.$route.path.includes(ele),
      )
      return this.nowTagValue === item[this.pathKey] || groupFlag
    },
    vaildRoles (item) {
      item.meta = item.meta || {}
      return item.meta.roles ? item.meta.roles.includes(this.roles) : true
    },
    validatenull (val) {
      return validatenull(val)
    },
    open (item) {
      if (this.screen <= 1) this.setCollapse()
      this.$router.$avueRouter.group = item.group
      this.$router.push({
        path: this.$router.$avueRouter.getPath({
          name: item[this.labelKey],
          src: item[this.pathKey],
        }),
        query: item.query,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.menu-wrapper {
  .el-menu-item {
    margin-left: 0 !important;
  }
}
.menu-wrapper ::v-deep .el-menu {
  border-right: none;
}
</style>
