<template>
  <div>
    <div class="breadcrumb-wrapper">
      <el-breadcrumb class="breadcrumb-item" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in routerMatch" :key="item.path" :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="material">
      <div class="library">
        <div class="items" v-for="(item, index) in dataList" :key="index">
          <div class="avatar">
            <img :src="item.avatar" alt="">
          </div>
          <div class="content">
            <div class="title">
              <div class="name">{{item.userName}}</div>
              <div class="date"><i class="icon-shijian"></i> {{item.createTime}}</div>
            </div>
            <div class="item">{{item.content}}</div>
            <div class="footer">
              <div class="button"><i class="icon-like"></i> 点赞（0）</div>
              <div class="button"><i class="icon-pinglun1"></i> 评论（0）</div>
              <div class="button"><i class="icon-yuanbao"></i> 打赏</div>
            </div>
          </div>
        </div>
      </div>
      <div style="text-align: center;margin: 20px 0;">
        <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { geTallPage } from '@/api/cpms/thoughts'
const initParams = () => {
  return {
    current: 1,
    size: 10,
  }
}

export default {
  components: {  },
  data () {
    return {
      routerMatch: [
        {
          path: '/app/index',
          name: '首页',
        }, 
        {
          path: '/app/person',
          name: '国脉人',
        },
        {
          path: '/app/more_thoughts',
          name: '说说列表',
        },
      ],
      dataList: [
        {},
      ],
      total: 0,
      params: initParams(),
    }
  },
  methods: {
    loadPage () {
      geTallPage(this.params).then(({data}) => {
        this.dataList = data.data.records
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
<style lang="scss" scoped>
.breadcrumb-wrapper {
  .breadcrumb-item {
    margin: 20px auto 0;
    width: 1200px;
    padding: 0 0 20px 20px;
  }
}
.material {
  width: 1200px;
  margin: 0 auto;
  border-top: 1px solid #eee;
  .library{
    margin-top: 20px;
    .items {
      margin-bottom: 40px;
      display: flex;
      .avatar {
        width: 115px;
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }
      }
      .content {
        flex: 1;
        margin-top: 5px;
        .title {
          display: flex;
          .name {
            font-size: 16px;
            color: #5883ce;
          }
          .date {
            padding: 2px 0 0 40px;
            color: #666;
            i {
              font-size: 14px !important;
            }
          }
        }
        .item {
          margin-top: 7px;
        }
        .footer {
          margin-top: 20px;
          display: flex;
          font-size: 14px;
          .button {
            margin-right: 20px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
