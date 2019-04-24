<template>
  <div>
    <div v-for="item in resourceRoute" :key="item.path">
      {{item.name}}
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import resourceRoute from '@/router/app/resource'
export default {
  data () {
    return {
      resourceRoute,
    }
  },
}
</script>
<style scoped>
img {
  margin: 0 auto;
  margin-top: -60px;
  width: 1280px;
  display: block;
}
</style>
