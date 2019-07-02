<template>
  <a v-if="fileUrl" :href="fileUrl" :download="fileName">
    <i style="font-size: 20px;" class="iconfont icon-download1 btn-download"></i>
    <i style="font-size: 20px;" class="iconfont icon-wendang"></i>
    {{fileName}}
  </a>
</template>

<script>
import { getFile } from '@/api/im'
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
    getFile(this.name).then(data => {
      let blob = new Blob([data.data])
      this.fileUrl = window.URL.createObjectURL(blob)
      this.fileName = data.headers.filename
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