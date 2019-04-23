<template>
  <div>
    <search></search>
    <div class="person">
        <span class="person-item" v-for="(item,index) in personList" :key="index">
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
            personList: [
                {imgSrc:require('./image/person1.png'),name:'张金星',job:'高级咨询师、智慧企业研究专家',sign:'互联网+,智慧企业'},
                {imgSrc:require('./image/person2.png'),name:'金婧',job:'智慧政府研究专家',sign:'智慧政府,电子政务'},
                {imgSrc:require('./image/person3.png'),name:'张慧',job:'智慧企业研究专家',sign:'签 智慧企业'},
                {imgSrc:require('./image/person4.png'),name:'孙泽红',job:'信息化与大数据研究专家',sign:'互联网+政务,政务大数据,信息化,智慧城市'},
                {imgSrc:require('./image/person5.jpg'),name:'陈乐燕',job:'政务大数据咨询研究专家',sign:'互联网+政务服务,电子政务,政务大数据,信息资源,智慧城市'},
                {imgSrc:require('./image/person6.jpg'),name:'方涛升',job:'软件系统架构专家',sign:'计算机软件,项目管理,电子政务,技术研发,软件架构'},
                {imgSrc:require('./image/person7.jpg'),name:'王玲',job:'智慧政府研究专家',sign:'智慧政府,政府网站,电子政务,政务信息资源'},
            ],
        }
    },
    components: {
        Search,
    },
}
</script>

<style scoped lang="scss">
.person{
    display: flex;
    flex-wrap: wrap;
    .person-item{
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
