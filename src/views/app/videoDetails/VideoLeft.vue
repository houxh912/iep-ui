<template>
  <div>
    <video width="900" height="500" controls>
      <source :src="video" controls poster="" alt="">
    </video>
  </div>
</template>
<script>
export default {
  data () {
    return {
      video: 'https://www.govmade.com/uploads/1/%E4%BA%A7%E5%93%81%E8%A7%86%E9%A2%91/20181127%E5%9B%BD%E8%84%89%E9%9B%86%E5%9B%A2%E5%AE%A3%E4%BC%A0%E7%89%878_x264.mp4',
    }
  },
}
</script>