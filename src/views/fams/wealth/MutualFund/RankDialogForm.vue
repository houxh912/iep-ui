<template>
  <iep-dialog :dialog-show="dialogShow" title="捐助排名" width="520px" @close="close">
    <iep-table :columnsMap="columnsMap" :pagedTable="pagedTable" :isPagination="false">
      <el-table-column label="排名">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
    </iep-table>
  </iep-dialog>
</template>
<script>
import formMixins from '@/mixins/formMixins'
export default {
  mixins: [formMixins],
  data () {
    return {
      columnsMap: [
        {
          prop: 'userName',
          label: '捐助者姓名',
        },
        {
          prop: 'amount',
          label: '金额',
        },
      ],
      dialogShow: false,
      pagedTable: [],
    }
  },
  methods: {
    close () {
      this.pagedTable = []
      this.dialogShow = false
      this.$emit('load-page')
    },
  },
}
</script>