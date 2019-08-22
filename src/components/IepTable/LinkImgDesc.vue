<template>
  <div class="wrapper">
    <div class="img-wrapper" @click="handleClick">
      <i v-if="isIcon" class="img-icon icon iconfont" :class="img"></i>
      <iep-img v-else class="img" :src="img" alt=""></iep-img>
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
  computed: {
    isIcon () {
      return this.img.startsWith('icon-')
    },
  },
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
  .img-icon {
    font-size: 30px;
  }
}
.desc {
  font-size: 12px;
  color: #999;
}
</style>