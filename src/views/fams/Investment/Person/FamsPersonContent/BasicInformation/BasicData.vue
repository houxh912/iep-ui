<template>
  <div class="basic-data">
    <span class="sub-title">{{title}}</span>
    <div class="item-con">
      <span class="item" v-for="item in itemList" :key="item.id">
        <span>{{item.name}}</span>
        <span>{{item.info}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '基础信息',
      itemList: [
        {
          name: '投资组织：',
          info: '舟山国脉研发中心',
        },
        {
          name: '募集股份数量：',
          info: '1000000',
        },
        {
          name: '每股单价：',
          info: '100（贝）',
        },
        {
          name: '目标金额：',
          info: '100000000000',
        },
        {
          name: '预计年化收益率：',
          info: '3%',
        },
        {
          name: '交易类型：',
          info: '股权投资',
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.basic-data {
  margin-bottom: 40px;
  .sub-title {
    display: block;
    margin-bottom: 20px;
    font-size: 15px;
  }
  .item-con {
    display: grid;
    grid-auto-flow: row dense;
    grid-row-gap: 25px;
    grid-column-gap: 25px;
    grid-template-columns: minmax(100px, 2fr) minmax(100px, 2fr) minmax(
        100px,
        2fr
      );
  }
  .item {
  }
}
</style>

