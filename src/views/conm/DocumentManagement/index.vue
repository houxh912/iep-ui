<template>
  <el-row class="aside-main" :gutter="8">
    <el-col class="sub-menu-left" :span="4">
      <menus></menus>
    </el-col>
    <el-col :span="20">
      <basic-container>
        <page-header title="文档管理" :replaceText="replaceText" :data="statistics"></page-header>
        <operation-container>
          <template slot="left">
            <iep-button type="warning" plain>新增</iep-button>
            <iep-button>移动</iep-button>
            <el-dropdown size="medium">
              <iep-button type="default">
                更多操作
                <i class="el-icon-arrow-down el-icon--right"></i>
              </iep-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          <template slot="right">
            <operation-search>
              <!-- <advance-search @search-page="searchPage"></advance-search> -->
            </operation-search>
          </template>
        </operation-container>
        <iep-table
          :isLoadTable="false"
          :pagination="pagination"
          :dictsMap="dictsMap"
          :columnsMap="columnsMap"
          :pagedTable="pagedTable"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          is-mutiple-selection
        >
          <template slot="before-columns">
            <el-table-column label="ID" width="90px">
              <template slot-scope="scope">
                <div>{{scope.row.id}}</div>
              </template>
            </el-table-column>
            <el-table-column label="标题" width="200px">
              <template slot-scope="scope">
                <iep-table-link @click="handleDetail(scope.row)">{{scope.row.title}}</iep-table-link>
              </template>
            </el-table-column>
            <el-table-column label="发布时间">
              <template slot-scope="scope">
                <iep-table-link>{{scope.row.time}}</iep-table-link>
              </template>
            </el-table-column>
          </template>
          <el-table-column prop="operation" label="操作" width="250" fixed="right">
            <template>
              <operation-wrapper>
                <iep-button>查看评论</iep-button>
                <iep-button>编辑</iep-button>
                <el-dropdown size="medium">
                  <iep-button type="default">
                    <i class="el-icon-more-outline"></i>
                  </iep-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>共享</el-dropdown-item>
                    <el-dropdown-item>移动</el-dropdown-item>
                    <el-dropdown-item>合并</el-dropdown-item>
                    <!-- <el-dropdown-item>删除</el-dropdown-item>
                    <el-dropdown-item>上移</el-dropdown-item>
                    <el-dropdown-item>下移</el-dropdown-item>-->
                  </el-dropdown-menu>
                </el-dropdown>
              </operation-wrapper>
            </template>
          </el-table-column>
        </iep-table>
      </basic-container>
    </el-col>
  </el-row>
</template>
<script>
import Menus from './Menus'
import { columnsMap, initSearchForm, dictsMap } from './options'
import mixins from '@/mixins/mixins'
export default {
  components: { Menus },
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      paramForm: initSearchForm(),
      statistics: [1000],
      replaceText: (data) => `（共${data[0]}条）`,
      pagedTable: [
        { id: 1, title: 'saaa', time: '2018-08-09', browsingVolume: 'sad', numberOfComments: '12ad', status: '0' },
        { id: 2, title: 'saaa', time: '2018-08-09', browsingVolume: 'sad', numberOfComments: '0ada', status: '1' },
      ],
    }
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
