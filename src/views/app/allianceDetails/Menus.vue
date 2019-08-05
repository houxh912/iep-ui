<template>
  <div class="menus">
    <a-menu @click="handleClick" mode="inline" v-model="current">
      <a-menu-item v-for="(item) in data" :key="item.levelName">
        <router-link :to="item.path">{{item.levelName}}</router-link>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>

export default {
  data () {
    return {
      current: ['集团概况'],
      data: [
        { levelName: '集团概况', materialCount: '11', path: 'group' },
        { levelName: '企业文化', materialCount: '11', path: 'culture' },
        { levelName: '组织架构', materialCount: '11', path: 'mechanism' },
        { levelName: '专家团队', materialCount: '11', path: 'team' },
        { levelName: '发展历程', materialCount: '11', path: 'development' },
        { levelName: '业务领域', materialCount: '11', path: 'business' },
      ],
    }
  },
  methods: {
    handleClick (e) {
      this.$emit('change_page', e.key)
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
  height: 100%;
  .ant-menu-inline {
    border-right: 0;
  }
}
</style>
