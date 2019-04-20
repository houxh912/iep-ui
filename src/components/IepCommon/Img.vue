<template>
  <img :src="realSrc">
</template>
<script>
import { imgUrl, base64Url } from '@/config/env'

export default {
  name: 'IepImg',
  inheritAttrs: false,
  props: {
    src: {
      required: true,
      validator: prop => typeof prop === 'string' || prop === null || prop === undefined,
    },
  },
  computed: {
    realSrc () {
      if (!this.src) {
        return base64Url
      }
      return imgUrl + this.src
    },
  },
}
</script>
