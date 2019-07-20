<template>
  <!-- <el-row class="aside-main" :gutter="8">
    <el-col class="sub-menu-left" :span="4">
      <menus></menus>
    </el-col>
    <el-col :span="20"> -->
    <div>
      <basic-container>
        <iep-table
          :isLoadTable="isLoadTable"
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
            <template slot-scope="scope">
              <operation-wrapper>
                <iep-button>查看评论</iep-button>
                <iep-button @click="handleEdit(scope.row)">撤销</iep-button>
                <!-- <el-dropdown size="medium">
                  <iep-button type="default">
                    <i class="el-icon-more-outline"></i>
                  </iep-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>共享</el-dropdown-item>
                    <el-dropdown-item>移动</el-dropdown-item>
                    <el-dropdown-item>合并</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                    <el-dropdown-item>上移</el-dropdown-item>
                    <el-dropdown-item>下移</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown> -->
              </operation-wrapper>
            </template>
          </el-table-column>
        </iep-table>
      </basic-container>
    <!-- </el-col>
  </el-row> -->
  </div>
</template>
<script>
// import Menus from './Menus'
import { columnsMap, initSearchForm, dictsMap } from './options'
import mixins from '@/mixins/mixins'
export default {
  // components: { Menus },
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      paramForm: initSearchForm(),
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
<style scoped>
.aside-main >>>.ant-menu-inline{
  border-right: none; 
}
</style> 