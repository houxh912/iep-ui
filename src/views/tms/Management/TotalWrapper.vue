<template>
  <el-card shadow="never">
    <div class="total-wrapper">
      <div class="total-item" v-for="(item, index) in dataMap" :key="index">
        <div class="value">{{item}}</div>
        <div class="label"><a href="#" @click="handleClick(index)">{{index}}</a></div>
      </div>
      <div class="total-btn">
        <el-button size="small" disabled>重新聚类</el-button>
      </div>
      <div class="total-btn">
        <el-button size="small" type="danger" @click="classification" :disabled="msgKey">{{msgText}}</el-button>
      </div>
    </div>
    <hr>
    <div class="down-wrapper">
      <span>新增中心词：{{proportion.addedCenterSize}}</span>
      <!-- <span>新增游离词：{{proportion.newFreeSize}}</span> -->
      <span>归类卫星词：{{proportion.newSatelliteSize}}</span>
      <span>标准库/基础库：{{proportion.termsPercent}}</span>
      <div class="time">更新时间：{{proportion.updateTime}}</div>
    </div>
  </el-card>
</template>
<script>
import { getFreeCluster } from '@/api/tms/management'
const MSGINIT = '游离归类',
  MSGSCUCCESS = '${time}秒后归类',
  MSGTIME = 60
export default {
  props: {
    dataMap: {
      type: Object,
      required: true,
    },
    proportion: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      msgText: MSGINIT,
      msgTime: MSGTIME,
      msgKey: false,
    }
  },
  methods: {
    handleClick () {
    },
    classification () {
      getFreeCluster().then((res) => {
        if (res.data.data) {
          this.$message({
            type: 'success',
            message: '算法正在进行游离归类中...',
          })
        } else {
          this.$message({
            type: 'info',
            message: `游离归类失败，${res.data.msg}`,
          })
        }
      })
      this.msgText = MSGSCUCCESS.replace('${time}', this.msgTime)
      this.msgKey = true
      const time = setInterval(() => {
        this.msgTime--
        this.msgText = MSGSCUCCESS.replace('${time}', this.msgTime)
        if (this.msgTime == 0) {
          this.msgTime = MSGTIME
          this.msgText = MSGINIT
          this.msgKey = false
          clearInterval(time)
        }
      }, 1000)
    },
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

