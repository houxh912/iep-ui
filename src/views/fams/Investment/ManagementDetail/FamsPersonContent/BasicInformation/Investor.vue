<template>
  <div class="investor">
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
      title: '投资人要求',
      itemList: [
        {
          name: '最低认购数量：',
          info: '10000000000',
        },
        {
          name: '投资人最低信用分：',
          info: '1000000',
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.investor {
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

