<template>
  <div>
    <basic-container>
      <iep-page-header title="其他应收账款"></iep-page-header>
      <operation-container>
        <template slot="right">
          <el-select size="small" v-model="type" placeholder="请选择其他应收款类别" @change="hanldeChange">
            <el-option v-for="item in otherReceivables" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <operation-search @search-page="searchPage" prop="projectName">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="false" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getExpenditurePage } from '@/api/fams/expenditure'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from '../../EManagement/options'
export default {
  mixins: [mixins],
  data () {
    return {
      type: '81',
      dictsMap,
      columnsMap,
    }
  },
  computed: {
    ...mapGetters(['dictGroup']),
    otherReceivables () {
      return this.dictGroup['fams_expenditure_type'].find(m => m.value === '17').children
    },
  },
  created () {
    this.type = this.otherReceivables[0].value
    this.loadPage()
  },
  methods: {
    hanldeChange () {
      this.loadPage()
    },
    loadPage (param = this.searchParam) {
      this.loadTable({ ...param, type: this.type }, getExpenditurePage)
    },
  },
}
</script>