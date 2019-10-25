<template>
  <div>
    <basic-container class="library" v-show="pageState === 'library'">
      <h1>咨询记录</h1>
      <div class="content">
        <operation-container>
          <template slot="left">
            <el-dropdown size="medium">
              <iep-button size="small" type="primary" plain  @click="handleOutput">批量导出</iep-button>
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
                <iep-button type="warning" plain size="small" @click="handleDetail(scope.row)">查看</iep-button>
                <iep-button size="small" @click="handleDeleteById(scope.row)">删除</iep-button>
              </operation-wrapper>
            </template>
          </el-table-column>
        </iep-table>
      </div>
    </basic-container>

    <detailTpl v-if="pageState === 'detail'" :form="formData" @backPage="backPage"></detailTpl>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { columnsMap } from './options'
import { getDialogPage } from '@/api/ics/serve'
import detailTpl from './detail'

export default {
  mixins: [mixins],
  components: { detailTpl },
  data () {
    return {
      pageState: 'library',
      columnsMap,
      dictsMap: {},
    }
  },
  methods: {
    loadPage () {
      this.loadTable(this.searchForm, getDialogPage)
    },
    handleOutput () {},
    handleDetail (row) {
      this.pageState = 'detail'
      if (typeof row.result === 'string') row.result = JSON.parse(row.result)
      this.formData = {...row}
    },
    backPage () {
      this.pageState = 'library'
    },
    handleDeleteById () {},
  },
  created () {
    this.loadPage()
  },
}
</script>

<style lang="scss" scoped>

</style>