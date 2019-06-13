<template>
  <gov-dialog ref="dialog" width="80%" @open="handleOpen" :btnGroup="btnGroup" @closed="handleClosedDialog" :title="'工单列表'" :isBtnGroup="status !== dialog.textName.detail" @handleSubmit="dialogSubmit">
    <layout-form>
      <avue-crud :option="tableOptionMy" :data="tableList" :table-loading="tableLoading" @size-change="sizeChange" :page="pagination">
        <template slot-scope="scope" slot="name">
          {{scope.row.indexSystemRelationVO.name}}
        </template>
        <template slot-scope="scope" slot="weight">
          {{scope.row.indexSystemRelationVO.weight}}
        </template>
        <template slot-scope="scope" slot="processState">
          <div class="table-btn-group">
            <gov-button type="text" @click="handleStatus(scope.row)" :text="getDicValue(scope.row.processState,'EVA_DAILY_PROCESS_STATUS')"></gov-button>
          </div>
        </template>
      </avue-crud>
      <edit-dialog ref="editDialog" @successSubmit="refreshList" :projectId="projectId" :sectionId="sectionId" :editable="false"></edit-dialog>
    </layout-form>
  </gov-dialog>
</template>
<script>
import mixin from '@/views/wenjuan/mixins/mixin'
import scopeMixin from './const/dailyMixin'
import editDialog from './editDialog'
import { getDic } from '@/views/wenjuan/util/dic'
import { getSummaryByDept } from '@/api/evaluate/management'
export default {
  mixins: [mixin, scopeMixin],
  components: { editDialog },
  data () {
    return {
      tableList: [],
    }
  },
  props: {
    projectId: {
      type: String,
      default: '',
    },
    sectionId: {
      type: String,
      default: '',
    },
  },
  computed: {
    btnGroup () {
      return [
        {
          label: '取消', // 按钮文本
          loading: false, // 按钮加载中状态
          disabled: false, // 是否禁用按钮
          fn: 'handleCancel', // 按钮回调方法名称
        },
      ]
    },
  },
  methods: {
    // 打开时操作
    handleOpen () {

    },
    open (row) {
      // console.log("listRow",row,getSummaryByDept)
      if (row.eligibleUnitsId) {
        this.tableLoading = true
        getSummaryByDept({
          projectId: this.projectId,
          sectionId: this.sectionId,
          eligibleUnitsId: row.eligibleUnitsId,
        }).then(({ data }) => {
          this.tableList = data.data
          this.tableLoading = false
        })
      }
      this.$refs['dialog'].open()
    },
    close () {
      this.$refs['dialog'].close()
    },
    // 弹窗关闭后
    handleClosedDialog () {
      this.initData()
    },
    getDicValue (value, dic) {
      let dicArr = getDic(dic)
      for (let item of dicArr) {
        if (item.value == value) {
          return item.label
        }
      }
    },
    handleStatus (row) {
      this.$refs['editDialog'].open(row)
    },
    initData () {
      this.tableList = []
    },
  },
}
</script>
<style lang="scss" scoped>
</style>
