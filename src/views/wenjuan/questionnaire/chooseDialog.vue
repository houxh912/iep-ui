<template>
  <gov-dialog ref="dialog" width="70%" title="选择问卷模板" @handleSubmit="handleSubmit" :btnGroup="[]" :isBtnGroup="false">
    <!-- 头部搜索框 -->
    <gov-search-bar :listQuery="listQuery" :formProps="searchOption" @handleFilter="handleFilter">
    </gov-search-bar>
    <!-- 列表 -->
    <gov-layout-body>
      <avue-crud @selection-change="selectionChange" :option="chooseOption" :data="tableList" :table-loading="tableLoading" @size-change="sizeChange" @current-change="currentChange" :page="pagination">
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <gov-button @click="handleSelect(scope.row)" type="warning" plain>选择</gov-button>
            <gov-button @click="handleDetail(scope.row)" type="text">预览</gov-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <preview-dialog ref="previewDialog" :content="previewData" :temp="formData">
    </preview-dialog>
  </gov-dialog>
</template>
<script>
import mixin from '@/views/wenjuan/mixins/mixin'
import currentMixin from './const/mixin'
import { fetchList } from '@/api/admin/user'
import { getList, getDetail } from '@/api/evaluate/question'
import previewDialog from './previewDialog'
export default {
  mixins: [mixin, currentMixin],
  components: { previewDialog },
  data () {
    return {
      previewData: [],
    }
  },
  computed: {

  },
  created () {
    this.getList()
    fetchList({ //获取用户dic
      size: 9999,
      current: 1,
    }).then(({ data }) => {
      let dic = data.data.records.map(item => {
        return {
          value: item.userId,
          label: item.username,
        }
      })
      this.createByDic = dic
    })

    this.projectIdDic = []
    // console.log("tableOption",this.tableOption)
  },
  methods: {
    open () {
      this.$refs['dialog'].open()
    },
    getList () {
      this.tableLoading = true
      this.listQuery.isDeleted = 1
      getList(this.listQuery).then(({ data }) => {
        this.tableList = data.records
        this.pagination.total = data.total
        this.tableLoading = false
      })
    },
    // 查看
    handleDetail (row) {
      this.dialogStatus = this.dialog.textName.detail
      getDetail(row.id).then(({ data }) => {
        this.formData = Object.assign({}, data.data)
        this.previewData = this.formData.questionDTOList
        console.log(this.formData, this.previewData)
        this.$refs['previewDialog'].open()
      })
    },
    //选择模板
    handleSelect (row) {
      getDetail(row.id).then(({ data }) => {
        this.$emit('copyData', data.data)
        this.$refs['dialog'].close()
      })
    },

    handleSubmit () {

    },
  },
}
</script>
