<template>
  <div class="wrapper">
    <div class="img-wrapper">
      <img :src="img" alt="">
    </div>
    <div>
      <iep-table-link>{{name}}</iep-table-link>
      <div class="desc">{{desc}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'IepTableLinkImgDesc',
  props: ['img', 'desc', 'name'],
}
</script>
<style scoped>
img {
  width: 50px;
  height: 50px;
}
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.img-wrapper {
  padding: 5px;
  border: 1px solid #eee;
  margin: 5px;
}
.desc {
  font-size: 12px;
}
</style>
