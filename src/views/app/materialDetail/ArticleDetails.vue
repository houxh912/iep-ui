<template>
  <div class="article-details">
    <div class="title">{{name}}</div>
    <div class="inform">
      <img :src="avatar" :alt="name">
      <span>{{uploaded}}</span>
      <span>{{time}}</span>
      <span><i class="iconfont icon-yanjing"></i>{{pageviews}}</span>
      <span><i class="iconfont icon-download1"></i>{{downloads}}</span>
      <div class="btn sc"><i class="iconfont icon-shoucang"></i>收藏</div>
      <div class="btn fx"><i class="iconfont icon-youxiangshixin"></i>分享</div>
      <div class="btn jc"><i class="iconfont icon-zhuyi"></i>纠错</div>
    </div>
    <div class="introduction">解决方案解决方案解决方案解决方案解决方案解决方案解决方案解决方案解决方案解决方案解决方案解决方案解决方案解决方案解决方案解决方案解决方案解决方案解决方案</div>
    <div class="content">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</div>
    <el-row class="down-load">
      相关附件：
      <div class="file" v-for="(item, index) in attachFileList" :key="index">
        <div @click="downLoad(item)"><i class="icon-fujian"></i>{{item.name}}<span class="tip">（消耗5国脉贝下载）</span></div>
      </div>
    </el-row>
    <IepAppRewardCard :total="total" :dataList="rewardList"></IepAppRewardCard>
    <IepAppEvaluationReview :dataList="reviewList"></IepAppEvaluationReview>
  </div>
</template>
<script>
import { downloadCount } from '@/api/mlms/material/datum/material'
import { downloadFile } from '@/api/common'
export default {
  data () {
    return {
      name: '国脉数据基因政务大数据整体解决方案', 
      avatar: require('./img/people.png'),
      desc: '数据基因是基于数据元和元数据的标准化编码基础上可实现数据自由编辑、抽取、复制和关联应用的核心机数体系', 
      uploaded: '胡世军', 
      time: '2019-04-24', 
      pageviews: '145', 
      downloads: '88', 
      label: ['创业女杰', '浙商', '创新创业'],
      total:'6',
      rewardList:[
        {avatar: require('./img/people.png'),name:'杨冰之'},
        {avatar: require('./img/people.png'),name:'杨冰之'},
        {avatar: require('./img/people.png'),name:'杨冰之'},
        {avatar: require('./img/people.png'),name:'杨冰之'},
      ],
      attachFileList: [
        {name:'内网2.0改造项目'},
      ],
      //评论list
      reviewList:[
        {img:'//183.131.134.242:10060/upload/iep/201904/a45b1002-ab8c-4bc7-8e6c-9638a43e6000_蟠桃会订阅号二维码.jpg',name:'姓名',evaluation:3.7,desc:'这里是内容',time:'2019-05-06 11:00',replyData:2,
          reply:[
            {img:'//cloud.govmade.com/upload/iep/201904/ce562439-de98-4d56-b5db-9f6069de3bd4_4cfcf867db7b19d84fa531373464bc4a.jpg',responder:'响应者',reviewers:'评论者',desc:'回复评论的内容',time:'2019-05-06 11:10',likeData:66,replyData:0}, 
            {img:'//cloud.govmade.com/upload/iep/201904/ce562439-de98-4d56-b5db-9f6069de3bd4_4cfcf867db7b19d84fa531373464bc4a.jpg',responder:'响应者',reviewers:'评论者',desc:'回复评论的内容',time:'2019-05-06 11:10',likeData:66,replyData:0}, 
            {img:'//cloud.govmade.com/upload/iep/201904/ce562439-de98-4d56-b5db-9f6069de3bd4_4cfcf867db7b19d84fa531373464bc4a.jpg',responder:'响应者',reviewers:'评论者',desc:'回复评论的内容',time:'2019-05-06 11:10',likeData:66,replyData:0}, 
            {img:'//cloud.govmade.com/upload/iep/201904/ce562439-de98-4d56-b5db-9f6069de3bd4_4cfcf867db7b19d84fa531373464bc4a.jpg',responder:'响应者',reviewers:'评论者',desc:'回复评论的内容',time:'2019-05-06 11:10',likeData:66,replyData:0}, 
          ],
        },
        {img:'//183.131.134.242:10060/upload/iep/201904/a45b1002-ab8c-4bc7-8e6c-9638a43e6000_蟠桃会订阅号二维码.jpg',name:'姓名',evaluation:3.7,desc:'这里是内容',time:'2019-05-06 11:00',replyData:2,reply:[],
        },
      ],
    }
  },
  methods: {
    // 附件下载
    downLoad (obj) {
      downloadFile(obj)
      // /getUpload/{id}
      downloadCount(this.formData.id)
    },
  },
}
</script>
<style lang="scss" scoped>
.article-details{
  padding: 20px 0;
  .title{
    font-size: 18px;
    color: #333;
    height: 50px;
    line-height: 50px;
  }
  .inform{
    width: 100%;
    height: 40px;
    line-height: 40px;
    position: relative;
    > img{
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: inline-block;
    }
    > span{
      margin-left: 10px;
      display: inline-block;
      >i{
        margin: 4px;
      }
      &:nth-child(4){
        margin-left: 30px;
      }
      &:nth-child(5){
        margin-left: 30px;
      }
    }
    .btn{
      position: absolute;
      top: 8px;
      font-size: 16px;
      color: #999;
      > i{
        margin: 4px;
      }
    }
    .sc{
      right: 150px;
    }
    .fx{
      right: 80px;
    }
    .jc{
      right: 10px;
    }
  }
  .introduction{
    margin: 20px 0;
    padding: 20px;
    background-color: #fafafa;
  }
  .content{
    padding: 0 20px;
  }
  .down-load {
    background-color: #fff;
    padding: 20px;
    margin-bottom: 20px;
    .file {
      cursor: pointer;
      i {
        font-size: 16px !important;
        margin-right: 10px;
      }
      .tip {
        margin-left: 10px;
        color: #999;
      }
    }
  }
}
</style>

