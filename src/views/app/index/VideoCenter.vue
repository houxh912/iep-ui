<template>
  <div class="videoCenter">
    <el-card class="index-card" shadow="never">
        <div slot="header" class="clearfix">
            <span class="cardTitle" style="font-size:18px;">{{title}}</span>
        </div>
        <div>
            <div class="videoCenterList">
                <div v-for="(item,index) in videoCenterList" :key="index" class="piece">
                    <img :src="item.img" class="img">
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
            {name:'数据基因宣传视频',img:'http://img1.xcarimg.com/bbs/1364/m_20120223112918835294.jpg'},
        ],
    }
  },
}
</script>
<style lang="scss" scoped>
.videoCenter{
    .piece{
        text-align: center;
        .img{
            width: 100%;
        }
        .name{
            height: 30px;
            line-height: 40px;
            display: block;
        }
    }
}
</style>
