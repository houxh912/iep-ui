<template>
  <div>
    <div class="scheme" v-if="pageState=='list'">
      <operation-wrapper>
        <iep-button type="danger" @click="handleAdd" plain><i class="el-icon-plus"></i> 新增</iep-button>
      </operation-wrapper>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <template slot="before-columns">
          <el-table-column label="合同名称">
            <template slot-scope="scope">
              <div class="custom-name" @click="handleDetail(scope.row)">{{scope.row.contractName}}</div>
              <el-col class="custom-tags">
                <Tag v-for="(item, index) in scope.row.tags" :key="index">{{item}}</Tag>
              </el-col>
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作" width="250px">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleEdit(scope.row)" size="small" type="warning">编辑</iep-button>
              <iep-button @click="handleDeleteById(scope.row)" size="small">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </div>
    <edit-dialog ref="EditDialog" @load-page="loadPage" v-if="pageState=='dialog'" @dialog="isShow"></edit-dialog>
    <detail-dialog ref="DetailDialog" v-if="pageState=='detail'" @detail="isShow"></detail-dialog>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { columnsMap } from './options'
import { getAgreementPage } from '@/api/crms/agreement'
import EditDialog from './EditDialog'
import DetailDialog from './DetailDialog'
export default {
  name: 'contract',
  components: { EditDialog, DetailDialog },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      formData: {},
      pageState: 'list',
      id: this.record.id,
    }
  },
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    // loadPage (param) {
    //   this.loadTable(param, getAgreementPage)
    // },
    loadPage (param = { ...this.searchForm, id: this.id }) {
      this.loadTable(param, getAgreementPage)
    },
    handleAdd () {
      // this.$emit('onEdit', {
      //   formRequestFn: postContact,
      //   methodName: '新增',
      //   id: false,
      // })
      this.pageState = 'dialog'
      //  this.$nextTick(() => {
      //   this.$refs['mainDialog'].methodName = '新增'
      //   this.$refs['mainDialog'].formRequestFn = createData
      // })
    },
    handleEdit () {
      // this.$emit('onEdit', {
      //   formRequestFn: putContact,
      //   methodName: '编辑',
      //   id: row.id,
      // })
      this.pageState = 'dialog'
      // getDataById(row.id).then((res) => {
      //   this.$refs['mainDialog'].formData = res.data.data
      //   this.$refs['mainDialog'].methodName = '编辑'
      //   this.$refs['mainDialog'].formRequestFn = updateData
      // })
    },
    handleDetail () {
      this.pageState = 'detail'
    },
    isShow () {
      this.pageState = 'list'
    },
    handleDeleteById () {

    },
  },

}
</script>
<style lang="scss" scoped>
.custom-name {
  cursor: pointer;
}
</style>
