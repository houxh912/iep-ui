<template>
  <div>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columns" :cell-style="mixinsCellPointerStyle" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button type="warning" plain @click=" handleEdit(scope.row)" v-if="isEdit(scope.row)">修改</iep-button>
            <iep-button type="warning" plain @click=" handleSee(scope.row)" v-if="isSee(scope.row)">查看</iep-button>
            <iep-button type="warning" plain @click=" handleSend(scope.row)" v-if="isSend(scope.row)">发送</iep-button>
            <iep-button type="warning" plain @click=" handleView(scope.row)" v-if="isView(scope.row)">原因</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { mapGetters } from 'vuex'
import { getMeetingmarketingStatus, postMeetingsignupUpdateStatus } from '@/api/mcms/meeting'
import { columns } from '../option.js'
export default {
  mixins: [mixins],
  data () {
    return {
      columns,
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
    loadPage (param = {}) {
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
    handleSee (row) {
      this.$router.push({
        path: `/meeting/${row.id}`,
      })
    },
    handleSend (row) {
      postMeetingsignupUpdateStatus({ id: row.id, status: 1 }).then((res) => {
        this.$message({
          message: res.data.msg,
          type: 'success',
        })
      })
    },
    handleView () {
      this.$message({
        message: '功能待开发',
        type: 'success',
      })
    },
    isEdit (row) {
      if (row.meetingFlag == 1) {
        return true
      } else if (row.meetingFlag == 2) {
        return true
      } else if (row.meetingFlag == 6) {
        return true
      } else if (row.meetingFlag == 4) {
        return true
      } else {
        return false
      }
    },
    isSee (row) {
      if (row.meetingFlag == 3) {
        return true
      } else {
        return false
      }
    },
    isSend (row) {
      if (row.meetingFlag == 4) {
        return true
      } else {
        return false
      }
    },
    isView (row) {
      if (row.meetingFlag == 5) {
        return true
      } else {
        return false
      }
    },


  },
}
</script>