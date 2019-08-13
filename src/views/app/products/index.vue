<template>
  <iep-app-layout class="products">
    <div class="content">
      <banner></banner>
      <dynamic></dynamic>
      <visualization></visualization>
      <my-products></my-products>
      <!-- <newcomers></newcomers> -->
      <institutional-document></institutional-document>
      <resources></resources>
      <optimal></optimal>
      <new-technology></new-technology>
      <honor></honor>
      <!-- <bounty-mission></bounty-mission> -->
      <!-- <task></task> -->
      <thoughts-suggest></thoughts-suggest>
    </div>
  </iep-app-layout>
</template>
<script>
import Banner from './Banner'
import Dynamic from './Dynamic'
import MyProducts from './MyProducts/index'
import Visualization from './Visualization'
// import Newcomers from './Newcomers'
import InstitutionalDocument from './InstitutionalDocument'
import Resources from './Resources/'
import NewTechnology from './NewTechnology'
import Optimal from './Optimal'
import Honor from './Honor'
// import BountyMission from './BountyMission/'
// import Task from './Task'
import ThoughtsSuggest from './ThoughtsSuggest'
export default {
  components: { Banner, Dynamic, MyProducts, Visualization, InstitutionalDocument, Resources, NewTechnology, Optimal, Honor, ThoughtsSuggest },
  data () {
    return {
    }
  },
  created () {

  },
}
</script>
<style lang="scss" scoped>
.products {
  .content {
    width: 1200px;
    padding: 20px 0;
    margin: 0 auto;
    display: grid;
    grid-auto-flow: row dense;
    grid-row-gap: 20px;
    grid-column-gap: 25px;
    grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr) minmax(
        100px,
        1fr
      );
    .index-card {
      font-size: 14px;
      border: 1px solid #8a8282;
      padding: 15px 20px;
      .clearfix:before,
      .clearfix:after {
        display: table;
        content: "";
      }
      .clearfix:after {
        clear: both;
      }
    }
  }
}
</style>
<style scoped>
#app >>> .el-aside {
  border-right: 0;
}
</style>
