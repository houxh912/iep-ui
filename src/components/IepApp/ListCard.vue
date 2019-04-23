<template>
  <div class="list">
    <div v-for="(item,index) in dataList" :key="index" class="piece">
      {{item}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'IepAppListCard',
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
.list {
  .piece {
    cursor: pointer;
    height: 30px;
    line-height: 30px;
    position: relative;
    padding-left: 15px;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    &:hover {
      color: #cb3737;
      &:before {
        background-color: #cb3737;
      }
    }
    &:before {
      content: "";
      position: absolute;
      left: 0px;
      top: 12px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #dcdcdc;
    }
  }
}
</style>
