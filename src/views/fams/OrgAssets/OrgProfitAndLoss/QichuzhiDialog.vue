<template>
  <iep-dialog :dialog-show="dialogShow" title="期初值设置" width="800px" @slot-mounted="loadPage" @close="close">
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" label="月份" width="180">
      </el-table-column>
      <el-table-column prop="projectIncome" label="项目收入" width="180">
      </el-table-column>
      <el-table-column prop="internalRevenue" label="内部收入" width="180">
      </el-table-column>
      <el-table-column prop="cost" label="费用">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </iep-dialog>
</template>
<script>
import DialogForm from './DialogForm'
import { getinitialList } from '@/api/fams/initial'
import { mapGetters } from 'vuex'
export default {
  components: { DialogForm },
  data () {
    return {
      dialogShow: false,
      year: 0,
      tableData: [],
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  methods: {
    async loadPage () {
      const { data } = await getinitialList(this.userInfo.orgId, this.year)
      this.tableData = data.data
    },
    handleEdit (row) {
      this.$refs['DialogForm'].form = { ...row }
      this.$refs['DialogForm'].dialogShow = true
    },
    close () {
      this.dialogShow = false
      this.$emit('load-page')
    },
  },
}
</script>
