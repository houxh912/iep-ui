<template>
  <iep-dialog :dialog-show="dialogShow" title="表头设置" width="50%" @close="loadPage">
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checkedHeader" @change="handleCheckedHeaderChange">
      <el-checkbox v-for="column in columnsOptions" :label="column" :key="column">{{column}}</el-checkbox>
    </el-checkbox-group>
    <template slot="footer">
      <el-button type="primary" @click="save()">保存</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import IepDialog from '@/components/IepDialog/'
export default {
  props: {
    defaultColumnsLabel: {
      type: Array,
      required: true,
    },
  },
  components: { IepDialog },
  data () {
    return {
      dialogShow: false,
      checkAll: false,
      columnsMap: [],
      checkedHeader: this.defaultColumnsLabel,
      isIndeterminate: true,
    }
  },
  computed: {
    columnsOptions () {
      return this.columnsMap.map(m => m.label)
    },
  },
  methods: {
    save () {
      this.$emit('save', this.checkedHeader)
      this.loadPage()
    },
    loadPage () {
      this.dialogShow = false
      this.$emit('load-page')
    },
    handleCheckAllChange (val) {
      this.checkedHeader = val ? this.columnsOptions : []
      this.isIndeterminate = false
    },
    handleCheckedHeaderChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.columnsOptions.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.columnsOptions.length
    },
  },
}
</script>
