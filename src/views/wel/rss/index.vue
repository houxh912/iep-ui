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
          <iep-button type="primary" @click="handleAdd()" plain>订阅</iep-button>
          <el-popover placement="bottom" width="600" trigger="click">
            <el-tabs v-model="activeName">
              <el-tab-pane label="主题" name="first">
                <el-transfer style="text-align: left; display: inline-block" v-model="themeList" filterable :props="props" :titles="['全部', '已订阅']" :button-texts="['取消', '订阅']" :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }" :data="POLICY_THEME" disabled>
                  <span slot-scope="{ option }">{{ option.label }}</span>
                </el-transfer>
              </el-tab-pane>
              <el-tab-pane label="行业" name="second">
                <el-transfer style="text-align: left; display: inline-block" v-model="industryList" filterable :props="props" :titles="['全部', '已订阅']" :button-texts="['取消', '订阅']" :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }" :data="POLICY_INDUSTRY" disabled>
                  <span slot-scope="{ option }">{{ option.label }}</span>
                </el-transfer>
              </el-tab-pane>
              <el-tab-pane label="地域" name="third">
                <div style="display: flex;" v-for="(item,i) in selectCityList" :key="i">
                  <el-cascader style="flex: 1;" size="small" :props="cityProps" :value="item" :options="cityOption" disabled></el-cascader>
                </div>
              </el-tab-pane>
            </el-tabs>
            <iep-button slot="reference">查看订阅</iep-button>
          </el-popover>
        </template>
        <template slot="right">
          <el-radio-group v-model="type" size="small" @change="loadPage">
            <el-radio-button v-for="tab in tabList" :label="tab.value" :key="tab.value">{{tab.label}}</el-radio-button>
          </el-radio-group>
          <operation-search @search-page="searchPage"></operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <template slot="before-columns">
          <el-table-column label="政策名称">
            <template slot-scope="scope">
              <div @click="handleDetail(scope.row)" class="row-style">
                <span v-if="arrFlag[scope.$index]" class="grade">最新推荐</span>
                <span>{{scope.row.title}}</span>
              </div>
            </template>
          </el-table-column>
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
    <dialog-detail ref="DialogDetail"></dialog-detail>
  </el-row>
</template>
<script>
import mixins from '@/mixins/mixins'
import { dictsMap, columnsMap } from './options'
import { getPolicyPage, getThemeList, getIndustryList, getRegionList } from '@/api/govdata/rss'
import { region as cityOption } from '@/views/govdata/policyManage/region.js'
import DialogForm from './DialogForm'
import { mapGetters } from 'vuex'
import DialogDetail from './DialogDetail'
export default {
  components: { DialogForm, DialogDetail },
  mixins: [mixins],
  data () {
    return {
      cityOption,
      dictsMap,
      columnsMap,
      activeName: 'first',
      type: '*',
      cityProps: {
        value: 'code',
        label: 'name',
      },
      props: {
        key: 'value',
      },
      industryList: [],
      themeList: [],
      selectCityList: [],
      arrFlag: [],
      tabList: [
        {
          label: '全部',
          value: '*',
        },
        {
          label: '通用',
          value: 'general',
        },
        {
          label: '申报',
          value: 'declare',
        },
        {
          label: '解读',
          value: 'explain',
        },
        {
          label: '资讯',
          value: 'information',
        },
      ],
      rssType: [
        { label: '政策订阅', value: '1' },
      ],
      rssTitle: '政策订阅',
      selectType: '0',
      bodyStyle: {
        padding: 0,
      },
    }
  },
  computed: {
    ...mapGetters(['dictGroup']),
    POLICY_THEME () {
      return this.dictGroup['POLICY_THEME']
    },
    POLICY_INDUSTRY () {
      return this.dictGroup['POLICY_INDUSTRY']
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleAdd () {
      this.$refs['DialogForm'].dialogShow = true
    },
    dataReduce () {
      let data = new Date()
      let time = data.getTime()
      return time
    },
    handleDetail (row) {
      this.$refs['DialogDetail'].form = { ...row }
      this.$refs['DialogDetail'].dialogShow = true
    },
    handleSelect (item) {
      this.rssTitle = item.label
      this.selectType = item.value
      this.loadPage()
    },
    loadPage (param = this.searchForm) {
      getThemeList().then(({ data }) => {
        this.themeList = data.data.map(m => m.value)
      })
      getIndustryList().then(({ data }) => {
        this.industryList = data.data.map(m => m.value)
      })
      getRegionList().then(({ data }) => {
        this.selectCityList = data.data.map(m => m.dictValueKey.split(','))
      })
      const D = this.loadTable({ ...param, beforeDays: 3, policyType: this.type }, getPolicyPage)
      let publishTime = []
      D.then((data) => {
        data.records.forEach(element => {
          if (this.dataReduce() - element.publishTime - 3 * 24 * 60 * 60 * 1000 > 0) {
            publishTime.push(false)
          } else {
            publishTime.push(true)
          }
        })
      })
      this.arrFlag = publishTime
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
    color: $--color-primary !important;
  }
}
.aside-main {
  display: flex;
  margin: 0 !important;
  padding: 20px;
  height: 100vh;
  .row-style {
    cursor: pointer;
  }
  .grade {
    color: #fff;
    font-size: 12px;
    padding: 2px 6px;
    height: 18px;
    line-height: 18px;
    margin-right: 4px;
    margin-top: 10px;
    background-color: #b91b21;
    margin-right: 10px;
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
/* .aside-main >>> .el-badge {
  display: inline;
} */
/* .aside-main >>> .cell {
  flex-wrap: nowrap;
} */
</style>