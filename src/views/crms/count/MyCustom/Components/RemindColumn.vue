<template>
  <el-card shadow="always">
    <el-row class="remind">
      <el-col class="head" :span='24'>预警提醒
        <div class="more">
          <span class="border" @click="left"><i class="el-icon-arrow-left"></i></span>
          <span class="border" @click="right"><i class="el-icon-arrow-right"></i></span>
        </div>
      </el-col>
      <div v-for="(item, index) in infoList.tips" :key="index" class="tip" @mouseenter="tipsSelect=index" @mouseleave="tipsSelect=-1">
        <i class="icon-tongzhi"></i>
        <p>{{item.tips}}</p>
        <iep-button type="primary" class="btn" size="mini" v-if="index==tipsSelect" @click="clear">忽略</iep-button>
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
          tips: '您已超过一个月未对三亚市政府服务中心客户进行拜访了',
        }, {
          id: 1,
          tips: '您已超过六个月未对海南省农业厅进行重要客户方案撰写了',
        }, {
          id: 1,
          tips: '您已超过一年未未与海南省林业局合作了，快去找找合作可能',
        }],
      },
      tipsSelect: -1,
    }
  },
  methods: {
    tipsEnter () {

    },
    tipsLeave () { },
    clear () {
      this.$message.success('功能开发中')
    },
    left () {
      this.$message.success('功能开发中')

    },
    right () {
      this.$message.success('功能开发中')

    },
  },
}
</script>

<style lang="scss" scoped>
.remind {
  height: 220px;
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
          &:hover {
            border: 1px solid red;
          }
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
