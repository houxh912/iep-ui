<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${date}${orgName}费用明细`" width="800px" @close="close">
    <el-table :data="expenditureList" style="width: 100%" border show-summary>
      <el-table-column prop="value" label="名称">
      </el-table-column>
      <el-table-column prop="amount" label="金额(元)">
      </el-table-column>
    </el-table>
  </iep-dialog>
</template>
<script>
export default {
  data () {
    return {
      date: '',
      orgName: '',
      dialogShow: false,
      expenditureList: [],
      otherList: [],
    }
  },
  methods: {
    close () {
      this.dialogShow = false
      this.$emit('load-page')
    },
  },
}
</script>
