<template>
  <div class="recommendable">
    <IepAppTabCard :title="title" :linkName="linkName" isMore :data="data">
      <IepAppListCard :dataList="dataList" name='project_name'></IepAppListCard>
    </IepAppTabCard>
  </div>
</template>

<script>
import { getProjectRecProjects } from '@/api/app/prms/'

export default {
  data () {
    return {
      data: '(10个)',
      title: '重点推荐项目',
      dataList: [],
      linkName: '',
    }
  },
  created () {
    getProjectRecProjects().then(({data}) => {
      this.dataList = data.data.slice(0, 9)
    })
  },
}
</script>
<style scoped>
.recommendable >>> .el-card {
  height: 346px;
}
</style>
