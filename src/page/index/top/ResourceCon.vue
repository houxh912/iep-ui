<template>
  <div>
    <div class="nav-bar">
      <div class="resource-wrapper">
        <div v-for="item in resourceRoute" :key="item.path" class="resource-item" @click.stop="handleOpen(item)">
          <i :class="item.icon"></i>
          <div class="resource-title">{{item.name}}</div>
          <div class="resource-count">{{item.count}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import resourceRoute from '@/router/app/resource'
export default {
  data () {
    return {
      resourceRoute,
      routerMatch: this.$route.matched,
    }
  },
  methods: {
    handleOpen (item) {
      this.$router.push({
        path: `/app/resource/${item.path}`,
      })
    },
  },
}
</script>


<style lang="scss" scoped>
.nav-bar {
  display: flex;
  margin: 0 20px;
  height: 140px;
  justify-content: center;
}
.resource-wrapper {
  display: flex;
  width: 1200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}
.resource-item {
  cursor: pointer;
  display: flex;
  padding: 20px 0;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  &:hover,
  &:focus {
    background: rgba(248, 248, 248, 0.9);
  }
  & > i {
    font-size: 30px !important;
    height: 30px;
  }
  .resource-title {
    font-size: 16px;
    height: 30px;
  }
  .resource-count {
    font-size: 18px;
    height: 30px;
  }
}
</style>

