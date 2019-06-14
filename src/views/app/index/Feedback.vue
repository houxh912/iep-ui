<template>
  <div class="feedback">
    <IepAppTabCard :title="title" :linkName="linkName">
      <el-button class="btn" type="text" slot="right" @click="handleSubmit">我要发表</el-button>
      <div class="feedback-list">
        <div v-for="(item,index) in feedbackList" :key="index" class="piece">
          <iep-img :src="item.avatar" class="photo"></iep-img>
          <div class="box">
            <div class="piece-title">
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
      linkName: '/hrms_spa/suggestion_new',
      feedbackList: [],
    }
  },
  methods: {
    loadList () {
      getProposeList().then(({ data }) => {
        this.feedbackList = data.data
      })
    },
    handleSubmit () {
      this.$router.push('/hrms_spa/suggestion_new')
    },
  },
  created () {
    this.loadList()
  },
}
</script>
<style lang="scss" scoped>
.feedback {
  .btn {
    margin-right: 5px;
    padding: 0;
    height: 22px;
    line-height: 22px;
  }
}
.feedback-list {
  .piece {
    margin-bottom: 20px;
    overflow: hidden;
    .photo {
      width: 68px;
      height: 68px;
      margin-right: 10px;
      float: left;
      border: 1px solid #eee;
    }
    .box {
      float: left;
      width: 445px;
      height: 68px;
      .piece-title {
        .name {
          font-size: 16px;
          margin-right: 8px;
        }
        .time {
          color: #999;
        }
      }
      .feed {
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
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
.index-card >>> .el-card__body {
  padding: 16px 0 2px;
}
.el-card {
  padding: 0 20px;
}
.feedback >>> .el-card__body {
  height: 270px;
}
</style>
