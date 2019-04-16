<template>
  <el-card class="important-news" shadow="never">
    <div slot="header" class="clearfix">
      <span class="sub-title">{{title}}</span>
    </div>
    <el-card class="important-list" v-for="important in importantList" :key="important.id" shadow="hover">
      <div class="img"><img :src="important.img" alt=""></div>
      <div class="text">
        <p class="con">{{important.con}}</p>
        <span class="time">{{important.time}}</span>
      </div>
    </el-card>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      title: '推荐要闻',
      importantList: [
        {
          id: '1',
          img: '../img/bg/news3.jpg',
          con: '这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容',
          time: '2019-04-03',
        },
        {
          id: '2',
          img: '../img/bg/news3.jpg',
          con: '1这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容',
          time: '2019-04-03',
        },
        {
          id: '3',
          img: '../img/bg/news3.jpg',
          con: '2这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容',
          time: '2019-04-03',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.important-list {
  display: flex;
  margin-bottom: 5px;
  padding: 15px 0 10px;
  border-bottom: 1px solid #ddd;
  justify-content: space-between;
  cursor: pointer;
  &:nth-child(1) {
    padding-top: 20px;
  }
  .img {
    flex: 0 0 40%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .text {
    margin-left: 15px;
    flex: 1;
    overflow: hidden;
    .con {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
.el-card {
  border: 0;
}
.text {
  font-size: 14px;
}

.item {
  margin-right: 15px;
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>
<style scoped>
.important-list >>> .el-card__body {
  display: flex;
  padding: 0;
  justify-content: space-between;
}
.important-news >>> .el-card__body {
  padding: 0;
}
</style>