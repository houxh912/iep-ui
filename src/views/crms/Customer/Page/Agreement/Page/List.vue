<template>
  <div class="scheme">
    <operation-wrapper>
      <iep-button type="danger" @click="handleAdd" plain><i class="el-icon-plus"></i> 新增</iep-button>
    </operation-wrapper>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <template slot="before-columns">
        <el-table-column label="客户名称">
          <template slot-scope="scope">
            <div class="custom-name">{{scope.row.agreementName}}</div>
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
</template>

<script>
import mixins from '@/mixins/mixins'
import { columnsMap } from '../options'
import { getAgreementPage } from '@/api/crms/agreement'
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
      this.loadTable(param, getAgreementPage)
    },
    handleAdd () {
      // this.$emit('onEdit', {
      //   formRequestFn: postContact,
      //   methodName: '新增',
      //   id: false,
      // })
    },
    handleEdit () {
      // this.$emit('onEdit', {
      //   formRequestFn: putContact,
      //   methodName: '编辑',
      //   id: row.id,
      // })
    },
    handleDeleteById () {

    },
  },

}
</script>