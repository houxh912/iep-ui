<template>
  <div>
    <div v-show="pageState=='list'">
      <operation-container>
        <template slot="left">
          <iep-button size="small" type="primary" @click="allRead"><i class="icon-biaoji"></i> 标记已读</iep-button>
          <iep-button size="small" @click="allDelete">删除</iep-button>
          <iep-button size="small" @click="forward">转发</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="search" :paramForm="searchForm" prop="subject"></operation-search>
        </template>
      </operation-container>
      <table-dialog ref="table" @switchDialog="handleDetail" @multipleSelection="multipleSelect" @readList="readList"></table-dialog>
    </div>
    <main-form-dialog ref="mainDialog" v-show="pageState=='detail'" @backWeb="backPage" @forward="detailForward" @reply="detailReply"></main-form-dialog>
    <update-form-dialog ref="updateDialog" v-show="pageState=='form'" @backWeb="backPage" @load-page="loadPage"></update-form-dialog>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import mixinTable from '../tableTpl/mixinTable'
import TableDialog from '../tableTpl/table.vue'
import mainFormDialog from '../tableTpl/mainDialog'
import UpdateFormDialog from '../new/index'
import { getReceiverList, deleteEmailReceiver } from '@/api/mlms/email/index'

export default {
  components: { mainFormDialog, TableDialog, UpdateFormDialog },
  mixins: [mixins, mixinTable],
  props: {
    type: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      searchForm: {
        subject: '',
      },
    }
  },
  methods: {
    allDelete () {
      deleteEmailReceiver(this.multipleSelection).then(() => {
        this.$notify({
          title: '成功',
          message: '删除成功！',
          type: 'success',
          duration: 2000,
        })
        this.$refs['table'].loadPage({})
      })
    },
    readList (val) {
      this.$emit('readList', val)
    },
    search (val) {
      val.type = this.type
      this.$refs['table'].loadPage(val)
    },
  },
  mounted () {
    this.$refs['table'].requestFn = getReceiverList
    this.$nextTick(() => {
      this.$refs['table'].loadPage({ type: this.type })
    })
  },
}
</script>

<style lang="scss" scoped>
.icon-biaoji {
  font-size: 12px !important;
}
</style>
