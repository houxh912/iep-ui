<template>
  <div class="aside">
    <el-scrollbar style="height:100%">
      <!-- 我要创建 -->
      <my-created />
      <!-- 我要找 -->
      <my-find />
      <!-- 我的财富 -->
      <my-treasure />
      <!-- 我的机会 -->
      <my-chance />
    </el-scrollbar>
  </div>
</template>
<script>
import myCreated from './myCreated'
import myFind from './myFind'
import myTreasure from './myTreasure'
import myChance from './myChance'
export default {
  components: { myCreated, myFind, myTreasure, myChance },
  data () {
    return {
    }
  },
}
</script>
<style  lang="scss" scoped>
.aside {
  height: 100%;
  background: #fafafa;
  font-size: 12px;
  margin: 0;
  box-sizing: border-box;
  .el-scrollbar {
    padding: 0;
    .el-scrollbar__view {
      > div {
        padding: 10px 10px 20px 10px;
        border-bottom: 1px solid #ececec;
      }
    }
  }
}
</style>


