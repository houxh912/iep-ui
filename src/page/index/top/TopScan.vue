<template>
  <el-popover placement="bottom" width="336" v-model="visible" trigger="click">
    <!-- TODO: -->
    <iep-img src="//cloud.govmade.com/upload/iep/201906/491345f6-ac0b-449d-a78d-3e55bf669ae4_TIM%E5%9B%BE%E7%89%8720190606183914.jpg"></iep-img>
    <el-badge :hidden="!emailNum" :value="emailNum || 0" slot="reference" class="item">
      <el-tooltip effect="dark" content="手机版二维码" placement="bottom">
        <iep-button>
          <a-icon type="scan" />
        </iep-button>
      </el-tooltip>
    </el-badge>
  </el-popover>
</template>
<script>
import { openWindow } from '@/util/util'
export default {
  methods: {
    handleOpen () {
      openWindow('/app/resource/material/material_detail/7914', '国脉内网使用指南', 1400, 900)
    },
  },
}
</script>

<style lang="css" scoped>
.item >>> .el-badge__content.is-fixed {
  z-index: 1;
  top: 20px;
  right: 22px;
}
</style>
<style lang="scss" scoped>
button {
  border: 0;
  height: 60px;
  i {
    font-size: 20px;
  }
  &:focus,
  &:hover {
    background-color: #eee;
    color: #333;
  }
}
</style>
