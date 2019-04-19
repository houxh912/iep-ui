<template>
  <div class="thoughts">
    <el-card class="index-card" shadow="never">
      <div slot="header" class="clearfix">
        <span class="title">{{title}}<span class="datas">{{data}}</span></span>
        <el-button class="charge" type="text">我要发表</el-button>
      </div>
      <div>
        <div class="thoughtsList">
          <div v-for="(item,index) in thoughtsList" :key="index" class="piece">
            <div class="img-con"><img :src="item.img" class="img"></div>
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
      title: '意见反馈',
      data: '（58次）',
      thoughtsList: [
        { img: '../img/person/p1.jpg', name: '张三', time: '2019-04-08', feed: '有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题' },
        { img: '../img/person/p2.jpg', name: '张三', time: '2019-04-08', feed: '有问题有问题有问题有问题有问题有问题有问题有问题' },
        { img: '../img/person/p2.jpg', name: '张三', time: '2019-04-08', feed: '有问题有问题有问题有问题有问题有问题有问题有问题' },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.title {
  font-size: 18px;
}
.datas {
  font-size: 16px;
  color: #999;
}
.thoughtsList {
  .piece {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
    overflow: hidden;
    .img-con {
      float: left;
      margin-right: 15px;
      width: 60px;
      height: 60px;
      border: 1px solid #ebeef5;
      overflow: hidden;
    }
    .img {
      width: 100%;
      height: 100%;
      transition: 0.5s;
      &:hover {
        transform: scale(1.1);
      }
    }
    .box {
      float: left;
      width: 270px;
      height: 62px;
      .pieceTitle {
        .name {
          font-size: 16px;
          margin-right: 8px;
        }
        .time {
          color: #999;
        }
      }
      .feed,
      .job {
        line-height: 1.4;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        color: #666;
        &:hover {
          color: #ba1b21;
        }
      }
    }
    &:last-child {
      margin-bottom: 12px;
    }
  }
}
</style>
<style scoped>
.thoughts >>> .el-card__body {
  padding: 15px;
}
.thoughts >>> .el-button {
  float: right;
  padding: 5px 0;
  color: #cb3737;
}
.thoughts >>> .el-button :hover {
  color: #f56c6c;
}
</style>