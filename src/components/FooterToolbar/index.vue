<template>
  <div :class="prefixCls" :style="{ width: `calc(100% - 248px)`}">
    <div style="float: left">
      <slot name="extra">{{ extra }}</slot>
    </div>
    <div style="float: right" class="right-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterToolBar',
  props: {
    prefixCls: {
      type: String,
      default: 'footer-toolbar',
    },
    extra: {
      type: [String, Object],
      default: '',
    },
  },
}
</script>
<style scoped>
.right-wrapper > * {
  margin-right: 10px;
}
</style>

<style lang="scss" scoped>
.footer-toolbar {
  position: fixed;
  width: 100%;
  bottom: 0;
  right: 0;
  height: 56px;
  line-height: 56px;
  box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.03);
  background: #fff;
  border-top: 1px solid #e8e8e8;
  padding: 0 24px;
  z-index: 9;

  &:after {
    content: "";
    display: block;
    clear: both;
  }
}
</style>
