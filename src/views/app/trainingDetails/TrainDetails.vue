<template>
  <div>
    <div class="article-details">
      <div class="title">{{data.trainingTheme}}</div>
      <div class="inform">
        <div class="info">
          <div class="img">
            <iep-img :src="data.creatorImage" :alt="data.creatorName"></iep-img>
          </div>
          <span>{{data.creatorName}}</span>
          <span class="time">{{data.createTime}}</span>
          <span class="opt"><i class="iconfont icon-yanjing"></i>{{data.views}}</span>
          <!-- <span class="opt"><i class="iconfont icon-download1"></i>{{downloads}}</span> -->
        </div>
        <div class="btn-con">
          <!-- <div class="btn" v-for="item in itemList" :key="item.id"><i class="iconfont" :class="item.icon"></i>{{item.operate}}</div> -->
        </div>
      </div>
      <div class="detail">
        <span class="sub-title">{{data.trainingBrief}}</span>
        <div class="detail-con">
          <span>培训老师：{{data.trainerName}}</span>
          <span>培训时间：{{data.startTime}}</span>
          <span>培训方式：{{data.method}}</span>
          <span>培训主题：{{data.trainingTheme}}</span>
          <span>培训地点：{{data.place}}</span>
        </div>
        <el-row class="down-load" v-if="data.attachFile">
          相关附件：
          <div class="file" v-for="(item, index) in data.attachFile" :key="index">
            <div @click="downLoad(item)"><i class="icon-fujian"></i>{{item.name}}</div>
          </div>
        </el-row>
        <div class="classTag">
          <el-tag type="white" v-for="(tag, index) in data.trainingTags" :key="index" @click="$openTagDetail(tag)">{{tag}}</el-tag>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { downloadFile } from '@/api/common'
export default {
  props: {
    data: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
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
    }
  },
  methods: {
    downLoad (obj) {
      downloadFile(obj)
    },
  },
}
</script>
<style lang="scss" scoped>
.article-details {
  padding: 20px 0;
  border-bottom: 1px solid #ebeef5;
  .title {
    font-size: 22px;
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
      .time,
      .opt {
        color: #999;
      }
      .opt {
        display: flex;
        align-items: center;
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
        margin-right: 0;
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
        width: 33.333333%;
        &:last-child,
        &:nth-child(4) {
          width: 100%;
        }
      }
    }
    .down-load {
      margin-bottom: 20px;
      .file {
        cursor: pointer;
      }
    }
    .classTag {
      .el-tag {
        margin-right: 5px;
        cursor: pointer;
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

