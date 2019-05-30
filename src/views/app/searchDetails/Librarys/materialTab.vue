<template>
  <div class="librarys-content">
    <div style="height: 100vh;" v-loading="loading" v-if="loading"></div>
    <div class="librarys-item" v-for="(item,index) in librarys" :key="index" v-else @click="handleDetail(item)">
      <div class="text">
        <h4 class="sub-title">
          <el-tag class="classTag">材料</el-tag><span class="sub-title-con">{{item.materialName}}</span>
        </h4>
        <p class="list-content">{{item.intro}}</p>
        <div class="list-item-description">
          <span class="time"><i class="iconfont icon-shijian"></i> {{item.createTime}}</span>
          <span class="see"><i class="iconfont icon-yanjing"></i> {{`${item.views} 人浏览`}}</span>
          <div class="class-tag">
            <el-tag type="info" size="mini" v-for="(item, index) in item.tagKeyWords" :key="index">{{item}}</el-tag>
          </div>
        </div>
      </div>
    </div>
    <div style="text-align: center;margin: 20px 0;">
      <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
    </div>
  </div>
</template>

<script>
import { getMaterialLPage } from '@/api/app/mlms/'

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      librarys: [],
      loading: false,
      total: 0,
      params: {
        current: 1,
        size: 10,
        name: this.title,
      },
    }
  },
  methods:{
    loadPage (title = '') {
      if (title !== '') {
        this.params.name = title
      }
      this.loading = true
      getMaterialLPage(this.params).then(({data}) => {
        this.loading = false
        this.librarys = data.data.records
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
  created () {
    this.loadPage()
  },
}
</script>
<style scoped lang="scss">
.librarys-item{
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  overflow: hidden;
  cursor: pointer;
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
      font-size: 12px;
      .time,
      .see {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-right: 30px;
        color: #999;
        i {
          margin-right: 3px;
        }
      }
      .time {
        i {
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
    }
  }
  .haveimg{
    width: 740px;
    float: left;
  }
  .img{
    width: 120px;
    height: 80px;
    float: right;
    > img{
      width: 120px;
      height: 80px;
    }
  }
}
.class-tag {
  display: inline-block;
  margin-left: 10px;
  .el-tag {
    margin-right: 5px;
  }
}
</style>
