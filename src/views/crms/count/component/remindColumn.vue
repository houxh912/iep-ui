<template>
  <el-row class="remind">
    <el-col class="head" :span=24>预警提醒</el-col>
    <div v-for="(item, index) in infoList.tips" :key="index" class="tip" @mouseenter="tipsSelect=index" @mouseleave="tipsSelect=-1">
      <i class="icon-tongzhi"></i>
      <p>{{item.tips}}</p>
      <iep-button type="danger" size="mini" v-if="index==tipsSelect">忽略</iep-button>
    </div>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      infoList: {
        tips: [{
          id: 1,
          tips: '您已超过六个月未对三亚市政府服务中心客户进行拜访了',
        }, {
          id: 1,
          tips: '您已超过六个月未对三亚市政府服务中心客户进行拜访了',
        }, {
          id: 1,
          tips: '您已超过六个月未对三亚市政府服务中心客户进行拜访了',
        }, {
          id: 1,
          tips: '您已超过六个月未对三亚市政府服务中心客户进行拜访了',
        }],
      },
      tipsSelect: -1,
    }
  },
  methods: {
    tipsEnter () {

    },
    tipsLeave () {},
  },
}
</script>

<style lang="scss" scoped>
.remind {
  .head {
    font-weight: 700;
    background-color: #eee;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
  }
  .tip {
    height: 28px;
    line-height: 28px;
    padding: 5px;
    cursor: pointer;
    display: flex;
    p {
      flex: 1;
      margin: 0;
      padding-left: 10px;
    }
  }
  .tip:hover {
    color: #f00;
  }
}
</style>
