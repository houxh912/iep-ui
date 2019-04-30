<template>
  <IepAppTabCard :title="labelTitle">
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
</template>
<script>
import { getTagViewById } from '@/api/tms/tag'
export default {
  data () {
    return {
      labelTitle: '标签统计',
      tag: {
        views: 0,
        refers: 0,
        updateTime: '',
        creatorRealName: '',
      },
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
  created () {
    this.loadPage()
  },
  methods: {
    async loadPage () {
      const { data } = await getTagViewById(this.$route.params.id)
      this.tag = data.data
      this.labelList[0].frequency = this.tag.views + '次'
      this.labelList[1].frequency = this.tag.refers + '次'
      this.labelList[2].frequency = this.tag.updateTime
      this.labelList[3].frequency = this.tag.creatorRealName
    },
  },
}
</script>
<style lang="scss" scoped>
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