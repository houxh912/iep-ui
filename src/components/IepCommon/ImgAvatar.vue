<template>
  <a-avatar icon="user" :src="realSrc" v-bind="$attrs" v-on="$listeners">USER</a-avatar>
</template>
<script>
import { base64Url } from '@/config/env'
export default {
  name: 'IepImgAvatar',
  inheritAttrs: false,
  props: ['src'],
  computed: {
    realSrc () {
      if (!this.src) {
        return base64Url
      }
      return this.src
    },
  },
}
</script>
