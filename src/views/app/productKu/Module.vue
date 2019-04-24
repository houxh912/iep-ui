<template>
  <div>
    <search></search>
    <div class="module">
      <el-card class="module-item" v-for="(item,index) in moduleList" :key="index" shadow="hover">
        <div class="content">
          <i class="iconfont icon-tongyongleiziyuanpeizhi"></i>
          <div class="text">
            <h4 class="item-title">{{item.title}}</h4>
            <p class="con">{{item.con}}</p>
            <div class="classTag">
              <el-tag type="white">{{item.tag1}}</el-tag>
              <el-tag type="white">{{item.tag2}}</el-tag>
              <el-tag type="white">{{item.tag3}}</el-tag>
            </div>
          </div>
        </div>
        <div class="header clearfix">
          <span class="price">指导价：¥{{item.price}}</span>
          <el-button icon="el-icon-plus"></el-button>
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
          title: '资源配置模块',
          con: '支持各单位应用系统的表结构直接导入本系统，通过配置可实现数据元通过配置通过配置',
          tag1: '产品设计',
          tag2: '项目管理',
          tag3: '原型设计',
          price: '90000',
        },
        {
          title: '资源配置模块',
          con: '支持各单位应用系统的表结构直接导入本系统，通过配置可实现数据元通过配置通过配置',
          tag1: '产品设计',
          tag2: '项目管理',
          tag3: '原型设计',
          price: '90000',
        },
        {
          title: '资源配置模块',
          con: '支持各单位应用系统的表结构直接导入本系统，通过配置可实现数据元通过配置通过配置',
          tag1: '产品设计',
          tag2: '项目管理',
          tag3: '原型设计',
          price: '90000',
        },
        {
          title: '资源配置模块',
          con: '支持各单位应用系统的表结构直接导入本系统，通过配置可实现数据元通过配置通过配置',
          tag1: '产品设计',
          tag2: '项目管理',
          tag3: '原型设计',
          price: '90000',
        },
        {
          title: '资源配置模块',
          con: '支持各单位应用系统的表结构直接导入本系统，通过配置可实现数据元通过配置通过配置',
          tag1: '产品设计',
          tag2: '项目管理',
          tag3: '原型设计',
          price: '90000',
        },
        {
          title: '资源配置模块',
          con: '支持各单位应用系统的表结构直接导入本系统，通过配置可实现数据元通过配置通过配置',
          tag1: '产品设计',
          tag2: '项目管理',
          tag3: '原型设计',
          price: '23300',
        },
        {
          title: '资源配置模块',
          con: '支持各单位应用系统的表结构直接导入本系统，通过配置可实现数据元通过配置通过配置',
          tag1: '产品设计',
          tag2: '项目管理',
          tag3: '原型设计',
          price: '90000',
        },
        {
          title: '资源配置模块',
          con: '支持各单位应用系统的表结构直接导入本系统，通过配置可实现数据元通过配置通过配置',
          tag1: '产品设计',
          tag2: '项目管理',
          tag3: '原型设计',
          price: '45000',
        },
        {
          title: '资源配置模块',
          con: '支持各单位应用系统的表结构直接导入本系统，通过配置可实现数据元通过配置通过配置',
          tag1: '产品设计',
          tag2: '项目管理',
          tag3: '原型设计',
          price: '56000',
        },
        {
          title: '资源配置模块',
          con: '支持各单位应用系统的表结构直接导入本系统，通过配置可实现数据元通过配置通过配置',
          tag1: '产品设计',
          tag2: '项目管理',
          tag3: '原型设计',
          price: '15000',
        },
        {
          title: '资源配置模块',
          con: '支持各单位应用系统的表结构直接导入本系统，通过配置可实现数据元通过配置通过配置',
          tag1: '产品设计',
          tag2: '项目管理',
          tag3: '原型设计',
          price: '234000',
        },
        {
          title: '资源配置模块',
          con: '支持各单位应用系统的表结构直接导入本系统，通过配置可实现数据元通过配置通过配置',
          tag1: '产品设计',
          tag2: '项目管理',
          tag3: '原型设计',
          price: '125000',
        },
      ],
    }
  },
  components: {
    Search,
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
.module {
  display: grid;
  margin: 30px;
  grid-auto-flow: row dense;
  grid-row-gap: 30px;
  grid-column-gap: 30px;
  grid-template-columns: minmax(100px, 3fr) minmax(100px, 3fr) minmax(
      100px,
      3fr
    );
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #ebeef5;
    padding: 10px 15px;
    background-color: #fafafa;
    .price {
      display: inline-block;
      flex: 1;
    }
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 15px;
    i {
      display: inline-block;
      width: 50px;
      height: 50px;
      line-height: 50px;
      font-size: 30px;
      text-align: center;
      border-radius: 50%;
      background-color: #cb3737;
      color: #fff;
    }
    .text {
      width: 80%;
      .item-title {
        font-size: 15px;
      }
      .con {
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
}
</style>
