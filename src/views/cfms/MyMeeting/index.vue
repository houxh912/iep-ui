<template>
  <basic-container>
    <iep-page-header title="我的会议"></iep-page-header>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columns" :cell-style="mixinsCellPointerStyle" :pagedTable="pagedTable">
      <template slot="columns">
        <el-table-column label="链接地址" width="300px">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
      </template>
    </iep-table>
  </basic-container>
</template>
<script>
import mixins from '@/mixins/mixins'
import { columns } from './option'
import { getMeetingmarketingList } from '@/api/mcms/meeting'
export default {
  mixins: [mixins],
  data () {
    return {
      columns,
      isLoadTable: false,
      paginationOne: [{ xinxi: '111', baoming: '1231', shijian: '21323', zhuangtai: '', id: 111 }],
      address: '',
    }
  },
  created () {
    // console.log(window.location)
    this.loadPage()
  },
  methods: {
    loadPage (param = {}) {
      this.loadTable(param, getMeetingmarketingList)
    },
  },
}
</script>