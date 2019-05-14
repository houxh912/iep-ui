<template>
  <div>
    <search></search>
    <div class="person">
      <div class="person-item" v-for="(item,index) in personList" :key="index">
        <div class="img"><img :src="item.imgSrc" a//183.131.134.242:10060/upload/iep/201904/e29cedd1-efba-4082-a966-151153b77f28_5D559C5D-76D2-40A8-9150-B5D0D87DAE31.pnglt=""></div>
        <div class="text">
          <span class="name">{{item.name}}<span class="dn show1" :class="item.show1">V</span><span class="dn show2" :class="item.show2">内</span></span>
          <span class="job">{{item.job}}</span>
          <span class="sign">
            <span v-for="sign in item.signs" :key="sign.id">{{sign.sign}}</span>
          </span>
        </div>
      </div>
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
      personList: [
        {          imgSrc: '//183.131.134.242:10060/upload/iep/201904/e29cedd1-efba-4082-a966-151153b77f28_5D559C5D-76D2-40A8-9150-B5D0D87DAE31.png//183.131.134.242:10060/upload/iep/201904/e29cedd1-efba-4082-a966-151153b77f28_5D559C5D-76D2-40A8-9150-B5D0D87DAE31.png', name: '高新民', job: '中国互联网协会副理事长、国家信息化专家',
          signs: [
            { sign: '信息化' },
            { sign: '互联网' },
            { sign: '互联网协会' },
          ],
          show1: 'show', show2: 'show'        },
        {          imgSrc: '//183.131.134.242:10060/upload/iep/201904/e29cedd1-efba-4082-a966-151153b77f28_5D559C5D-76D2-40A8-9150-B5D0D87DAE31.png', name: '朱森第', job: '中国机械工业联合会副会长',
          signs: [
            { sign: '人工智能' },
            { sign: '互联网' },
            { sign: '智能制造' },
          ],
          show1: 'show', show2: 'show'        },
        {          imgSrc: '//183.131.134.242:10060/upload/iep/201904/e29cedd1-efba-4082-a966-151153b77f28_5D559C5D-76D2-40A8-9150-B5D0D87DAE31.png', name: '卢绍鸿', job: '项目经理',
          signs: [
            { sign: '数据分析' },
            { sign: '信息资源目录编制' },
            { sign: '法人库' },
          ],
          show1: 'show', show2: 'show'        },
        {          imgSrc: '//183.131.134.242:10060/upload/iep/201904/e29cedd1-efba-4082-a966-151153b77f28_5D559C5D-76D2-40A8-9150-B5D0D87DAE31.png', name: '张金星', job: '高级咨询师、智慧企业研究专家',
          signs: [
            { sign: '互联网+' },
            { sign: '智慧企业' },
            { sign: '咨询服务' },
          ],
          show1: 'show', show2: 'show'        },
        {          imgSrc: '//183.131.134.242:10060/upload/iep/201904/e29cedd1-efba-4082-a966-151153b77f28_5D559C5D-76D2-40A8-9150-B5D0D87DAE31.png', name: '金婧', job: '智慧政府研究专家',
          signs: [
            { sign: '互联网' },
            { sign: '智慧政府' },
            { sign: '电子政务' },
          ]        },
        {          imgSrc: '//183.131.134.242:10060/upload/iep/201904/e29cedd1-efba-4082-a966-151153b77f28_5D559C5D-76D2-40A8-9150-B5D0D87DAE31.png', name: '张慧', job: '智慧企业研究专家',
          signs: [
            { sign: '智慧企业' },
            { sign: '智慧政府' },
            { sign: '电子政务' },
          ]        },
        {          imgSrc: '//183.131.134.242:10060/upload/iep/201904/e29cedd1-efba-4082-a966-151153b77f28_5D559C5D-76D2-40A8-9150-B5D0D87DAE31.png', name: '孙泽红', job: '信息化与大数据研究专家',
          signs: [
            { sign: '互联网+政务' },
            { sign: '政务大数据' },
            { sign: '信息化' },
          ]        },
        {          imgSrc: '//183.131.134.242:10060/upload/iep/201904/e29cedd1-efba-4082-a966-151153b77f28_5D559C5D-76D2-40A8-9150-B5D0D87DAE31.png', name: '陈乐燕', job: '政务大数据咨询研究专家',
          signs: [
            { sign: '互联网+政务服务' },
            { sign: '电子政务' },
            { sign: '信息资源' },
          ],
          show1: 'show', show2: 'show'        },
        {          imgSrc: '//183.131.134.242:10060/upload/iep/201904/e29cedd1-efba-4082-a966-151153b77f28_5D559C5D-76D2-40A8-9150-B5D0D87DAE31.png', name: '王玲', job: '智慧政府研究专家',
          signs: [
            { sign: '智慧政府' },
            { sign: '政府网站' },
            { sign: '政务信息资源' },
          ]        },
        {          imgSrc: '//183.131.134.242:10060/upload/iep/201904/e29cedd1-efba-4082-a966-151153b77f28_5D559C5D-76D2-40A8-9150-B5D0D87DAE31.png', name: '周德铭', job: '国家促进大数据发展专家委员会委员',
          signs: [
            { sign: '信息化' },
            { sign: '电子政务' },
            { sign: '信息资源' },
          ],
          show1: 'show', show2: 'show'        },
        {          imgSrc: '//183.131.134.242:10060/upload/iep/201904/e29cedd1-efba-4082-a966-151153b77f28_5D559C5D-76D2-40A8-9150-B5D0D87DAE31.png', name: '王金平', job: '中国国际工程咨询公司办公厅主任、国家',
          signs: [
            { sign: '信息化' },
          ], show1: 'show'        },
        {          imgSrc: '//183.131.134.242:10060/upload/iep/201904/e29cedd1-efba-4082-a966-151153b77f28_5D559C5D-76D2-40A8-9150-B5D0D87DAE31.png', name: '汪玉凯', job: '国家行政学院教授、国家信息化专家咨询',
          signs: [
            { sign: '信息化' },
            { sign: '电子政务' },
            { sign: '政府管理' },
          ]        },
        {          imgSrc: '//183.131.134.242:10060/upload/iep/201904/e29cedd1-efba-4082-a966-151153b77f28_5D559C5D-76D2-40A8-9150-B5D0D87DAE31.png', name: '汪向东', job: '中国社科院信息化研究中心主任',
          signs: [
            { sign: '互联网经济' },
            { sign: '网络经济' },
          ],
          show1: 'show'        },
        {          imgSrc: '//183.131.134.242:10060/upload/iep/201904/e29cedd1-efba-4082-a966-151153b77f28_5D559C5D-76D2-40A8-9150-B5D0D87DAE31.png', name: '姜奇平', job: '中国社会科学院信息化研究中心秘书长',
          signs: [
            { sign: '信息化' },
            { sign: '网络经济' },
            { sign: '经济学会' },
          ]        },
        {          imgSrc: '//183.131.134.242:10060/upload/iep/201904/e29cedd1-efba-4082-a966-151153b77f28_5D559C5D-76D2-40A8-9150-B5D0D87DAE31.png', name: '胡小明', job: '中国信息协会原副会长',
          signs: [
            { sign: '电子政务' },
            { sign: '信息化' },
            { sign: '信息资源' },
          ]        },
        {          imgSrc: '//183.131.134.242:10060/upload/iep/201904/e29cedd1-efba-4082-a966-151153b77f28_5D559C5D-76D2-40A8-9150-B5D0D87DAE31.png', name: '吕本富', job: '国科学院大学经管学院教授',
          signs: [
            { sign: '数据服务' },
            { sign: '组织建设' },
            { sign: '网络经济' },
          ]        },
        {          imgSrc: '//183.131.134.242:10060/upload/iep/201904/e29cedd1-efba-4082-a966-151153b77f28_5D559C5D-76D2-40A8-9150-B5D0D87DAE31.png', name: '王路燕', job: '国脉集团总助、国脉海洋常务副总',
          signs: [
            { sign: '互联网+' },
            { sign: '大数据' },
            { sign: '数据基因' },
          ], show1: 'show', show2: 'show'        },
        {          imgSrc: '//183.131.134.242:10060/upload/iep/201904/e29cedd1-efba-4082-a966-151153b77f28_5D559C5D-76D2-40A8-9150-B5D0D87DAE31.png', name: '李凯', job: '智慧门户咨询规划师、高级咨询师',
          signs: [
            { sign: '智慧政府' },
            { sign: '政务服务' },
            { sign: '网站规划' },
          ], show1: 'show', show2: 'show'        },
      ],
    }
  },
  components: {
    Search,
  },
}
</script>

<style scoped lang="scss">
.person {
  display: grid;
  grid-auto-flow: row dense;
  grid-row-gap: 25px;
  grid-column-gap: 25px;
  grid-template-columns: minmax(100px, 3fr) minmax(100px, 3fr) minmax(
      100px,
      3fr
    );
  .person-item {
    display: flex;
    .img {
      margin-right: 15px;
      margin-bottom: 25px;
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
      .job {
        color: #888;
      }
      .sign {
        color: #aaa;
        span {
          position: relative;
          display: inline-block;
          padding: 0 10px;
          cursor: pointer;
          &:hover {
            color: #ba1b21;
          }
          &:nth-child(1) {
            padding-left: 0;
          }
          &::before {
            position: absolute;
            content: "";
            top: 15px;
            right: -7px;
            width: 15px;
            height: 1px;
            background-color: #aaa;
            transform: rotate(125deg);
            -o-transform: rotate(125deg);
            -moz-transform: rotate(125deg);
            -webkit-transform: rotate(125deg);
          }
          &:last-child::before {
            background-color: #fff;
          }
        }
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
    }
  }
}
.page {
  text-align: center;
}
</style>
