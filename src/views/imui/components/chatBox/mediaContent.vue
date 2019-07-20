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
    let url = this.url
    let type = ''
    let index = this.url.indexOf('-', this.url.indexOf('-') + 1)
    if (index > 0) {
      url = this.url.substring(0, index)
      type = this.url.substring(index + 1)
    } else {
      let suffix = this.url.substring(this.url.lastIndexOf('.') + 1)
      if (suffix === 'mp4') {
        type = 'video/mp4'
      } else if (suffix === 'mp3') {
        type = 'audio/mpeg'
      }
    }
    getFile(url, type).then(data => {
      let blob = new Blob([data.data], { type })
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