<template>
  <div class="title-wrapper">
    <span class="page-title">{{title}}</span>
    <span class="page-desc">{{desc}}</span>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    replaceText: {
      type: Function,
      required: false,
      default: () => { },
    },
    data: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  computed: {
    desc () {
      return this.replaceText(this.data)
    },
  },
}
</script>
<style lang="scss" scoped>
.title-wrapper {
  margin-bottom: 10px;
  .page-title {
    font-size: 23px;
  }
}
</style>
