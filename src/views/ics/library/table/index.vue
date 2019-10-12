<template>
  <div class="table">
    <operation-container>
      <template slot="left">
        <el-dropdown size="medium">
          <iep-button size="small" type="primary" icon="el-icon-plus" plain  @click="handleCreate">新增</iep-button>
        </el-dropdown>
      </template>
      <template slot="right">
        <!-- <searchForm @searchPage="searchPage"></searchForm> -->
      </template>
    </operation-container>

    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" >
      <el-table-column prop="operation" label="操作" width="220">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button type="warning" plain size="small" @click="handleUpdate(scope.row)">编辑</iep-button>
            <iep-button size="small" @click="handleDeleteById(scope.row)">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>

  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import { columnsMap } from './options'
import { getQuestionPage } from '@/api/ics/question'

export default {
  mixins: [ mixins ],
  components: {  },
  data () {
    return {
      dictsMap: {},
      columnsMap,
    }
  },
  methods: {
    loadPage (id) {
      if (id) {
        this.searchForm.type = id
      }
      this.isLoadTable = false
      this.loadTable(this.searchForm, getQuestionPage)
    },
    handleCreate () {
      this.$emit('handle_form', 'create')
    },
    handleUpdate () {},
    handleDeleteById () {},
  },
}
</script>
<style scoped>

</style>
