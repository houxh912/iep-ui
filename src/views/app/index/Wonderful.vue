<template>
  <div class="wonderful">
    <el-card class="index-card" shadow="never">
        <div slot="header" class="clearfix">
            <span class="cardTitle" style="font-size:18px;">{{title}}</span>
            <el-button style="float: right; padding: 5px 0; color:#999;" type="text">更多>></el-button>
        </div>
        <div>
            <el-carousel :interval="5000" class="index-card">
                <el-carousel-item v-for="(item,index) in wonderfulList" :key="index" class="piece">
                    <img :src="item.img" class="img">
                    <span class="name">{{item.name}}</span>
                </el-carousel-item>
            </el-carousel>
        </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
        title:'组织风采',
        wonderfulList: [
            {name:'集团平台运营中心',img:'http://img1.xcarimg.com/bbs/1364/m_20120223112918835294.jpg'},
            {name:'集团平台运营中心',img:'http://img1.xcarimg.com/bbs/1364/m_20120223112918835294.jpg'},
            {name:'集团平台运营中心',img:'http://img1.xcarimg.com/bbs/1364/m_20120223112918835294.jpg'},
        ],
    }
  },
}
</script>
<style lang="scss" scoped>
.wonderful{
    grid-column-start: 1;
    grid-column-end: 3;  
    .piece{
        text-align: center;
    }
}
</style>
