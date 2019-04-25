<template>
  <div class="thoughts">
    <iepAppTabCard :title="title" :linkName="linkName" :data="data" isMore>
      <div class="thoughtsList">
        <div v-for="(item,index) in thoughtsList" :key="index" class="piece">
          <div class="img-con"><img :src="item.img" class="img"></div>
          <div class="box">
            <div class="pieceTitle">
              <span class="name">{{item.name}}</span>
              <span class="level">{{item.level}}</span>
            </div>
            <div class="feed">
              <span>{{item.num}}</span>
              <div class="tags">
                <span>{{item.tags1}}</span>
                <span>{{item.tags2}}</span>
                <span>{{item.tags3}}</span>
                <span>{{item.tags4}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </iepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '优秀讲师',
      data: '（53位）',
      thoughtsList: [
        { img: '../img/person/p013.jpg', name: '杨冰之', level: '顶级讲师', num: '培训次数：365', tags1: '组织管理', tags2: '智慧经济', tags3: '规划报告', tags4: '规划报告' },
        { img: '../img/person/p8.jpg', name: '邵琦凯', level: '中级讲师', num: '培训次数：53', tags1: '技术研发', tags2: '数据基因', tags3: '前端', tags4: 'Java' },
        { img: '../img/person/p014.jpg', name: '江作敏', level: '高级讲师', num: '培训次数：248', tags1: '微服务', tags2: '需求梳理', tags3: '数据基因', tags4: '咨询服务' },
      ],
      linkName: '',
    }
  },
}
</script>
<style lang="scss" scoped>
.thoughtsList {
  .piece {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
    overflow: hidden;
    cursor: pointer;
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
      float: right;
      width: 270px;
      height: 62px;
      .pieceTitle {
        .name {
          font-size: 16px;
          margin-right: 8px;
        }
        .level {
          color: #999;
        }
      }
      .feed {
        line-height: 1.4;
        color: #666;
        .tags {
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
              top: 10px;
              right: -7px;
              width: 15px;
              height: 1px;
              background-color: #666;
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
      }
    }
    &:last-child {
      margin-bottom: 12px;
    }
  }
}
</style>