<template>
  <div class="organization-list-con">
    <search></search>
    <div class="module">
      <el-card class="module-item" v-for="(item,index) in moduleList" :key="index" shadow="hover">
        <div class="content">
          <div class="img">
            <img :src="item.img" alt="">
            <div class="title">{{item.title}}</div>
          </div>
          <span class="effect">
            <span class="item-effect" v-for="effect in item.effects" :key="effect.id">
              <span class="num">{{effect.num}}</span>
              <span>{{effect.name}}</span>
            </span>
          </span>
          <div>
            <div class="organization-tag">
              <span class="tag-name">{{item.name}}：</span>
              <span class="tag-con">
                <span>{{item.tagName1}}</span>
                <span>{{item.tagName2}}</span>
                <span>{{item.tagName3}}</span>
              </span>
            </div>
            <div class="bottom">
              <span class="time">
                <span>{{item.timeName}}：</span>
                <span>{{item.time}}</span>
              </span>
              <span class="person">
                <span>{{item.personName}}：</span>
                <span>{{item.personInfo}}</span>
              </span>
            </div>
          </div>
        </div>
        <div class="hover">
          <h4 class="sub-title">{{item.subTitle}}</h4>
          <div class="con">{{item.content}}</div>
          <el-button class="btn" type="danger" plain>组织风采<i class="el-icon-arrow-right"></i></el-button>
        </div>
      </el-card>
    </div>
    <div class="page">
      <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Search from './Search'
