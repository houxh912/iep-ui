<template>
  <div class="librarys-content">
    <div style="height: 100vh;" v-loading="loading" v-if="loading"></div>
    <div class="librarys-item" v-for="(item,index) in librarys" :key="index" v-else @click="handleDetail(item)">
      <div class="user-info">
        <div class="img-con">
          <div class="img"><iep-img :src="item.avatar" alt=""></iep-img></div>
          <span class="num">{{item.staffId}}</span>
        </div>
        <div class="text">
          <div class="name-con">
            <span class="name">{{item.name}}</span>
            <span class="post">{{item.externalTitle}}
              <iep-identity-mark class="mark" :icon="t.icon" :title="t.label" v-for="(t, index) in item.identityMarks" :key="index"></iep-identity-mark>
            </span>
          </div>
          <span class="autograph">个性签名：{{item.signature}}</span>
          <div class="classTags">
            <div class="classTag">
              <el-tag type="white" v-for="(t, index) in item.tagList" :key="index">{{t}}</el-tag>
            </div>
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
import { getRecruitDetailPage } from '@/api/app/hrms/'

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
      getRecruitDetailPage(this.params).then(({data}) => {
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
      this.$router.push(`/app/personal_style/${row.id}`)
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
  .user-info {
    display: flex;
    margin-top: 15px;
    .img-con {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      align-items: center;
      align-content: center;
      .img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 1px solid #ebeef5;
        overflow: hidden;
        img {
          display: block;
          width: 100%;
          height: 100%;
          transition: 0.5s;
          border-radius: 50%;
          &:hover {
            transform: scale(1.1);
          }
        }
      }
    }
    .labs-con {
      display: flex;
      justify-content: space-between;
      .data-lab {
        padding: 0 20px;
        border-right: 1px solid #eee;
        text-align: center;
        .labTitle {
          color: #999;
        }
      }
    }
    .text {
      flex: 2;
      margin-left: 30px;
      padding-right: 20px;
    }
    .post {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #999;
      .mark {
        margin: 0 5px;
      }
    }
    .classTags {
      margin-top: 20px;
      transition: all 0.5s;
      .text-btn {
        color: #666;
        &:hover {
          color: #999;
        }
      }
    }
    .classTag {
      margin-bottom: 10px;
      .el-tag {
        margin-right: 5px;
        &:hover {
          color: #cb3737;
          background: #fef0f0;
          border-color: #cb3737;
        }
      }
    }
    .right-con {
      display: flex;
      margin-top: 15px;
      flex-direction: column;
      align-items: center;
    }
    .labs-con {
      margin-bottom: 30px;
      .count {
        font-size: 24px;
      }
      .data-lab {
        &:nth-child(3) {
          border: 0;
        }
      }
    }
    .name-con {
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      margin-bottom: 10px;
      .name {
        margin-right: 10px;
        font-size: 20px;
      }
    }
    .autograph {
      color: #666;
    }
    .dn {
      opacity: 0;
    }
    .show {
      opacity: 1;
    }
    .show1 {
      display: inline-block;
      margin: 0 5px 0 10px;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      background-color: #cb3737;
      color: #fff;
    }
    .show2 {
      display: inline-block;
      margin-right: 5px;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      line-height: 16px;
      font-size: 12px;
      text-align: center;
      background-color: #ff9961;
      color: #fff;
    }
    .show3 {
      display: inline-block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      line-height: 18px;
      font-size: 12px;
      text-align: center;
      background-color: #fec751;
      color: #fff;
    }
  }
}
</style>
