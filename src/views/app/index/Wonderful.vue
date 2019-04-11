<template>
  <div class="wonderful">
    <el-card class="index-card" shadow="never">
        <div slot="header" class="clearfix">
            <span class="cardTitle" style="font-size:18px;">{{title}}</span>
            <el-button style="float: right; padding: 5px 0; color:#999;" type="text">更多></el-button>
        </div>
        <div>
            <div class="wonderfulList">
                <div v-for="(item,index) in wonderfulList" :key="index" class="piece">
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
        title:'组织风采',
        wonderfulList: [
            {name:'国脉先锋队',img: require('./img/国脉先锋队.jpg')},
            {name:'国脉集团研发中心',img: require('./img/国脉集团研发中心.jpg')},
            {name:'佛山司马钱信息技术有限公司',img: require('./img/佛山司马钱信息技术有限公司.jpg')},
        ],
    }
  },
}
</script>
<style lang="scss" scoped>
.wonderful{
    grid-column-start: 1;
    grid-column-end: 3;  
    display: grid;
    .piece{
        text-align: center;
        width: 270px;
        float: left;
        margin: 0 10px;
        .img{
            width: 100%;
            height: 165px;
        }
        &:first-child{
            margin:0 25px 0 10px;
        }
        &:last-child{
            margin:0 10px 0 25px;
        }
    }
}
</style>
