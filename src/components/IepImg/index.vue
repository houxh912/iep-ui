<template>
  <el-image :src="src">
    <div slot="placeholder" class="image-slot">
      加载中<span class="dot">...</span>
    </div>
    <div slot="error" class="image-slot">
      <i class="icon-gmlogo"></i>
    </div>
  </el-image>
</template>
<script>

export default {
  name: 'IepImg',
  inheritAttrs: false,
  props: {
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
  font-size: 30px;
  & > .icon-gmlogo {
    font-size: 30px;
  }
}
</style>
