<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}排名`" width="500px" @close="loadPage">
    <el-table ref="singleTable" :data="datalist" highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
      <el-table-column type="index" label="排名">
      </el-table-column>
      <el-table-column property="name" label="姓名">
      </el-table-column>
      <el-table-column property="trainingNum" label="成绩">
      </el-table-column>
    </el-table>
    <!-- <template slot="footer">
      <iep-button type="primary" @click="submitForm()">提交</iep-button>
      <iep-button @click="dialogShow=false">取消</iep-button>
    </template> -->
  </iep-dialog>
</template>
<script>
import { getRankinglist } from '@/api/hrms/event_selection'
export default {
  data () {
    return {
      dialogShow: false,
      type: '',
      methodName: '',
      datalist: [
      ],
    }
  },
  // },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      this.dialogShow = false
    },
    loadTypeList () {
      getRankinglist({ type: this.type }).then(({ data }) => {
        this.datalist = data.data
      })
    },
    handleCurrentChange (val) {
      this.dialogShow = false
      this.$emit('change-people', val)
    },
  },
}
</script>