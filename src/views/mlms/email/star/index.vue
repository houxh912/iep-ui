<template>
  <div class="star">
    <div v-show="dialogShow">
      <page-header title="星标邮件" class="title" :data="subTitle" :replaceText="subTitleFn"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button size="small" type="danger"><i class="icon-biaoji"></i> 标记已读</iep-button>
          <iep-button size="small">删除</iep-button>
          <iep-button size="small">转发</iep-button>
        </template>
        <template slot="right">
          <operation-search @search="searchPage"></operation-search>
        </template>
      </operation-container>
      <table-dialog ref="table" @switchDialog="dialogShow=false"></table-dialog>
    </div>
    <main-form-dialog ref="mainDialog" v-show="!dialogShow" @backWeb="dialogShow=true"></main-form-dialog>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import TableDialog from '../tableTpl/table.vue'
import mainFormDialog from '../tableTpl/mainDialog'
export default {
  components: { mainFormDialog, TableDialog },
  mixins: [mixins],
  data () {
    return {
      dialogShow: true,
      subTitle: [120, 6],
    }
  },
  methods: {
    subTitleFn (data) {
      return '（共有 ' + data[0] + ' 封邮件，其中未读邮件 ' + data[1] + ' 封）'
    },
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs['table'].loadPage()
    })
  },
}
</script>

<style lang="scss" scoped>
.star {
  padding: 20px;
  background-color: #fff;
}
</style>
