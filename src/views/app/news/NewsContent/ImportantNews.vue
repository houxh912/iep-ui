<template>
  <el-card class="box-card" shadow="never">
    <div slot="header" class="clearfix">
      <span class="sub-title">推荐要闻</span>
    </div>
    <ul class="important-list">
      <li v-for="important in importantList" :key="important.id">
        <div class="img"><img :src="important.img" alt=""></div>
        <div class="text">
          <p class="con">{{important.con}}</p>
          <span class="time">{{important.time}}</span>
        </div>
      </li>
    </ul>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      importantList: [
        {
          id: '1',
          img: '../img/bg/star-squashed.jpg',
          con: '这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容',
          time: '2019-04-03',
        },
        {
          id: '2',
          img: '../img/bg/star-squashed.jpg',
          con: '1这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容',
          time: '2019-04-03',
        },
        {
          id: '3',
          img: '../img/bg/star-squashed.jpg',
          con: '2这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容',
          time: '2019-04-03',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
ul,
li,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}
.important-list {
  li {
    display: flex;
    padding: 25px 0;
    border-bottom: 1px solid #ddd;
    justify-content: space-between;
    &:nth-child(1) {
      padding-top: 10px;
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