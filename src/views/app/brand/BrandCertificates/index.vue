<template>
    <div class="grid-content">
        <el-card class="box-card">
        <div class="brandCertificates">
            <el-tabs v-model="activeName">
                <el-tab-pane label="光影见证" name="first">
                    <i class="el-icon-arrow-left"></i>
                    <div class="pic" v-for="(item,index) in img" :key="index">
                       <img :src="item.imgSrc" alt="">
                        <p>{{item.des}}</p>
                    </div>
                    <i class="el-icon-arrow-right"></i>
                </el-tab-pane>
                <el-tab-pane label="领导关怀" name="second">领导关怀</el-tab-pane>
                <el-tab-pane label="会场直击" name="third">会场直击</el-tab-pane>
                <el-tab-pane label="荣誉资质" name="fourth">荣誉资质</el-tab-pane>
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
                {imgSrc:require('../images/cert1.jpg'),des:'cert1'},
                {imgSrc:require('../images/cert2.jpg'),des:'cert2'},
                {imgSrc:require('../images/cert3.png'),des:'cert3'},
                {imgSrc:require('../images/cert4.jpg'),des:'cert4'},
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
    .brandCertificates{
        i{
            display: inline-block;
            font-size: 32px;
            color:#ccc;
            vertical-align: 60px;
        }
        .pic{
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
