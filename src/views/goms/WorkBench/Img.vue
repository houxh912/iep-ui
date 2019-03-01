<template>
  <img :class="className" :src="image" :alt="className" />
</template>
<script>
// import { handleImg } from '@/util/util'
import request from '@/router/axios'
function handleImg (fileName, className) {
  return request({
    url: '/admin/file/' + fileName,
    method: 'get',
    responseType: 'blob',
  }).then(response => {
    // 处理返回的文件流
    let blob = response.data
    console.log(className, document.querySelectorAll(`.${className}`))
    Array.prototype.slice.call(document.querySelectorAll(`.${className}`)).forEach(img => {
      console.log(img)
      img.src = URL.createObjectURL(blob)
      img.onload = function () {
        URL.revokeObjectURL(img.src)//释放。
      }
    })
  })
}
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      image: this.src,
      className: this.src.split('.')[0].split('-')[1],
    }
  },
  mounted () {
    handleImg(this.image, this.image)
  },
  watch: {
    src (n) {
      if (n) {
        this.image = this.src
        this.className = this.src.split('.')[0].split('-')[1]
      }
    },
  },
}
</script>
<style scoped>
img {
  width: 100%;
}
</style>
