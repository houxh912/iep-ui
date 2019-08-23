<template>
  <div class="card">
    <div class="left">
      <iep-img :src="data.img"></iep-img>
    </div>
    <div class="right">
      <div class="head">
        <div class="name">{{data.name}}</div>
        <div class="operation">取消关注</div>
      </div>
      <div class="tag">{{data.tag}}</div>
      <div class="org">{{data.org}}</div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    data: {
      type: Object,
    },
  },
  data () {
    return {
      
    }
  },
  methods: {
    
  },
}
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  .left {
    width: 200px;
  }
  .right {
    flex: 1;
    .head {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
