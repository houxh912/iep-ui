<template>
  <div class="optimal">
    <el-card class="index-card" shadow="never">
        <div slot="header" class="clearfix">
            <span class="cardTitle" style="font-size:18px;">{{title1}}</span>
        </div>
        <div>
            <div class="technologyList">
                <div v-for="(item,index) in technologyList" :key="index" class="piece">
                    <img :src="item.img" alt="">
                    <div class="text">
                        <div class="title">
                            <span class="name">{{item.name}}</span>
                            <span class="department">{{item.department}}</span>
                        </div>
                        <span class="label">{{item.label}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="clearfix1">
            <span class="cardTitle">{{title2}}</span>
        </div>
        <div>
            <div class="lastMonth">
                <div v-for="(item,index) in lastMonth" :key="index" class="piece">
                    <img :src="item.img" alt="">
                    <div class="text">
                        <div class="title">
                            <span class="name">{{item.name}}</span>
                            <span class="department">{{item.department}}</span>
                        </div>
                        <span class="label">{{item.label}}</span>
                    </div>
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
        title1:'技术之星',
        title2:'上月最佳',
        technologyList: [
            {img:require('./img/optimal1.jpg'),name:'钟乙乔',department:'集团研发中心',label:'需求分析/原型设计/知识图谱'},
            {img:require('./img/optimal2.jpg'),name:'张灵',department:'国脉集团研发中心运维组',label:'DNA运维/环境配置/服务器部署'},
        ],
        lastMonth:[{img:require('./img/optimal3.jpg'),name:'丁斌',department:'产品与技术委员会',label:'微服务/需求梳理/数据门户'}],
    }
  },
}
</script>
<style lang="scss" scoped>
.clearfix1{
    width: 100%;
    display: block;
    clear: both;
    padding: 18px 0;
    border-bottom: 1px solid #EBEEF5;
    .cardTitle{
        font-size: 18px;
    }
}
.technologyList,.lastMonth{
    .piece{
        width: 100%;
        margin-bottom: 12px;
        overflow: hidden;
        img{
            float: left;
            width: 50px;
            height: 50px;
            margin-right:18px;
        }
        .text{
            width: 270px;
            height: 50px;
            float: left;
            .title{
                height: 25px;
                line-height: 25px;
            }
            .label{
                height: 25px;
                line-height: 25px;
            }
        }
    }
}
.lastMonth{
    .piece{
        overflow: hidden;
        margin-top: 20px;
    }
}
</style>
