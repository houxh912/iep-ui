<template>
  <div class="footer-box">
    <div class="context">
      <div class="text">
        <a href="javascript:void(0);">常见问题</a>
        <a href="javascript:void(0);">操作手册</a>
        <a href="javascript:void(0);">标签库</a>
        <a href="javascript:void(0);">知识图谱</a>
        <a href="javascript:void(0);">国脉贝制度</a>
        <a href="javascript:void(0);"> 新人培训</a>
        <span> Copyright 2014 - 2019 技术支持：<a class="position" href="javascript:void(0);"> 国脉数据智能门户系统DIPS</a></span>
        <span class="number">浙ICP备13016715号-4</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'IepAppFooterBar',
}
</script>
<style lang="scss" scoped>
.footer-box {
  width: 100%;
  height: 65px;
  background-color: #535353;
  text-align: center;
  line-height: 65px;
  .context {
    width: 1280px;
    margin: 0 auto;
    color: #d1d1d1;
    a {
      padding: 0 15px;
      color: #d1d1d1;
      &:hover {
        color: #bb1a20;
      }
    }
    .position {
      padding-left: 0;
    }
    span {
      padding-left: 15px;
    }
    .number {
      color: #a6a6a6;
    }
  }
}
</style>


