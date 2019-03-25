<template>
  <div class="programme">
    <div class="head">
      <iep-button class="btn" type="danger" plain size="mini" @click="handleAdd"><i class="el-icon-plus"></i> 添加方案</iep-button>
    </div>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" isMutipleSelection>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleEdit(scope.row)" size="small">编辑</iep-button>
            <iep-button @click="handleDeleteById(scope.row)" size="small">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <el-row class="recommend">
      <el-col class="title">为您推荐一下参考材料：</el-col>
      <el-col class="item" :span=12 v-for="(item, index) in recommendList" :key="index">{{item.name}}</el-col>
    </el-row>
    <scheme-dialog ref="SchemeDialog" @load-page="loadPage"></scheme-dialog>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { fetchProgrammeList, createProgramme, updateProgramme, deleteProgramme } from '@/api/crms/crm'
import { columnsMap } from '../options'
import SchemeDialog from './SchemeDialog'
export default {
  name: 'contacts',
  mixins: [mixins],
  props: ['record'],
  components: { SchemeDialog },
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
      this.loadTable({ ...param, clientId: this.record.id }, fetchProgrammeList)
    },
    handleAdd () {
      this.$refs['SchemeDialog'].dialogShow = true
      this.$refs['SchemeDialog'].methodName = '新增'
      this.$refs['SchemeDialog'].submitFn = createProgramme
    },
    handleEdit (row) {
      this.$refs['EditDialog'].formData = { ...row }
      this.$refs['EditDialog'].dialogShow = true
      this.$refs['EditDialog'].methodName = '编辑'
      this.$refs['EditDialog'].submitFn = updateProgramme
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.programId, deleteProgramme)
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
.head {
  margin-bottom: 10px;
  .btn {
    margin-right: 10px;
  }
}
</style>
