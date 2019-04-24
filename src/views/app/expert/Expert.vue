<template>
  <div>
    <search></search>
    <div class="expert">
        <span class="expert-item" v-for="(item,index) in expertList" :key="index">
            <img :src="item.imgSrc" alt="">
            <span>
                <p>{{item.name}}</p>
                <p>{{item.job}}</p>
                <p>{{item.sign}}</p>
            </span>
        </span>
    </div>
  </div>
</template>

<script>
import Search from './ExpertSearch'
export default {
    data () {
        return{
            expertList: [
                {imgSrc:require('./image/expert1.jpg'),name:'姜奇平',job:'中国社会科学院信息化研究中心',sign:'信息化,信息经济'},
                {imgSrc:require('./image/expert2.png'),name:'汪向东',job:'中国社科院信息化研究中心主任',sign:'互联网经济,网络经济'},
                {imgSrc:require('./image/expert3.jpg'),name:'赖茂生',job:'北京大学信息管理学院博士生导师',sign:'信息化,信息管理'},
                {imgSrc:require('./image/expert4.jpg'),name:'朱森第',job:'中国机械工业联合会副会长',sign:'人工智能,智能制造'},
                {imgSrc:require('./image/expert5.jpg'),name:'王金平',job:'中国国际工程咨询公司办公厅主',sign:'信息化'},
                {imgSrc:require('./image/expert6.jpg'),name:'周德铭',job:'国家促进大数据发展专家委员会',sign:'电子政务,信息化,信息资源'},
                {imgSrc:require('./image/expert7.jpg'),name:'胡小明',job:'中国信息协会原副会长',sign:'电子政务,信息化,信息资源'},
            ],
        }
    },
    components: {
        Search,
    },
}
</script>

<style scoped lang="scss">
.expert{
    display: flex;
    flex-wrap: wrap;
    .expert-item{
        display: flex;
        width:32%;
        margin-right: 15px;
        img{
            width: 90px;
            height:90px;
            margin-right: 15px;
            margin-bottom: 15px;
        }
        p:nth-child(1){
            font-size: 16px;
            color: #000;
        }
        p:nth-child(2){
            color: #888;
        }
        p:nth-child(3){
            color: #aaa;
        }
        p{
            width:200px;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            line-height: 30px;
            font-size: 14px;
            margin-bottom: 0;
        }
    }
}
</style>
