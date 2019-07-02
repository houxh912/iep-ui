<template>
  <div class="app-project-manager-ranking">
    <IepAppTabCard :title="title">
      <div class="manager-board-list">
        <div class="sub">
          <span class="subTitle">{{subTitle}}</span>
          <span class="subName">{{subName}}</span>
          <span class="subNum">{{subNum}}</span>
        </div>
        <div v-for="(item,index) in managerBoardList" :key="index" class="piece">
          <span class="count" :class="index < 3 ? 'red' : ''">{{index+1}}</span>
          <span class="name">{{item.projectManagerName}}</span>
          <span class="num">{{item.time}}</span>
        </div>
      </div>
    </IepAppTabCard>
  </div>
</template>

<script>
import { getProjectProjectManager } from '@/api/app/prms/'

export default {
  data () {
    return {
      title: '项目经理排行榜',
      subTitle: '名次',
      subName: '姓名',
      subNum: '担任次数',
      managerBoardList: [],
    }
  },
  created () {
    getProjectProjectManager().then(({ data }) => {
      this.managerBoardList = data.data
    })
  },
}
</script>
<style lang="scss" scoped>
.manager-board-list {
  .sub {
    display: flex;
    margin-bottom: 5px;
    justify-content: space-between;
    align-items: center;
  }
  .subTitle {
    margin-right: 5px;
    width: 62px;
    height: 18px;
    line-height: 18px;
  }
  .subName {
    flex: 2;
    height: 18px;
    line-height: 18px;
  }
}
.piece {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  .name {
    display: inline-block;
    flex: 2;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }
  .count {
    display: inline-block;
    width: 18px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    margin: 0 40px 0 4px;
    background-color: #ccc;
    color: #fff;
    vertical-align: middle;
  }
  .red {
    background-color: #cb3737;
  }
  .num {
    float: right;
    width: 34px;
    height: 30px;
    line-height: 30px;
    color: #666;
  }
  &:hover {
    color: #cb3737;
  }
}
.datas {
  color: #999;
}
</style>
<style scoped>
.app-project-manager-ranking >>> .el-card {
  height: 410px;
}
</style>

