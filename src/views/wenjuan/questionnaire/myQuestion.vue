<template>
  <gov-layout-main>
    <gov-layout-header>
      <gov-search-bar :listQuery="listQuery" :formProps="searchOptionMy" @handleFilter="handleFilter">
      </gov-search-bar>
    </gov-layout-header>
    <gov-layout-body>
      <avue-crud @selection-change="selectionChange" :option="myTableOption" :data="tableList" :table-loading="tableLoading" @size-change="sizeChange" @current-change="currentChange" :page="pagination">
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <iep-button v-if="answeredList.indexOf(scope.row.id) > -1 ? false : true" @click="handleAnswer(scope.row)" type="warning" size="small" plain>开始答卷</iep-button>
            <iep-button @click="handleDetail(scope.row)" type="default" size="small">预览</iep-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <main-dialog @successForm="successForm" ref="mainDialog" :temp="formData" :status="dialogStatus">
    </main-dialog>
    <preview-dialog ref="previewDialog" :content="previewData" :disabled="disableStatus" @successForm="successForm" :temp="formData">
    </preview-dialog>
  </gov-layout-main>
</template>
<script>
/*eslint-disable*/
import mixin from '@/views/wenjuan/mixins/mixin'
import currentMixin from './const/mixin'
import { getList } from '@/api/evaluate/question'
import mainDialog from './mainDialog'
import previewDialog from './previewDialog'
import { getUserList } from '@/api/admin/contacts'
import { getDetail, getQuestionnaireIdList } from '@/api/evaluate/question'
export default {
  components: { mainDialog, previewDialog },
  mixins: [mixin, currentMixin],
  data () {
    return {
      disableStatus: false,
      answeredList: [],
      previewData: [],
    }
  },
  created () {
    this.initApi()
  },
  methods: {
    initApi () {
      getUserList().then(({ data }) => {
        let dic = data.data.map(item => {
          return {
            value: item.id,
            label: item.name,
          }
        })
        this.createByDic = dic
      })
      getQuestionnaireIdList().then(({ data }) => {
        // console.log("接受的数据",data)
        this.answeredList = data.data
        this.getList()
      })

      this.projectIdDic = []
      // this.getList()

    },
    getList () {
      this.tableLoading = true
      this.listQuery.isDeleted = 1
      this.listQuery.evaDept = this.userInfo.orgId
      this.listQuery.status = '1,3'
      getList(this.listQuery).then(({ data }) => {
        this.tableList = data.records
        this.pagination.total = data.total
        this.tableLoading = false
      })
    },
    // 回答
    handleAnswer (row) {
      this.dialogStatus = this.dialog.textName.detail
      this.disableStatus = false
      getDetail(row.id).then(({ data }) => {
        this.formData = Object.assign({}, data.data)
        this.previewData = this.formData.questionDTOList
        console.log(this.formData, this.previewData)
        this.$refs['previewDialog'].open()
      })
    },
    // 查看
    handleDetail (row) {
      this.dialogStatus = this.dialog.textName.detail
      this.disableStatus = true
      getDetail(row.id).then(({ data }) => {
        this.formData = Object.assign({}, data.data)
        this.previewData = this.formData.questionDTOList
        console.log(this.formData, this.previewData)
        this.$refs['previewDialog'].open()
      })
    },
    // 提交成功后
    successForm (msg) {
      msg && this.$message.success(msg)
      this.initApi()
    },
  },
}
</script>

<style scoped>
.table-btn-group .el-button {
  margin-right: 5px;
  margin-bottom: 5px;
}
</style>