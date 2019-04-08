<template>
  <div class="videoCenter">
    <el-card class="index-card" shadow="never">
        <div slot="header" class="clearfix">
            <span class="cardTitle">{{title}}</span>
        </div>
        <div>
            <div class="videoCenterList">
                <div v-for="(item,index) in videoCenterList" :key="index" class="piece">
                    <image :src="item.img" class="img"></image>
                    <span class="name">{{item.name}}</span>
                </div>
            </div>
        </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
        title:'国脉视频',
        videoCenterList: [
            {name:'数据基因宣传视频',img:'222'},
        ],
    }
  },
}
</script>
<style lang="scss" scoped>
.videoCenter{
    .piece{
        text-align: center;
    }
}
</style>
