<template>
  <img v-if="type === '2' || type === 2" class="content-image" :src="src"/>
  <video v-else-if="type === '3' || type === 3" controls class="content-video" :src="src">您的浏览器不支持 video 标签。</video>
  <audio v-else="" controls class="content-audio" :src="src">您的浏览器不支持 audio 标签。</audio>
</template>

<script>
import { getFile } from '@/api/im'
export default {
  name: 'media-content',
  data () {
    return {
      src: '',
    }
  },
  props: {
    url: {},
    type: {},
  },
  created () {
    getFile(this.url).then(data => {
      let blob = new Blob([data.data])
      this.src = window.URL.createObjectURL(blob)
    }, error => {
      this.$message.error(error.msg)
    })
  },
}
</script>

<style lang="scss" scoped>
.content-image {
  max-height: 200px;
  min-height: 100px;
  max-width: 400px;
}
.content-video {
  max-height: 200px;
  min-height: 100px;
  max-width: 400px;
}
.content-audio {
  height: 50px;
}
</style>