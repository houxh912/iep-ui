<template>
  <div class="piece">
    <IepAppTabCard title="相关标签">
      <iep-no-data v-if="!form.tagList.length"></iep-no-data>
      <IepAppLabelCard :dataList="form.tagList.map(m => m.commonName)"></IepAppLabelCard>
    </IepAppTabCard>
    <IepAppTabCard title="标签统计">
      <div class="piece-item" v-for="(item,index) in labelList" :key="index">
        <span class="name" v-text="item.name"></span>
        <span class="frequency" v-text="item.frequency"></span>
      </div>
      <div class="icon-item">
        <div class="icon-box" v-for="(item,index) in iconList" :key="index">
          <i :class="item.icon"></i>
          <span v-text="item.iconName"></span>
        </div>
      </div>
    </IepAppTabCard>
  </div>
</template>
<script>
export default {
  props: ['form'],
  data () {
    return {
      labelList: [
        { name: '浏览次数:', frequency: '936次' },
        { name: '应用次数:', frequency: '93226次' },
        // { name: '编辑人次:', frequency: '93622次' },
        { name: '最近更新:', frequency: '2019-02-15' },
        { name: '创建者:', frequency: '国脉总账户' },
      ],
      iconList: [
        { icon: 'icon-shoucang1', iconName: '收藏' },
        { icon: 'icon-share', iconName: '转发' },
        { icon: 'icon-chakantiezigengduojubao', iconName: '纠错' },
        { icon: 'icon-yuanbao', iconName: '打赏' },
      ],
    }
  },
  mounted () {
    this.labelList[0].frequency = this.form.views + '次'
    this.labelList[1].frequency = this.form.refers + '次'
    this.labelList[2].frequency = this.form.updateTime
    this.labelList[3].frequency = this.form.creatorRealName
  },
}
</script>
<style lang="scss" scoped>
.piece {
  border-top: 1px solid #eee;
  grid-column-start: 3;
  grid-column-end: 4;
}
.el-card {
  border: 0;
}
.library {
  padding: 0 20px;
  border-right: 1px solid #ebeef5;
}
.piece-item {
  padding: 0 10px;
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
    margin-right: 15px;
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
.el-card >>> .title {
  font-size: 18px;
}
</style>