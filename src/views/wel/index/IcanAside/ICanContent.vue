<template>
  <div class="widget">
    <div class="main-title">
      <div>{{titleName}}</div>
      <slot name="stitle"></slot>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titleName: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.widget {
  box-sizing: border-box;
  position: relative;
  margin: 10px 5px;
  border-bottom: 1px solid #ccc;
}

.main-title {
  padding: 0 0 10px;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e3e6e3;
}
.content {
  content: "";
  clear: both;
}
</style>