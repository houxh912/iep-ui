<template>
  <div class="box">
    <div class="leftBox">
      <p>分类</p>
    </div>
    <div class="rightBox">
      <basic-container>
        <page-header title="员工" :replaceText="replaceText" :data="[10 ,5, 1]"></page-header>
      </basic-container>
      <operation-container>
        <template slot="left">
          <el-button-group class="btns">
            <el-button type="primary" icon="el-icon-edit" size="small"></el-button>
            <el-button type="primary" icon="el-icon-share" size="small"></el-button>
            <el-button type="primary" icon="el-icon-delete" size="small"></el-button>
          </el-button-group>
        </template>
        <template slot="right">
          <operation-search @search="searchPage" advance-search>
            <advance-search :form="paramForm" @search-page="searchPage" @clear-search-param="clearSearchParam"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="false" :pagination="pagination=5" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
        <el-table-column label="操作">
          <template>
            <el-button size="small">分享</el-button>
          </template>
        </el-table-column>
      </iep-table>
    </div>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import { getAdministrativeApprovalPage } from '@/api/hrms/administrative_approval'
export default {
  mixins: [mixins],
  data () {
    return {
      replaceText: (data) => `（本周新增${data[0]}位正式员工，新增${data[1]}位实习生，离职${data[2]}人）`,
      columnsMap: [
        {
          prop: '申请类型',
          label: '申请类型',
        }, {
          prop: '申请人',
          label: '申请人',
        },
        {
          prop: '部门',
          label: '部门',
        },
        {
          prop: '申请时间',
          label: '申请时间',
        },
        {
          prop: '审批人',
          label: '审批人',
        },
        {
          prop: '状态',
          label: '状态',
        },
      ],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    // handleShare (row) { },
    loadPage (param) {
      this.loadTable(param, getAdministrativeApprovalPage)
    },
    handleCommandType () {
      // console.log(val)
    },
    handleCommandUser () {
      // console.log(val)
    },
  },
}
</script>

<style lang="scss" scoped>
  .box{
    width: 100%;
    height: 100%;
    .leftBox{
      float: left;
      width: 300px;
      background-color: yellow;
    }
    .rightBox{
      height: 100px;
      margin-left: 300px;
      background-color: red;
      .btns{
        margin-left: 20px;
      }
    }
  }
</style>