export default {
  components: {
    Search,
  },
  data () {
    return {
      moduleList: [
        {
          img: require('./img/school2.png'),
          title: '国脉集团研发中心',
          effects: [
            {
              num: '612',
              name: '信用值',
            },
            {
              num: '612',
              name: '贡献',
            },
            {
              num: '612',
              name: '综合排名',
            },
            {
              num: '612',
              name: '业绩排名',
            },
          ],
          name: '组织标签',
          tagName1: '前段开发',
          tagName2: '后端开发',
          tagName3: '网页设计',
          timeName: '成立时间',
          time: '2018-12-11',
          personName: '负责人',
          personInfo: '黄磊',
          subTitle: '国脉集体研发中心',
          content: '国脉，是大数据治理、数字政府、营商环境、数字经济、政务服务专业提供商。创新提出“软件+咨询+数据+平台+创新业务”五位一体服务模型，拥有数据基因(DNA)和水巢(DIPS)两大系列几十项软件产品，长期为中国智慧城市、智慧政府和智慧企业提供专业咨询规划和数据服务，运营电子政务、物联网、智慧城市、数邦客、司马钱、中船通、蟠桃会、仓颉数据元、国策数据等系列行业专业平台，广泛服务于信息中心、大数据局、行政服务中心等政府客户、中央企业和金融机构。国脉，是大数据治理、数字政府、营商环境、数字经济、政务服务专业提供商。创新提出“软件+咨询+数据+平台+创新业务”五位一体服务模型，拥有数据基因(DNA)和水巢(DIPS)两大系列几十项软件产品，长期为中国智慧城市、智慧政府和智慧企业提供专业咨询规划和数据服务，运营电子政务、物联网、智慧城市、数邦客、司马钱、中船通、蟠桃会、仓颉数据元、国策数据等系列行业专业平台，广泛服务于信息中心、大数据局、行政服务中心等政府客户、中央企业和金融机构。',
        },
        {
          img: require('./img/school3.png'),
          title: '国脉集团研发中心',
          effects: [
            {
              num: '612',
              name: '信用值',
            },
            {
              num: '612',
              name: '贡献',
            },
            {
              num: '612',
              name: '综合排名',
            },
            {
              num: '612',
              name: '业绩排名',
            },
          ],
          name: '组织标签',
          tagName1: '前段开发',
          tagName2: '后端开发',
          tagName3: '网页设计',
          timeName: '成立时间',
          time: '2018-12-11',
          personName: '负责人',
          personInfo: '黄磊',
          subTitle: '国脉集体研发中心',
          content: '国脉，是大数据治理、数字政府、营商环境、数字经济、政务服务专业提供商。创新提出“软件+咨询+数据+平台+创新业务”五位一体服务模型，拥有数据基因(DNA)和水巢(DIPS)两大系列几十项软件产品，长期为中国智慧城市、智慧政府和智慧企业提供专业咨询规划和数据服务，运营电子政务、物联网、智慧城市、数邦客、司马钱、中船通、蟠桃会、仓颉数据元、国策数据等系列行业专业平台，广泛服务于信息中心、大数据局、行政服务中心等政府客户、中央企业和金融机构。国脉，是大数据治理、数字政府、营商环境、数字经济、政务服务专业提供商。创新提出“软件+咨询+数据+平台+创新业务”五位一体服务模型，拥有数据基因(DNA)和水巢(DIPS)两大系列几十项软件产品，长期为中国智慧城市、智慧政府和智慧企业提供专业咨询规划和数据服务，运营电子政务、物联网、智慧城市、数邦客、司马钱、中船通、蟠桃会、仓颉数据元、国策数据等系列行业专业平台，广泛服务于信息中心、大数据局、行政服务中心等政府客户、中央企业和金融机构。',
        },
        {
          img: require('./img/school3.png'),
          title: '国脉集团研发中心',
          effects: [
            {
              num: '612',
              name: '信用值',
            },
            {
              num: '612',
              name: '贡献',
            },
            {
              num: '612',
              name: '综合排名',
            },
            {
              num: '612',
              name: '业绩排名',
            },
          ],
          name: '组织标签',
          tagName1: '前段开发',
          tagName2: '后端开发',
          tagName3: '网页设计',
          timeName: '成立时间',
          time: '2018-12-11',
          personName: '负责人',
          personInfo: '黄磊',
          subTitle: '国脉集体研发中心',
          content: '国脉，是大数据治理、数字政府、营商环境、数字经济、政务服务专业提供商。创新提出“软件+咨询+数据+平台+创新业务”五位一体服务模型，拥有数据基因(DNA)和水巢(DIPS)两大系列几十项软件产品，长期为中国智慧城市、智慧政府和智慧企业提供专业咨询规划和数据服务，运营电子政务、物联网、智慧城市、数邦客、司马钱、中船通、蟠桃会、仓颉数据元、国策数据等系列行业专业平台，广泛服务于信息中心、大数据局、行政服务中心等政府客户、中央企业和金融机构。国脉，是大数据治理、数字政府、营商环境、数字经济、政务服务专业提供商。创新提出“软件+咨询+数据+平台+创新业务”五位一体服务模型，拥有数据基因(DNA)和水巢(DIPS)两大系列几十项软件产品，长期为中国智慧城市、智慧政府和智慧企业提供专业咨询规划和数据服务，运营电子政务、物联网、智慧城市、数邦客、司马钱、中船通、蟠桃会、仓颉数据元、国策数据等系列行业专业平台，广泛服务于信息中心、大数据局、行政服务中心等政府客户、中央企业和金融机构。',
        },
        {
          img: require('./img/school3.png'),
          title: '国脉集团研发中心',
          effects: [
            {
              num: '612',
              name: '信用值',
            },
            {
              num: '612',
              name: '贡献',
            },
            {
              num: '612',
              name: '综合排名',
            },
            {
              num: '612',
              name: '业绩排名',
            },
          ],
          name: '组织标签',
          tagName1: '前段开发',
          tagName2: '后端开发',
          tagName3: '网页设计',
          timeName: '成立时间',
          time: '2018-12-11',
          personName: '负责人',
          personInfo: '黄磊',
          subTitle: '国脉集体研发中心',
          content: '国脉，是大数据治理、数字政府、营商环境、数字经济、政务服务专业提供商。创新提出“软件+咨询+数据+平台+创新业务”五位一体服务模型，拥有数据基因(DNA)和水巢(DIPS)两大系列几十项软件产品，长期为中国智慧城市、智慧政府和智慧企业提供专业咨询规划和数据服务，运营电子政务、物联网、智慧城市、数邦客、司马钱、中船通、蟠桃会、仓颉数据元、国策数据等系列行业专业平台，广泛服务于信息中心、大数据局、行政服务中心等政府客户、中央企业和金融机构。国脉，是大数据治理、数字政府、营商环境、数字经济、政务服务专业提供商。创新提出“软件+咨询+数据+平台+创新业务”五位一体服务模型，拥有数据基因(DNA)和水巢(DIPS)两大系列几十项软件产品，长期为中国智慧城市、智慧政府和智慧企业提供专业咨询规划和数据服务，运营电子政务、物联网、智慧城市、数邦客、司马钱、中船通、蟠桃会、仓颉数据元、国策数据等系列行业专业平台，广泛服务于信息中心、大数据局、行政服务中心等政府客户、中央企业和金融机构。',
        },
        {
          img: require('./img/school3.png'),
          title: '国脉集团研发中心',
          effects: [
            {
              num: '612',
              name: '信用值',
            },
            {
              num: '612',
              name: '贡献',
            },
            {
              num: '612',
              name: '综合排名',
            },
            {
              num: '612',
              name: '业绩排名',
            },
          ],
          name: '组织标签',
          tagName1: '前段开发',
          tagName2: '后端开发',
          tagName3: '网页设计',
          timeName: '成立时间',
          time: '2018-12-11',
          personName: '负责人',
          personInfo: '黄磊',
          subTitle: '国脉集体研发中心',
          content: '国脉，是大数据治理、数字政府、营商环境、数字经济、政务服务专业提供商。创新提出“软件+咨询+数据+平台+创新业务”五位一体服务模型，拥有数据基因(DNA)和水巢(DIPS)两大系列几十项软件产品，长期为中国智慧城市、智慧政府和智慧企业提供专业咨询规划和数据服务，运营电子政务、物联网、智慧城市、数邦客、司马钱、中船通、蟠桃会、仓颉数据元、国策数据等系列行业专业平台，广泛服务于信息中心、大数据局、行政服务中心等政府客户、中央企业和金融机构。国脉，是大数据治理、数字政府、营商环境、数字经济、政务服务专业提供商。创新提出“软件+咨询+数据+平台+创新业务”五位一体服务模型，拥有数据基因(DNA)和水巢(DIPS)两大系列几十项软件产品，长期为中国智慧城市、智慧政府和智慧企业提供专业咨询规划和数据服务，运营电子政务、物联网、智慧城市、数邦客、司马钱、中船通、蟠桃会、仓颉数据元、国策数据等系列行业专业平台，广泛服务于信息中心、大数据局、行政服务中心等政府客户、中央企业和金融机构。',
        },
        {
          img: require('./img/school3.png'),
          title: '国脉集团研发中心',
          effects: [
            {
              num: '612',
              name: '信用值',
            },
            {
              num: '612',
              name: '贡献',
            },
            {
              num: '612',
              name: '综合排名',
            },
            {
              num: '612',
              name: '业绩排名',
            },
          ],
          name: '组织标签',
          tagName1: '前段开发',
          tagName2: '后端开发',
          tagName3: '网页设计',
          timeName: '成立时间',
          time: '2018-12-11',
          personName: '负责人',
          personInfo: '黄磊',
          subTitle: '国脉集体研发中心',
          content: '国脉，是大数据治理、数字政府、营商环境、数字经济、政务服务专业提供商。创新提出“软件+咨询+数据+平台+创新业务”五位一体服务模型，拥有数据基因(DNA)和水巢(DIPS)两大系列几十项软件产品，长期为中国智慧城市、智慧政府和智慧企业提供专业咨询规划和数据服务，运营电子政务、物联网、智慧城市、数邦客、司马钱、中船通、蟠桃会、仓颉数据元、国策数据等系列行业专业平台，广泛服务于信息中心、大数据局、行政服务中心等政府客户、中央企业和金融机构。国脉，是大数据治理、数字政府、营商环境、数字经济、政务服务专业提供商。创新提出“软件+咨询+数据+平台+创新业务”五位一体服务模型，拥有数据基因(DNA)和水巢(DIPS)两大系列几十项软件产品，长期为中国智慧城市、智慧政府和智慧企业提供专业咨询规划和数据服务，运营电子政务、物联网、智慧城市、数邦客、司马钱、中船通、蟠桃会、仓颉数据元、国策数据等系列行业专业平台，广泛服务于信息中心、大数据局、行政服务中心等政府客户、中央企业和金融机构。',
        },
        {
          img: require('./img/school3.png'),
          title: '国脉集团研发中心',
          effects: [
            {
              num: '612',
              name: '信用值',
            },
            {
              num: '612',
              name: '贡献',
            },
            {
              num: '612',
              name: '综合排名',
            },
            {
              num: '612',
              name: '业绩排名',
            },
          ],
          name: '组织标签',
          tagName1: '前段开发',
          tagName2: '后端开发',
          tagName3: '网页设计',
          timeName: '成立时间',
          time: '2018-12-11',
          personName: '负责人',
          personInfo: '黄磊',
          subTitle: '国脉集体研发中心',
          content: '国脉，是大数据治理、数字政府、营商环境、数字经济、政务服务专业提供商。创新提出“软件+咨询+数据+平台+创新业务”五位一体服务模型，拥有数据基因(DNA)和水巢(DIPS)两大系列几十项软件产品，长期为中国智慧城市、智慧政府和智慧企业提供专业咨询规划和数据服务，运营电子政务、物联网、智慧城市、数邦客、司马钱、中船通、蟠桃会、仓颉数据元、国策数据等系列行业专业平台，广泛服务于信息中心、大数据局、行政服务中心等政府客户、中央企业和金融机构。国脉，是大数据治理、数字政府、营商环境、数字经济、政务服务专业提供商。创新提出“软件+咨询+数据+平台+创新业务”五位一体服务模型，拥有数据基因(DNA)和水巢(DIPS)两大系列几十项软件产品，长期为中国智慧城市、智慧政府和智慧企业提供专业咨询规划和数据服务，运营电子政务、物联网、智慧城市、数邦客、司马钱、中船通、蟠桃会、仓颉数据元、国策数据等系列行业专业平台，广泛服务于信息中心、大数据局、行政服务中心等政府客户、中央企业和金融机构。',
        },
        {
          img: require('./img/school3.png'),
          title: '国脉集团研发中心',
          effects: [
            {
              num: '612',
              name: '信用值',
            },
            {
              num: '612',
              name: '贡献',
            },
            {
              num: '612',
              name: '综合排名',
            },
            {
              num: '612',
              name: '业绩排名',
            },
          ],
          name: '组织标签',
          tagName1: '前段开发',
          tagName2: '后端开发',
          tagName3: '网页设计',
          timeName: '成立时间',
          time: '2018-12-11',
          personName: '负责人',
          personInfo: '黄磊',
          subTitle: '国脉集体研发中心',
          content: '国脉，是大数据治理、数字政府、营商环境、数字经济、政务服务专业提供商。创新提出“软件+咨询+数据+平台+创新业务”五位一体服务模型，拥有数据基因(DNA)和水巢(DIPS)两大系列几十项软件产品，长期为中国智慧城市、智慧政府和智慧企业提供专业咨询规划和数据服务，运营电子政务、物联网、智慧城市、数邦客、司马钱、中船通、蟠桃会、仓颉数据元、国策数据等系列行业专业平台，广泛服务于信息中心、大数据局、行政服务中心等政府客户、中央企业和金融机构。国脉，是大数据治理、数字政府、营商环境、数字经济、政务服务专业提供商。创新提出“软件+咨询+数据+平台+创新业务”五位一体服务模型，拥有数据基因(DNA)和水巢(DIPS)两大系列几十项软件产品，长期为中国智慧城市、智慧政府和智慧企业提供专业咨询规划和数据服务，运营电子政务、物联网、智慧城市、数邦客、司马钱、中船通、蟠桃会、仓颉数据元、国策数据等系列行业专业平台，广泛服务于信息中心、大数据局、行政服务中心等政府客户、中央企业和金融机构。',
        },
        {
          img: require('./img/school3.png'),
          title: '国脉集团研发中心',
          effects: [
            {
              num: '612',
              name: '信用值',
            },
            {
              num: '612',
              name: '贡献',
            },
            {
              num: '612',
              name: '综合排名',
            },
            {
              num: '612',
              name: '业绩排名',
            },
          ],
          name: '组织标签',
          tagName1: '前段开发',
          tagName2: '后端开发',
          tagName3: '网页设计',
          timeName: '成立时间',
          time: '2018-12-11',
          personName: '负责人',
          personInfo: '黄磊',
          subTitle: '国脉集体研发中心',
          content: '国脉，是大数据治理、数字政府、营商环境、数字经济、政务服务专业提供商。创新提出“软件+咨询+数据+平台+创新业务”五位一体服务模型，拥有数据基因(DNA)和水巢(DIPS)两大系列几十项软件产品，长期为中国智慧城市、智慧政府和智慧企业提供专业咨询规划和数据服务，运营电子政务、物联网、智慧城市、数邦客、司马钱、中船通、蟠桃会、仓颉数据元、国策数据等系列行业专业平台，广泛服务于信息中心、大数据局、行政服务中心等政府客户、中央企业和金融机构。国脉，是大数据治理、数字政府、营商环境、数字经济、政务服务专业提供商。创新提出“软件+咨询+数据+平台+创新业务”五位一体服务模型，拥有数据基因(DNA)和水巢(DIPS)两大系列几十项软件产品，长期为中国智慧城市、智慧政府和智慧企业提供专业咨询规划和数据服务，运营电子政务、物联网、智慧城市、数邦客、司马钱、中船通、蟠桃会、仓颉数据元、国策数据等系列行业专业平台，广泛服务于信息中心、大数据局、行政服务中心等政府客户、中央企业和金融机构。',
        },
      ],
    }
  },
  created () {
    this.getRecruitPage()
  },
}
</script>

