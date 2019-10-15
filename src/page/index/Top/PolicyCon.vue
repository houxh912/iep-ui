<template>
  <div>
    <div class="nav-bar">
      <div class="policy-wrapper">
        <div v-for="item in policyRoute" :key="item.path" class="policy-item" @click.stop="handleOpen(item)">
          <i :class="item.icon"></i>
          <div class="policy-title">{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import policyRoute from '@/router/app/policyRoute'
export default {
  data () {
    return {
      policyRoute,
      routerMatch: this.$route.matched,
    }
  },
  created () {

  },
  methods: {
    handleOpen (item) {
      this.$router.push({
        path: `/app/policyCenter/${item.path}`,
      })
    },
  },
}
</script>


<style lang="scss" scoped>
.policy-wrapper {
  display: flex;
  margin: 0 auto;
  width: 1200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}
.policy-item {
  cursor: pointer;
  padding: 10px 0 25px;
  width: 100%;
  height: 100%;
  text-align: center;
  &:hover,
  &:focus {
    background: rgba(245, 245, 245, 0.9);
  }
  & > i {
    margin-right: 0;
    font-size: 30px !important;
    height: 30px;
    color: #999 !important;
  }
  .policy-title {
    margin-top: -5px;
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 14px;
    color: #999;
  }
  .policy-count {
    font-size: 18px;
    line-height: 18px;
  }
}
</style>

