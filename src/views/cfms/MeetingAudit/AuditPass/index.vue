<template>
  <div>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columns" :cell-style="mixinsCellPointerStyle" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <template slot="before-columns">
        <el-table-column label="会议海报">
          <template slot-scope="scope">
            <div>
              <el-image :src="scope.row.urls" :fit="fit"></el-image>
            </div>
          </template>
        </el-table-column>
      </template>
      <el-table-column prop="operation" label="操作" width="200">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button type="warning" plain @click="handleDetail(scope.row)">查看</iep-button>
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
      fit: 'contain',
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
    loadPage (param = { meetingFlag: 6 }) {
      this.loadTable(param, getMeetingmarketingStatus)
    },
    handleDetail (row) {
      this.$router.push({
        path: `/meeting/${row.id}`,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.el-image {
  width: 150px;
  height: 100px;
  border-radius: 10px;
}
</style>