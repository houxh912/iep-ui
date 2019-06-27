<template>
  <div>
    <basic-container>
      <page-header title="全部任务"></page-header>
      <el-card class="box" shadow="hover">
        <div class="total-wrapper">
          <div class="total-item" v-for="(item, index) in dataList" :key="index">
            <div class="value">{{item.value}}</div>
            <div class="label"><a href="#">{{item.label}}</a></div>
          </div>
        </div>
      </el-card>
      <operation-container>
        <template slot="left">
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="false" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-tree>
        <!-- <template slot="before-columns">
          <el-table-column label="任务名称" width="300px">
            <template slot-scope="scope">
              <iep-table-link @click="handleDetail(scope.row)">{{scope.row.taskName}}</iep-table-link>
              <el-tooltip class="item" effect="dark" content="此任务已逾期" placement="top">
                <i class="iconfont icon-shijian"></i>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              {{scope.row.taskStatus}}
              <span></span> 
            </template>
          </el-table-column>
          <el-table-column label="创建人">
            <template slot-scope="scope">
              {{scope.row.founder}}
            </template>
          </el-table-column>
          <el-table-column label="负责人">
            <template slot-scope="scope">
              {{scope.row.principal}}
            </template>
          </el-table-column>
          <el-table-column label="起止时间">
            <template slot-scope="scope">
              {{scope.row.time}}
            </template>
          </el-table-column>
        </template> -->
        <template>
          <el-table-column label="起止时间" width="300px">
            <template slot-scope="scope">
              {{scope.row.startTime | parseToDay}}~{{scope.row.endTime | parseToDay}}
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作" width="100">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleDetail(scope.row)" type="warning" plain>查看</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { getAllAtms } from '@/api/atms/index'
import mixins from '@/mixins/mixins'
import { dictsMap, columnsMap } from './options'
export default {
  mixins: [mixins],
  data () {
    return{
      dataList:[
        {value:55,label:'任务统计'},
        {value:55,label:'代办任务'},
        {value:55,label:'进行中'},
        {value:55,label:'已完成'},
        {value:55,label:'已逾期'},
      ],
      dictsMap,
      columnsMap,
      pagedTable:[
        {
          id:1,
          taskName:'修改合同的签署部门字段',
          taskStatus:'0',
          founder:'ss',
          principal:'ddd',
          time:'2019-06-16~2019-06-25',
          children:[
            {id:11,taskName:'修改合同的签署部门字段',taskStatus:'0',founder:'ss',principal:'ddd',time:'2019-06-16~2019-06-25'},
          ],
        },
        {id:2,taskName:'修改合同的签署部门字段',taskStatus:'0',founder:'ss',principal:'ddd',time:'2019-06-16~2019-06-25'},
        {id:3,taskName:'修改合同的签署部门字段',taskStatus:'0',founder:'ss',principal:'ddd',time:'2019-06-16~2019-06-25'},
      ],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage (param = this.searchForm) {
      this.loadTable(param, getAllAtms)
    },
    handleSelectionChange () {
    },
    handleAdd () {
    },
    handleDetail (row) {
      this.$router.push({
        path:`/atms/details/${row.id}`,
      })
    },
    // loadPage (param = this.searchForm) {
    //   this.loadTable(param, getAlreadyApprovalPage)
    // },
  },
}
</script>

<style lang="scss" scoped>
.box{
  margin-bottom: 20px;
}
.total-wrapper {
  display: flex;
  justify-content: space-around;
  margin: 14px 0;
  .total-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-right: 1px solid rgb(233, 233, 233);
    width: 100%;
    &:last-child {
      border-right: none;
    }
    .value {
      font-size: 24px;
      color: rgb(48, 49, 51);
    }
    .label {
      & > a {
        color: #999;
      }
    }
  }
}
</style>

