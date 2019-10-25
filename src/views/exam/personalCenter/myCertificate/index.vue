<template>
  <div>
    <basic-container>
      <iep-page-header title="我的证书"></iep-page-header>
      <operation-container>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :columnsMap="columnsMap" :isLoadTable="isLoadTable" :pagination="pagination" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-index>
        <el-table-column prop="operation" label="操作" width="110">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" plain @click="handleView(scope.row)">查看</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
      <iep-dialog :dialog-show="dialogVisible" title="证书信息" width="700px" @close="dialogVisible = false">
        <div>
          <el-image :src="src"></el-image>
        </div>
        <template slot="footer">
          <iep-button @click="dialogVisible = false">确定</iep-button>
        </template>
      </iep-dialog>
    </basic-container>
  </div>
</template>
<script>
import { getCertificatePage } from '@/api/exam/personalCenter/myCertificate/myCertificate'
import mixins from '@/mixins/mixins'
const columnsMap = [
  {
    label: '科目',
    prop: 'subject',
    // width: 150,
  },
  {
    label: '证书名称',
    prop: 'title',
  },
  {
    label: '级别',
    prop: 'levelName',
  },
  {
    label: '是否关联考试',
    prop: 'connect',
  },
  {
    label: '颁发机构',
    prop: 'deptName',
  },
]
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      dialogVisible: false,
      src:'',
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    /**
     * 获取证书分页数据
     */
    loadPage (param = this.searchForm) {
      this.loadTable(param, getCertificatePage)
    },

    handleView (row) {
      this.dialogVisible = true
      this.src = row.imgurl
    },
  },
}
</script>