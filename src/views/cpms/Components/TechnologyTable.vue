<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button type="primary" @click="handleAdd" icon="el-icon-plus" plain>新增技术</iep-button>
      </template>
    </operation-container>
    <iep-no-data v-if="!tableData.length" message="暂无关联技术"></iep-no-data>
    <div v-else class="module" v-for="(item) in tableData" :key="item.id">
      <span class="clear" @click="handleDelete(item)"><i class="icon-shanchu1"></i> </span>
      <div class="img">
        <iep-img :src="item.imageUrl" alt=""></iep-img>
      </div>
      <div class="module-title">{{item.name}}</div>
    </div>
    <iep-dialog :dialog-show="dialogShow" title="添加关联技术" width="50%" @close="dialogShow=false">
      <iep-table :isLoadTable="false" :pagination="pagination" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection @selection-change="handleSelectionChange">
        <el-table-column label="名称" min-width="200px">
          <template slot-scope="scope">
            <IepTableLinkImgDesc :img="scope.row.imageUrl" :desc="scope.row.synopsis" :name="scope.row.name"></IepTableLinkImgDesc>
          </template>
        </el-table-column>
        <el-table-column label="负责人">
          <template slot-scope="scope">
            <iep-detail-tag :value="scope.row.chargeNames"></iep-detail-tag>
          </template>
        </el-table-column>
      </iep-table>
      <template slot="footer">
        <iep-button type="primary" @click="handleSelect()">提交</iep-button>
      </template>
    </iep-dialog>
  </div>
</template>
<script>
import { getTechnologyPage } from '@/api/cpms/technology'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  name: 'IepCpmsTechnologyTable',
  props: {
    value: {
      type: Array,
      required: true,
    },
  },
  data () {
    return {
      dialogShow: false,
    }
  },
  computed: {
    tableData: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      },
    },
  },
  methods: {
    handleAdd () {
      this.dialogShow = true
      this.loadPage()
    },
    handleDelete (row) {
      const tableData = this.tableData.filter(m => m.id !== row.id)
      this.tableData = tableData
    },
    handleSelect () {
      const selectData = this.pagedTable.filter(m => this.multipleSelection.includes(m.id))
      this.tableData.push(...selectData)
      this.dialogShow = false
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    loadPage (param) {
      this.loadTable({ ...param }, getTechnologyPage)
    },
  },
}
</script>
<style lang="scss" scoped>
.module {
  width: 150px;
  height: 150px;
  margin-right: 40px;
  display: inline-block;
  padding: 10px 25px;
  border: 1px solid #ccc;
  position: relative;
  .clear {
    position: absolute;
    right: 10px;
    .icon-shanchu1 {
      font-size: 12px !important;
      padding: 4px;
      border: 1px solid #ccc;
      border-radius: 50%;
    }
  }
  .img {
    padding: 5px;
    img {
      width: 100%;
      padding: 0;
      margin: 0;
      display: block;
      box-sizing: border-box;
    }
  }
  .module-title {
    width: 100%;
    padding-top: 10px;
    text-align: center;
  }
}
</style>
