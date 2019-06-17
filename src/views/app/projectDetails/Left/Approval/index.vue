<template>
  <div class="survey">
    <set-it :projectData="projectData"></set-it>
    <set-up :projectData="projectData"></set-up>
  </div>
</template>
<script>
import SetIt from './SetIt'
import SetUp from './SetUp'
export default {
  components: { SetIt, SetUp  },
  props: {
    projectData: {
      type: Object,
    },
  },
  data () {
    return {
    }
  },
}
</script>
<style scoped>
.survey >>> .el-tag--white {
  border: 1px solid #dcdfe6;
  height: 28px;
  line-height: 26px;
  background: #fff;
  color: #606266;
}
</style>
