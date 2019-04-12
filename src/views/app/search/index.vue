<template>
  <div class="search">
    <el-row :gutter="20" class="gov-search">
      <el-col :span="12" :offset="6">
        <div class="grid-content">
          <h2 class="title">以奋斗者为本，做智慧国脉系!</h2>
          <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容">
              <el-button slot="append">搜索</el-button>
            </el-input>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="bg-white">
      <el-col :span="20" :offset="2">
        <div class="grid-content grid-border">
          <span class="keyword" v-text="keyword"></span>
          <span class="listName" v-for="(item,index) in listName" :key="index">{{item}}</span>
          <span class="keyMore">查看所有标签></span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="gov-info">
      <el-col :offset="2" :span="12">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>集团要闻</span>
            <el-button style="float: right; padding: 3px 0" type="text">更多></el-button>
          </div>
          <el-timeline>
            <el-timeline-item v-for="(item,index) in timeline" :key="index">
              {{item.timestamp}}
              <br />
              {{item.con}}
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card :body-style="{ padding: '0px' }" shadow="never">
          <div slot="header" class="clearfix">
            <span>集团喜讯</span>
            <el-button style="float: right; padding: 3px 0" type="text">更多></el-button>
          </div>
          <div style="padding:15px;display:inline-block; width:50%;" v-for="(item,index) in imgList" :key="index">
            <img style="width:100%;height:138px;" :src="item.imgSrc" class="image">
            <p class="imgDes" v-text="item.imgDes"></p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      keyword: '热搜词:',
      listName: ['产品设计', '项目管理', '原型设计', '平台规划', '需求分析', '流程设计'],
      timeline: [
        { con: '中国建设银行总行首席经济学家黄志凌一行前来舟山国脉考察', timestamp: '2018/4/12' },
        { con: '首届长三角营商环境论坛在沪召开，共寻营商环境优化路径', timestamp: '2018/4/12' },
        { con: '首届（2019）长三角营商环境评估与评选结果在沪召开', timestamp: '2018/4/12' },
        { con: '舟山中船通荣获国家高新技术企业', timestamp: '2018/4/12' },
        { con: '国脉海洋中标舟山生态环境数字化转型方案项目', timestamp: '2018/4/12' },
      ],
      currentDate: new Date(),
      imgList: [
        { imgSrc: require('./images/01.png'), imgDes: '热烈庆祝广州国脉公司乔迁开业' },
        { imgSrc: require('./images/02.png'), imgDes: '国脉64名开发人员获“阿里巴巴编码规范证书”' },
        { imgSrc: require('./images/03.png'), imgDes: '国脉海南项目获海南省十佳大数据应用案例' },
        { imgSrc: require('./images/04.jpg'), imgDes: '国脉数据基因4.5版在京正式发布' },
      ],
    }
  },
}
</script>

<style scoped lang="scss">
.bg-white,
.gov-search,
.gov-info {
  width: 100%;
  margin-left: 0;
  margin-right: 0;
}
.el-row {
  margin-bottom: 20px;
}
.el-row.gov-search {
  padding-top: 25px;
  padding-bottom: 25px;
  background-color: #f6f7f8;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-input-group__append {
  background-color: #cb3737;
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
      font-size: 14px;
      color: #cb3737;
    }
  }
}
.grid-content .title {
  text-align: center;
  line-height: 1.7;
  color: #cb3737;
  font-size: 20px;
}
.imgDes {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>