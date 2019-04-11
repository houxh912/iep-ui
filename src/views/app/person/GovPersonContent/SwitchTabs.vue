<template>
  <div class="switch-tabs">
    <el-card class="index-card" shadow="never">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="学习资源" name="first">
          <div class="learningList">
            <div v-for="(item,index) in learningList" :key="index" class="piece">
              <span>{{item.text}}</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="新人必读" name="second">
          <div class="readList">
            <div v-for="(item,index) in readList" :key="index" class="piece">
              <span>{{item.text}}</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="制度文件" name="third">
          <div class="documentsList">
            <div v-for="(item,index) in documentsList" :key="index" class="piece">
              <span>{{item.text}}</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="团建活动" name="fourth">
          <div class="leadershipList">
            <div v-for="(item,index) in leadershipList" :key="index" class="piece">
              <span>{{item.text}}</span>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-button class="more" type="text">更多></el-button>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeName: 'first',
      learningList: [{ text: '国脉海洋获质量管理系认证' }, { text: '舟山国脉考察' }, { text: '中国建设银行总行首席经济学家黄志凌一行莅临舟山国脉考察' }, { text: '热烈庆祝广州国脉公司乔迁开业' }, { text: '国脉总经理郑爱军荣获“浙江创业女杰' }, { text: '国脉物联网两大研究中心简介' }, { text: '国脉物联网3.0版上线公告' }, { text: '国脉物联网两大研究中心简介' }, { text: '国脉物联网3.0版上线公告' }, { text: '国脉物联网两大研究中心简介' }, { text: '国脉物联网3.0版上线公告' }, { text: '国脉物联网两大研究中心简介' }, { text: '国脉物联网3.0版上线公告' }, { text: '国脉物联网两大研究中心简介' }, { text: '国脉物联网3.0版上线公告' }, { text: '国脉物联网两大研究中心简介' }, { text: '国脉物联网3.0版上线公告' }, { text: '国脉物联网两大研究中心简介' }, { text: '国脉物联网3.0版上线公告' }, { text: '国脉物联网两大研究中心简介' }, { text: '国脉物联网3.0版上线公告' }, { text: '国脉物联网两大研究中心简介' }, { text: '国脉物联网3.0版上线公告' }, { text: '国脉物联网3.0版上线公告' }],
      readList: [{ text: '111国脉海洋获质量管理系认证' }, { text: '舟山国脉考察' }, { text: '中国建设银行总行首席经济学家黄志凌一行莅临舟山国脉考察' }, { text: '热烈庆祝广州国脉公司乔迁开业' }, { text: '国脉总经理郑爱军荣获“浙江创业女杰' }, { text: '国脉物联网两大研究中心简介' }, { text: '国脉物联网3.0版上线公告' }, { text: '国脉物联网两大研究中心简介' }, { text: '国脉物联网3.0版上线公告' }, { text: '国脉物联网两大研究中心简介' }, { text: '国脉物联网3.0版上线公告' }, { text: '国脉物联网两大研究中心简介' }, { text: '国脉物联网3.0版上线公告' }, { text: '国脉物联网两大研究中心简介' }, { text: '国脉物联网3.0版上线公告' }, { text: '国脉物联网两大研究中心简介' }, { text: '国脉物联网3.0版上线公告' }, { text: '国脉物联网两大研究中心简介' }, { text: '国脉物联网3.0版上线公告' }, { text: '国脉物联网两大研究中心简介' }, { text: '国脉物联网3.0版上线公告' }, { text: '国脉物联网两大研究中心简介' }, { text: '国脉物联网3.0版上线公告' }, { text: '国脉物联网3.0版上线公告' }],
      documentsList: [{ text: '222国脉海洋获质量管理系认证' }, { text: '舟山国脉考察' }, { text: '中国建设银行总行首席经济学家黄志凌一行莅临舟山国脉考察' }, { text: '热烈庆祝广州国脉公司乔迁开业' }, { text: '国脉总经理郑爱军荣获“浙江创业女杰' }, { text: '国脉物联网两大研究中心简介' }, { text: '国脉物联网3.0版上线公告' }, { text: '国脉物联网两大研究中心简介' }, { text: '国脉物联网3.0版上线公告' }, { text: '国脉物联网两大研究中心简介' }, { text: '国脉物联网3.0版上线公告' }, { text: '国脉物联网两大研究中心简介' }, { text: '国脉物联网3.0版上线公告' }, { text: '国脉物联网两大研究中心简介' }, { text: '国脉物联网3.0版上线公告' }, { text: '国脉物联网两大研究中心简介' }, { text: '国脉物联网3.0版上线公告' }, { text: '国脉物联网两大研究中心简介' }, { text: '国脉物联网3.0版上线公告' }, { text: '国脉物联网两大研究中心简介' }, { text: '国脉物联网3.0版上线公告' }, { text: '国脉物联网两大研究中心简介' }, { text: '国脉物联网3.0版上线公告' }, { text: '国脉物联网3.0版上线公告' }],
      leadershipList: [{ text: '333国脉海洋获质量管理系认证' }, { text: '舟山国脉考察' }, { text: '中国建设银行总行首席经济学家黄志凌一行莅临舟山国脉考察' }, { text: '热烈庆祝广州国脉公司乔迁开业' }, { text: '国脉总经理郑爱军荣获“浙江创业女杰' }, { text: '国脉物联网两大研究中心简介' }, { text: '国脉物联网3.0版上线公告' }, { text: '国脉物联网两大研究中心简介' }, { text: '国脉物联网3.0版上线公告' }, { text: '国脉物联网两大研究中心简介' }, { text: '国脉物联网3.0版上线公告' }, { text: '国脉物联网两大研究中心简介' }, { text: '国脉物联网3.0版上线公告' }, { text: '国脉物联网两大研究中心简介' }, { text: '国脉物联网3.0版上线公告' }, { text: '国脉物联网两大研究中心简介' }, { text: '国脉物联网3.0版上线公告' }, { text: '国脉物联网两大研究中心简介' }, { text: '国脉物联网3.0版上线公告' }, { text: '国脉物联网两大研究中心简介' }, { text: '国脉物联网3.0版上线公告' }, { text: '国脉物联网两大研究中心简介' }, { text: '国脉物联网3.0版上线公告' }, { text: '国脉物联网3.0版上线公告' }],
    }
  },
}
</script>
<style lang="scss" sccoped>
.switch-tabs {
  .index-card {
    position: relative;
  }
  .more {
    position: absolute;
    top: 10px;
    right: 20px;
    color: #999;
    &:hover {
      color: #cb3737;
    }
  }
}
.learningList,
.readList,
.documentsList,
.leadershipList {
  display: grid;
  grid-auto-flow: row dense;
  grid-row-gap: 0;
  grid-column-gap: 30px;
  grid-template-columns: minmax(100px, 2fr) minmax(100px, 2fr) minmax(
      100px,
      2fr
    );
  .piece {
    cursor: pointer;
    height: 34px;
    line-height: 34px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    &:hover {
      color: #cb3737;
    }
    &before {
      content: "";
      position: absolute;
      left: -15px;
      top: 14px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #999;
    }
  }
}
</style>
<style scoped>
.notice >>> .el-card__body {
  padding: 15px;
}
.notice >>> .el-button {
  float: right;
  padding: 5px 0;
  color: #999;
}
</style>