<template>
  <div class="news-con">
    <el-card class="news-list" v-for="news in newsList" :key="news.id" shadow="hover">
      <div class="text">
        <h4 class="sub-title">
          <el-tag class="classTag">{{news.class}}</el-tag>{{news.title}}
        </h4>
        <p class="list-content">{{news.content}}</p>
        <div class="list-item-description">
          <span class="time"><i class="iconfont icon-shijian"></i>{{news.time}}</span>
          <span class="see"><i class="iconfont icon-yanjing"></i>{{news.browse}}</span>
          <el-tag type="white">{{news.tag1}}</el-tag>
          <el-tag type="white">{{news.tag2}}</el-tag>
          <el-tag type="white">{{news.tag3}}</el-tag>
        </div>
      </div>
      <div class="img" v-show="isShow">
        <img :src="news.img" alt="" />
      </div>
    </el-card>
    <el-pagination background layout="prev, pager, next" :total="1000">
    </el-pagination>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isShow: true,
      newsList: [
        {
          id: '1',
          class: '要闻',
          title: '国脉总经理郑爱军荣获“浙江创业女杰”',
          content: '这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容',
          time: '2019-02-13',
          browse: '110人浏览',
          tag1: '创新创业',
          tag2: '浙江创业女杰',
          tag3: '浙商',
          img: '../img/bg/news1.jpg',
        },
        {
          id: '2',
          class: '通知',
          title: '111国脉总经理郑爱军荣获“浙江创业女杰”',
          content: '这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容',
          time: '2019-02-13',
          browse: '110人浏览',
          tag1: '创新创业',
          tag2: '浙江创业女杰',
          tag3: '浙商',
          img: '../img/bg/news2.jpg',
        },
        {
          id: '3',
          class: '团建',
          title: '国脉总经理郑爱军荣获“浙江创业女杰”',
          content: '这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容',
          time: '2019-02-13',
          browse: '110人浏览',
          tag1: '创新创业',
          tag2: '浙江创业女杰',
          tag3: '浙商',
          img: '../img/bg/news2.jpg',
        },
        {
          id: '4',
          class: '要闻',
          title: '国脉总经理郑爱军荣获“浙江创业女杰”',
          content: '这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容',
          time: '2019-02-13',
          browse: '110人浏览',
          tag1: '创新创业',
          tag2: '浙江创业女杰',
          tag3: '浙商',
          img: '../img/bg/news2.jpg',
        },
        {
          id: '5',
          class: '要闻',
          title: '国脉总经理郑爱军荣获“浙江创业女杰”',
          content: '这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容',
          time: '2019-02-13',
          browse: '110人浏览',
          tag1: '创新创业',
          tag2: '浙江创业女杰',
          tag3: '浙商',
          img: '../img/bg/news1.jpg',
        },
        {
          id: '6',
          class: '要闻',
          title: '国脉总经理郑爱军荣获“浙江创业女杰”',
          content: '这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容',
          time: '2019-02-13',
          browse: '110人浏览',
          tag1: '创新创业',
          tag2: '浙江创业女杰',
          tag3: '浙商',
          img: '../img/bg/news3.jpg',
        },
        {
          id: '7',
          class: '要闻',
          title: '国脉总经理郑爱军荣获“浙江创业女杰”',
          content: '这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容',
          time: '2019-02-13',
          browse: '110人浏览',
          tag1: '创新创业',
          tag2: '浙江创业女杰',
          tag3: '浙商',
          img: '../img/bg/news1.jpg',
        },
        {
          id: '8',
          class: '要闻',
          title: '国脉总经理郑爱军荣获“浙江创业女杰”',
          content: '这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容',
          time: '2019-02-13',
          browse: '110人浏览',
          tag1: '创新创业',
          tag2: '浙江创业女杰',
          tag3: '浙商',
          img: '../img/bg/news2.jpg',
        },
        {
          id: '9',
          class: '要闻',
          title: '国脉总经理郑爱军荣获“浙江创业女杰”',
          content: '这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容',
          time: '2019-02-13',
          browse: '110人浏览',
          tag1: '创新创业',
          tag2: '浙江创业女杰',
          tag3: '浙商',
          img: '../img/bg/news2.jpg',
        },
        {
          id: '10',
          class: '要闻',
          title: '国脉总经理郑爱军荣获“浙江创业女杰”',
          content: '这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容',
          time: '2019-02-13',
          browse: '110人浏览',
          tag1: '创新创业',
          tag2: '浙江创业女杰',
          tag3: '浙商',
          img: '../img/bg/news3.jpg',
        },
      ],
    }
  },
  created () {
    this.loadPage()
  },
}
</script>

<style lang="scss" scoped>
.news-list {
  text-align: left;
  margin-bottom: 5px;
  padding: 25px 0 20px;
  border: 0;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  .classTag {
    padding: 0 6px;
    height: 22px;
    line-height: 20px;
  }
  &:nth-child(1) {
    padding-top: 10px;
  }
  .sub-title {
    width: 100%;
    font-size: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .text {
    flex: 1;
    margin-right: 20px;
    overflow: hidden;
  }
  .list-content {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .list-item-description {
    display: flex;
    justify-content: flex-start;
    .time,
    .see {
      margin-right: 30px;
    }
    .el-tag {
      margin-right: 5px;
    }
  }
  .classTag {
    margin-right: 5px;
  }
  .img {
    flex: 0 0 22%;
    height: 140px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.news-con {
  text-align: center;
  .el-pagination {
    margin: 25px 0;
  }
}
</style>
<style scoped>
.news-list >>> .el-card__body {
  display: flex;
  padding: 0 10px;
  justify-content: space-between;
}
.news-list >>> .el-tag--white {
  border: 1px solid #dcdfe6;
  height: 28px;
  line-height: 26px;
  background: #fff;
  color: #606266;
}
</style>
