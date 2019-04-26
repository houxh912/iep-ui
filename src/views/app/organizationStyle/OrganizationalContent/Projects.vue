<template>
  <div class="reward-con">
    <div class="reward">
      <div v-for="(item,index) in reward" :key="index" class="piece">
        <span class="title">{{item.title}}</span>
        <span class="name">{{item.name}}</span>
        <div class="percentage">
          <el-progress :percentage="item.integrity" color="#68C769"></el-progress>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      reward: [
        { title: '20180115海沧区公共安全主题数据资源梳理与服务', name: '潘超巧', integrity: 20 },
        { title: '海南省政务信息资源目录管理系统', name: '邵万炯', integrity: 20 },
        { title: '北京市西城区政务数据梳理系统', name: '陈争辉', integrity: 50 },
        { title: '浙江省数据资源管理服务平台公共数据目录系统', name: '潘超巧', integrity: 60 },
        { title: '20170317浙江省公共数据目录系统项目', name: '阮晨光', integrity: 20 },
        { title: '20180413数据基因海南版 ', name: '王俊辉', integrity: 80 }],
    }
  },
}
</script>
<style lang="scss" scoped>
.reward {
  .piece {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    position: relative;
    margin-left: 15px;
    .percentage {
      flex: 1;
    }
    .title {
      display: inline-block;
      flex: 3;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
        color: #cb3737;
        &:before {
          background-color: #cb3737;
        }
      }
    }
    .name {
      margin: 0 60px;
      height: 30px;
      line-height: 30px;
    }
    &:before {
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
.reward-con >>> .el-card__body {
  height: 270px;
}
</style>
