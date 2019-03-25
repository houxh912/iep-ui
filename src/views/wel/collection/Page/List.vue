<template>
  <el-row class="aside-main" :gutter="8">
    <el-col :span="4">
      <el-card shadow="never" :body-style="bodyStyle">
        <div slot="header" class="clearfix">
          <span>消息分类</span>
        </div>
        <el-menu :default-active="selectType" class="menu-vertical">
          <el-menu-item class="menu-item" :index="item.value+''" :key="item.value" v-for="item in imsMsgType" @click.native="handleSelectType(item.value+'')">
            <span>{{item.label}}</span>
            <el-badge class="mark" type="danger" :value="typeCountMap[item.value]" />
          </el-menu-item>
        </el-menu>
      </el-card>
    </el-col>
    <el-col :span="20">
      <page-header title="系统消息"></page-header>
      <operation-container>
        <template slot="left">
          <el-button-group>
            <el-button class="iconfont icon-yanjing" size="mini"></el-button>
            <el-button class="iconfont icon-biaoqian" size="mini"></el-button>
            <el-button class="iconfont icon-shanchu" size="mini"></el-button>
          </el-button-group>
        </template>
        <template slot="right">
          <operation-search @search="searchPage" advance-search>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
        <template slot="before-columns">
          <el-table-column label="主题">
            <template slot-scope="scope">
              <iep-table-link @click="handleDetail(scope.row)">{{scope.row.name}}</iep-table-link>
            </template>
          </el-table-column>
        </template>
      </iep-table>
    </el-col>
  </el-row>
</template>
<script>
import { mapState } from 'vuex'
import { getSystemMessagePage, getTypeCountMap } from '@/api/ims/system_message'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from '../options'
import AdvanceSearch from './AdvanceSearch'
export default {
  mixins: [mixins],
  components: { AdvanceSearch },
  data () {
    return {
      dictsMap,
      columnsMap,
      bodyStyle: {
        padding: 0,
      },
      typeCountMap: {},
      selectType: '0',
    }
  },
  computed: {
    ...mapState({
      dictGroup: state => state.user.dictGroup,
    }),
    imsMsgType () {
      return this.dictGroup['ims_msg_type']
    },
  },
  created () {
    this.loadTypeList()
    this.loadPage()
  },
  methods: {
    handleSelectType (k) {
      this.selectType = k
      this.loadPage()
    },
    handleDetail (row) {
      this.$emit('onDetail', row)
    },
    loadTypeList () {
      getTypeCountMap().then(({ data }) => {
        this.typeCountMap = data.data
      })
    },
    loadPage (param = this.searchForm) {
      this.loadTable({ type: this.selectType, ...param }, getSystemMessagePage)
    },
  },
}
</script>
<style lang="scss" scoped>
.aside-main {
  display: flex;
  padding: 20px;
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
</style>



