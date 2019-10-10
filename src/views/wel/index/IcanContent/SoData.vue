<template>
  <wrapper title="SO数据">
    <div class="data">
      <div class="item">
        <div class="icon bg1"><i class="icon-jiandati"></i></div>
        <div class="text">
          <div>材料</div>
          <div class="number">666</div>
        </div>
      </div>
      <div class="item">
        <div class="icon bg2"><i class="icon-survey-library"></i></div>
        <div class="text">
          <div>项目</div>
          <div class="number">666</div>
        </div>
      </div>
      <div class="item">
        <div class="icon bg3"><i class="icon-xiangmu"></i></div>
        <div class="text">
          <div>方案</div>
          <div class="number">666</div>
        </div>
      </div>
      <div class="item">
        <div class="icon bg4"><i class="icon-kehu"></i></div>
        <div class="text">
          <div>客户</div>
          <div class="number">666</div>
        </div>
      </div>
      <div class="item">
        <div class="icon bg5"><i class="icon-tongji1"></i></div>
        <div class="text">
          <div>合同</div>
          <div class="number">666</div>
        </div>
      </div>
      <div class="item">
        <div class="icon bg6"><i class="icon-chanpin"></i></div>
        <div class="text">
          <div>产品</div>
          <div class="number">666</div>
        </div>
      </div>
    </div>
  </wrapper>
</template>
<script>
import Wrapper from './Wrapper'
export default {
  components: {
    Wrapper,
  },
}
</script>
<style lang="scss" scoped>
.bg1 {
  background: #e9b176;
}
.bg2 {
  background: #e3797d;
}
.bg3 {
  background: #77b4e3;
}
.bg4 {
  background: #8dc7af;
}
.bg5 {
  background: #bfc78c;
}
.bg6 {
  background: #9c9de0;
}
.data {
  margin: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.item {
  display: flex;
  .icon {
    border-radius: 50%;
    height: 50px;
    width: 50px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
    .number {
      font-size: 18px;
      color: #333;
    }
  }
}
</style>
