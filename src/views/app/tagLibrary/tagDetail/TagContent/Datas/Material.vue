<template>
  <div class="meterial">
    <iep-no-data v-if="!data.length"></iep-no-data>
    <div class="meterial-item" v-for="(item,index) in data" :key="index" @click="handleDetail(item)">
      <span class="title">{{item.commonName}}</span>
      <span class="time fr">{{item.commonTime}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['data'],
  methods: {
    handleDetail (row) {
      this.$router.push(`/app/resource/material/material_detail/${row.commonIdc}`)
    },
  },
}
</script>
<style scoped lang='scss'>
.fr {
  float: right;
}
.meterial-item {
  overflow: hidden;
  line-height: 32px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  .time {
    color: #999;
  }
}
</style>
