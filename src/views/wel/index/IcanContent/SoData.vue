<template>
  <wrapper title="SO数据">
    <div class="data">
      <div class="item">
        <div class="icon bg1"><i class="icon-jiandati"></i></div>
        <div class="text">
          <div>材料</div>
          <div>666</div>
        </div>
      </div>
      <div class="item">
        <div class="icon bg2"><i class="icon-survey-library"></i></div>
        <div class="text">
          <div>项目</div>
          <div>666</div>
        </div>
      </div>
      <div class="item">
        <div class="icon bg3"><i class="icon-xiangmu"></i></div>
        <div class="text">
          <div>方案</div>
          <div>666</div>
        </div>
      </div>
      <div class="item">
        <div class="icon bg4"><i class="icon-kehu"></i></div>
        <div class="text">
          <div>客户</div>
          <div>666</div>
        </div>
      </div>
      <div class="item">
        <div class="icon bg5"><i class="icon-tongji1"></i></div>
        <div class="text">
          <div>合同</div>
          <div>666</div>
        </div>
      </div>
      <div class="item">
        <div class="icon bg6"><i class="icon-chanpin"></i></div>
        <div class="text">
          <div>产品</div>
          <div>666</div>
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
  background: #05a055;
}
.bg2 {
  background: #33c3d6;
}
.bg3 {
  background: #2c53d3;
}
.bg4 {
  background: #d32b87;
}
.bg5 {
  background: #ecbb1b;
}
.bg6 {
  background: #ec331b;
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
  }
}
</style>
