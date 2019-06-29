<template>
  <div>
    <basic-container>
      <iep-page-header title="发行记录"></iep-page-header>
      <operation-container>
        <template slot="left">
          <operation-wrapper>
            <iep-button type="primary" @click="handleIssued" icon="el-icon-plus" plain>发币</iep-button>
            <iep-button @click="handleSearchAmount">查询成员余额</iep-button>
          </operation-wrapper>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
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
    <dialog-form ref="DialogForm"></dialog-form>
    <search-form ref="SearchForm"></search-form>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import SearchForm from './SearchForm'
import DialogForm from './DialogForm'
export default {
  components: { DialogForm, SearchForm },
  mixins: [mixins],
  data () {
    return {
      isLoadTable: false,
    }
  },
  methods: {
    handleSearchAmount () {
      this.$refs['SearchForm'].dialogShow = true
    },
    handleIssued () {
      this.$refs['DialogForm'].dialogShow = true
    },
  },
}
</script>
