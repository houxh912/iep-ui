<template>
  <div class="programme">
    <operation-wrapper>
      <iep-button class="btn" type="danger" plain @click="handleAdd"><i class="el-icon-plus"></i> 添加方案</iep-button>
    </operation-wrapper>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <el-table-column label="附件" width="250px">
        <template slot-scope="scope">
          <span @click="download(scope.row)" class="custom-name">下载</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300px">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleSave(scope.row)" type="warning" plain v-if="!scope.row.status">保存至材料库</iep-button>
            <iep-button v-if="scope.row.status" :disabled="true">已保存至材料库</iep-button>
            <iep-button @click="handleEdit(scope.row)" type="warning" plain>编辑</iep-button>
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
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>
        <el-checkbox v-model="deleteAll">同时删除原件</el-checkbox>
      </span>
      <span slot="footer" class="dialog-footer">
        <iep-button class="btn" @click="cancel">取 消</iep-button>
        <iep-button type="primary" @click="sure">确 定</iep-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { getSchemePage, createScheme, updateScheme, deleteSchemeById, saveScheme, getSchemeById } from '@/api/crms/scheme'
import { columnsMap } from './options'
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
      columnsMap,
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
      this.dialogVisible = true
      this.id = row.programId
      // this._handleGlobalDeleteById(row.programId, deleteSchemeById)
    },
    cancel () {
      this.dialogVisible = false
    },
    sure () {
      // this._handleGlobalDeleteById(this.id, deleteSchemeById)
      deleteSchemeById(this.id).then(() => {
        this.loadPage()
        this.$notify({
          title: '成功',
          message: `${this.methodName}成功`,
          type: 'success',
          duration: 2000,
        })
      })
      this.dialogVisible = false
    },
    handleClose () {
      this.dialogVisible = false
    },
    download (row) {
      downloadModel(row.atchUpload)
    },
    handleSave (row) {
      row.status = 1
      saveScheme({ ...row }).then(() => {
        this.$notify({
          title: '成功',
          message: `${this.methodName}成功`,
          type: 'success',
          duration: 2000,
        })

      })
    },
  },

}
</script>

<style lang="scss" scoped>
.programme {
  .add-programme {
    text-align: center;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ececec;
    cursor: pointer;
  }
  .recommend {
    .item {
      padding: 5px 15px;
      cursor: pointer;
    }
  }
}
.custom-name {
  cursor: pointer;
  color: #3864af;
}
</style>
