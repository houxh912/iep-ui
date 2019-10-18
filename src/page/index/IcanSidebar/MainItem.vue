<template>
  <div class="main-item-wrapper">
    <div v-if="isNull">{{isNull}}</div>
    <template v-else>
      <el-tooltip v-if="collapse" class="item" effect="dark" content="ET工作台" placement="right">
        <div class="min-div" @click="$openPage(website.menu.firstMenu.path)">
          <i class="icon-et"></i>
        </div>
      </el-tooltip>
      <el-tooltip v-if="collapse" class="item" effect="dark" :content="mainMenu.label" placement="right">
        <div class="min-menu">
          <i :class="mainMenu.icon"></i>
        </div>
      </el-tooltip>
      <template v-else>
        <div class="max-menu" @click="$openPage(website.menu.firstMenu.path)">
          <i class="icon-et"></i>
          {{mainMenu.label}}
        </div>
      </template>
    </template>
  </div>
</template>
<script>
import { validatenull } from '@/util/validate'
import website from '@/const/website'
export default {
  name: 'MainItem',
  props: {
    mainMenu: {
      type: Object,
      required: true,
      default: () => { },
    },
    collapse: {
      type: Boolean,
      required: true,
    },
  },
  data () {
    return {
      website,
    }
  },
  computed: {
    isNull () {
      if (validatenull(this.mainMenu)) {
        return '当前用户无菜单'
      }
      return false
    },
  },
}
</script>
<style lang="scss" scoped>
.max-menu {
  display: flex;
  padding-left: 10px;
  justify-content: flex-start;
  align-items: center;
  background-color: $--color-primary;
  color: #fff;
  height: 50px;
  .icon-et {
    cursor: pointer;
    font-size: 40px !important;
    line-height: 50px;
    color: #fff;
  }
}
.min-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $--color-primary;
  color: #fff;
  height: 50px;
}
.main-item-wrapper {
  font-size: 16px;
  text-align: center;
  color: #666;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.12);

  .min-div {
    .icon-et {
      cursor: pointer;
      font-size: 27px !important;
      line-height: 50px;
      color: $--color-primary;
    }
  }
}
</style>
