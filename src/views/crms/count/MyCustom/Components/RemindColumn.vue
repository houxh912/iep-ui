<template>
  <el-card shadow="always">
    <el-row class="remind">
      <el-col class="head" :span=24>预警提醒
        <div class="more">
          <span class="border"><i class="el-icon-arrow-left"></i></span>
          <span class="border"><i class="el-icon-arrow-right"></i></span>
        </div>
      </el-col>
      <div v-for="(item, index) in infoList.tips" :key="index" class="tip" @mouseenter="tipsSelect=index" @mouseleave="tipsSelect=-1">
        <i class="icon-tongzhi"></i>
        <p>{{item.tips}}</p>
        <iep-button type="danger" class="btn" size="mini" v-if="index==tipsSelect">忽略</iep-button>
      </div>
    </el-row>
  </el-card>
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
    tipsLeave () { },
  },
}
</script>

<style lang="scss" scoped>
.remind {
  height: 260px;
  .head {
    font-weight: 700;
    background-color: #eee;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    .more {
      float: right;
      .border {
        margin-left: 10px;
        i {
          display: inline-block;
          padding: 5px;
          border: 1px solid #9c9c9c;
        }
        &:hover {
          color: blue;
        }
      }
    }
  }
  .tip {
    line-height: 28px;
    padding-top: 10px;
    cursor: pointer;
    p {
      display: inline;
      flex: 1;
      margin: 0;
      padding-left: 10px;
    }
    .btn {
      float: right;
    }
  }
  .tip:hover {
    color: #f00;
  }
}
.el-card {
  margin-right: 20px;
}
</style>
