<template>
  <div class="newTehnology">
    <el-card class="index-card" shadow="never">
        <div slot="header" class="clearfix">
            <span class="cardTitle" style="font-size:18px;">{{title}}</span>
        </div>
        <div>
            <div class="newTehnologyTab">
                分类：
                <div v-for="(tab,index) in newTehnologyTab" :key="index" class="pieceTab">{{tab}}</div>
            </div>
            <div class="newTehnologyContent">
                <div v-for="(item,index) in newTehnologyContent" :key="index" class="piece">
                    <img :src="item.img" alt="">
                    <div class="text">
                        <span>{{item.name}}</span>
                        <span>{{item.introduction}}</span>
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
        title:'新兴技术',
        newTehnologyTab: ['全部','大数据','分布式','人工智能','知识图谱','用户画像','区块链'],
        newTehnologyContent: [
            {img:'',name:'Ant Design Pro',introduction:'一个企业级开箱即用的中后台前端'},
            {img:'',name:'Ant Design Pro',introduction:'一个企业级开箱即用的中后台前端'},
            {img:'',name:'Ant Design Pro',introduction:'一个企业级开箱即用的中后台前端'},
            {img:'',name:'Ant Design Pro',introduction:'一个企业级开箱即用的中后台前端'},
            {img:'',name:'Ant Design Pro',introduction:'一个企业级开箱即用的中后台前端'},
            {img:'',name:'Ant Design Pro',introduction:'一个企业级开箱即用的中后台前端'},
            {img:'',name:'Ant Design Pro',introduction:'一个企业级开箱即用的中后台前端'},
            {img:'',name:'Ant Design Pro',introduction:'一个企业级开箱即用的中后台前端'},
        ],
    }
  },
}
</script>
<style lang="scss" scoped>
.newTehnology{
    grid-column-start: 1;
    grid-column-end: 3; 
    .newTehnologyTab{
        width: 100%;
        height: 40px;
        .pieceTab{
            display: inline;
            padding:2px 6px;
            border-radius:6px;
            margin:0 10px;
        }
    }
    .newTehnologyContent{
        display: grid;
        grid-auto-flow: row dense;
        grid-row-gap: 10px;
        grid-column-gap: 10px;
        grid-template-columns: 1fr 1fr;
        .piece{
            img{
                float: left;
                width: 50px;
                height: 50px;
            }
            .text{
                float: left;
                height: 50px;
                span{
                    display: block;
                }
            }
        }
    }
}
</style>
