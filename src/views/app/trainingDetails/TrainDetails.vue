<template>
  <div class="article-details">
    <div class="title">{{name}}</div>
    <div class="inform">
      <div class="info">
        <div class="img"><img :src="avatar" :alt="avatar"></div>
        <span>{{uploaded}}</span>
        <span class="time">{{time}}</span>
        <span><i class="iconfont icon-yanjing"></i>{{pageviews}}</span>
        <span><i class="iconfont icon-download1"></i>{{downloads}}</span>
      </div>
      <div class="btn-con">
        <div class="btn" v-for="item in itemList" :key="item.id"><i class="iconfont" :class="item.icon"></i>{{item.operate}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      name: '培训数据库优化方案',
      avatar: '../img/person/p08.jpg',
      desc: '数据基因是基于数据元和元数据的标准化编码基础上可实现数据自由编辑、抽取、复制和关联应用的核心机数体系',
      uploaded: '何舟杰',
      time: '2019-04-24',
      pageviews: '145',
      downloads: '88',
      itemList: [
        {
          icon: 'icon-shoucang',
          operate: '收藏',
        },
        {
          icon: 'icon-youxiangshixin',
          operate: '分享',
        },
        {
          icon: 'icon-zhuyi',
          operate: '纠错',
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.article-details {
  padding: 20px 0;
  .title {
    font-size: 18px;
    color: #333;
    height: 50px;
    line-height: 50px;
  }
  .inform {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 40px;
    line-height: 40px;
    .info {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .time {
        color: #999;
      }
      span {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: 10px;
        display: inline-block;
        i {
          margin: 4px;
        }
        &:nth-child(4) {
          margin-left: 30px;
        }
        &:nth-child(5) {
          margin-left: 30px;
        }
      }
      .img {
        margin-right: 10px;
        width: 40px;
        height: 40px;
        border: 1px solid #dcdfe6;
        border-radius: 50%;
        overflow: hidden;
        img {
          display: block;
          width: 100%;
          height: 100%;
          transition: 0.5s;
          border-radius: 50%;
          &:hover {
            transform: scale(1.1);
          }
        }
      }
    }
    .btn-con {
      display: flex;
      justify-content: space-between;
    }
    .btn {
      display: flex;
      align-items: center;
      margin-right: 20px;
      font-size: 14px;
      color: #999;
      cursor: pointer;
      &:hover {
        color: #cb3737;
      }
      i {
        margin-right: 5px;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>

