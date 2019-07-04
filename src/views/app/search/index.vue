<template>
  <div class="search">
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
          <span class="keyword">热搜词：</span>
          <span
            class="listName"
            v-for="(item,index) in listName"
            :key="index"
            @click="handleClick(item)"
          >{{item}}</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="gov-info">
      <el-col :offset="2" :span="11">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span style="font-size:18px;">集团要闻</span>
          </div>
          <el-timeline>
            <el-timeline-item
              v-for="(item,index) in dataList"
              @click.native="handleDetail(item.id)"
              :key="index"
            >{{item.name}}</el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
      <el-col :span="8" :offset="1">
        <el-card :body-style="{ padding: '0px' }" shadow="never">
          <div slot="header" class="clearfix">
            <span style="font-size:18px;">集团喜讯</span>
          </div>
          <div
            style="padding:15px;display:inline-block; width:50%;cursor:pointer;"
            v-for="(item,index) in imgList"
            :key="index"
            @click="$openPage(item.url)"
          >
            <iep-img style="width:100%;height:138px;" :src="item.imgSrc" class="image"></iep-img>
            <p class="imgDes" v-text="item.imgDes"></p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <IepAppFooterBar></IepAppFooterBar>
  </div>
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
        path:`/app/resource/material/material_detail/${id}`,
      })
    },
  },
}
</script>
<style scoped>
.gov-info >>> .el-timeline-item{
  cursor: pointer;
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
  left: -3px;
  width: 15px;
  height: 15px;
  background-color: #fff;
  border: 1px solid #e4e7ed;
}
.gov-info >>> .el-timeline-item__node::before {
  position: absolute;
  content: "";
  top: 4px;
  left: 4px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #e4e7ed;
}
.gov-info >>> .el-timeline-item__tail {
  border-width: 1px;
}
.gov-info >>> .el-timeline-item__tail {
  top: 15px;
}
</style>

<style lang="scss" scoped>
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
    font-size: 16px;
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
  white-space: nowrap;
  text-overflow: ellipsis;
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