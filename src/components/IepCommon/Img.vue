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
      if (!this.src) {
        return 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
      }
      return imgUrl + this.src
    },
  },
}
</script>
