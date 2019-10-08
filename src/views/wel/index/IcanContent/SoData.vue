<template>
  <wrapper title="SO数据">
    <div class="data">
      <div class="item">
        <div class="icon"><i class="icon-jiandati"></i></div>
        <div class="text">
          <div>材料</div>
          <div>666</div>
        </div>
      </div>
      <div class="item">
        <div class="icon"><i class="icon-jiandati"></i></div>
        <div class="text">
          <div>项目</div>
          <div>666</div>
        </div>
      </div>
      <div class="item">
        <div class="icon"><i class="icon-jiandati"></i></div>
        <div class="text">
          <div>方案</div>
          <div>666</div>
        </div>
      </div>
      <div class="item">
        <div class="icon"><i class="icon-jiandati"></i></div>
        <div class="text">
          <div>客户</div>
          <div>666</div>
        </div>
      </div>
      <div class="item">
        <div class="icon"><i class="icon-jiandati"></i></div>
        <div class="text">
          <div>合同</div>
          <div>666</div>
        </div>
      </div>
      <div class="item">
        <div class="icon"><i class="icon-jiandati"></i></div>
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
.data {
  margin: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.item {
  display: flex;
  .icon {
    background-color: #213133;
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
