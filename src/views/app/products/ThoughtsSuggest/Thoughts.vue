<template>
  <div class="suggest">
    <div>
      <div class="suggest-list">
        <div v-for="(item,index) in suggestList" :key="index" class="piece">
          <div @click="peopleDetail(item.userId)">
            <iep-img :src="item.avatar" class="photo"></iep-img>
          </div>
          <div class="box">
            <div class="piece-title">
              <span class="name" @click="peopleDetail(item.userId)">{{item.userName}}</span>
              <span class="time">{{item.createTime}}</span>
            </div>
            <p class="feed" @click="thoughtsDetail(item.thoughtsId)">{{item.content}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getTopicThoughts } from '@/api/cpms/thoughts'
export default {
  data () {
    return {
      suggestList: [],
      params: {
        current: 1,
        size: 10,
        topicId: 40,
      },
    }
  },
  methods: {
    loadList () {
      getTopicThoughts(this.params).then(({ data }) => {
        this.suggestList = data.data.records.slice(0, 3)
      })
    },
    peopleDetail (val) {
      this.$router.push(`/app/personal_style/${val}`)
    },
    thoughtsDetail (id) {
      this.$router.push(`/app/thought_detail/${id}`)
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
    margin-bottom: 15px;
    overflow: hidden;
    .photo {
      width: 62px;
      height: 62px;
      margin-right: 10px;
      float: left;
      border: 1px solid #eee;
      cursor: pointer;
    }
    .box {
      float: left;
      width: 260px;
      height: 62px;
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
        -webkit-line-clamp: 1;
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
  height: 306px;
}
</style>
