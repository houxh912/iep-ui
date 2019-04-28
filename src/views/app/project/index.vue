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
.gov-person-content >>> .more:hover,
.gov-person-content >>> .more:focus {
  color: #cb3737;
}
.gov-person-content >>> .important {
  float: right;
  color: #cb3737;
}
.gov-person-content >>> .important:hover,
.gov-person-content >>> .important:focus {
  color: #f56c6c;
}
</style>

