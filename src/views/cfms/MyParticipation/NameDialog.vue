<template>
  <iep-dialog :dialog-show="dialogShow" title="报名人员" width="80%" @close="resetForm">
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsName" :cell-style="mixinsCellPointerStyle" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">

    </iep-table>
  </iep-dialog>
</template>
<script>
import mixins from '@/mixins/mixins'
import { getMeetingsignupUserPage } from '@/api/mcms/meeting'
import { columnsName } from './option'
export default {
  mixins: [mixins],
  data () {
    return {
      dialogShow: false,
      id: '',
      columnsName,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    resetForm () {
      this.dialogShow = false
    },
    loadPage (param = { meetingId: this.id }) {
      this.loadTable(param, getMeetingsignupUserPage)
    },
  },
}
</script>