<template>
  <div>{{content}}</div>
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
