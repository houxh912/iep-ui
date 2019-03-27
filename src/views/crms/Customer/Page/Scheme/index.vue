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
      <el-table-column label="操作" width="250px">
        <template slot-scope="scope">
          <iep-button @click="handleEdit(scope.row)">编辑</iep-button>
          <iep-button @click="handleDeleteById(scope.row)">删除</iep-button>
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
import { getSchemePage, createScheme, updateScheme, deleteSchemeById } from '@/api/crms/scheme'
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

  methods: {
    loadPage (param) {
      this.loadTable({ ...param, clientId: this.record.id }, getSchemePage)
    },
    handleAdd () {
      this.$refs['SchemeDialog'].record = this.record
      this.$refs['SchemeDialog'].dialogShow = true
      this.$refs['SchemeDialog'].methodName = '新增'
      this.$refs['SchemeDialog'].submitFn = createScheme
    },
    handleEdit (row) {
      this.$refs['SchemeDialog'].formData = { ...row }
      this.$refs['SchemeDialog'].dialogShow = true
      this.$refs['SchemeDialog'].methodName = '编辑'
      this.$refs['SchemeDialog'].submitFn = updateScheme
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.programId, deleteSchemeById)
    },
    download (row) {
      console.log(row)
      downloadModel(row.atchUpload)
    },
  },
  created () {
    this.loadPage()
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
