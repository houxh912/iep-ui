<template>
  <div class="course-con">
    <iepAppTabCard :title="title" :linkName="linkName" :data="data" isMore>
      <div class="hot-course">
        <div class="con-course">
          <div class="con" v-for="con in conCourse" :key="con.id">
            <div class="img"><img :src="con.img" alt=""></div>
            <span class="text">{{con.text}}</span>
            <span class="num">{{con.num}}</span>
          </div>
        </div>
        <div v-for="(item,index) in hotCourse" :key="index" class="piece">
          <span class="name">{{item.name}}</span>
          <span class="num">{{item.num}}</span>
        </div>
      </div>
    </iepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '热门课程',
      data: '(37节)',
      hotCourse: [
        { name: '数据基因产品培训服务', num: '113人已学习' },
        { name: 'JAVA高级开发架构师课程', num: '78人已学习' },
        { name: 'H5前端基础入门教程', num: '145人已学习' }],
      conCourse: [
        {
          id: 1,
          img: '../img/bg/k1.jpg',
          text: 'JAVA高级开发 架构师课程',
          num: '55人已学习',
        },
        {
          id: 2,
          img: '../img/bg/k2.jpg',
          text: 'Html5+css3前段开发课程',
          num: '35人已学习',
        },
      ],
      linkName: '',
    }
  },
}
</script>
<style lang="scss" scoped>
.hot-course {
  .piece {
    cursor: pointer;
    position: relative;
    margin-left: 15px;
    .name {
      display: inline-block;
      width: 200px;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .num {
      float: right;
      height: 30px;
      line-height: 30px;
      color: #999;
    }
    &:hover {
      color: #cb3737;
      &:before {
        background-color: #cb3737;
      }
    }
    &:before {
      content: "";
      position: absolute;
      left: -15px;
      top: 14px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #999;
    }
  }
  .con-course {
    display: flex;
    margin-bottom: 10px;
    justify-content: space-between;
    .con {
      width: 48%;
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
    }
    .img {
      margin-bottom: 5px;
      width: 100%;
      height: 90px;
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
    .num {
      color: #999;
    }
    .text {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
<style scoped>
.course-con >>> .el-card__body {
  height: 270px;
}
</style>
