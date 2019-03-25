<template>
  <div class="contract">
    <div class="head">
      <iep-button type="danger" @click="handleAdd"><i class="el-icon-plus"></i> 新增</iep-button>
    </div>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <el-table-column prop="operation" label="操作" width="200px">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleEdit(scope.row)" size="small" type="warning">编辑</iep-button>
            <iep-button @click="handleDeleteById(scope.row)" size="small">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { columnsMap } from '../options'
import { getContactPage, postContact, putContact } from '@/api/crms/customer_contacts'
export default {
  name: 'contract',
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      formData: {},
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
    loadPage (param) {
      this.loadTable(param, getContactPage)
    },
    handleAdd () {
      this.$emit('onEdit', {
        formRequestFn: postContact,
        methodName: '新增',
        id: false,
      })
    },
    handleEdit (row) {
      this.$emit('onEdit', {
        formRequestFn: putContact,
        methodName: '编辑',
        id: row.id,
      })
    },
    handleDeleteById () {

    },
  },

}
</script>

<style lang="scss" scoped>
.contract {
  .head {
    margin-bottom: 10px;
  }
}
</style>
