<template>
  <iep-dialog :dialog-show="dialogShow" title="新增开票通知" width="550px" @close="close" center>
    <el-form size="small" ref="form" label-width="100px">
      <el-form-item label="开票类型：">
        <iep-button v-for="(v,k) in dictsMap.invoicingType" :key="k" class="tag-item" size="mini" @click="handleChange(k)">{{v}}</iep-button>
      </el-form-item>
    </el-form>
  </iep-dialog>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { dictsMap } from '@/views/fams/wealth/BillingNotice/options'
export default {
  data () {
    return {
      dictsMap,
    }
  },
  computed: {
    ...mapState({
      dialogShow: state => state.fams.billingDialogShow,
    }),
  },
  methods: {
    ...mapMutations({
      setBillingDialogShow: 'SET_BILLING_DIALOG_SHOW',
    }),
    handleChange (value) {
      this.$router.push({
        path: '/fams_spa/billing_edit/0',
        query: {
          invoicingType: value,
        },
      })
      this.setBillingDialogShow(false)
    },
    close () {
      this.setBillingDialogShow(false)
    },
  },
}
</script>
<style lang="scss" scoped>
.tag-item {
  margin-right: 8px;
}
</style>

