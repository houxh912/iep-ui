<template>
  <div class="aboutMe">
    <div class="tile">{{creatList.title}}</div>
    <div class="content">
      <div v-for="(item,index) in creatList.details" :key="index">{{item}}</div>
      <div class="add" @click="handelAdd"><i class="el-icon-plus"></i></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    creatList: {
      type: Object,
      default: () => { },
    },
  },

}
</script>
<style lang="scss">
.aboutMe {
  width: 300px;
  background: #fafafa;
  padding: 20px 10px 10px 10px;
}
.content {
  display: grid;
  grid-template-columns: auto [line1] auto [line2] auto [line3] auto [line4];
  grid-template-rows: auto auto auto;
  grid-column-gap: 10px;
  grid-row-gap: 15px;
  text-align: center;
  font-size: 14px;
  div {
    padding: 10px 0;
  }
}
</style>


