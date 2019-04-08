<template>
  <div class="honor">
    <el-card class="index-card" shadow="never">
        <div slot="header" class="clearfix">
            <span class="cardTitle">{{title}}</span>
            <el-button style="float: right; padding: 3px 0; coloe:#999;" type="text">更多>></el-button>
        </div>
        <div>
            <div class="honorList">
                <div v-for="(item,index) in honorList" :key="index" class="piece">
                    {{item}}
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
        title:'文化制度',
        honorList: [
            '制度|国脉互联各子公司相关惩罚管理',
            '制度|国脉互联各子公司相关惩罚管理',
            '制度|国脉互联各子公司相关惩罚管理',
            '制度|国脉互联各子公司相关惩罚管理',
            '制度|国脉互联各子公司相关惩罚管理',
            '制度|国脉互联各子公司相关惩罚管理'],
    }
  },
}
</script>
<style lang="scss" scoped>
.honorList{
    .piece{
        height: 35px;
        line-height: 35px;
        position: relative;
        margin-left: 15px;
    }
    .piece:before{
        content: "";
        position: absolute;
        left: -15px;
        top: 15px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: #999;
    }
    
}
</style>
