<template>
  <div>
    <div class="financial-assets">
      <el-card shadow="never">
        <h4 class="sub-title">总资产</h4>
        <div class="total-wrapper">
          <div class="total-item" v-for="(item, index) in itemData" :key="index">
            <div class="sum">{{item.sum}}</div>
            <div class="name">{{item.name}}</div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      itemData: [
        {
          sum: '6223.25',
          name: '库存现金',
        },
        {
          sum: '8000',
          name: '银行存款',
        },
        {
          sum: '5000',
          name: '集团往来',
        },
        {
          sum: '5000',
          name: '合同应收账款',
        },
        {
          sum: '5000',
          name: '融资',
        },
        {
          sum: '5000',
          name: '投资',
        },
        {
          sum: '5000',
          name: '其他应收款',
        },
        {
          sum: '5000',
          name: '内部借款',
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.financial-assets {
  .sub-title {
    margin-bottom: 20px;
    font-size: 16px;
  }
  .total-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .total-item {
      padding-right: 36px;
      text-align: center;
      border-right: 1px solid #eee;
      &:last-child {
        border-right: 0;
      }
    }
    .sum {
      font-size: 24px;
    }
    .name {
      margin-top: 10px;
      color: #999;
    }
  }
}
</style>
