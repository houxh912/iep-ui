<template>
  <div class="thoughts">
    <IepAppTabCard :title="title" :linkName="linkName">
      <el-button class="charge" type="text" slot="right" @click="handlePublish">我要发表</el-button>
      <div class="thoughtsList">
        <div v-for="(item,index) in thoughtsList" :key="index" class="piece">
          <div class="img-con">
            <iep-img :src="item.avatar" class="img"></iep-img>
          </div>
          <div class="box">
            <div class="pieceTitle">
              <span class="name">{{item.name}}</span>
              <span class="time">{{item.sendTime}}</span>
            </div>
            <p class="feed">{{item.proposeContent}}</p>
          </div>
        </div>
      </div>
    </IepAppTabCard>
  </div>
</template>

<script>
import { getProposeList } from '@/api/app/cpms/channel'

export default {
  data () {
    return {
      title: '意见反馈',
      data: '（35次）',
      linkName: '',
      thoughtsList: [],
    }
  },
  methods: {
    loadList () {
      getProposeList().then(({ data }) => {
        this.thoughtsList = data.data
      })
    },
    handlePublish () {
      this.$router.push('/hrms_spa/suggestion_new')
    },
  },
  created () {
    this.loadList()
  },
}
</script>
<style lang="scss" scoped>
.title {
  font-size: 18px;
}
.datas {
  font-size: 16px;
  color: #999;
}
.thoughtsList {
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
      width: 77%;
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
</style>
<style scoped>
.thoughts >>> .el-button {
  padding: 0;
  height: 22px;
  line-height: 22px;
  color: #cb3737;
}
.thoughts >>> .el-button :hover {
  color: #f56c6c;
}
.thoughts >>> .el-card__body {
  height: 270px;
}
</style>