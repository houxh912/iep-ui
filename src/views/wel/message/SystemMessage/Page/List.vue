<template>
  <div>
    <basic-container>
      <div class="info-container">
        <div style="padding: 10px;">
          <Card title="分类" icon="ios-options" :padding="0" shadow style="width: 300px;">
            <CellGroup>
              <Cell title="提醒" selected>
                <Badge :count="1" slot="extra" />
              </Cell>
              <Cell title="纪要">
                <Badge :count="2" slot="extra" />
              </Cell>
              <Cell title="任务">
                <Badge :count="3" slot="extra" />
              </Cell>
              <Cell title="审批">
                <Badge :count="4" slot="extra" />
              </Cell>
              <Cell title="财富">
                <Badge :count="12" slot="extra" />
              </Cell>
              <Cell title="其他">
                <Badge :count="2" slot="extra" />
              </Cell>
              <Cell title="星标">
                <Badge :count="5" slot="extra" />
              </Cell>
              <Cell title="系统消息">
                <Badge :count="3" slot="extra" />
              </Cell>
            </CellGroup>
          </Card>
        </div>
        <basic-container>
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
        </basic-container>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { getSystemMessagePage } from '@/api/ims/system_message'
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
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage (param = this.searchForm) {
      this.loadTable(param, getSystemMessagePage)
    },
    handleDetail (row) {
      this.$emit('onDetail', row)
    },
  },
}
</script>
<style lang="scss" scoped>
.info-container {
  display: flex;
  justify-content: space-between;
  .sub-menu {
    flex: 0 0 180px;
    padding-top: 20px;
    border-right: 1px solid #d7d7d7;
    ul,
    li,
    ol {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    li {
      padding: 0 15px;
      text-align: left;
      .num {
        float: right;
        width: auto;
      }
    }
    h4 {
      font-size: 16px;
    }
  }
}
</style>
<style scoped>
.info-container >>> .basic-container {
  flex: 1;
  padding-top: 20px;
  padding-left: 20px;
}
.info-container >>> .sub-menu li span {
  display: inline-block;
  width: 100%;
  text-align: left;
}
.info-container >>> .sub-menu .el-button--text {
  width: 100%;
}
</style>


