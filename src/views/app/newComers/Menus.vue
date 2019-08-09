<template>
  <div class="menus">
    <a-menu @click="handleClick" mode="inline" v-model="current">
      <a-menu-item v-for="(item) in data" :key="item.levelName">
        <router-link :to="{ path: item.path, query: { id: item.id }}">{{item.levelName}}</router-link>
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
        { levelName: '新员工入职指南', path: 'guidelines', id: 12 },
        { levelName: '国脉集团宣传片', path: 'publicityFilm', id: 13 },
        { levelName: '公司文化', path: 'culture', id: 11 },
        { levelName: '业务体系', path: 'system', id: 17 },
        { levelName: '业务作战图', path: 'operationalChart', id: 16 },
        { levelName: '内网个人信息填写规范', path: 'specifications', id: 15 },
        { levelName: '内网常见问题', path: 'problems', id: 14 },
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
