<template>
  <el-card shadow="never">
    <div class="total-wrapper">
      <div class="total-item" v-for="(item, index) in dataMap" :key="index">
        <div class="value">{{item}}</div>
        <div class="label"><a href="#" @click="handleClick(index)">{{index}}</a></div>
      </div>
      <div class="total-btn">
        <el-button size="small">重新聚类</el-button>
      </div>
      <div class="total-btn">
        <el-button size="small" type="danger">游离归类</el-button>
      </div>
    </div>
    <hr>
    <div class="down-wrapper">
      <span>新增中心词：13/134</span>
      <span>新增游离词：13/134</span>
      <span>归类卫星词：13/134</span>
      <div class="time">更新时间：2019-10-16</div>
    </div>
  </el-card>
</template>
<script>
export default {
  props: {
    dataMap: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {

      handleClick () {
      },
    }
  },
}
</script>
<style lang="scss" scoped>
.total-wrapper {
  display: flex;
  justify-content: space-around;
  margin: 12px 0;
  .total-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    &:nth-child(3) {
      border-right: 1px solid rgb(233, 233, 233);
    }
    &:nth-child(5) {
      border-right: 1px solid rgb(233, 233, 233);
    }
    .value {
      font-size: 24px;
      color: rgb(48, 49, 51);
    }
    .label {
      & > a {
        color: #999;
      }
    }
  }
  .total-btn {
    height: 57px;
    line-height: 57px;
    > button {
      margin-left: 10px;
    }
  }
}
.down-wrapper {
  > span {
    position: relative;
    padding-left: 20px;
    margin-right: 10px;
  }
  > span:first-child::before {
    content: " ";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    left: 6px;
    top: 6.5px;
  }
  .time {
    color: #999;
    float: right;
  }
}
</style>

