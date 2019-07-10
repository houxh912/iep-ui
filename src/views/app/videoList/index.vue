<template>
  <iep-app-layout class="video-list">
    <video-list-top></video-list-top>
    <video-list-content></video-list-content>
  </iep-app-layout>
</template>

<script>
import VideoListContent from './VideoListContent'
import VideoListTop from './VideoListTop'
export default {
  name: 'video-list',
  components: { VideoListContent, VideoListTop },
  data () {
    return {
    }
  },
  created () {

  },
}
</script>

