<template>
  <el-row class="aside-main" :gutter="8">
    <el-col class="sub-menu-left" :span="4">
      <el-card shadow="never" :body-style="bodyStyle">
        <el-menu :default-active="selectType" class="menu-vertical">
          <el-menu-item class="menu-item" :index="item.value+''" :key="item.type" v-for="item in Type" @click.native="handleSelectType(item.type)">
            <span>{{item.name}}</span>
          </el-menu-item>
        </el-menu>
      </el-card>
    </el-col>
    <el-col :span="20">
      <iep-page-header title="站点管理详情" :backOption="backOption"></iep-page-header>
      <ad v-if="selectType=='3'"></Ad>
      <ad-slot v-if="selectType=='2'"></ad-slot>
      <attribute-management v-if="selectType=='1'"></attribute-management>
    </el-col>
  </el-row>
</template>
<script>
import Ad from '../ADManagement'
import AdSlot from '../ADSlotManagement'
import AttributeManagement from '../AttributeManagement'
export default {
  data () {
    return {
      bodyStyle: {
        padding: 0,
      },
      Type: [
        { type: '1', name: '推荐位管理' },
        { type: '2', name: '广告位管理' },
        { type: '3', name: '广告管理' },
      ],
      backOption: {
        isBack: true,
      },
      selectType: '1',
    }
  },
  components: {
    Ad,
    AdSlot,
    AttributeManagement,
  },
  methods: {
    handleSelectType (type) {
      this.selectType = type
    },
  },
}
</script>
<style lang="scss" scoped>
.aside-main {
  display: flex;
  margin: 0 !important;
  padding: 20px;
  width: 100%;
  height: 100vh;
  .title {
    font-size: 16px;
  }
  .menu-vertical {
    border: none;
  }
  .menu-item {
    display: flex;
    justify-content: space-between;
    & > .mark {
      margin-top: 5px;
    }
  }
  .page-container {
    margin-left: 20px;
    width: 100%;
  }
}
.sub-menu-left {
  margin: -20px 15px -20px -20px;
  padding-top: 12px;
  border-right: 1px solid #ebeef5;
  .el-card {
    border: 0;
  }
}
</style>
<style scoped>
.sub-menu-left >>> .el-card__header {
  padding: 8px 20px;
  border: 0;
}
.sub-menu-left >>> .el-menu-item {
  height: 40px;
  line-height: 40px;
}
</style>




