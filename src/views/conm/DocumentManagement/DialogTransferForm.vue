<template>
  <iep-dialog :dialog-show="dialogShow" :title="`文章${methodName}`" width="900px" @close="dialogShow=false">
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <template slot="before-columns">
        <el-table-column label="ID" width="90px">
          <template slot-scope="scope">
            <div>{{scope.row.id}}</div>
          </template>
        </el-table-column>
      </template>
      <el-table-column prop="operation" label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click.stop="handleSelect(scope.row)">选择迁移</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <template slot="footer">
      <iep-button @click="dialogShow=false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { getPage } from '@/api/conm/node_controller'
import { postTransferNode } from '@/api/conm/article_controller'
import { columnsMap, dictsMap } from '../ColumnManagement/options'
import mixins from '@/mixins/mixins'
import { mapGetters } from 'vuex'
export default {
  mixins: [mixins],
  data () {
    return {
      dialogShow: false,
      dictsMap,
      columnsMap,
      methodName: '创建',
      pagedTable: [
      ],
      siteId: '',
      articleIds: [],
    }
  },
  created () {
    this.siteId = this.$route.params.id
  },
  computed: {
    ...mapGetters([
      'permissions',
    ]),
  },
  methods: {
    handleSelect (row) {
      console.log(this.articleIds)
      this.$confirm('此操作将选择迁移到该栏目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        postTransferNode({ nodeId: row.id, articleIds: this.articleIds }).then(res => {
          if (res.data.data) {
            this.$message({
              type: 'success',
              message: '迁移成功!',
            })
          } else {
            this.$message({
              type: 'info',
              message: `迁移失败，${res.data.msg}`,
            })
          }
          this.$emit('load-transfer')
        })
      })
    },
    async loadPage (param = this.searchForm) {
      await this.loadTable(param, getPage)
    },
  },
}
</script>
