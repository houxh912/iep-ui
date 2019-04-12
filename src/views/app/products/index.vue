<template>
  <div class="products">
    <banner></banner>
    <div class="content">
      <my-products></my-products>
    </div>
    <visualization></visualization>
    <div class="content">
      <newcomers></newcomers>
      <institutional-document></institutional-document>
      <learning-resources></learning-resources>
      <new-technology></new-technology>
      <optimal></optimal>
      <honor></honor>
      <recruit></recruit>
      <task></task>
      <suggest></suggest>
    </div>
  </div>
</template>
<script>
import Banner from './Banner'
import MyProducts from './MyProducts'
import Visualization from './Visualization'
import Newcomers from './Newcomers'
import InstitutionalDocument from './InstitutionalDocument'
import LearningResources from './LearningResources'
import NewTechnology from './NewTechnology'
import Optimal from './Optimal'
import Honor from './Honor'
import Recruit from './Recruit'
import Task from './Task'
import Suggest from './Suggest'
export default {
  components: { Banner, MyProducts, Visualization, Newcomers, InstitutionalDocument, LearningResources, NewTechnology, Optimal, Honor, Recruit, Task, Suggest },
  data () {
    return {
    }
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
    grid-row-gap: 30px;
    grid-column-gap: 30px;
    grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr) minmax(
        100px,
        1fr
      );
    .index-card {
      font-size: 14px;
      border: 1px solid #f0f0f0;
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
