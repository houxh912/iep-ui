<template>
    <div class="grid-content">
        <el-card class="box-card">
        <div class="brandVideo">
            <el-tabs v-model="activeName">
                <el-tab-pane label="视说国脉" name="first">
                    <i class="el-icon-arrow-left"></i>
                    <div class="video" v-for="(item,index) in img" :key="index">
                        <img :src="item.imgSrc" alt="">
                        <p>{{item.des}}</p>
                    </div>
                    <i class="el-icon-arrow-right"></i>
                </el-tab-pane>
                <el-tab-pane label="企业风采" name="second">企业风采</el-tab-pane>
                <el-tab-pane label="产品亮相" name="third">产品亮相</el-tab-pane>
                <el-tab-pane label="活动视频" name="fourth">活动视频</el-tab-pane>
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
            img:[
                {imgSrc:require('../images/video1.jpg'),des:'宣传片1'},
                {imgSrc:require('../images/video2.jpg'),des:'宣传片2'},
                {imgSrc:require('../images/video3.jpg'),des:'宣传片3'},
                {imgSrc:require('../images/video4.jpg'),des:'宣传片4'},
            ],
        }
    },
}
</script>
<style scoped lang='scss'>
    .grid-content{
        grid-column-start: 1;
        grid-column-end: 4;
    }
    .piece{
        margin-bottom: 10px;
    }
    .brandVideo{
        i{
            display: inline-block;
            font-size: 32px;
            color:#ccc;
            vertical-align: 60px;
        }
        .video{
            display: inline-block;
            width: 21%;
            margin: 15px 15px 0;
           img{
                display: inline-block;
                width: 100%;
                height:120px;
                background-color: #ccc;
            }
            p{
                text-align: center;
            }
        }
    
}
</style>
