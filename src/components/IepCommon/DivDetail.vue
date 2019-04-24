<template>
  <div class="iep-ellipsis" :title="content">
    <slot name="prefix"></slot>
    <span class="iep-ellipsis">{{content}}</span>
    <slot></slot>
  </div>
</template>
<script>
import { validatenull } from '@/util/validate'
export default {
  name: 'IepDivDetail',
  props: ['value'],
  computed: {
    content () {
      if (validatenull(this.value)) {
        return '暂无'
      } else {
        return this.value
      }
    },
  },
}
</script>
