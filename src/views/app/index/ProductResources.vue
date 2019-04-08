<template>
  <div class="resources">
    <el-card class="index-card" shadow="never">
        <div slot="header" class="clearfix">
            <span class="cardTitle">{{title}}</span>
            <el-button style="float: right; padding: 3px 0; coloe:#999;" type="text">更多>></el-button>
        </div>
        <div>
            <div class="resourcesList">
                <div v-for="(item,index) in resourcesList" :key="index" class="piece">
                    <span :class="item.icon" class="icon"></span>
                    <span class="name">{{item.name}}</span>
                    <span class="number">{{item.number}}</span>
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
        title:'国脉资源',
        resourcesList: [
            {icon:'el-icon-question',name:'材料库',number:'222'},
            {icon:'el-icon-question',name:'材料库',number:'222'},
            {icon:'el-icon-question',name:'材料库',number:'222'},
            {icon:'el-icon-question',name:'材料库',number:'222'},
            {icon:'el-icon-question',name:'材料库',number:'222'},
            {icon:'el-icon-question',name:'材料库',number:'222'},
            {icon:'el-icon-question',name:'材料库',number:'222'},
            {icon:'el-icon-question',name:'材料库',number:'222'},
        ],
    }
  },
}
</script>
<style lang="scss" scoped>
.resourcesList{
    display: grid;
    grid-auto-flow: row dense;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-row-gap: 40px;
    grid-column-gap: 20px;
    .piece{
        width: 100%;
        text-align: center;
        .icon{
            width: 50%;
            height: 100%;
            font-size: 40px;
            padding: 11px 0;
            border-radius: 50%;
            background-color: #f0f0f0;
            text-align: center;
            display: block;
            margin: 0 auto;
        }
        .name,.number{
            width: 50%;
            display: block;
            margin: 0 auto;
        }
        .name{
            height: 30px;
            line-height: 30px;
        }
        .number{
            color: #999;
        }
    }
}
</style>
