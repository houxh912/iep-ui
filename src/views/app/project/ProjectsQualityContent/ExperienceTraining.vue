<template>
  <div class="recommendable">
    <IepAppTabCard :title="title" :linkName="linkName" isMore :data="data">
      <IepAppListCard :dataList="dataList" name="projectName"></IepAppListCard>
    </IepAppTabCard>
  </div>
</template>

<script>
import { getExperienceInTraining } from '@/api/app/prms/'
export default {
  data () {
    return {
      title: '经验培训',
      data: '',
      dataList: [],
      linkName: '',
    }
  },
  created () {
    getExperienceInTraining().then(({ data }) => {
      this.dataList = data.data.records.slice(0, 8)
      this.data = `(${data.data.total}次)`
    })
  },
}
</script>
<style scoped>
.recommendable >>> .el-card {
  height: 318px;
}
</style>
