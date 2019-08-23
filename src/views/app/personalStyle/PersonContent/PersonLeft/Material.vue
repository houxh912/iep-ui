<template>
  <div>
    <div class="news-con" v-if="pageList.length !== 0">
      <el-card class="news-list" v-for="item in pageList" :key="item.id" shadow="hover" @click.native="handleDetail(item)">
        <div class="text">
          <h4 class="sub-title">
            <el-tag class="classTag">材料</el-tag><span class="sub-title-con">{{item.name}}</span>
          </h4>
          <p class="list-content">{{item.intro}}</p>
          <div class="list-item-description">
            <span class="time"><i class="iconfont icon-shijian"></i>{{item.createTime}}</span>
            <span class="see"><i class="iconfont icon-yanjing"></i>{{`${item.views} 人浏览`}}</span>
            <div class="classTag">
              <el-tag type="white" v-for="(item, index) in item.tagKeyWords" :key="index">{{item}}</el-tag>
            </div>
          </div>
        </div>
      </el-card>
      <div style="text-align: center;margin: 20px 0;">
        <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
      </div>
    </div>
    <IepNoData v-else></IepNoData>
  </div>
</template>

<script>
import { getMaterialLPage } from '@/api/app/mlms/'

export default {
  props: {
    userId: {
      type: Number,
      default: 0,
    },
  },
  data () {
    return {
      total: 0,
      params: {
        current: 1,
        size: 10,
        creator: this.userId,
      },
      pageList: [],
    }
  },
  methods: {
    loadPage () {
      getMaterialLPage(this.params).then(({ data }) => {
        this.pageList = data.data.records
        this.total = data.data.total
      })
    },
    currentChange (val) {
      this.params.current = val
      this.loadPage()
    },
    handleDetail (row) {
      this.$router.push(`/app/resource/material/material_detail/${row.id}`)
    },
  },
  mounted () {
    this.loadPage()
  },
}
</script>

<style lang="scss" scoped>
.news-list {
  text-align: left;
  margin-bottom: 5px;
  padding: 25px 0 20px;
  border: 0;
  border-radius: 0;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  .classTag {
    padding: 0 6px;
    height: 22px;
    line-height: 20px;
  }
  .list-item-description {
    .classTag {
      height: auto;
    }
  }
  &:nth-child(1) {
    padding-top: 10px;
  }
  .sub-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    font-size: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .text {
    flex: 1;
    margin-right: 20px;
    overflow: hidden;
    .sub-title-con {
      margin-left: 10px;
    }
    &:hover .sub-title-con {
      color: #cb3737;
    }
  }
  .list-content {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .list-item-description {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 12px;
    .time,
    .see {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-right: 30px;
      color: #999;
      min-width: 72px;
      i {
        margin-right: 3px;
        font-size: 12px;
      }
    }
    .time {
      min-width: 124px;
      i {
        margin-right: 3px;
        font-size: 12px;
      }
    }
    .el-tag {
      margin-right: 5px;
      &:hover {
        color: #cb3737;
        background: #fef0f0;
        border-color: #cb3737;
      }
    }
    .classTag {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-right: 8px;
      padding: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.news-con {
  text-align: center;
  .el-pagination {
    margin: 25px 0;
  }
}
</style>
<style scoped>
.news-list >>> .el-card__body {
  display: flex;
  padding: 0 10px;
  justify-content: space-between;
}
.news-list >>> .el-tag--white {
  border: 1px solid #dcdfe6;
  height: 28px;
  line-height: 26px;
  background: #fff;
  color: #606266;
}
</style>
