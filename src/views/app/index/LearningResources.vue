<template>
  <div class="learningResources">
    <el-card class="index-card" shadow="never">
        <div slot="header" class="clearfix">
            <span class="cardTitle">{{title}}</span>
            <el-button style="float: right; padding: 3px 0; coloe:#999;" type="text">更多>></el-button>
        </div>
        <div>
            <div class="learningResourcesList">
                <div v-for="(item,index) in learningResourcesList" :key="index" class="piece">
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
        title:'学习资源',
        learningResourcesList: [
            '微服务设计入门',
            '微服务设计入门',
            '微服务设计入门',
            '微服务设计入门',
            '微服务设计入门',
            '微服务设计入门'],
    }
  },
}
</script>
<style lang="scss" scoped>
.learningResourcesList{
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
