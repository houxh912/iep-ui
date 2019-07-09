<template>
  <div class="info">
    <div class="head">
      招聘岗位
    </div>
    <div class="info-block">
      <h3 class="title">系统信息</h3>
      <div class="other">
        <el-row>
          <el-col :span=12 class="item">
            <div class="label">发布人：</div>
            <div class="value">{{formData.creatorName}}</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">负责部门：</div>
            <div class="value">{{formData.deptName}}</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">前市场经理：</div>
            <div class="value">{{formData.preMarketManagerName}}</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">前所属部门：</div>
            <div class="value">{{formData.preDeptName}}</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">创建时间：</div>
            <div class="value">{{formData.createTime}}</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">更新于：</div>
            <div class="value">{{formData.updateTime}}</div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'detail',
  data () {
    return {
      tagsName: [],
    }
  },
  props: {
    formData: {
      type: Object,
      default: () => { },
    },
  },
}
</script>

<style lang="scss" scoped>
.info {
  .line {
    border-bottom: 1px solid #e4e7ed;
  }
  .info-block {
    .title {
      font-size: 16px;
      margin: 10px 0;
    }
    .base {
      background-color: #f9f9f9;
      padding: 10px 20px;
    }
    .other {
      padding: 10px 20px;
    }
    .item {
      margin-bottom: 15px;
      div {
        display: inline-block;
      }
      .dot {
        border-right: 1px solid #999;
        padding: 0 10px;
      }
      .tag-dot {
        margin-left: 10px;
      }
      .dot:last-child {
        border: 0;
      }
    }
  }
}
.customer {
  margin-right: 10px;
}
.value {
  word-break: break-all;
}
</style>
