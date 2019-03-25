<template>
  <div class="scheme">
    <div class="head">
      <iep-button type="danger" @click="handleAdd"><i class="el-icon-plus"></i> 新增</iep-button>
    </div>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <template slot="before-columns">
        <el-table-column label="客户名称">
          <template slot-scope="scope">
            <div class="custom-name">{{scope.row.programName}}</div>
            <el-col class="custom-tags">
              <Tag v-for="(item, index) in scope.row.tags" :key="index">{{item}}</Tag>
            </el-col>
          </template>
        </el-table-column>
      </template>
      <el-table-column prop="operation" label="附件" width="250px">
        <template>
          <operation-wrapper>
            <iep-button class="upload-button" size="small" plain><i class="el-icon-plus"></i>上传</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="250px">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleEdit(scope.row)" size="small" type="warning">保存至材料库</iep-button>
            <iep-button @click="handleDeleteById(scope.row)" size="small">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { } from '../options'
import { getSchemePage } from '@/api/crms/scheme'
export default {
  name: 'contract',
  mixins: [mixins],
  data () {
    return {
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
      this.loadTable(param, getSchemePage)
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

<style lang="scss" scoped>
.scheme {
  .head {
    margin-bottom: 10px;
  }
}
</style>
