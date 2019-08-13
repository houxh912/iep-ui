<template>
  <div class="thoughts">
    <div class="thoughtsList">
      <div v-for="(item,index) in thoughtsList" :key="index" class="piece">
        <div class="img-con">
          <iep-img :src="item.projectMentorAvatar" class="img"></iep-img>
        </div>
        <div class="box">
          <div class="pieceTitle">
            <span class="name">{{item.projectMentorName}}</span>
          </div>
          <p class="feed">担任次数：{{item.projectCount}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getProjectExcellentemployee } from '@/api/app/prms/'
export default {
  data () {
    return {
      thoughtsList: [],
    }
  },
  created () {
    getProjectExcellentemployee({ type: 'mentor' }).then(({ data }) => {
      this.thoughtsList = data.data.slice(0, 4)
    })
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
    margin-bottom: 25px;
    overflow: hidden;
    transition: 0.5s;
    .img-con {
      margin-right: 15px;
      min-width: 60px;
      max-width: 60px;
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
      height: 62px;
      .pieceTitle {
        margin-bottom: 10px;
        line-height: 14px;
        .name {
          font-size: 15px;
          font-weight: 700;
          margin-right: 8px;
          line-height: 24px;
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
      .feed {
        text-align: justify;
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
  margin-right: 5px;
  height: 22px;
  line-height: 22px;
  padding: 0;
  color: #cb3737;
}
.thoughts >>> .el-button :hover {
  color: #f56c6c;
}

.thoughts >>> .el-card {
  height: 318px;
}
</style>