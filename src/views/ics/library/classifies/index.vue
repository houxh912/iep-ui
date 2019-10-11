<template>
  <el-col class="sub-menu-left" :span="4">
    <el-card class="sub-card" shadow="never" :body-style="bodyStyle">
      <div slot="header" class="clearfix">
        <div class="title">分类</div><i class="icon-iconset0136"></i>
      </div>
      <el-menu :default-active="selectType" class="menu-vertical" @select="catalogSelect" @open="nemuOpen" @close="nemuColse" unique-opened>
        <el-submenu :index="index+''" v-for="(item, index) in catalogList" :key="index">
          <template slot="title">
            <!-- <span>{{item.name}}</span> -->
            <div class="item-tpl" style="padding-right: 25px;" v-on:mouseover="settingIndex=item.id" v-on:mouseout="settingIndex=-1">
              <div class="item-name">{{item.name}}</div>
              <el-dropdown size="medium" v-show="settingIndex===item.id" slot="reference">
                <i class="el-icon-setting"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <div @click="catalogCreate(item.id)">添加子目录</div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </template>
          <el-menu-item :index="child.id+''" v-for="(child, i) in item.childrens" :key="i">
            <div class="item-tpl" v-on:mouseover="settingIndex=child.id" v-on:mouseout="settingIndex=-1">
              <div class="item-name">{{child.name}}</div>
              <el-dropdown size="medium" v-show="settingIndex===child.id" slot="reference">
                <i class="el-icon-setting"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <div @click="catalogUpdate(child.id)">重命名</div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-card>
  </el-col>
</template>

<script>
export default {
  data () {
    return {
      bodyStyle: {
        padding: 0,
        minHeight: '200px',
      },
      selectType: '0',
      catalogList: [
        {
          id: 1,
          name: '一级分类',
          childrens: [
            {
              id: 1,
              name: '一级子分类',
            },
          ],
        },
      ],
      settingIndex: -1,
    }
  },
  methods: {
    catalogSelect () {},
    nemuOpen () {},
    nemuColse () {},
    catalogUpdate () {},
  },
}
</script>

<style lang="scss" scoped>
.sub-menu-left {
  width: 100%;
  .sub-card {
    width: 100%;
    .clearfix {
      display: flex;
      .title {
        flex: 1;
        font-size: 18px;
      }
      i {
        cursor: pointer;
      }
    }
  }
}
</style>

<style scoped>
.sub-menu-left >>> .el-card__header {
  padding: 8px 20px;
  border: 0;
}
.sub-menu-left >>> .el-submenu__title,
.sub-menu-left >>> .el-menu-item {
  height: 40px;
  line-height: 40px;
}
.sub-menu-left >>> .el-dropdown {
  top: -5px;
}
.sub-menu-left >>> .el-menu {
  border-right: 0;
}
</style>
