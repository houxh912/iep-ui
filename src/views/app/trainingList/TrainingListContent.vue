<template>
  <div class="training-list-con">
    <search></search>
    <div class="module">
      <el-card class="module-item" v-for="(item,index) in moduleList" :key="index" shadow="hover">
        <div @click="handleOpen()">
          <div class="header clearfix">
            <div class="img"><img :src="item.img" alt=""></div>
            <span class="time">{{item.time}}</span>
            <el-tag class="dn" :class="item.show" size="small">{{item.tag}}</el-tag>
          </div>
          <div class="content">
            <h4 class="item-title">{{item.title}}</h4>
            <p class="con">{{item.con}}</p>
            <div class="detail">
              <div class="classTag">
                <el-tag type="white" v-for="tag in item.tags" :key="tag.id">{{tag.tag}}</el-tag>
              </div>
              <span><i class="el-icon-view"></i>{{item.num}}</span>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <div class="page">
      <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Search from './Search'
export default {
  data () {
    return {
      moduleList: [
        {
          title: '北京市政服务事项标准化和主题事项持续',
          con: '支持各单位应用系统的表结构直接导入本系统，通过配置可实现数据元通过配置通过配置',
          tags: [
            {
              tag: '产品设计',
            },
            {
              tag: '项目管理',
            },
            {
              tag: '原型设计',
            },
          ],
          time: '2019-04-09',
          tag: '预告',
          show: 'show',
          img: require('./img/e1.jpg'),
          num: '120人浏览',
        },
        {
          title: '研发中心测试组赵雨晨培训如何应用阿里',
          con: '支持各单位应用系统的表结构直接导入本系统，通过配置可实现数据元通过配置通过配置',
          tags: [
            {
              tag: '产品设计',
            },
            {
              tag: '项目管理',
            },
            {
              tag: '原型设计',
            },
          ],
          time: '2019-04-09',
          tag: '预告',
          show: 'show',
          img: require('./img/e2.jpg'),
          num: '56人浏览',
        },
        {
          title: '如何提高人员文档撰写能力及撰写规范',
          con: '支持各单位应用系统的表结构直接导入本系统，通过配置可实现数据元通过配置通过配置',
          tags: [
            {
              tag: '产品设计',
            },
            {
              tag: '项目管理',
            },
            {
              tag: '原型设计',
            },
          ],
          time: '2019-04-09',
          tag: '预告',
          show: 'show',
          img: require('./img/e12.jpg'),
          num: '34人浏览',
        },
        {
          title: '区块链点对点技术实现电子现金系统',
          con: '支持各单位应用系统的表结构直接导入本系统，通过配置可实现数据元通过配置通过配置',
          tags: [
            {
              tag: '产品设计',
            },
            {
              tag: '项目管理',
            },
            {
              tag: '原型设计',
            },
          ],
          time: '2019-04-09',
          tag: '预告',
          img: require('./img/e4.jpg'),
          num: '112人浏览',
        },
        {
          title: 'docker微服务部署培训',
          con: '支持各单位应用系统的表结构直接导入本系统，通过配置可实现数据元通过配置通过配置',
          tags: [
            {
              tag: '产品设计',
            },
            {
              tag: '项目管理',
            },
            {
              tag: '原型设计',
            },
          ],
          tag: '预告',
          time: '2019-04-09',
          img: require('./img/e5.jpg'),
          num: '35人浏览',
        },
        {
          title: '慈溪市政务公开工作要点培训',
          con: '支持各单位应用系统的表结构直接导入本系统，通过配置可实现数据元通过配置通过配置',
          tags: [
            {
              tag: '产品设计',
            },
            {
              tag: '项目管理',
            },
            {
              tag: '原型设计',
            },
          ],
          tag: '预告',
          time: '2019-04-09',
          img: require('./img/e6.jpg'),
          num: '28人浏览',
        },
        {
          title: '佛山市企业经营准入主题式服务改革',
          con: '支持各单位应用系统的表结构直接导入本系统，通过配置可实现数据元通过配置通过配置',
          tags: [
            {
              tag: '产品设计',
            },
            {
              tag: '项目管理',
            },
            {
              tag: '原型设计',
            },
          ],
          tag: '预告',
          time: '2019-04-09',
          img: require('./img/e7.jpg'),
          num: '220人浏览',
        },
        {
          title: '蓝山县基层政务公开标准化规范化',
          con: '支持各单位应用系统的表结构直接导入本系统，通过配置可实现数据元通过配置通过配置',
          tags: [
            {
              tag: '产品设计',
            },
            {
              tag: '项目管理',
            },
            {
              tag: '原型设计',
            },
          ],
          tag: '预告',
          time: '2019-04-09',
          img: require('./img/e8.jpg'),
          num: '123人浏览',
        },
        {
          title: '江西省政务服务标准化项目分享',
          con: '支持各单位应用系统的表结构直接导入本系统，通过配置可实现数据元通过配置通过配置',
          tags: [
            {
              tag: '产品设计',
            },
            {
              tag: '项目管理',
            },
            {
              tag: '原型设计',
            },
          ],
          tag: '预告',
          time: '2019-04-09',
          img: require('./img/e9.jpg'),
          num: '235人浏览',
        },
        {
          title: '项目开发的代码规范',
          con: '支持各单位应用系统的表结构直接导入本系统，通过配置可实现数据元通过配置通过配置',
          tags: [
            {
              tag: '产品设计',
            },
            {
              tag: '项目管理',
            },
            {
              tag: '原型设计',
            },
          ],
          tag: '预告',
          time: '2019-04-09',
          img: require('./img/e10.jpg'),
          num: '156人浏览',
        },
        {
          title: '上海市青浦区行政审批事项标准化',
          con: '支持各单位应用系统的表结构直接导入本系统，通过配置可实现数据元通过配置通过配置',
          tags: [
            {
              tag: '产品设计',
            },
            {
              tag: '项目管理',
            },
            {
              tag: '原型设计',
            },
          ],
          tag: '预告',
          time: '2019-04-090',
          img: require('./img/e11.jpg'),
          num: '134人浏览',
        },
        {
          title: '浙江省目录系统普查系统业务流程分享',
          con: '支持各单位应用系统的表结构直接导入本系统，通过配置可实现数据元通过配置通过配置',
          tags: [
            {
              tag: '产品设计',
            },
            {
              tag: '项目管理',
            },
            {
              tag: '原型设计',
            },
          ],
          tag: '预告',
          time: '2019-04-090',
          img: require('./img/e12.jpg'),
          num: '146人浏览',
        },
      ],
    }
  },
  components: {
    Search,
  },
  methods: {
    handleOpen () {
      this.$router.push({
        path: '/app/training_detail',
      })
    },
  },
}
</script>