<style scoped lang="scss">
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.organization-list-con {
  margin: 0 auto 30px auto;
  width: 1200px;
}
.dn {
  display: none;
}
.module {
  display: grid;
  margin: 25px 0;
  grid-auto-flow: row dense;
  grid-row-gap: 25px;
  grid-column-gap: 25px;
  grid-template-columns: minmax(100px, 3fr) minmax(100px, 3fr) minmax(
      100px,
      3fr
    );
  .module-item {
    position: relative;
    &:hover .hover {
      opacity: 1;
    }
  }
  .content {
    cursor: pointer;
  }
  .title {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0 20px;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    z-index: 1;
  }
  .img {
    position: relative;
    width: 100%;
    height: 200px;
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
  .effect {
    display: flex;
    justify-content: space-around;
    align-self: center;
    padding: 20px 0;
    border-bottom: 1px solid #eee;
    .item-effect {
      display: flex;
      flex-direction: column;
      align-self: center;
      padding: 0 18px;
      text-align: center;
      border-right: 1px solid #eee;
      &:last-child {
        border-right: 0;
      }
      .num {
        font-size: 20px;
      }
    }
  }
  .organization-tag {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 10px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .tag-name {
      width: 80px;
    }
    .tag-con {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      span {
        padding: 0 6px;
        line-height: 14px;
        border-right: 1px solid #ccc;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 69px;
        &:last-child {
          border: 0;
        }
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .hover {
    position: absolute;
    top: 0;
    left: 0;
    margin-bottom: 15px;
    padding: 20px;
    width: 100%;
    height: 100%;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 2;
    cursor: pointer;
    opacity: 0;
    transition: all 0.5s;
    .sub-title {
      font-size: 18px;
    }
    .btn {
      padding: 10px 30px;
      border-color: #cb3737;
      color: #cb3737;
      &:hover {
        background-color: #cb3737;
        color: #fff;
      }
    }
    .con {
      margin-bottom: 15px;
      height: 270px;
      line-height: 24px;
      text-indent: 2em;
      text-align: justify;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 11;
      -webkit-box-orient: vertical;
    }
  }
}
.page {
  text-align: center;
}
</style>