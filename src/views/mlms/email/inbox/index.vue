<template>
  <div class="inbox">
    <div v-show="dialogShow&&forwardShow&&replyShow">
      <page-header title="收件箱" class="title" :data="subTitle" :replaceText="subTitleFn"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button size="small" type="danger" @click="allRead"><i class="icon-biaoji"></i> 标记已读</iep-button>
          <iep-button size="small" @click="allDelete">删除</iep-button>
          <iep-button size="small" @click="forward">转发</iep-button>
        </template>
        <template slot="right">
          <operation-search @search="searchPage"></operation-search>
        </template>
      </operation-container>
      <table-dialog ref="table" @switchDialog="handleDetail" @multipleSelection="multipleSelect"></table-dialog>
    </div>
    <main-form-dialog ref="mainDialog" v-show="!dialogShow" @backWeb="backPage" @forward="detailForward" @reply="detailReply"></main-form-dialog>
    <update-form-dialog ref="updateDialog" v-show="!forwardShow || !replyShow" @backWeb="backPage" @load-page="loadPage"></update-form-dialog>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import mixinTable from '../tableTpl/mixinTable'
import TableDialog from '../tableTpl/table.vue'
import mainFormDialog from '../tableTpl/mainDialog'
import UpdateFormDialog from '../new/index'
import { getReceiverList } from '@/api/mlms/email/index'

export default {
  components: { mainFormDialog, TableDialog, UpdateFormDialog },
  mixins: [mixins,mixinTable],
  data () {
    return {
      subTitle: [120, 6],
    }
  },
  methods: {
    subTitleFn (data) {
      return '（共有 ' + data[0] + ' 封邮件，其中未读邮件 ' + data[1] + ' 封）'
    },
  },
  mounted () {
    this.$refs['table'].requestFn = getReceiverList
    this.$nextTick(() => {
      this.$refs['table'].loadPage({})
    })
  },
}
</script>

<style lang="scss" scoped>
.inbox {
  padding: 20px;
  background-color: #fff;
}
.icon-biaoji {
  font-size: 12px !important;
}
</style>
