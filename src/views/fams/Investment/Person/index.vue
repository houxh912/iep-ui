<template>
  <div>
    <basic-container>
      <page-header title="投资人审核"></page-header>
      <operation-container>
        <template slot="left">
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage"></operation-search>
        </template>
      </operation-container>
      <iep-table class="dept-table" :isLoadTable="false" :pagination="pagination" :columnsMap="columnsMap" :dictsMap="dictsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection is-tree>
        <template>
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
import {columnsMap,dictsMap} from './options'
import mixins from '@/mixins/mixins'
export default {
  data () {
    return {
      columnsMap,
      dictsMap,
      pagination:{},
      pagedTable: [
        {name:'张三',amount:'222',sharesNumber:'3',way:'股权投资',status:'0',organization:'舟山国脉研发中心'},
        {name:'张三',amount:'222',sharesNumber:'3',way:'股权投资',status:'1',organization:'舟山国脉研发中心'},
        {name:'张三',amount:'222',sharesNumber:'3',way:'股权投资',status:'2',organization:'舟山国脉研发中心'},
        {name:'张三',amount:'222',sharesNumber:'3',way:'股权投资',status:'0',organization:'舟山国脉研发中心'},
        {name:'张三',amount:'222',sharesNumber:'3',way:'股权投资',status:'0',organization:'舟山国脉研发中心'},
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
    handleReview (row) {
      this.$refs['iepReviewForm'].title = '审核'
      this.$refs['iepReviewForm'].id = row.id
      //this.$refs['iepReviewForm'].formRequestFn = reviewApprovaBatch
      this.$refs['iepReviewForm'].dialogShow = true
    },
  },
}
</script>
