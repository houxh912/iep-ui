<template>
  <gov-layout-main>
    <gov-layout-header>
      <gov-search-bar :listQuery="listQuery" :formProps="searchOption" @handleFilter="handleFilter">
      </gov-search-bar>
      <gov-layout-button-group>
        <gov-button type="primary" plain @click="handleCreate" text="创建问卷"></gov-button>
      </gov-layout-button-group>
    </gov-layout-header>
    <gov-layout-body>
      <avue-crud class="table" @selection-change="selectionChange" :option="tableOption" :data="tableList" :table-loading="tableLoading" @size-change="sizeChange" @current-change="currentChange" :page="pagination">
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group" width="240px">
            <iep-button v-if="scope.row.status === '2'" @click="handleRelease(scope.row)" type="warning" size="small" plain>发布</iep-button>
            <iep-button @click="handleDetail(scope.row)" type="warning" plain>预览</iep-button>
            <iep-button v-if="scope.row.status === '2'" @click="handleUpdate(scope.row)" type="default" size="small">编辑</iep-button>
            <iep-button v-if="scope.row.status !== '2'" @click="handleStatistics(scope.row)" type="default" size="small">统计</iep-button>
            <iep-button @click="handleDelete(scope.row)" size="small" type="default">删除</iep-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <main-dialog @successForm="successForm" ref="mainDialog" :temp="formData" :status="dialogStatus">
    </main-dialog>
    <preview-dialog ref="previewDialog" :content="previewData" :temp="formData">
    </preview-dialog>
    <statistics-dialog :temp="formData" ref="statisticsDialog">
    </statistics-dialog>
  </gov-layout-main>
</template>
<script>
/*eslint-disable*/
import mixin from '@/views/wenjuan/mixins/mixin'
import currentMixin from './const/mixin'
import { getList, deleteData } from '@/api/evaluate/question'
import mainDialog from './mainDialog'
import previewDialog from './previewDialog'
import statisticsDialog from './statisticsDialog'
import { getUserList } from '@/api/admin/contacts'
import { release, getDetail, getRePercent } from '@/api/evaluate/question'
export default {
  components: { mainDialog, previewDialog, statisticsDialog },
  mixins: [mixin, currentMixin],
  data () {
    return {
      previewData: [],
    }
  },
  created () {
    this.initApi()
  },
  methods: {
    initApi () {
      this.getList()
      getUserList().then(({ data }) => {
        let dic = data.data.map(item => {
          return {
            value: item.id,
            label: item.name,
          }
        })
        this.createByDic = dic
      })
      this.projectIdDic = []
    },
    getList () {
      this.tableLoading = true
      this.listQuery.isDeleted = 1
      getList(this.listQuery).then(({ data }) => {
        this.tableList = data.records
        this.pagination.total = data.total
        this.tableLoading = false
      })
        .then(() => {
          for (let i = 0; i < this.tableList.length; i++) {
            let item = this.tableList[i]
            // console.log(this.tableList[i])
            if (item.status != "2") {
              // console.log(item.id,"aaa")   proportion
              getRePercent(item.id).then(({ data }) => { //获取回收率数据
                this.$set(this.tableList[i], "proportion", data.data.joinAll)
                this.$set(this.tableList[i], "recovery", data.data.percent)
                // console.log("结果",data )
              })
            }
          }
        })
    },
    // 新增
    handleCreate () {
      this.dialogStatus = this.dialog.textName.create
      this.formData = Object.assign({}, {})
      this.$refs['mainDialog'].open()
    },
    // 查看
    handleDetail (row) {
      this.dialogStatus = this.dialog.textName.detail
      getDetail(row.id).then(({ data }) => {
        this.formData = Object.assign({}, data.data)
        this.previewData = this.formData.questionDTOList
        this.$refs['previewDialog'].open(1)
      })
    },
    // 修改
    handleUpdate (row) {
      this.dialogStatus = this.dialog.textName.update
      this.formData = Object.assign({}, row)
      this.$refs['mainDialog'].open()
    },
    //发布
    handleRelease (row) {
      this.$confirm('确定要发布吗？').then(() => {
        release({
          id: row.id,
          status: "1",
        }).then(({ data }) => {
          if (data.code === 0) {
            this.$message.success("发布成功！")
            this.getList()
          }
        })
      })
    },
    //统计
    handleStatistics (row) {
      // console.log(row)statisticsDialog
      this.formData = Object.assign({}, row)
      this.$refs['statisticsDialog'].open(row)
    },
    // 删除
    handleDelete (row) {
      this.$confirm(this.IS_DELETE).then(() => {
        deleteData(row.id).then(() => {
          this.queryData = []
          this.$message.success('删除成功！')
          this.getList()
        })
      }).catch(() => { })
    },
    // 提交成功后
    successForm (msg) {
      msg && this.$message.success(msg)
      this.getList()
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