<style scoped lang="scss">
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.training-list-con {
  margin: 0 auto 30px auto;
  width: 1200px;
}
.dn {
  display: none;
}
.module {
  display: grid;
  margin: 25px 0;
  grid-auto-flow: row dense;
  grid-row-gap: 25px;
  grid-column-gap: 25px;
  grid-template-columns: minmax(100px, 3fr) minmax(100px, 3fr) minmax(
      100px,
      3fr
    );
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ebeef5;
    margin: 0 15px;
    padding: 5px 0;
    .time {
      display: inline-block;
      flex: 2;
      color: #999;
    }
    .show {
      display: inline-block;
    }
    .img {
      margin-right: 10px;
      width: 40px;
      height: 40px;
      border: 1px solid #dcdfe6;
      border-radius: 50%;
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
  .content {
    padding: 15px;
    .item-title {
      font-size: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    .con {
      margin-bottom: 1.5em;
      height: 47px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      color: #999;
    }
    .classTag {
      .el-tag {
        margin-right: 5px;
        &:hover {
          color: #cb3737;
          background: #fef0f0;
          border-color: #cb3737;
        }
      }
    }
    .detail {
      display: flex;
      margin-top: 10px;
      justify-content: space-between;
      align-items: center;
      span {
        display: inline-block;
        color: #999;
      }
    }
  }
}
.page {
  text-align: center;
}
</style>
<style scoped>
.header >>> .el-button {
  padding: 0;
  width: 22px;
  height: 22px;
  line-height: 22px;
  border-radius: 50%;
}
.module >>> .el-tag--white {
  border: 1px solid #dcdfe6;
  height: 28px;
  line-height: 26px;
  background: #fff;
  color: #606266;
}
.module >>> .el-card__body {
  padding: 0;
}
.module >>> .el-card.module-item {
  border: 1px solid #dcdfe6;
  cursor: pointer;
}
</style>
