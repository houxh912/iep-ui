<template>
  <div class="resource">
    <div class="title">{{title}}</div>
    <div class="con">
      <div class="item" v-for="item in itemList" :key="item.id">
        <span class="name">{{item.name}}：</span>
        <span class="num">{{item.num}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '资源构成',
      itemList: [
        {
          name: '材料库',
          num: '2154',
        },
        {
          name: '培训库',
          num: '536',
        },
        {
          name: '客户库',
          num: '384',
        },
        {
          name: '资质库',
          num: '154',
        },
        {
          name: '商机库',
          num: '215',
        },
        {
          name: '专家库',
          num: '235',
        },
        {
          name: '产品库',
          num: '2154',
        },
        {
          name: '其它',
          num: '326',
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.resource {
  position: relative;
  .title {
    position: absolute;
    left: 0;
    top: 0;
    font-size: 18px;
    color: #333;
  }
  .con {
    margin-top: 57px;
    display: grid;
    grid-template-columns: 2fr 2fr;
  }
  .item {
    margin-right: -1px;
    margin-bottom: -1px;
    padding: 22px 20px;
    border: 1px solid #eee;
  }
  .num {
    font-size: 16px;
    color: #c73e3e;
  }
}
</style>