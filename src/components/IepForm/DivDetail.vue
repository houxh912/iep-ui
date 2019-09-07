<template>
  <div :class="{'iep-ellipsis':issimgle}" :title="content">
    <slot name="prefix"></slot>
    <component :is="tag">{{content}}</component>
    <slot></slot>
  </div>
</template>
<script>
import { validatenull } from '@/util/validate'
export default {
  //TODO: iep-ellipsis 副作用
  name: 'IepDivDetail',
  props: {
    value: [String, Number],
    nullmsg: {
      type: String,
      require: false,
      default: '暂无',
    },
    issimgle: {
      type: Boolean,
      require: false,
      default: true,
    },
    tag: {
      type: String,
      default: 'span',
    },
  },
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
