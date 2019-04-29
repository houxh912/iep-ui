<template>
  <div class="projects-quality">
    <projects-quality-top></projects-quality-top>
    <projects-quality-content></projects-quality-content>
    <IepAppFooterBar></IepAppFooterBar>
  </div>
</template>

<script>
import ProjectsQualityContent from './ProjectsQualityContent/'
import ProjectsQualityTop from './ProjectsQualityTop/'
export default {
  name: 'projectsQuality',
  components: { ProjectsQualityContent, ProjectsQualityTop },
  data () {
    return {
    }
  },
  created () {
    this.$message('此页面正在开发中，当前数据仅供参考。')
  },
}
</script>
<style scoped>
.gov-person >>> .el-card {
  border-radius: 0;
}
.gov-person >>> .cardTitle {
  font-size: 16px;
}
</style>

