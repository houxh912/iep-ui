<template>
  <div class="videoCenter">
    <IepAppTabCard :title="title" :linkName="linkName">
      <div class="videoCenter-list">
        <div v-for="(item,index) in videoCenterList" :key="index" class="piece">
          <img :src="item.img" class="img">
          <span class="name">{{item.name}}</span>
        </div>
      </div>
    </IepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '国脉视频',
      videoCenterList: [
        { name: '数据基因宣传视频', img: require('./img/video.jpg') },
      ],
      linkName: '',
    }
  },
}
</script>
<style lang="scss" scoped>
.videoCenter-list {
  padding-top: 10px;
  .piece {
    text-align: center;
    .img {
      width: 100%;
      height: 165px;
    }
    .name {
      height: 30px;
      line-height: 40px;
      display: block;
    }
  }
}
</style>
