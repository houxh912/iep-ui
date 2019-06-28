<template>
  <div>
    <basic-container>
      <iep-page-header title="交易记录"></iep-page-header>
      <operation-container>
        <template slot="left">
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" advance-search>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <el-table-column label="ID">
          <!-- <template slot-scope="scope"> -->
          sss
          <!-- </template> -->
        </el-table-column>
        <el-table-column label="Nonce">
          <!-- <template slot-scope="scope"> -->
          sss
          <!-- </template> -->
        </el-table-column>
        <el-table-column label="日期">
          <!-- <template slot-scope="scope"> -->
          sss
          <!-- </template> -->
        </el-table-column>
        <el-table-column label="哈希值">
          <!-- <template slot-scope="scope"> -->
          sss
          <!-- </template> -->
        </el-table-column>
        <el-table-column label="发送账户">
          <!-- <template slot-scope="scope"> -->
          sss
          <!-- </template> -->
        </el-table-column>
        <el-table-column label="接受账户">
          <!-- <template slot-scope="scope"> -->
          sss
          <!-- </template> -->
        </el-table-column>
        <el-table-column label="金额">
          <!-- <template slot-scope="scope"> -->
          sss
          <!-- </template> -->
        </el-table-column>
        <el-table-column label="创建时间">
          <!-- <template slot-scope="scope"> -->
          sss
          <!-- </template> -->
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import AdvanceSearch from './AdvanceSearch'
export default {
  components: { AdvanceSearch },
  mixins: [mixins],
  data () {
    return {
      isLoadTable: false,
    }
  },
}
</script>
