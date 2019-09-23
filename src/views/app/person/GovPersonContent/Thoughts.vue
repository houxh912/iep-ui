<template>
  <div class="thoughts">
    <IepAppTabCard class="top" :title="title" :linkName="linkName">
      <div class="title-right" slot="right">
        <el-button class="btn" type="text" @click="getMore">更多></el-button>
        <el-button class="publish" type="text" @click="handlePublish">我要发布</el-button>
      </div>
      <div class="thoughts-list">
        <div v-for="(item, index) in thoughtsList" :key="index" class="piece" @click="handleDetail(item.userId)">
          <div class="img-con">
            <iep-img :src="item.avatar" class="img"></iep-img>
          </div>
          <div class="box">
            <div class="piece-title">
              <span class="name">{{item.userName}}</span>
              <span class="time">{{item.createTime}}</span>
            </div>
            <p class="feed">{{item.content}}</p>
          </div>
        </div>
      </div>
    </IepAppTabCard>

    <IepAppTabCard class="bottom mutual-card" :title="titleStar" :linkName="linkName">
      <!-- <el-button class="important" type="text" slot="right">申请互助基金</el-button> -->
      <div class="star-list">
        <div class="has-data" v-if="starList.length > 0">
          <div v-for="(item, index) in starList" :key="index" class="piece">
            <div class="img-con" @click="handleDetail(item.id)">
              <iep-img :src="item.avatar" class="img"></iep-img>
            </div>
            <div class="box" @click="handleDetail(item.id)">
              <div class="piece-title">
                <span class="name">{{item.name}}</span>
              </div>
              <p class="job" v-for="(item, index) in item.orgList" :key="index">{{item}}</p>
            </div>
            <div class="btn">
              <el-button type="danger" plain @click="sendBlessing(item)">送上祝福</el-button>
            </div>
          </div>
        </div>
        <div class="no-data" v-else>常怀感激之情、常抱进取之心、常存敬畏之念</div>
      </div>
    </IepAppTabCard>
    <!-- 祝福 -->
    <blessing-dialog ref="blessing"></blessing-dialog>
    <!-- 发表说说 -->
    <publish-dialog ref="publish" @load-page="getThoughtsList"></publish-dialog>
  </div>
</template>

<script>
import { getRecruitBirthday } from '@/api/app/hrms/'
import { getThoughtsList } from '@/api/app/cpms/channel'
import BlessingDialog from '@/views/app/components/ThoughtsDialog/Blessing'
import PublishDialog from '@/views/app/components/ThoughtsDialog/Publish'

export default {
  components: { BlessingDialog, PublishDialog },
  data () {
    return {
      title: '员工说说',
      titleStar: '今日寿星',
      thoughtsList: [],
      starList: [],
      linkName: '/app/more_thoughts',
    }
  },
  methods: {
    sendBlessing (row) {
      this.$refs['blessing'].open({ id: row.id, name: row.name })
    },
    getBirthdayList () {
      getRecruitBirthday().then(({ data }) => {
        this.starList = data.data
      })
    },
    getThoughtsList () {
      getThoughtsList().then(({ data }) => {
        this.thoughtsList = data.data
      })
    },
    getMore () {
      this.$router.push(this.linkName)
    },
    handlePublish () {
      this.$refs['publish'].open()
    },
    handleDetail (id) {
      this.$router.push(`/app/personal_style/${id}`)
    },
  },
  created () {
    this.getBirthdayList()
    this.getThoughtsList()
  },
}
</script>
<style lang="scss" scoped>
.title-right {
  display: inline-block;
  width: 244px;
  height: 24px;
  line-height: 24px;
  > .publish {
    margin-right: 10px;
    color: #cb3737 !important;
    &:hover {
      opacity: 0.7;
    }
  }
}
.star-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  //overflow-y: scroll;
  .has-data {
    padding: 20px 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }
  .piece {
    .piece-title {
      margin-bottom: 7px;
      line-height: 14px;
    }
  }
  .no-data {
    margin-left: 15px;
    text-align: center;
    font-size: 16px;
    color: #cb3737;
  }
}
.thoughts-list,
.star-list {
  width: 100%;
  .piece {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 15px;
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
      width: 274px;
      height: 64px;
      .piece-title {
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
      .job {
        margin-bottom: 3px;
        line-height: 18px;
      }
    }
    &:last-child {
      margin-bottom: 12px;
    }
  }
}
.star-list {
  .piece {
    .box {
      width: 150px;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
}
.btn {
  display: flex;
  align-items: center;
}
.thoughts {
  .mutual-card {
    margin-top: -15px;
    border-top-color: #fff;
  }
}
::-webkit-scrollbar {
  border-radius: 10px;
  width: 6px;
  background-color: #fff;
}
::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #fff;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #ddd;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
  display: none;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}
:hover ::-webkit-scrollbar-thumb {
  display: block;
}
.bottom {
  margin-top: -16px;
}
</style>
<style scoped>
.top >>> .el-card__body {
  height: 165px;
}
.thoughts >>> .el-button {
  float: right;
  padding: 0;
  color: #999;
  height: 24px;
  transition: all 0.5s;
}
.thoughts >>> .el-button:hover {
  color: #cb3737;
}
.star-list >>> .el-button {
  padding: 5px 15px;
  font-size: 12px;
  color: #cb3737;
}
.star-list >>> .el-button:hover,
.star-list >>> .el-button:focus {
  background: #cb3737;
  border-color: #ba1b21;
  color: #fff;
}
.mutual-card >>> .el-card__body {
  display: flex;
  align-items: center;
  padding: 0;
  height: 104px;
  overflow: hidden;
}
.thoughts >>> .title {
  height: 22px;
  line-height: 22px;
}
.thoughts {
  height: 374px;
  overflow: hidden;
  border-bottom: 1px solid #ebeef5;
}
</style>