<template>
  <div class="aside">
    <!-- 我要创建 -->
    <my-created />
    <!-- 我要找 -->
    <my-find />
    <!-- 我的财富 -->
    <my-treasure />
    <!-- 我的机会 -->
    <my-chance />
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
  width: 300px;
  height: 100%;
  background: #fafafa;
  font-size: 12px;
  padding: 0 10px;
  box-sizing: border-box;
  > div {
    padding: 10px 10px 20px 10px;
    border-bottom: 1px solid #ececec;
  }
}
@media (min-width: 769px) and (max-width: 1026px) {
  .aside {
    width: 250px;
  }
}
@media (min-width: 0px) and (max-width: 769px) {
  .aside {
    display: none;
    width: 220px;
    right: -210px;
  }
}
</style>


