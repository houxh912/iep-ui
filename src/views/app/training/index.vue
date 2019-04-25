<template>
  <div>
    <div class="training">
      <training-top></training-top>
      <training-content></training-content>
    </div>
    <IepAppFooterBar></IepAppFooterBar>
  </div>
</template>
<script>
import TrainingTop from './TrainingTop/'
import TrainingContent from './TrainingContent'
export default {
  name: 'AppTraining',
  components: { TrainingTop, TrainingContent },
  data () {
    return {
    }
  },
}
</script>
<style lang="scss" scoped>
.training {
  margin: 0 auto;
  padding-top: 30px;
  width: 1200px;
  .training-top {
    display: grid;
    grid-auto-flow: row dense;
    grid-row-gap: 30px;
    grid-column-gap: 30px;
    grid-template-columns: minmax(100px, 5fr) minmax(100px, 3fr);
  }
}
</style>
<style scoped>
.training >>> .clearfix:before,
.training >>> .clearfix:after {
  display: table;
  content: "";
}
.training >>> .clearfix:after {
  clear: both;
}
.training >>> .sub-title .cardTitle {
  font-size: 16px;
}
.training >>> .more {
  float: right;
  padding: 5px 0;
  color: #999;
}
</style>
