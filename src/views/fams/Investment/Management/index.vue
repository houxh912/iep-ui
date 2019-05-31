<template>
  <div>
    <basic-container>
      <page-header title="投资管理"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button type="danger" icon="el-icon-plus" plain @click="handleAdd">
            新增
          </iep-button>
          <iep-button plain>
            删除
          </iep-button>
        </template>
        <template slot="right">
          <el-radio-group size="small">
            <el-radio-button v-for="tab in tabList" :label="tab.value" :key="tab.value">{{tab.label}}</el-radio-button>
          </el-radio-group>
          <operation-search @search-page="searchPage"></operation-search>
        </template>
      </operation-container>
      <iep-table class="dept-table" :isLoadTable="false" :pagination="pagination" :columnsMap="columnsMap" :dictsMap="dictsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection is-tree>
        <template slot="before-columns">
          <el-table-column prop="company" label="公司" width="250">
            <template slot-scope="scope">
              <iep-table-link-img-desc :img="scope.row.imageUrl" :desc="scope.row.synopsis" :name="scope.row.name" v-on:m-click="handleDetail"></iep-table-link-img-desc>
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" plain @click="handleEdit(scope.row)" v-if="scope.row.status==0">编辑</iep-button>
              <iep-button v-if="scope.row.status==0">上架</iep-button>
              <iep-button v-if="scope.row.status==1||scope.row.status==2">下架</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import {tabList,columnsMap,dictsMap} from './options'
import mixins from '@/mixins/mixins'
export default {
  data () {
    return {
      tabList,
      columnsMap,
      dictsMap,
      pagination:{},
      pagedTable: [
        {member:'222',targetAmount:'2000000',votedAmount:'300000',investmentMode:'股权投资',status:'0',name:'舟山国脉研发中心'},
        {member:'222',targetAmount:'2000000',votedAmount:'300000',investmentMode:'股权投资',status:'1',name:'舟山国脉研发中心'},
        {member:'222',targetAmount:'2000000',votedAmount:'300000',investmentMode:'股权投资',status:'2',name:'舟山国脉研发中心'},
        {member:'222',targetAmount:'2000000',votedAmount:'300000',investmentMode:'股权投资',status:'0',name:'舟山国脉研发中心'},
        {member:'222',targetAmount:'2000000',votedAmount:'300000',investmentMode:'股权投资',status:'0',name:'舟山国脉研发中心'},
      ],
      searchProp:[],
    }
  },
  mixins:[mixins],
  computed: {
  },
  created () {
  },
  methods: {
    handleAdd () {
      this.$router.push({
        path: '/fams_spa/management_edit/1',
      })
    },
    handleDetail () {
      this.$router.push({
        path: '/fams_spa/management_detail/1',
      })
    },
  },
}
</script>
