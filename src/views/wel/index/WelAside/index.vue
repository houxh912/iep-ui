<template>
  <div class="wel-aside-wrapper">
    <div class="adv-money-btn">
      <img src="/img/adv-money.png" alt="/img/adv-money.png">
    </div>
    <!-- 我要创建 -->
    <my-created />
    <!-- 我要找 -->
    <my-find />
    <!-- 我的财富 -->
    <my-treasure />
    <!-- 我的机会 -->
    <my-chance ref="myChance" :opportunity="opportunity" />
    <!-- 收到评价 -->
    <!-- <receive-evaluation :appraise="appraise" /> -->
    <!-- 我的指數 -->
    <my-data />
  </div>
</template>
<script>
import { getAside } from '@/api/wel/index'
import MyCreated from './MyCreated'
import MyFind from './MyFind'
import MyTreasure from './MyTreasure'
import MyChance from './MyChance'
// import ReceiveEvaluation from './ReceiveEvaluation'
import MyData from './MyData'
export default {
  components: { MyCreated, MyFind, MyTreasure, MyChance, MyData },
  data () {
    return {
      opportunity: [],
      appraise: [],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      getAside().then(({ data }) => {
        const rawData = data.data
        this.opportunity = rawData.opportunity || []
        this.appraise = rawData.appraise || []
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.wel-aside-wrapper {
  .adv-money-btn {
    cursor: pointer;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > div {
    padding: 10px 10px 20px 10px;
    border-bottom: 1px solid #ececec;
    &:first-child {
      border: none;
      padding: 0;
    }
  }
}
</style>
