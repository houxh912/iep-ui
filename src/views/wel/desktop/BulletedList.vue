<template>
  <div class="bulleted-list">
    <IepAppTabCard :title="title" :linkName="linkName" isMore>
      <div class="bulleted-item" v-for="(item,index) in dataList" :key="index">
        <span class="sub-item">{{item.typeName}}</span>
        <el-progress :percentage="item.percentage" status="success" class="right"></el-progress>
      </div>
    </IepAppTabCard>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '项目列表',
      linkName: '',
      dataList: [
        { typeName: '--', percentage: 0 },
        { typeName: '--', percentage: 0 },
        { typeName: '--', percentage: 0 },
        { typeName: '--', percentage: 0 },
        { typeName: '--', percentage: 0 },
        { typeName: '--', percentage: 0 },
        { typeName: '--', percentage: 0 },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.bulleted-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  padding: 0 10px;
  line-height: 32px;
  font-size: 14px;
  color: #333;
  .sub-item {
    display: inline-block;
    width: 170px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .right {
    display: inline-block;
    width: 70px;
  }
}
.bulleted-list-box {
  position: relative;
  .new {
    padding: 0 3px;
    height: 20px;
    line-height: 18px;
    font-size: 12px;
    background-color: #fff;
    border-radius: 3px;
    border: 1px solid #cb3737;
    color: #cb3737;
    position: absolute;
    right: 0;
    top: 7px;
  }
  .assort .piece {
    padding-right: 40px;
  }
}
.bulleted-list .el-card {
  padding: 0 20px;
}
</style>
<style scoped>
.bulleted-list >>> .el-card {
  height: 351px;
}
.bulleted-list >>> .title {
  font-size: 18px;
}
.bulleted-list >>> .el-card__header {
  padding: 18px 0 18px;
}
.bulleted-list >>> .el-progress__text i {
  display: none;
}
.bulleted-list >>> .el-progress-bar {
  padding-right: 0;
}
.bulleted-list >>> .el-progress {
  line-height: 1.8;
}
.bulleted-list >>> .title {
  font-size: 16px;
}
.bulleted-list >>> .el-card__header,
.bulleted-list >>> .el-card__body {
  padding: 18px 0;
}
</style>
