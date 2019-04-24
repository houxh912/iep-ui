<template>
  <div class="ranking">
    <div v-for="(item,index) in dataList" :key="index" class="piece">
      <span class="count" :class="item.color">{{index+1}}</span>
      <span class="name">{{item.name}}</span>
      <span class="grade">{{item.grade}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'IepAppRankingCard',
  props: {
    dataList: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
}
</script>
<style lang="scss" scoped>
.ranking {
  padding: 2px 0;
  .piece {
    cursor: pointer;
    .name {
      height: 30px;
      line-height: 30px;
    }
    .count {
      width: 18px;
      height: 18px;
      line-height: 18px;
      text-align: center;
      margin-right: 20px;
      background-color: #ccc;
      color: #fff;
      display: inline-block;
    }
    .red {
      background-color: #bb1a20;
    }
    .grade {
      float: right;
      color: #bb1a20;
    }
    &:hover {
      color: #cb3737;
    }
  }
}
</style>

