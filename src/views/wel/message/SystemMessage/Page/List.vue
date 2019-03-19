<template>
  <div>
    <basic-container>
      <div class="info-container">
        <div class="sub-menu">
          <h4>分类</h4>
          <ul>
            <li v-for="item in list" :key="item.id">
              <el-button type="text">{{item.title}}<span class="num">{{item.num}}</span></el-button>
            </li>
          </ul>
        </div>
        <basic-container>
          <page-header title="系统消息" :replaceText="replaceText"></page-header>
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
                <advance-search :form="paramForm" @search-page="searchPage" @clear-search-param="clearSearchParam"></advance-search>
              </operation-search>
            </template>
          </operation-container>
          <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="currentColumnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
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
import { getEmployeeProfilePage }
  from '@/api/hrms/employee_profile'
import mixins from '@/mixins/mixins'
import { columnsMap, initSearchForm, dictsMap } from '../options'
import AdvanceSearch from './AdvanceSearch'
export default {
  mixins: [mixins],
  components: { AdvanceSearch },
  data () {
    return {
      dictsMap,
      columnsMap,
      paramForm: initSearchForm(),
      list: [
        {
          id: '1',
          title: '提醒',
          num: '5',
        },
        {
          id: '2',
          title: '纪要',
          num: '5',
        },
        {
          id: '3',
          title: '任务',
          num: '5',
        },
        {
          id: '4',
          title: '审批',
          num: '10',
        },
        {
          id: '5',
          title: '财富',
          num: '3',
        },
        {
          id: '6',
          title: '其他',
          num: '5',
        },
        {
          id: '7',
          title: '星标',
          num: '5',
        },
        {
          id: '8',
          title: '系统消息',
          num: '8',
        },
      ],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    clearSearchParam () {
      this.paramForm = initSearchForm()
      this.loadPage()
    },
    loadPage (param = this.paramForm) {
      this.loadTable(param, getEmployeeProfilePage)
    },
    // handleChange () {
    //   this.$emit('onEdit')
    // },
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


