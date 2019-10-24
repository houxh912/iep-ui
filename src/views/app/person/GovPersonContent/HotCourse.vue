<template>
  <div class="course-con">
    <iepAppTabCard :title="title" :linkName="linkName" :data="data" isMore>
      <div class="hot-course">
        <div class="con-course">
          <div class="con" v-for="(con, index) in conCourse" :key="index" @click="handleDetail(con)">
            <div class="img">
              <iep-img :src="con.theme_pictures" alt=""></iep-img>
            </div>
            <span class="text">{{con.training_theme}}</span>
            <span class="num">{{con.views}} 人已学习</span>
          </div>
        </div>
        <div v-for="(item, index) in hotCourse" :key="index" class="piece" @click="handleDetail(item)">
          <span class="name">{{item.training_theme}}</span>
          <span class="num">{{item.views}} 人已学习</span>
        </div>
      </div>
    </iepAppTabCard>
  </div>
</template>

<script>
import { getHottestList } from '@/api/app/hrms/'

export default {
  data () {
    return {
      title: '热门课程',
      data: '',
      hotCourse: [],
      conCourse: [],
      linkName: '/app/resource/training',
    }
  },
  methods: {
    loadList () {
      getHottestList().then(({ data }) => {
        this.conCourse = data.data.slice(0, 2)
        this.hotCourse = data.data.slice(2)
      })
    },
    handleDetail (row) {
      this.$router.push(`/app/resource/training/training_detail/${row.id}`)
    },
  },
  created () {
    this.loadList()
  },
}
</script>
<style lang="scss" scoped>
.hot-course {
  .piece {
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 15px;
    transition: 0.5s;
    .name {
      display: inline-block;
      width: 200px;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .num {
      float: right;
      height: 30px;
      line-height: 30px;
      color: #999;
    }
    &:hover {
      color: #cb3737;
      &:before {
        background-color: #cb3737;
      }
    }
    &:before {
      content: "";
      position: absolute;
      left: -15px;
      top: 14px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #999;
    }
  }
  .con-course {
    display: flex;
    margin-bottom: 5px;
    justify-content: space-between;
    .con {
      width: 48%;
      cursor: pointer;
      transition: 0.5s;
      &:hover {
        opacity: 0.7;
      }
    }
    .img {     
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      width: 100%;
      height: 90px;
      overflow: hidden;
      border: 1px solid #ebeef5;
      img {
        width: 100%;
        transition: 0.5s;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
    .num {
      color: #999;
    }
    .text {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
<style scoped>
.course-con >>> .el-card {
  height: 316px;
}
.course-con >>>.el-image{
  display: flex;
  align-items: center;
}
.course-con >>>.el-image__inner{
  height: auto;
}
</style>
