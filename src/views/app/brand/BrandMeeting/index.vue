<template>
    <div class="grid-content">
        <el-card class="box-card">
        <div class="news-nav">
            <el-tabs v-model="activeName">
            <el-tab-pane label="品牌会议" name="first">
                <div v-for="(item,index) in leaderBoardList" :key="index" class="piece">
                <span class="name">{{item.name}}</span>
                </div>
            </el-tab-pane>
            <el-tab-pane label="估评活动" name="second">估评活动</el-tab-pane>
            <el-tab-pane label="培训库" name="third">培训库</el-tab-pane>
            </el-tabs>
        </div>
        </el-card>
    </div>
</template>
<script>
export default {
    data () {
        return {
            activeName: 'first',
            leaderBoardList: [
                {name:'2019首届长三角地区营商环境论坛'},
                {name:'2019珠三角营商环境与数字政府理论与实践'},
                {name:'全球敏捷运维峰会'},
                {name:'2019首届长三角地区营商环境专题论坛'},
                {name:'2019首届长三角地区营商环境论坛'},
                {name:'2019珠三角营商环境与数字政府理论与实践'},
                {name:'全球敏捷运维峰会'},
            ],
        }
    },
}
</script>
<style scoped lang='scss'>
    .piece{
        margin-bottom: 10px;
    }
</style>
