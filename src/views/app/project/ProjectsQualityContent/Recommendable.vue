<template>
  <div class="recommendable">
    <IepAppTabCard :title="title" :linkName="linkName" isMore :data="`(${data}个)`">
      <IepAppListCard :dataList="dataList" name='project_name' @click="handleDetail"></IepAppListCard>
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
      linkName: '',
    }
  },
  methods: {
    handleDetail (row) {
      this.$router.push(`/app/project_details/${row.id}`)
    },
  },
  created () {
    getProjectRecProjects().then(({data}) => {
      this.dataList = data.data.list.slice(0, 9)
      this.data = data.data.size
    })
  },
}
</script>
<style scoped>
.recommendable >>> .el-card {
  height: 346px;
}
</style>
