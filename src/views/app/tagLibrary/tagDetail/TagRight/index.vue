<template>
  <div class="piece">
    <IepAppTabCard title="相关标签">
      <IepAppLabelCard :dataList="form.tagList.map(m => m.commonName)"></IepAppLabelCard>
    </IepAppTabCard>
    <IepAppTabCard title="标签统计">
      <div class="piece-item">
        <span class="name">浏览次数:</span>
        <span class="frequency" v-text="form.views"></span>
      </div>
      <div class="piece-item">
        <span class="name">应用次数:</span>
        <span class="frequency" v-text="form.refers"></span>
      </div>
      <div class="piece-item">
        <span class="name">最近更新:</span>
        <span class="frequency" v-text="form.updateTime"></span>
      </div>
      <div class="piece-item">
        <span class="name">创建者:</span>
        <span class="frequency" v-text="form.creatorRealName"></span>
      </div>
    </IepAppTabCard>
  </div>
</template>
<script>
export default {
  props: ['form'],
  data () {
    return {
    }
  },
}
</script>
<style lang="scss" scoped>
.piece {
  border-top: 1px solid #eee;
  grid-column-start: 3;
  grid-column-end: 4;
}
.library {
  padding: 0 20px;
  border-right: 1px solid #ebeef5;
}
.piece-item {
  padding: 0;
  color: #888;
  font-size: 14px;
  line-height: 28px;
  .name {
    margin-right: 15px;
  }
  .frequency {
    font-size: 16px;
  }
}
.icon-item {
  display: inline-block;
  margin-top: 20px;
  padding: 0 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  .icon-box:nth-last-child(1) {
    margin-right: 0;
  }
  .icon-box {
    display: inline-block;
    margin-right: 10px;
    padding: 10px;
    i {
      display: block;
      text-align: center;
      font-size: 22px !important;
      color: #333;
    }
    span {
      display: block;
      color: #333;
      font-size: 16px;
    }
  }
}
</style>
<style scoped>
.piece >>> .el-card {
  margin-left: 30px;
  padding: 0 !important;
  border: 0;
}
</style>