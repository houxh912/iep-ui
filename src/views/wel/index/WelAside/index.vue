<template>
  <div class="aside">
    <span class="popup-btn" @click="hideAside"><i class="el-icon-caret-right"></i></span>
    <el-scrollbar>
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
import MyCreated from './MyCreated'
import MyFind from './MyFind'
import MyTreasure from './MyTreasure'
import MyChance from './MyChance'
export default {
  components: { MyCreated, MyFind, MyTreasure, MyChance },
  methods: {
    hideAside () {
      this.$emit('aside-hide')
    },
  },
}
</script>
<style  lang="scss" scoped>
.aside {
  background: #fafafa;
  font-size: 12px;
  margin: 0;
  box-sizing: border-box;
  .popup-btn {
    position: absolute;
    top: 40%;
    left: -31px;
    margin-top: -15px;
    width: 30px;
    height: 30px;
    font-size: 20px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #eee;
    border-right: 0;
    border-radius: 3px 0 0 3px;
    color: #bfbfbf;
    background: #fafafa;
    cursor: pointer;
    &:hover,
    &:focus {
      background-color: #eee;
      color: #fff;
      box-shadow: 0 1px 1px 1px #eee;
    }
  }
  .el-scrollbar {
    position: relative;
    height: calc(100% - 64px);
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


