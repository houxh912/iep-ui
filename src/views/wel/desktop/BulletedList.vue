<template>
  <div class="bulleted-list">
    <IepAppTabCard :title="title" :linkName="linkName" isMore>
      <div class="bulleted-item" v-for="(item,index) in dataList" :key="index">
        <span class="sub-item">{{item.project_name}}</span>
      </div>
    </IepAppTabCard>
  </div>
</template>

<script>
import {getProjectRecProjects} from '@/api/app/prms/'
export default {
  data () {
    return {
      title: '项目列表',
      linkName: '',
      dataList: [
      ],
    }
  },
  created () {
    this.linkName = '/wel/budget_list_detail'
     getProjectRecProjects().then(({data}) => {
      this.dataList = data.data.list
    })
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
    &:hover{
      color: #cb3737;
    }
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
