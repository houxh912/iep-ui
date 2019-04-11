<template>
  <div>
    <basic-container>
      <div class="title-col">
        <div class="left">
          <el-row>
            <el-col :span="4" class="img">
              <img :src="logo" alt="">
            </el-col>
            <el-col :span="14" class="title">
              <div>
                <div class="tags"><span class="weight">数据基因DNA</span><span class="time">上线时间：2019.09.10</span></div>
                <div class="tags">
                  <a-tag v-for="(item,index) in tags" :key="index">{{item}}</a-tag>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="right">
          <operation-wrapper>
            <iep-button @click="handleBack">返回</iep-button>
          </operation-wrapper>
        </div>
      </div>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='BaseInfo'" v-slot:BaseInfo>
          <base-info v-loading="activeTab !=='BaseInfo'"></base-info>
        </template>
        <template v-if="activeTab ==='TeamInfo'" v-slot:TeamInfo>
          <team-info v-loading="activeTab !=='TeamInfo'"></team-info>
        </template>
        <template v-if="activeTab ==='AllVersion'" v-slot:AllVersion>
          <all-version v-loading="activeTab !=='AllVersion'"></all-version>
        </template>
        <template v-if="activeTab ==='Modules'" v-slot:Modules>
          <modules v-loading="activeTab !=='Modules'"></modules>
        </template>
        <template v-if="activeTab ==='Materials'" v-slot:Materials>
          <materials v-loading="activeTab !=='Materials'"></materials>
        </template>
      </iep-tabs>
    </basic-container>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import BaseInfo from './BaseInfo/'
import TeamInfo from './TeamInfo/'
import AllVersion from './AllVersion/'
import Modules from './Modules/'
import Materials from './Materials/'
const logo = require('../img2.png')
export default {
  name: 'detail',
  components: { BaseInfo, TeamInfo, AllVersion, Modules, Materials },
  mixins: [mixins],
  data () {
    return {
      sss: 'sadsadsd',
      logo,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.$emit('onGoBack') },
      },
      tabList: [{
        label: '基本信息',
        value: 'BaseInfo',
      }, {
        label: '团队信息',
        value: 'TeamInfo',
      }, {
        label: '全新版本',
        value: 'AllVersion',
      }, {
        label: '包含模块',
        value: 'Modules',
      }, {
        label: '相关材料',
        value: 'Materials',
      }],
      activeTab: 'BaseInfo',
      tags: ['产品设计', '项目管理', '原型设计', '平台规划', '需求分析'],
    }
  },
  methods: {
    handleBack () {
      this.$emit('onGoBack')
    },
  },
}
</script>

<style lang="scss" scoped>
.title-col {
  display: flex;
  margin-bottom: 10px;
  .page-title {
    font-size: 20px;
  }
  .page-desc {
    font-size: 14px;
  }
  .el-button--default.is-plain:nth-child(1) {
    background: #fff;
    border: 1px solid #dcdfe6;
    border-color: #dcdfe6;
    color: #606266;
    &:hover {
      border-color: #ea8d03;
      background-color: #fff7ec;
      color: #ea8d03;
    }
  }
}
.left {
  width: 100%;
}
.el-row {
  width: 100%;
}
.img {
  width: 80px;
  padding: 5px;
  border: 1px solid #eee;
  margin: 5px;
  img {
    width: 100%;
  }
}
.title {
  margin-left: 10px;
  display: flex;
  height: 80px;
  align-items: center;
  .weight {
    font-size: 22px;
    font-weight: 600;
    margin-right: 10px;
  }
  .tags {
    margin: 10px 0;
  }
}
</style>
