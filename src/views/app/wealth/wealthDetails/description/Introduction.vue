<template>
  <div class="introduction">
    <div class="title">
      <span class="name">财务报表</span>
      <div class="right">
        <span>选择年份：</span>
        <iep-date-picker v-model="businessYear" type="year" placeholder="请选择年份">
        </iep-date-picker>
      </div>
    </div>
    <div class="top">
      <span v-for="(item,index) in titleList" :key="index">{{item}}</span>
    </div>
    <div class="bottom" v-for="(item,index) in dataList" :key="index">
      <span>{{item.name}}</span>
      <span>{{item.yesterday}}%</span>
      <span>{{item.month}}%</span>
      <span>{{item.season}}%</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      businessYear: new Date(),
      titleList: ['数据项', '昨日变动', '上月变动', '上季变动'],
      dataList: [
        { name: '总估值', yesterday: '505505', month: '10', season: '5' },
        { name: '账户余额', yesterday: '505505', month: '10', season: '5' },
        { name: '待签合同', yesterday: '505505', month: '10', season: '5' },
        { name: '应收账款', yesterday: '505505', month: '10', season: '5' },
        { name: '负资产', yesterday: '505505', month: '10', season: '5' },
        { name: '合同金额', yesterday: '505505', month: '10', season: '5' },
        { name: '项目收入', yesterday: '505505', month: '10', season: '5' },
        { name: '其他收入', yesterday: '505505', month: '10', season: '5' },
        { name: '费用', yesterday: '505505', month: '10', season: '5' },
        { name: '营业利润', yesterday: '505505', month: '10', season: '5' },
        { name: '净利润', yesterday: '505505', month: '10', season: '5' },
      ],
    }
  },
  computed: {
  },
  methods: {
  },
  created () {
  },
}
</script>
<style lang="scss" scoped>
.introduction {
  .title {
    .name {
      font-size: 16px;
      height: 38px;
      line-height: 38px;
      display: inline-block;
    }
    .right {
      float: right;
    }
  }
  .top,
  .bottom {
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin-top: 10px;
    background-color: #fafafa;
    display: grid;
    grid-auto-flow: row dense;
    grid-template-columns:
      minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr)
      minmax(100px, 1fr);
    > span {
      text-align: center;
    }
    > span:first-child {
      text-align: left;
      padding-left: 20px;
    }
  }
  .bottom {
    height: 52px;
    line-height: 52px;
    text-align: left;
    margin-top: 0;
    background-color: #fff;
    &:hover {
      background-color: #fafafa;
    }
  }
}
</style>
