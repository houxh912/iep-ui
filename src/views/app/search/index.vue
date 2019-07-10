<template>
  <iep-app-layout class="search">
    <el-row :gutter="20" class="gov-search">
      <el-col :span="12" :offset="6">
        <div class="grid-content">
          <h2 class="title">以奋斗者为本，做智慧国脉系!</h2>
          <template>
            <div class="search-con">
              <operation-search @search-page="searchPage" prop="title">
                <advance-search></advance-search>
              </operation-search>
            </div>
          </template>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="bg-white">
      <el-col :span="20" :offset="2">
        <div class="grid-content grid-border">
          <span class="keyword">热搜词</span>
          <span class="listName" v-for="(item,index) in listName" :key="index" @click="handleClick(item)">{{item}}</span>
          <span class="more">查看所有标签 ></span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="gov-info">
      <el-col :offset="2" :span="11">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="header">
            <span style="font-size:18px;">集团要闻</span>
            <span class="more">更多></span>
          </div>
          <el-timeline>
            <el-timeline-item v-for="(item,index) in dataList" @click.native="handleDetail(item.id)" :key="index"><span class="item-time">{{item.time}}</span>{{item.name}}</el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
      <el-col :span="8" :offset="1">
        <el-card :body-style="{ padding: '0px' }" shadow="never">
          <div slot="header" class="clearfix">
            <span style="font-size:18px;">集团喜讯</span>
          </div>
          <div class="item-list">
            <div style="cursor:pointer;" v-for="(item,index) in imgList" :key="index" @click="$openPage(item.url)">
              <iep-img style="width:100%;height:120px;" :src="item.imgSrc" class="image"></iep-img>
              <p class="imgDes" v-text="item.imgDes"></p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </iep-app-layout>
</template>

<script>
import { getNewsList } from '@/api/app/mlms/index'
export default {
  data () {
    return {
      dataList: [],
      listName: ['产品设计', '项目管理', '原型设计', '平台规划', '需求分析', '流程设计'],
      currentDate: new Date(),
      imgList: [
        { imgSrc: 'http://183.131.134.242:10060/upload/iep/201906/77474a9a-2fea-4095-8a85-1b945541e139_1560406750698.png', imgDes: '国脉集团助力2019数博会协办，总经理郑爱军受邀发表系列演讲', url: '/app/resource/material/material_detail/8493' },
        { imgSrc: 'http://183.131.134.242:10060/upload/iep/201906/39751790-7a1a-4b16-8694-322bc435b63e_1560406565994.png', imgDes: '2019年江西全省互联网+智慧政务研讨会在南昌召开，共谋下步发展', url: '/app/resource/material/material_detail/8498' },
        { imgSrc: 'http://183.131.134.242:10060/upload/iep/201906/4bcc8f2f-07cc-42a8-8106-944aa58f035a_1560406215464.png', imgDes: '国脉海洋荣获招投标AAA级信用企业认定', url: '/app/resource/material/material_detail/8499' },
        { imgSrc: 'http://183.131.134.242:10060/upload/iep/201906/e9fd4dd8-8e01-400c-a09d-25c7df149dc0_1560397195674.png', imgDes: '舟山市副市长陈隆一行莅临国脉参观考察', url: '/app/resource/material/material_detail/8504' },
      ],
    }
  },
  created () {
    getNewsList().then(({ data }) => {
      this.dataList = data.data
    })
  },
  methods: {
    handleClick (val) {
      const v = {
        title: val,
      }
      this.$router.push({ path: '/app/search_detail', query: v })
    },
    searchPage (val) {
      this.$router.push({ path: '/app/search_detail', query: val })
    },
    handleDetail (id) {
      this.$router.push({
        path: `/app/resource/material/material_detail/${id}`,
      })
    },
  },
}
</script>
<style scoped>
.gov-info >>> .el-timeline-item {
  cursor: pointer;
}
.gov-info >>> .el-timeline {
  padding-left: 0;
}
.gov-info >>> .el-card__header {
  padding: 15px;
}
.search-con >>> .el-button {
  background-color: #ba1b21;
  color: #fff;
  border-radius: 0 3px 3px 0;
  width: 80px;
  height: 39px;
}
.search >>> .el-card {
  border: none;
}
.gov-search >>> .el-input--small input {
  height: 40px !important;
}
.gov-search >>> .el-card {
  background-color: #fafafa;
}
.gov-search >>> .search-con .input-wrapper {
  max-width: 100%;
  width: 100%;
}
.gov-search >>> .el-button--danger.is-plain {
  color: #cb3737;
  background: #fef0f0;
  border-color: #cb3737;
}
.gov-search >>> .el-button--danger.is-plain:hover,
.gov-search >>> .el-button--danger.is-plain:focus {
  background: #cb3737;
  border-color: #ba1b21;
  color: #fff;
}
.gov-info >>> .el-timeline-item__node {
  position: relative;
  top: 15px;
  left: -1px;
  width: 11px;
  height: 11px;
  background-color: #fff;
  border: 1px solid #e4e7ed;
}
.gov-info >>> .el-timeline-item__tail {
  border-width: 1px;
}
.gov-info >>> .el-timeline-item__tail {
  top: 15px;
}
.search >>> .el-input__icon {
  line-height: 40px;
}
</style>

<style lang="scss" scoped>
.gov-info {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .more {
    margin-right: 5px;
    padding: 0;
    height: 22px;
    line-height: 22px;
    color: #999;
    cursor: pointer;
    &:hover {
      color: #cb3737;
    }
  }
}
.gov-info .item-time {
  display: block;
  margin-top: 4px;
  margin-bottom: 5px;
  font-size: 12px;
  color: #999;
}
.item-list {
  display: grid;
  grid-auto-flow: row dense;
  margin-top: 30px;
  grid-row-gap: 30px;
  grid-column-gap: 30px;
  grid-template-columns: 1fr 1fr;
}
.bg-white,
.gov-search,
.gov-info {
  width: 100%;
  margin-left: 0;
  margin-right: 0;
}
.gov-info {
  margin-bottom: 150px !important;
}
.el-row {
  margin-bottom: 20px;
}
.el-row.gov-search {
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f6f7fb;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-input-group__append {
  background-color: #ebd6d6;
  color: #fff;
}
.bg-white {
  background-color: #fff;
  .keyword {
    padding-right: 15px;
    font-size: 18px;
    border-right: 1px solid #eee;
  }
  .listName {
    font-size: 14px;
    margin: 0 10px;
  }
  .grid-border {
    border: 1px solid #eee;
    border-radius: 5px;
    padding: 14px;
    span {
      cursor: pointer;
      &:first-child {
        padding-left: 5px;
      }
    }
    &:hover {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
    .more {
      float: right;
      height: 19px;
      line-height: 29px;
      color: #cb3737;
      &:hover {
        color: #f35f5f;
      }
    }
    .keyMore {
      margin-left: 20px;
      font-size: 14px;
      color: #cb3737;
    }
  }
}
.grid-content .title {
  text-align: center;
  line-height: 1.7;
  color: #cb3737;
  font-size: 24px;
}
.imgDes {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: #444;
  text-align: justify;
}
.search-con {
  display: flex;
  margin: 0 auto;
  max-width: 600px;
  justify-content: space-between;
}
.input-wrapper {
  width: 100%;
}
</style>