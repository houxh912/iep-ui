<template>
  <div class="course-con">
    <el-card class="index-card" shadow="never">
      <div slot="header" class="clearfix">
        <span class="cardTitle" style="font-size:18px;">{{title}}</span>
        <el-button style="float: right; padding: 5px 0; color:#999;" type="text">更多></el-button>
      </div>
      <div>
        <div class="hotCourse">
          <div class="conCourse">
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
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '热门课程',
      hotCourse: [
        { name: '数据基因产品培训服务', num: '123人已学习' },
        { name: '服务数据基因', num: '23人已学习' },
        { name: 'DIPS数据基因', num: '123人已学习' }],
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
    }
  },
}
</script>
<style lang="scss" scoped>
.hotCourse {
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
      color: #666;
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
  .conCourse {
    display: flex;
    margin-bottom: 18px;
    justify-content: space-between;
    .con {
      width: 48%;
    }
    .img {
      width: 100%;
      height: 90px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
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
  height: 280px;
}
</style>
