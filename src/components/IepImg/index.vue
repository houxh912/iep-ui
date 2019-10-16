<template>
  <el-image :src="src" :preview-src-list="previewSrcList" v-bind="$attrs">
    <div slot="placeholder" class="image-slot">
      加载中<span class="dot">...</span>
    </div>
    <div slot="error" class="image-slot">
      <i class="icon-ican"></i>
    </div>
  </el-image>
</template>
<script>

export default {
  name: 'IepImg',
  inheritAttrs: false,
  props: {
    previewSrcList: {
      type: Array,
      default: () => [],
    },
    src: {
      required: true,
      validator: prop => typeof prop === 'string' || prop === null || prop === undefined,
    },
  },
}
</script>
<style lang="scss" scoped>
.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: #909399;
  & > .icon-ican {
    font-size: 40px;
  }
}
</style>
