<template>
  <img :src="realSrc">
</template>
<script>
import { imgUrl } from '@/config/env'
export default {
  name: 'IepImg',
  inheritAttrs: false,
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  computed: {
    realSrc () {
      return imgUrl + this.src
    },
  },
}
</script>
