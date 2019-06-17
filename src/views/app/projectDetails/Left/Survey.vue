<template>
  <div class="survey">
    <basic></basic>
    <approval></approval>
    <set-up></set-up>
    <project-materials></project-materials>
  </div>
</template>
<script>
import Basic from './Basic'
import Approval from './Approval'
import SetUp from './SetUp'
import ProjectMaterials from './ProjectMaterials'
export default {
  components: { Basic, Approval, SetUp, ProjectMaterials },
  data () {
    return {
    }
  },
}
</script>
<style lang="scss" scoped>
.survey {
  padding: 2px;
}
</style>
<style scoped>
.survey >>> .el-tag--white {
  border: 1px solid #dcdfe6;
  height: 28px;
  line-height: 26px;
  background: #fff;
  color: #606266;
}
</style>
