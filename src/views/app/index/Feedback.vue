<template>
  <div class="feedback">
    <el-card class="index-card" shadow="never">
        <div slot="header" class="clearfix">
            <span class="cardTitle">{{title}}</span>
            <el-button style="float: right; padding: 3px 0; coloe:#999;" type="text">我要发表</el-button>
        </div>
        <div>
            <div class="feedbackList">
                <div v-for="(item,index) in feedbackList" :key="index" class="piece">
                    <img :src="item.photo" class="photo">
                    <div class="box">
                        <div class="pieceTitle">
                            <span class="name">{{item.name}}</span>
                            <span class="time">{{item.time}}</span>
                        </div>
                        <p class="feed">{{item.feed}}</p>
                    </div>
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
        title:'意见反馈',
        feedbackList: [
            {photo:'http://img1.xcarimg.com/bbs/1364/m_20120223112918835294.jpg',name:'张三',time:'2019-04-08',feed:'有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题'},
            {photo:'http://img1.xcarimg.com/bbs/1364/m_20120223112918835294.jpg',name:'张三',time:'2019-04-08',feed:'有问题有问题有问题有问题有问题有问题有问题有问题'},
            {photo:'http://img1.xcarimg.com/bbs/1364/m_20120223112918835294.jpg',name:'张三',time:'2019-04-08',feed:'有问题有问题有问题有问题有问题有问题有问题有问题'},
        ],
    }
  },
}
</script>
<style lang="scss" scoped>
.feedbackList{
    .piece{
        margin-bottom: 20px;
        overflow: hidden;
        .photo{
            width: 68px;
            height: 68px;
            margin-right: 10px;
            float: left;
        }
        .box{
            float: left;
            width: 490px;
            height: 68px;
            .pieceTitle{
                .name{
                    font-size: 16px;
                    margin-right: 8px;
                }
                .time{
                    color: #999;
                }
            }
            .feed{
                overflow : hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }
    }
}
</style>
