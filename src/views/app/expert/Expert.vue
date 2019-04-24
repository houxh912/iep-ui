<template>
  <div>
    <search></search>
    <div class="expert">
      <span class="expert-item" v-for="(item,index) in expertList" :key="index">
        <div class="img"><img :src="item.imgSrc" alt=""></div>
        <div class="text">
          <span class="name">{{item.name}}<span class="dn show1" :class="item.show1">V</span><span class="dn show2" :class="item.show2">内</span></span>
          <span class="job">{{item.job}}</span>
          <span class="sign">
            <span>{{item.sign1}}</span>
            <span>{{item.sign2}}</span>
            <span>{{item.sign3}}</span>
          </span>
        </div>
      </span>
    </div>
    <div class="page">
      <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Search from './ExpertSearch'
export default {
  data () {
    return {
      expertList: [
        { imgSrc: require('./image/expert1.jpg'), name: '姜奇平', job: '中国社会科学院信息化研究中心', sign1: '信息化', sign2: '信息经济', show1: 'show' },
        { imgSrc: require('./image/expert2.png'), name: '汪向东', job: '中国社科院信息化研究中心主任', sign1: '互联网经济', sign2: '网络经济', show1: 'show' },
        { imgSrc: require('./image/expert3.jpg'), name: '赖茂生', job: '北京大学信息管理学院博士生导师', sign1: '信息化', sign2: '信息管理', show1: 'show' },
        { imgSrc: require('./image/expert4.jpg'), name: '朱森第', job: '中国机械工业联合会副会长', sign1: '人工智能', sign2: '智能制造', show1: 'show' },
        { imgSrc: require('./image/expert5.jpg'), name: '王金平', job: '中国国际工程咨询公司办公厅主', sign1: '信息化' },
        { imgSrc: require('./image/e4.jpg'), name: '周德铭', job: '国家促进大数据发展专家委员会委员', sign1: '电子政务', sign2: '信息化', sign3: '信息资源', show1: 'show', show2: 'show' },
        { imgSrc: require('./image/expert6.jpg'), name: '周德铭', job: '国家促进大数据发展专家委员会', sign1: '信息资源', sign2: '信息化', sign3: '电子政务' },
        { imgSrc: require('./image/expert7.jpg'), name: '胡小明', job: '中国信息协会原副会长', sign1: '电子政务', sign2: '信息化', sign3: '信息资源' },
        { imgSrc: require('./image/e6.jpg'), name: '汪玉凯', job: '国家行政学院教授、国家信息化专家咨询', sign1: '电子政务', sign2: '信息化', sign3: '政府管理' },
        { imgSrc: require('./image/e7.jpg'), name: '汪向东', job: '中国社科院信息化研究中心主任', sign1: '互联网经济', sign2: '网络经济' },
        { imgSrc: require('./image/person3.png'), name: '张慧', job: '智慧企业研究专家', sign1: '智慧企业' },
        { imgSrc: require('./image/person4.png'), name: '孙泽红', job: '信息化与大数据研究专家', sign1: '互联网+政务', sign2: '政务大数据', sign3: '信息化' },
        { imgSrc: require('./image/e8.jpg'), name: '姜奇平', job: '中国社会科学院信息化研究中心秘书长', sign1: '信息化', sign2: '网络经济', sign3: '经济学会' },
        { imgSrc: require('./image/e9.jpg'), name: '胡小明', job: '中国信息协会原副会长', sign1: '电子政务', sign2: '信息化', sign3: '信息资源' },
        { imgSrc: require('./image/e10.jpg'), name: '吕本富', job: '国科学院大学经管学院教授', sign1: '数据服务', sign2: '组织建设', sign3: '网络经济' },
        { imgSrc: require('./image/e11.jpg'), name: '王路燕', job: '国脉集团总助、国脉海洋常务副总', sign1: '互联网+', sign2: '大数据', sign3: '数据基因', show1: 'show', show2: 'show' },
        { imgSrc: require('./image/e1.jpg'), name: '朱森第', job: '中国机械工业联合会副会长', sign1: '人工智能', sign2: '互联网', sign3: '智能制造', show1: 'show', show2: 'show' },
        { imgSrc: require('./image/e2.jpg'), name: '卢绍鸿', job: '项目经理', sign1: '数据分析', sign2: '信息资源目录编制', sign3: '法人库', show1: 'show', show2: 'show' },
      ],
    }
  },
  components: {
    Search,
  },
}
</script>

<style scoped lang="scss">
.expert {
  display: flex;
  flex-wrap: wrap;
  .expert-item {
    display: flex;
    width: 32%;
    margin-right: 15px;
    .img {
      margin-right: 15px;
      margin-bottom: 30px;
      width: 90px;
      height: 90px;
      border: 1px solid #dcdfe6;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        transition: 0.5s;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
    .text {
      width: 60%;
      .name {
        font-size: 16px;
        color: #333;
        .dn {
          opacity: 0;
        }
        .show {
          opacity: 1;
        }
        .show1 {
          display: inline-block;
          margin: 0 5px;
          border-radius: 50%;
          width: 15px;
          height: 15px;
          font-size: 12px;
          line-height: 15px;
          text-align: center;
          background-color: #cb3737;
          color: #fff;
        }
        .show2 {
          display: inline-block;
          border-radius: 2px;
          width: 15px;
          height: 15px;
          line-height: 12px;
          font-size: 12px;
          text-align: center;
          border: 1px solid #cb3737;
          color: #cb3737;
        }
      }
      .job {
        color: #888;
      }
      .sign {
        color: #aaa;
      }
      .name,
      .job,
      .sign {
        display: block;
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 30px;
        font-size: 14px;
        margin-bottom: 0;
      }
    }
  }
}
.page {
  text-align: center;
}
</style>
