<template>
  <div class="wel-aside-wrapper">
    <!-- 我要创建 -->
    <my-created />
    <!-- 我要找 -->
    <my-find />
    <!-- 我的财富 -->
    <my-treasure />
    <!-- 我的机会 -->
    <my-chance />
    <!-- 收到评价 -->
    <receive-evaluation />
    <!-- 我的指數 -->
    <my-data />
  </div>
</template>
<script>
import MyCreated from './MyCreated'
import MyFind from './MyFind'
import MyTreasure from './MyTreasure'
import MyChance from './MyChance'
import ReceiveEvaluation from './ReceiveEvaluation'
import MyData from './MyData'
export default {
  components: { MyCreated, MyFind, MyTreasure, MyChance, ReceiveEvaluation, MyData },
}
</script>
<style lang="scss" scoped>
.wel-aside-wrapper {
  & > div {
    padding: 10px 10px 20px 10px;
    border-bottom: 1px solid #ececec;
  }
}
</style>
