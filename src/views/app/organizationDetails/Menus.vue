<template>
  <div class="menus">
    <a-menu @click="handleClick" mode="inline" v-model="current">
      <a-menu-item v-for="(item) in data" :key="item.levelName">
        <router-link :to="pathObject(item.path)">{{item.levelName}}</router-link>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>

export default {
  data () {
    return {
      current: ['组织介绍'],
      data: [
        { levelName: '组织介绍', materialCount: '11', path: 'introduction' },
        { levelName: '组织成员', materialCount: '11', path: 'member' },
        { levelName: '组织大事记', materialCount: '11', path: 'memorabilia' },
        { levelName: '组织相册', materialCount: '11', path: 'album' },
        { levelName: '组织荣誉', materialCount: '11', path: 'honor' },
        { levelName: '组织评价', materialCount: '11', path: 'evaluation' },
      ],
    }
  },
  methods: {
    handleClick (e) {
      this.$emit('change_page', e.key)
    },
    pathObject (path) {
      return { path: path, query: this.$route.query }
    },
  },
  created () {
    let path = this.$route.path.split('/')
    for (let item of this.data) {
      if (path[3] === item.path) {
        this.current = [item.levelName]
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.menus {
  border-right: 1px solid #eee;
  height: 100vh;
  .ant-menu-inline {
    border-right: 0;
  }
}
</style>
