<template>
  <div class="thoughts">
    <el-card class="index-card" shadow="never">
      <div slot="header" class="clearfix">
        <span class="cardTitle">{{title}}</span>
        <el-button class="more" type="text">更多></el-button>
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
    <el-card class="mutual-card" shadow="never">
      <div slot="header" class="clearfix">
        <span class="cardTitle">{{titleStar}}</span>
        <el-button class="important" type="text">申请互助基金</el-button>
      </div>
      <div>
        <div class="starList">
          <div v-for="(item,index) in starList" :key="index" class="piece">
            <div class="img-con"><img :src="item.img" class="img"></div>
            <div class="box">
              <div class="pieceTitle">
                <span class="name">{{item.name}}</span>
              </div>
              <p class="job">{{item.job}}</p>
            </div>
            <div class="btn">
              <el-button type="danger" plain>送上祝福</el-button>
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
      title: '员工感想',
      titleStar: '今日寿星',
      thoughtsList: [
        { img: '../img/person/p1.jpg', name: '张三', time: '2019-04-08', feed: '有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题' },
        { img: '../img/person/p2.jpg', name: '张三', time: '2019-04-08', feed: '有问题有问题有问题有问题有问题有问题有问题有问题' },
      ],
      starList: [
        { img: '../img/person/p1.jpg', name: '钟先生', job: '国脉集体研发中心' },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.thoughtsList,
.starList {
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
      width: 230px;
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
.starList {
  .piece {
    .box {
      width: 150px;
    }
  }
}
.btn {
  display: flex;
  align-items: center;
}
.thoughts {
  .mutual-card {
    margin-top: -1px;
    border-top-color: #fff;
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
  color: #999;
}
.starList >>> .el-button {
  padding: 5px 15px;
  font-size: 12px;
  color: #cb3737;
}
.starList >>> .el-button:hover,
.starList >>> .el-button:focus {
  background: #cb3737;
  border-color: #ba1b21;
  color: #fff;
}
.mutual-card >>> .el-card__body {
  display: flex;
  align-items: center;
  height: 133px;
}
</style>