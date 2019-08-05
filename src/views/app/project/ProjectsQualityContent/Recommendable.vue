<template>
  <div class="recommendable">
    <IepAppTabCard :title="title" :linkName="linkName" isMore :data="`(${data}个)`">
      <IepAppListCard :dataList="dataList" name='projectName' @click="handleDetail"></IepAppListCard>
    </IepAppTabCard>
  </div>
</template>

<script>
import { getProjectRecProjects } from '@/api/app/prms/'

export default {
  data () {
    return {
      data: 0,
      title: '重点推荐项目',
      dataList: [],
      linkName: '/app/project_list',
    }
  },
  methods: {
    handleDetail (row) {
      this.$router.push(`/app/project_details/${row.id}`)
    },
  },
  created () {
    getProjectRecProjects().then(({ data }) => {
      this.dataList = data.data.records.slice(0, 9)
      this.data = data.data.total
    })
  },
}
</script>
<style scoped>
.recommendable >>> .el-card {
  height: 346px;
}
</style>
