<template>
    <div class="grid-content">
        <div class="logo-container" v-for="(item,index) in info" :key="index">
            <img :src="item.logoSrc" alt="">
            <p class="pv" v-text="item.pv"></p>
            <p class="day" v-text="item.day"></p>
            <p class="week" v-text="item.week"></p>
        </div>
    </div>
</template>  
<script>
export default {
  data () {
    return {
        info:[
            {logoSrc:require('../images/logo1.png'),pv:`PV：${6}次`,day:`日环比：${6}%`,week:`周环比：${8}%`},
            {logoSrc:require('../images/logo2.png'),pv:`PV：${6}次`,day:`日环比：${6}%`,week:`周环比：${8}%`},
            {logoSrc:require('../images/logo3.png'),pv:`PV：${6}次`,day:`日环比：${6}%`,week:`周环比：${8}%`},
            {logoSrc:require('../images/logo4.png'),pv:`PV：${6}次`,day:`日环比：${6}%`,week:`周环比：${8}%`},
            {logoSrc:require('../images/logo5.jpg'),pv:`PV：${6}次`,day:`日环比：${6}%`,week:`周环比：${8}%`},
            {logoSrc:require('../images/logo6.png'),pv:`PV：${6}次`,day:`日环比：${6}%`,week:`周环比：${8}%`},
        ],
    }
  },
}
</script>
<style lang='scss'  scoped>
  .grid-content{
    display: flex;
    padding: 15px;
    grid-column-start: 1;
    grid-column-end: 4;
    border: 1px solid #eee;
       .logo-container {
            padding:15px;
            width:20%;
            min-height: 36px;
            border-right: 1px solid #eee;
            img{
                width: 100%;
                height: 50px;
            }
            p{
                text-align: center;
                font-size: 14px; 
                color:#aaa;
                margin-bottom: 0;
                line-height:1.8;
            }
        }
        .logo-container:nth-last-child(1){
             border-right: none;
        }
  }
</style>
