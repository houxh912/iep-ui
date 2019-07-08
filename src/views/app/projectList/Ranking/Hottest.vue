<template>
  <div class="hottest">
    <IepAppListCard :dataList="list" @click="handleDetail" name="project_name"></IepAppListCard>
  </div>
</template>

<script>
import { getProjectRecProjects } from '@/api/app/prms/'

export default {
  data () {
    return {
      list: [],
    }
  },
  methods: {
    handleDetail (row) {
      this.$router.push(`/app/project_details/${row.id}`)
    },
  },
  created () {
    getProjectRecProjects().then(({data}) => {
      this.list = data.data.list
    })
  },
}
</script>
<style lang="scss" scoped>
</style>


