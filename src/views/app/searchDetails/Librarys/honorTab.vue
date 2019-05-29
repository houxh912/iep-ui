<template>
  <div class="librarys-content">
    <div style="height: 100vh;" v-loading="loading" v-if="loading"></div>
    <div class="librarys-item" v-for="(item,index) in librarys" :key="index" v-else>
      <div class="text">
        <h4 class="sub-title">
          <img :src="item.image" alt="">
          <div class="content">
            <div class="sub-title-con">{{item.honorQualName}}</div>
            <div class="time"><i class="iconfont icon-shijian"></i> {{item.createTime}}</div>
          </div>
        </h4>
      </div>
    </div>
    <div style="text-align: center;margin: 20px 0;">
      <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
    </div>
  </div>
</template>

<script>
import { getHonorPage } from '@/api/app/mlms/honor'

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
        honorQualName: this.title,
      },
    }
  },
  methods:{
    loadPage (title = '') {
      if (title !== '') {
        this.params.honorQualName = title
      }
      this.loading = true
      getHonorPage(this.params).then(({data}) => {
        this.loading = false
        this.librarys = data.data.records
        this.total = data.data.total
      })
    },
    currentChange (val) {
      this.params.current = val
      this.loadPage()
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
    &:hover .sub-title-con {
      color: #cb3737;
    }
    .sub-title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      img {
        width: 70px;
        height: 70x;
        margin-right: 30px;
      }
      .content {
        .sub-title-con {
          font-size: 18px;
          text-overflow: ellipsis;
          margin-bottom: 10px;
        }
        .time {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-right: 30px;
          color: #999;
          i {
            margin-right: 3px;
          }
        }
      }
    }
  }
}
</style>
