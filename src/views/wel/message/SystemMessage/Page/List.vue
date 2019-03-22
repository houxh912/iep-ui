<template>
  <div class="aside-main">
    <Card title="消息分类" icon="ios-options" :padding="0" class="type-card-box">
      <CellGroup>
        <Cell :title="v" v-for="(v,k) in dictsMap.messageType" :key="k" :selected="selectType === k" @click.native="handleSelectType(k)">
          <Badge :count="2" slot="extra" />
        </Cell>
      </CellGroup>
    </Card>
    <div class="page-container">
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
    </div>
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
      selectType: '0',
    }
  },
  created () {
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
    loadPage (param = this.searchForm) {
      this.loadTable({ type: this.selectType, ...param }, getSystemMessagePage)
    },
  },
}
</script>
<style lang="scss" scoped>
.aside-main {
  display: flex;
  .type-card-box {
    width: 200px;
  }
  .page-container {
    margin-left: 20px;
    width: 100%;
  }
}
</style>



