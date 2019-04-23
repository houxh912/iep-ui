<template>
  <div class="label">
    <div v-for="(item,index) in dataList" :key="index" class="piece">
      {{item}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'IepAppLabelCard',
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
.label{
  .piece{
    padding: 2px 5px;
    border: 1px solid #f0f0f0;
    float: left;
    margin: 7px 5px;
    color: #333;
  }
}
</style>
