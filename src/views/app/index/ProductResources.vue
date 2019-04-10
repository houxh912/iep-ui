<template>
  <div class="resources">
    <el-card class="index-card" shadow="never">
        <div slot="header" class="clearfix">
            <span class="cardTitle" style="font-size:18px;">{{title}}</span>
            <el-button style="float: right; padding: 5px 0; color:#999;" type="text">更多>></el-button>
        </div>
        <div>
            <div class="resourcesList">
                <div v-for="(item,index) in resourcesList" :key="index" class="piece">
                    <i :class="item.icon" class="iconfont"></i>
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
            {icon:'icon-dangan',name:'材料库',number:'9850'},
            {icon:'icon-renwu',name:'项目库',number:'420'},
            {icon:'icon-gongzuotai',name:'产品库',number:'20'},
            {icon:'icon-kehu',name:'客户库',number:'1520'},
            {icon:'icon-peixun',name:'培训库',number:'48'},
            {icon:'icon-shangjifaxian',name:'商机库',number:'18'},
            {icon:'icon-hetongliebiao',name:'资质库',number:'67'},
            {icon:'icon-dingwei',name:'招标库',number:'88'},
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
    padding: 18px 0 10px;
    .piece{
        width: 100%;
        text-align: center;
        .iconfont{
            width: 50%;
            height: 100%;
            font-size: 30px;
            padding: 10px 0;
            border-radius: 50%;
            background-color: #f0f0f0;
            text-align: center;
            display: block;
            margin: 0 auto;
            &:hover{
                cursor: pointer;
                background-color: #cb3737;
                color: #fff;
            }
        }
        .name,.number{
            width: 50%;
            display: block;
            margin: 0 auto;
            font-size: 16px;
        }
        .name{
            height: 28px;
            line-height: 28px;
        }
        .number{
            color: #999;
        }
    }
}
</style>
