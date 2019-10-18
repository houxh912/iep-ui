
<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button type="primary" icon="el-icon-plus" @click="handleAdd" plain>新增中心词</iep-button>
        <iep-button @click="handleExport" disabled>批量导出</iep-button>
      </template>
      <template slot="right">
        <operation-search placeHolder="请输入关键词" prop="projectName" @search-page="searchPage" advance-search>
          <advance-search @search-page="searchPage"></advance-search>
        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :columnsMap="columnsMap" :pagedTable="pagedTable" :pagination="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <template slot="before-columns">
        <el-table-column label="ID" width="80">
          <template slot-scope="scope">
            {{scope.row.tagId}}
          </template>
        </el-table-column>
        <el-table-column label="中心词名称">
          <template slot-scope="scope">
            {{scope.row.name}}
          </template>
        </el-table-column>
        <el-table-column label="标签级别">
          <template slot-scope="scope">
            {{scope.row.levelName}}
          </template>
        </el-table-column>
        <el-table-column label="所属分类">
          <template slot-scope="scope">
            <div>{{!scope.row.typeVos?scope.row.typeVos.map(m=>m.name).join('、'):"暂无"}}</div>
          </template>
        </el-table-column>
      </template>
      <el-table-column label="更新时间" width="190">
        <template slot-scope="scope">
          {{scope.row.updateTime}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button type="warning" plain @click="handleEdit(scope.row)">编辑</iep-button>
            <iep-button @click="handleFreed(scope.row)">释放</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <add-dialog ref="AddDialog" @load-page="loadPage"></add-dialog>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import { getResultCenterPage, addCenterWord, releaseCenterById } from '@/api/tms/management'
import AdvanceSearch from './AdvanceSearch'
import addDialog from './addDialog'
export default {
  mixins: [mixins],
  components: { AdvanceSearch, addDialog },
  data () {
    return {
      columnsMap: [
        {
          prop: 'refers',
          label: '引用次数',
        },
        {
          prop: 'views',
          label: '点击量',
        },
      ],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleAdd () {
      this.$refs['AddDialog'].dialogShow = true
      this.$refs['AddDialog'].formRequestFn = addCenterWord
      this.$refs['AddDialog'].methodName = '新增'
    },
    handleCreate () { },
    handleExport () {
      if (!this.multipleSelection.length) {
        this.$message('请先选择需要的选项')
        return
      }
    },
    handleEdit (row) {
      this.$router.push(`/tms/management/edit/${row.tagId}`)
    },
    loadPage (param = this.searchForm) {
      this.loadTable({ ...param }, getResultCenterPage)
    },
    //释放中心词
    handleFreed (row) {
      this.$confirm('此操作将永久释放该中心词, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        releaseCenterById(row.tagId).then(res => {
          if (res.data.data) {
            this.$message({
              type: 'success',
              message: '释放成功!',
            })
          } else {
            this.$message({
              type: 'info',
              message: `释放失败，${res.data.msg}`,
            })
          }
          this.loadPage()
        })
      })
    },
  },
}
</script>
