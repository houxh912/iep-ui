<template>
  <iep-dialog :dialog-show="dialogShow" title="发起报销" width="550px" @close="close" center>
    <el-form size="small" ref="form" label-width="100px">
      <el-form-item label="报销类型：">
        <iep-button v-for="(v,k) in dictsMap.referType" :key="k" class="tag-item" size="mini" @click="handleChange(k)">{{v}}</iep-button>
      </el-form-item>
    </el-form>
  </iep-dialog>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { dictsMap } from '@/views/fams/wealth/Invoice/options'
export default {
  data () {
    return {
      dictsMap,
    }
  },
  computed: {
    ...mapState({
      dialogShow: state => state.fams.invoiceDialogShow,
    }),
  },
  methods: {
    ...mapMutations({
      setInvoiceDialogShow: 'SET_INVOICE_DIALOG_SHOW',
    }),
    handleChange (value) {
      this.$router.push({
        path: '/fams_spa/invoice_edit/0',
        query: {
          referType: value,
        },
      })
      this.setInvoiceDialogShow(false)
    },
    close () {
      this.setInvoiceDialogShow(false)
    },
  },
}
</script>
<style lang="scss" scoped>
.tag-item {
  margin-right: 8px;
}
</style>

