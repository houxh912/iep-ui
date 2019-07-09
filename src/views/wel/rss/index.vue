<template>
  <el-row class="aside-main" :gutter="8">
    <el-col class="sub-menu-left" :span="4">
      <el-card shadow="never" :body-style="bodyStyle">
        <div slot="header" class="clearfix">
          <span class="title">订阅目录</span>
        </div>
        <el-menu :default-active="selectType" class="menu-vertical">
          <el-menu-item class="menu-item" :key="index" v-for="(item,index) in rssType" @click="handleSelect(item)">
            <span>{{item.label}}</span>
          </el-menu-item>
        </el-menu>
      </el-card>
    </el-col>
    <el-col :span="20">
      <iep-page-header :title="rssTitle"></iep-page-header>
      <!-- <div class="info">
        <span>我的订阅模块主要为个人在内网中订阅的内容。</span>
        <span class="red">我的订阅模块还在开发中，敬请期待，本页面仅为样式效果演示</span>
      </div> -->
      <operation-container>
        <template slot="left">
          <iep-button type="primary" @click="handleAdd()" plain>订阅主题</iep-button>
          <!-- <el-dropdown size="medium">
            <iep-button size="small" type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>删除</el-dropdown-item>
              <el-dropdown-item @click.native="handleExport">导出</el-dropdown-item>
              <el-dropdown-item @click.native="handleCollectAll">收藏</el-dropdown-item>
              <el-dropdown-item>分享</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage"></operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="false" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <template slot="before-columns">
        </template>
        <!-- <el-table-column prop="operation" label="操作" width="160"> -->
        <!-- <template> -->
        <!-- <operation-wrapper> -->
        <!-- <iep-button type="warning" plain>收藏</iep-button> -->
        <!-- <iep-button>分享</iep-button> -->
        <!-- <iep-button>取消订阅</iep-button> -->
        <!-- </operation-wrapper> -->
        <!-- </template> -->
        <!-- </el-table-column> -->
      </iep-table>
    </el-col>
    <dialog-form ref="DialogForm"></dialog-form>
  </el-row>
</template>
<script>
import mixins from '@/mixins/mixins'
import { dictsMap, columnsMap } from './options'
import { getPolicyPage, getThemeList } from '@/api/govdata/rss'
import DialogForm from './DialogForm'
export default {
  components: { DialogForm },
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      rssType: [
        { label: '国策订阅', value: '1' },
      ],
      rssTitle: '我的订阅',
      selectType: '0',
      bodyStyle: {
        padding: 0,
      },
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleAdd () {
      getThemeList().then(({ data }) => {
        this.$refs['DialogForm'].themeList = data.map(m => m.value)
        this.$refs['DialogForm'].dialogShow = true
      })
    },
    handleDetail () {
    },
    handleSelect (item) {
      this.rssTitle = item.label
      this.selectType = item.value
      this.loadPage()
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getPolicyPage)
    },
  },
}
</script>
<style lang="scss" scoped>
.info {
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #ffdbc1;
  background-color: #fffbf6;
  span {
    display: block;
    line-height: 28px;
    color: #333;
  }
  .red {
    color: #ba1b21 !important;
  }
}
.aside-main {
  display: flex;
  margin: 0 !important;
  padding: 20px;
  height: 100vh;
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
  border-right: 1px solid #e5e5e5;
  height: 100ch;
  .title {
    margin-bottom: 15px;
    font-size: 16px;
  }
}
</style>
<style scoped>
.sub-menu-left >>> .el-card {
  border: 0;
}
.sub-menu-left >>> .el-card__header {
  padding: 8px 20px;
  border: 0;
}
.sub-menu-left >>> .el-menu-item {
  height: 40px;
  line-height: 40px;
}
</style>