<template>
  <div class="learningResources">
    <el-card class="index-card" shadow="never">
        <div slot="header" class="clearfix">
            <span class="cardTitle" style="font-size:18px;">{{title}}</span>
            <el-button style="float: right; padding: 5px 0; color:#999;" type="text">更多>></el-button>
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
        cursor: pointer;
        height: 32px;
        line-height: 32px;
        position: relative;
        margin-left: 15px;
        &:hover {
            color: #cb3737;
            &:before{
                background-color: #cb3737;
            }
        }
        &:before{
            content: "";
            position: absolute;
            left: -15px;
            top: 14px;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background-color: #999;
        }
    }
}
</style>
