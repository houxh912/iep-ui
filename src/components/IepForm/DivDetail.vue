<template>
  <div class="iep-ellipsis" :title="content">
    <slot name="prefix"></slot>
    <span>{{content}}</span>
    <slot></slot>
  </div>
</template>
<script>
import { validatenull } from '@/util/validate'
export default {
  //TODO: iep-ellipsis 副作用
  name: 'IepDivDetail',
  props: ['value', 'nullmsg'],
  computed: {
    content () {
      const { value } = this
      if (value === 0) {
        return '0'
      } else if (validatenull(value)) {
        return this.nullmsg || '暂无'
      } else {
        return value
      }
    },
  },
}
</script>
