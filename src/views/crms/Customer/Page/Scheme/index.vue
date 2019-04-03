<template>
  <div>
    <operation-wrapper>
      <iep-button class="btn" type="primary" plain @click="handleAdd"><i class="el-icon-plus"></i> 添加方案</iep-button>
    </operation-wrapper>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <el-table-column label="方案名称">
        <template slot-scope="scope">
          <div class="program-name">{{scope.row.programName}}</div>
          <el-col>
            <a-tag v-for="(item, index) in tags" :key="index">{{item}}</a-tag>
          </el-col>
        </template>
      </el-table-column>
      <el-table-column label="附件" width="250px">
        <template slot-scope="scope">
          <span @click="download(scope.row)" class="download">下载<i class="icon-download1"></i></span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300px">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleSave(scope.row)" type="warning" plain v-if="!scope.row.status">保存至材料库</iep-button>
            <iep-button @click="handleEdit(scope.row)" type="warning" plain v-if="!scope.row.status">编辑</iep-button>
            <iep-button @click="handleDeleteById(scope.row)">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <el-row class="recommend">
      <el-col class="title">为您推荐一下参考材料：</el-col>
      <el-col class="item" :span=12 v-for="(item, index) in recommendList" :key="index">{{item.name}}</el-col>
    </el-row>
    <create-dialog ref="SchemeDialog" @load-page="loadPage"></create-dialog>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { getSchemePage, createScheme, updateScheme, deleteSchemeById, getSchemeById } from '@/api/crms/scheme'
import CreateDialog from './CreateDialog'
import { downloadModel } from '@/api/crms/download'
export default {
  name: 'contacts',
  mixins: [mixins],
  components: { CreateDialog },
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      formData: {},
      rules: {},
      methodName: '',
      dialogShow: false,
      dialogVisible: false,
      deleteAll: '',
      id: '',
      dicData: [
        { value: 1, label: '选项1' },
        { value: 2, label: '选项2' },
      ],
      recommendList: [
        {
          name: '20180919建设银行政务服务中心方案1号',
        }, {
          name: '20180919建设银行政务服务中心方案2号',
        }, {
          name: '20180919建设银行政务服务中心方案3号',
        },
      ],
      submitFn: () => { },
      tags: ['政务网', '智慧城市'],
    }
  },
  created () {
    this.loadPage()
  },
  computed: {

  },
  methods: {
    loadPage (param) {
      this.loadTable({ ...param, clientId: this.record.id }, getSchemePage)
    },
    handleAdd () {
      this.$refs['SchemeDialog'].formData.clientId = this.record.id
      this.$refs['SchemeDialog'].dialogShow = true
      this.$refs['SchemeDialog'].methodName = '新增'
      this.$refs['SchemeDialog'].submitFn = createScheme
    },
    handleEdit (row) {
      getSchemeById(row.programId).then((res) => {
        this.$refs['SchemeDialog'].formData = res.data.data
      })
      this.$refs['SchemeDialog'].dialogShow = true
      this.$refs['SchemeDialog'].methodName = '编辑'
      this.$refs['SchemeDialog'].submitFn = updateScheme
    },
    handleDeleteById (row) {
      this.$confirm('此操作将同时删除原件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteSchemeById(row.programId).then(res => {
          if (res.data.data) {
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
          } else {
            this.$message({
              type: 'info',
              message: `删除失败，${res.data.msg}`,
            })
          }
          this.loadPage()
        })
      })
    },
    handleClose () {
      this.dialogVisible = false
    },
    download (row) {
      downloadModel(row.atchUpload)
    },
    handleSave (row) {
      this.$router.push({
        path: '/wel/material/datum',
        // name: 'mallList',
        query: {
          router: true,
          data: row,
        },
      })
      // row.status = 1
      // saveScheme({ ...row }).then(() => {
      //   this.$notify({
      //     title: '成功',
      //     message: `${this.methodName}成功`,
      //     type: 'success',
      //     duration: 2000,
      //   })

      // })
    },
  },

}
</script>

<style lang="scss" scoped>
.program-name {
  padding: 10px 0;
}
.download {
  color: #409eff;
  cursor: pointer;
  i {
    margin-left: 5px;
  }
}
.icon-zhuyi {
  color: #e6a23c;
  margin-right: 10px;
}
</style>
