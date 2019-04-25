<template>
  <div class="past-training">
    <el-row>
      <el-col>
        <el-card :body-style=" { padding: '0px' }" shadow="never">
          <div class="sub-title clearfix" slot="header">
            <span class="cardTitle">{{title}}</span>
            <el-button class="more" type="text">更多></el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="past-training-list">
      <el-row>
        <el-col>
          <el-card shadow="hover" v-for="(item,index) in pastTrainingList" :key="index">
            <div class="img"><img :src="item.img" alt=""></div>
            <span class="item-title">{{item.title}}</span>
            <p class="content">{{item.con}}</p>
            <div class="classTag">
              <el-tag type="white">{{item.tag1}}</el-tag>
              <el-tag type="white">{{item.tag2}}</el-tag>
              <el-tag type="white">{{item.tag3}}</el-tag>
              <span class="see"><i class="iconfont icon-yanjing"></i>{{item.see}}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AppPastTraining',
  data () {
    return {
      title: '往期培训',
      pastTrainingList: [
        {
          img: require('./img/p1.jpg'),
          tag1: '标签管理',
          tag2: '标签规范',
          tag3: '内网标签',
          title: '关于加快做好内网标签工作的相关规定与建议',
          con: '重点就做好内网标签工作的几点要求，责任分工、现有标签存在的问题、标签常识、国脉内网标签设计',
          see: '112人浏览',
        },
        {
          img: require('./img/p2.jpg'),
          tag1: '数据基因部署',
          tag2: '数据基因培训',
          tag3: '数据基因',
          title: '数据基因安装部署培训',
          con: '为响应公司战略，加快团队建设，完善现有培训机制，尽快提高公司实施人员的综合能力，促进公司发展',
          see: '156人浏览',
        },
        {
          img: require('./img/p3.jpg'),
          tag1: '互联网',
          tag2: '政务服务',
          tag3: '一门一网',
          title: '佛山市互联网+政务服务内容分享',
          con: '主要是分享佛山互联网+政务服务的背景以及一门一网式架构，系统关系流程等内容。',
          see: '112人浏览',
        },
        {
          img: require('./img/p4.jpg'),
          tag1: '事项基因',
          tag2: '事项基因系统',
          tag3: '行政务服务',
          title: '事项基因系统的发展',
          con: '介绍事项基因系统的发展。系统主要有三个阶段：第一个阶段是上海青浦区行政务服务平台，第二',
          see: '112人浏览',
        },
        {
          img: require('./img/p5.jpg'),
          tag1: '内网考试',
          tag2: '分工认责',
          tag3: '内网各版块',
          title: '内网考试解读及内网各版块分工认责',
          con: '内网考试解读及内网各版块分工认责文件说明',
          see: '87人浏览',
        },
        {
          img: require('./img/p6.jpg'),
          tag1: '陈振辉',
          tag2: '佛山技术团队',
          tag3: '国脉GDS微服务',
          title: '国脉GDS微服务开发框架',
          con: '陈振辉给佛山技术团队培训国脉GDS微服务开发框架',
          see: '94人浏览',
        },
        {
          img: require('./img/p7.jpg'),
          tag1: '营商环境',
          tag2: '政务大数据',
          tag3: '软件企业',
          title: '着力打造卓越全球城市最优营商环境',
          con: '从政务大数据、政务信息资源相关行业的互联网企业、软件企业相关管理层、产品经理、技术人员等。',
          see: '65人浏览',
        },
        {
          img: require('./img/p8.jpg'),
          tag1: '项目开发实战',
          tag2: '线上和线下',
          tag3: '在线学习',
          title: '城市数据中心的基因解码',
          con: '贯穿整个课程的项目开发实战，培训模式采用创新的线上和线下结合的方式，利用在线学习平台提供的资',
          see: '123人浏览',
        },
        {
          img: require('./img//p9.jpg'),
          tag1: '目录系统',
          tag2: '业务流程',
          tag3: '相关政策',
          title: '浙江省目录系统普查系统业务流程分享',
          con: '针对大数据、互联网+政务相关政策文件进行解读，由国家级专家向学员详细地解释相关政策的具体内容',
          see: '153人浏览',
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.past-training {
  .classTag {
    .el-tag {
      margin-right: 5px;
      &:hover {
        color: #cb3737;
        background: #fef0f0;
        border-color: #cb3737;
      }
    }
    .see {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      float: right;
      font-size: 12px;
      line-height: 28px;
      color: #999;
    }
  }
  .past-training-list {
    margin: 30px 0 60px;
    .el-card {
      border: 1px solid #ebeef5;
    }
    .classTag,
    .content {
      text-align: left;
      width: 100%;
    }
    .item-title {
      margin: 10px 0;
      font-size: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .content {
      overflow: hidden;
      height: 50px;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      color: #999;
    }
    .img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 1px solid #ebeef5;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        transition: 0.5s;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
}
</style>
<style scoped>
.past-training >>> .el-card {
  border: 0;
}
.past-training-list >>> .el-card__body {
  display: flex;
  align-items: center;
  align-content: center;
  flex-direction: column;
}
.past-training-list >>> .el-tag--white {
  border: 1px solid #dcdfe6;
  max-width: 70px;
  height: 28px;
  line-height: 26px;
  background: #fff;
  color: #606266;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.past-training-list >>> .el-col {
  display: grid;
  grid-auto-flow: row dense;
  grid-row-gap: 30px;
  grid-column-gap: 30px;
  grid-template-columns: minmax(100px, 3fr) minmax(100px, 3fr) minmax(
      100px,
      3fr
    );
}
</style>