<template>
  <div class="wrapper">
    <div class="img-wrapper" @click="handleClick">
      <iep-img class="img" :src="img" alt=""></iep-img>
    </div>
    <div>
      <iep-table-link :isDot="false" @click="handleClick" disabled>{{name}}</iep-table-link>
      <div class="desc">{{desc}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'IepTableLinkImgDesc',
  props: ['img', 'desc', 'name'],
  methods: {
    handleClick () {
      this.$emit('m-click')
    },
  },
}
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.img-wrapper {
  cursor: pointer;
  padding: 5px;
  border: 1px solid #eee;
  height: 62px;
  margin: 5px;
  & > .img {
    width: 50px;
    height: 50px;
  }
}
.desc {
  font-size: 12px;
  color: #999;
}
</style>