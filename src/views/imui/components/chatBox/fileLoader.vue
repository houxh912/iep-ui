<template>
  <a v-if="fileUrl" :href="fileUrl" :download="fileName">
    <i style="font-size: 20px;" class="iconfont icon-download1 btn-download"></i>
    <i style="font-size: 20px;" class="iconfont icon-wendang"></i>
    {{fileName}}
  </a>
</template>

<script>
import { getFile, getFileName } from '@/api/im'
export default {
  data () {
    return {
      fileName: '',
      fileUrl: '',
    }
  },
  props: {
    name: {},
  },
  created () {
    let url = this.name
    let type = ''
    let index = this.name.indexOf('-', this.name.indexOf('-') + 1)
    if (index > 0) {
      url = this.name.substring(0, index)
      type = this.name.substring(index + 1)
    } else {
      let suffix = this.name.substring(this.name.lastIndexOf('.') + 1)
      if (suffix === 'mp4') {
        type = 'video/mp4'
      } else if (suffix === 'mp3') {
        type = 'audio/mpeg'
      }
    }
    getFile(url, type).then(data => {
      let blob = new Blob([data.data], { type })
      this.fileUrl = window.URL.createObjectURL(blob)
      getFileName(url).then(({ data }) => {
        this.fileName = data
      }, () => {
        this.fileName = `未知文件${this.fileUrl.substring(this.fileUrl.lastIndexOf('.'))}`
      })
    }, error => {
      this.$message.error(error.msg)
    })
  },
}
</script>

<style lang="scss" scoped>
a {
  display: block;
  height: 40px;
  line-height: 40px;
  position: relative;
  text-underline: none !important;
  &:hover .btn-download {
    opacity: 1;
  }
  .btn-download {
    display: inline-block;
    height: 40px;
    width: 40px;
    text-align: center;
    border-radius: 20px;
    background: #C9C9C9;
    opacity: .8;
  }
}
</style>