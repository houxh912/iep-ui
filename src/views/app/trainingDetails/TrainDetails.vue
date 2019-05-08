<template>
  <div>
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
      <div class="detail">
        <span class="sub-title">{{subTitle}}</span>
        <div class="detail-con" v-for="detail in detailList" :key="detail.id">
          <span>培训老师：{{detail.teacher}}</span>
          <span>培训时间：{{detail.time}}</span>
          <span>培训方式：{{detail.mode}}</span>
          <span>培训主题：{{detail.theme}}</span>
          <span>培训地点：{{detail.place}}</span>
        </div>
        <div class="classTag">
          <el-tag type="white" v-for="tag in tags" :key="tag.id">{{tag.tag}}</el-tag>
        </div>
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
      subTitle: '培训信息',
      detailList: [
        {
          teacher: '张超',
          time: '2019-03-22',
          mode: '线上微信',
          theme: '技能类',
          place: '舟山',
        },
      ],
      tags: [
        { tag: '数据服务' },
        { tag: '数据应用' },
        { tag: '数据分析' },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.article-details {
  padding: 20px 0;
  border-bottom: 1px solid #ebeef5;
  .title {
    font-size: 18px;
    color: #333;
    height: 50px;
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
  .detail {
    margin-top: 30px;
    .sub-title {
      display: block;
      margin-bottom: 18px;
      font-weight: 500;
    }
    .detail-con {
      display: flex;
      margin-bottom: 18px;
      justify-content: space-between;
      flex-wrap: wrap;
      span {
        margin-bottom: 10px;
        padding-right: 20px;
        width: 50%;
        &:last-child {
          width: 100%;
        }
      }
    }
    .classTag {
      .el-tag {
        margin-right: 5px;
        &:hover {
          color: #cb3737;
          background: #fef0f0;
          border-color: #cb3737;
        }
      }
    }
  }
}
.dn {
  display: none;
}
.show {
  display: inline-block;
}
.article-details .el-tag--white {
  border: 1px solid #dcdfe6;
  height: 28px;
  line-height: 26px;
  background: #fff;
  color: #606266;
}
</style>

