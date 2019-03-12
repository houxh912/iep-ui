<template>
  <div class="main-item-wrapper" @click="open">
    <el-tooltip v-if="collapse" class="item" effect="dark" content="个人赋能台" placement="right">
      <span><i :class="mainMenu.icon"></i></span>
    </el-tooltip>
    <div v-else>
      <span class="main-link">{{website.menu.firstMenu.name}}</span>
      <span v-if="isSub">-</span>
      <span v-if="isSub">{{mainMenu.label}}</span>
    </div>
  </div>
</template>
<script>
import website from '@/const/website'
export default {
  name: 'MainItem',
  props: {
    mainMenu: {
      type: Object,
      required: true,
      default: () => { },
    },
    collapse: {
      type: Boolean,
      required: true,
    },
  },
  data () {
    return {
      website,
    }
  },
  computed: {
    isSub () {
      if (this.mainMenu.path) {
        if (this.mainMenu.path === website.menu.firstMenu.modulePath) {
          return false
        }
      }
      return true
    },
  },
  methods: {
    open () {
      this.$router.push({
        path: website.menu.firstMenu.path,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.main-item-wrapper {
  cursor: pointer;
  font-size: 16px;
  text-align: left;
  padding: 20px 20px;
  border-bottom: 1px solid #eee;
  border-right: 1px solid #eee;
  color: #666;
  .main-link {
    &:hover {
      color: #333;
      border-bottom: 1px solid #666;
    }
  }
}
</style>
