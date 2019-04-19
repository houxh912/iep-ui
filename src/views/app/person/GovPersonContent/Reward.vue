<template>
  <div class="reward-con">
    <iepAppTabCard :title="title" :linkName="linkName" :data="data" isMore>
      <div class="reward">
        <div v-for="(item,index) in reward" :key="index" class="piece">
          <span class="name">{{item.name}}</span>
          <span class="money" :class="item.bg">{{item.money}}</span>
        </div>
      </div>
    </iepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '悬赏任务',
      data: '（23件）',
      reward: [
        { name: '数据基因产品培训服务', money: '2000贝' },
        { name: '服务数据基因', money: '已结束', bg: 'bgc' },
        { name: 'DIPS数据基因', money: '2000贝' },
        { name: '数据基因数据基因', money: '2000贝' },
        { name: '大数据数据基因', money: '2000贝' },
        { name: '大数据数据基因', money: '2000贝' },
        { name: '规划与咨询数据基因', money: '已结束', bg: 'bgc' }],
      linkName: '',
    }
  },
}
</script>
<style lang="scss" scoped>
.reward {
  .piece {
    cursor: pointer;
    position: relative;
    margin-left: 15px;
    .name {
      display: inline-block;
      width: 200px;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .money {
      float: right;
      height: 30px;
      line-height: 30px;
      color: #cb3737;
    }
    .bgc {
      padding: 0 5px;
      font-size: 12px;
      border: 1px solid #ddd;
      background-color: #fafafa;
      color: #999;
    }
    &:hover {
      color: #cb3737;
      &:before {
        background-color: #cb3737;
      }
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
  height: 267px;
}
</style>
