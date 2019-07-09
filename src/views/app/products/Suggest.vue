<template>
  <div class="suggest">
    <IepAppTabCard :title="title">
      <el-button class="btn" type="text" slot="right" @click="handleSubmit">产品有奖建议</el-button>
      <div>
        <div class="suggest-list">
          <div v-for="(item,index) in suggestList" :key="index" class="piece">
            <div @click="peopleDetail(item.userId)">
              <iep-img :src="item.avatar" class="photo"></iep-img>
            </div>
            <div class="box">
              <div class="piece-title">
                <span class="name" @click="peopleDetail(item.userId)">{{item.name}}</span>
                <span class="time">{{item.sendTime}}</span>
              </div>
              <p class="feed">{{item.proposeContent}}</p>
            </div>
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
      suggestList: [],
    }
  },
  methods: {
    loadList () {
      getProposeList().then(({ data }) => {
        this.suggestList = data.data
      })
    },
    handleSubmit () {
      this.$router.push('/hrms_spa/suggestion_new')
    },
    peopleDetail (val) {
      this.$router.push(`/app/personal_style/${val}`)
    },
  },
  created () {
    this.loadList()
  },
}
</script>
<style lang="scss" scoped>
.suggest-list {
  .piece {
    margin-bottom: 5px;
    overflow: hidden;
    .photo {
      width: 68px;
      height: 68px;
      margin-right: 10px;
      float: left;
      border: 1px solid #eee;
      cursor: pointer;
    }
    .box {
      float: left;
      width: 260px;
      height: 68px;
      .piece-title {
        .name {
          font-size: 16px;
          margin-right: 8px;
          cursor: pointer;
        }
        .time {
          color: #999;
        }
      }
      .feed {
        line-height: 35px;
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
      margin-bottom: 5px;
    }
  }
}
</style>
<style scoped>
.suggest >>> .el-card {
  height: 300px;
}
.suggest >>> .btn {
  margin-right: 5px;
  padding: 0;
  height: 22px;
  line-height: 22px;
  color: #cb3737;
}
.suggest >>> .btn:hover {
  opacity: 0.7;
}
</style>
