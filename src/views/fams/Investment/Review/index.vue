<template>
  <div>
    <basic-container>
      <page-header title="投资审核"></page-header>
      <operation-container>
        <template slot="left">
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
              <iep-button type="warning" plain @click="handleReview(scope.row)" v-if="scope.row.status==0">审核</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <iep-review-confirm ref="iepReviewForm"></iep-review-confirm>
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
        {amount:'222',interestRate:'3%',way:'股权投资',status:'0',name:'舟山国脉研发中心'},
        {amount:'222',interestRate:'3%',way:'股权投资',status:'1',name:'舟山国脉研发中心'},
        {amount:'222',interestRate:'3%',way:'股权投资',status:'2',name:'舟山国脉研发中心'},
        {amount:'222',interestRate:'3%',way:'股权投资',status:'0',name:'舟山国脉研发中心'},
        {amount:'222',interestRate:'3%',way:'股权投资',status:'0',name:'舟山国脉研发中心'},
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
    handleDetail () {
      this.$router.push({
        path: '/fams_spa/management_detail/1',
      })
    },
    handleReview (row) {
      this.$refs['iepReviewForm'].title = '审核'
      this.$refs['iepReviewForm'].id = row.id
      //this.$refs['iepReviewForm'].formRequestFn = reviewApprovaBatch
      this.$refs['iepReviewForm'].dialogShow = true
    },
  },
}
</script>
