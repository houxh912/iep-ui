<template>
  <div>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columns" :cell-style="mixinsCellPointerStyle" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button type="warning" plain @click=" handleSee(scope.row)">查看</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { mapGetters } from 'vuex'
import { getMeetingmarketingStatus } from '@/api/mcms/meeting'
import { columns } from '../option.js'
export default {
  mixins: [mixins],
  data () {
    return {
      columns,
      isLoadTable: false,
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage (param = { meetingFlag: 3 }) {
      this.loadTable(param, getMeetingmarketingStatus)
    },
    handleSee (row) {
      this.$router.push({
        path: `/meeting/${row.id}`,
      })
    },
  },
}
</script>