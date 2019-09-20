<template>
  <div class="wel-content-grid-wrapper">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<style lang="scss" scoped>
// 注意，设为网格布局以后，容器子元素（项目）的float、display: inline-block、display: table-cell、vertical-align和column-*等设置都将失效。
.wel-content-grid-wrapper {
  padding: 20px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  // grid-template-rows: 200px repeat(auto-fit, 250px);
  grid-template-rows:
    180px
    repeat(auto-fill, 250px);
  grid-gap: 20px;
  background-color: #eee;
  > div {
    height: 250px;
    background-color: #fff;
    &:nth-child(1),
    &:nth-child(2) {
      height: 180px;
    }
  }
}
</style>
