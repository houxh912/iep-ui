<template>
    <div class="bannerInfo">
        <div class="banner-container" v-for="(item,index) in info" :key="index">
            <p class="options" v-text="item.options"></p>
            <p class="enterprise" v-text="item.enterprise"></p>
            <p class="qualifications" v-text="item.qualifications"></p>
        </div>
    </div>
</template>  
<script>
export default {
  data () {
    return {
        info:[
            {options:`荣誉资质${12}项`,enterprise:`高新企业${6}家`,qualifications:`软件资质${6}项`},
            {options:`品牌活动${23}场`,enterprise:`高新企业${6}家`,qualifications:`软件资质${6}项`},
            {options:`智库成果${24}项`,enterprise:`高新企业${6}家`,qualifications:`软件资质${6}项`},
            {options:`内外专家${25}位`,enterprise:`高新企业${6}家`,qualifications:`软件资质${6}项`},
            {options:`业务平台${26}个`,enterprise:`高新企业${6}家`,qualifications:`软件资质${6}项`},
            {options:`渠道资源${26}个`,enterprise:`高新企业${6}家`,qualifications:`软件资质${6}项`},
        ],
    }
  },
}
</script>
<style lang='scss'>
  .bannerInfo{
    display: flex;
    grid-column-start: 1;
    grid-column-end: 4;
       .banner-container {
            width:19%;
            border-right: 1px dashed #ccc;
            min-height: 36px;
            p{
                text-align: center;
                font-size: 18px; 
                color:#000;
                margin-bottom: 0;
                line-height:1.8;
            }
            .enterprise{
                font-size: 16px;
                color: #aaa;
            }
            .qualifications{
                font-size: 16px;
                color: #aaa;
            }
        }
        .banner-container:nth-last-child(1){
            width:12%;
            border-right: none;
            p{
               text-align: right;
            }
        }
        .banner-container:nth-child(1){
            width:12%;
            p{
               text-align: left;
            }
        }
  }
</style>
