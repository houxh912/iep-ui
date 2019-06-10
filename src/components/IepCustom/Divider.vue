<template>
  <a-divider v-bind="$attrs">
    <slot></slot>
  </a-divider>
</template>
<script>
export default {
  name: 'IepDivider',
  inheritAttrs: false,
}
</script>
