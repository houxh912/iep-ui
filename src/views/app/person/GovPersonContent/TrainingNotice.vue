<template>
  <div class="trainingCon">
    <iepAppTabCard :title="title" :linkName="linkName" :data="data" isMore>
      <div class="trainingNotice">
        <div v-for="(item,index) in trainingNotice" :key="index" class="piece">
          <span class="name">{{item.name}}</span>
          <span class="time">{{item.time}}</span>
        </div>
      </div>
    </iepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '培训预告',
      data: '（10条）',
      trainingNotice: [
        { name: '数据基因产品培训服务', time: '2019-04-03' },
        { name: '服务数据基因', time: '2019-03-03' },
        { name: 'DIPS数据基因', time: '2019-04-03' },
        { name: '数据基因数据基因', time: '2019-04-03' },
        { name: '大数据数据基因', time: '2019-04-03' },
        { name: '规划与咨询数据基因', time: '2019-01-03' },
        { name: '项目管理数据基因', time: '2019-04-03' }],
      linkName: '',
    }
  },
}
</script>
<style lang="scss" scoped>
.trainingNotice {
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
    .time {
      float: right;
      height: 30px;
      line-height: 30px;
      color: #666;
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
.trainingCon >>> .el-card__body {
  height: 280px;
}
</style>
