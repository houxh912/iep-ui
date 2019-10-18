<template>
  <div>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columns" :cell-style="mixinsCellPointerStyle" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button type="warning" plain @click=" handleEdit(scope.row)">修改</iep-button>
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
    loadPage (param = { meetingFlag: 2 }) {
      this.loadTable(param, getMeetingmarketingStatus)
    },
    handleEdit (row) {
      this.$router.push({
        path: `/cfms_spa/meeting_edit/${row.id}`,
        query: {
          edit: true,
        },
      })
    },
  },
}
</script>