<template>
  <div class="notice">
    <el-card class="index-card" shadow="never">
      <div slot="header" class="clearfix">
        <span class="cardTitle">{{title}}</span>
        <el-button class="more" type="text">更多></el-button>
      </div>
      <div>
        <div class="dynamicList">
          <div v-for="(item,index) in dynamicList" :key="index" class="piece">
            <span>{{item.tip}}</span><span>{{item.text}}</span>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '互动专区',
      dynamicList: [{ tip: '【评选】', text: '国脉海洋获质量管理系认证' }, { tip: '【评选】', text: '舟山国脉考察' }, { tip: '【评选】', text: '中国建设银行总行首席经济学家黄志凌一行莅临舟山国脉考察' }, { tip: '【调研】', text: '热烈庆祝广州国脉公司乔迁开业' }, { tip: '【调研】', text: '国脉总经理郑爱军荣获“浙江创业女杰' }, { tip: '【调研】', text: '国脉物联网两大研究中心简介' }, { tip: '【调研】', text: '国脉物联网3.0版上线公告' }],
    }
  },
}
</script>
<style lang="scss" scoped>
.notice {
  .cardTitle {
    font-size: 16px;
  }
  .index-card {
  }
}
.dynamicList {
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

