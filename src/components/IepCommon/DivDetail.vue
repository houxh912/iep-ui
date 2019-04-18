<template>
  <div>
    <slot name="prefix"></slot>
    <span>{{content}}</span>
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
