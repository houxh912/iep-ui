<template>
  <img :id="src" :src="src" alt="">
</template>
<script>
// import { handleImg } from '@/util/util'
import request from '@/router/axios'
function handleImg (fileName, id) {
  console.log(fileName, id)
  return request({
    url: '/admin/file/' + fileName,
    method: 'get',
    responseType: 'blob',
  }).then(response => {
    // 处理返回的文件流
    let blob = response.data
    return Promise.resolve(blob)
  }).catch(err => {
    return Promise.reject(err)
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
      image: '',
    }
  },
  async created () {
    const blob = await handleImg()
    this.image = 'data:image/jpeg;base64,' + btoa(blob)
  },
  watch: {
    src (n) {
      if (n) {
        handleImg(this.src, this.src)
      }
    },
  },
}
</script>
