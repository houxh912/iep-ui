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
      <iep-button class="toggle-button">Toggle</iep-button>
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
  methods: {
    hideAside () {
      this.$store.commit('HIDEASIDE')
    },
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
  .popup-btn {
    position: absolute;
    top: 40%;
    left: -26px;
    margin-top: -15px;
    width: 25px;
    height: 30px;
    font-size: 20px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #eee;
    border-radius: 3px 0 0 3px;
    color: #bfbfbf;
    background: #fafafa;
    z-index: 999;
    cursor: pointer;
    &:hover, &:focus {
      background-color: #eee;
      color: #fff;
    }
  }
  .el-scrollbar {
    position: relative;
    height: calc(100% - 64px);
    .toggle-button {
      position: absolute;
    }
    padding: 0;
    .el-scrollbar__view {
      > div {
        padding: 10px 10px 20px 10px;
        border-bottom: 1px solid #ececec;
      }
    }
  }
}
.wel-aside.rightAuto {
  right: -300px;
}
</style>


