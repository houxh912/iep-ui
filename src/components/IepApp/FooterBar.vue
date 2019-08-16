<template>
  <div class="footer-box">
    <div class="context">
      <div class="text">
        <a href="javascript:void(0);" @click="handleOpen1()">常见问题</a>
        <a href="javascript:void(0);" @click="handleOpen2()">操作手册</a>
        <a href="javascript:void(0);" @click="getTag()">标签库</a>
        <a href="javascript:void(0);">知识图谱</a>
        <a href="javascript:void(0);" @click="handleOpen5()">国脉贝制度</a>
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
  methods: {
    handleOpen1 () {
      this.$openPage('/app/resource/material/material_detail/7978')
    },
    handleOpen2 () {
      this.$openPage('/app/resource/material/material_detail/7984')
    },
    handleOpen3 () {
      this.$openPage('', '标签库', 800, 600)
    },
    handleOpen4 () {
      this.$openPage('', '知识图谱', 800, 600)
    },
    handleOpen5 () {
      this.$openPage('/app/resource/material/material_detail/7985')
    },
    handleOpen6 () {
      this.$openPage('', '新人培训', 800, 600)
    },
    getTag () {
      this.$router.push({
        path: '/app/tag_library/',
      })
    },
  },
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
    width: 1200px;
    margin: 0 auto;
    color: #999;
    a {
      padding: 0 13px;
      color: #999;
      &:hover {
        color: $--color-primary;
      }
    }
    .position {
      padding-left: 0;
    }
    span {
      padding-left: 13px;
    }
    .number {
      color: #999;
    }
  }
}
</style>


