<template>
  <iep-dialog :dialog-show="dialogShow" :title="`选择相关产品`" width="60%" @close="closed">
    <el-row class="select-list">
      <div v-for="(item, index) in selectList" :key="index" class="select-item">
        {{item.name}} <i class="el-icon-close cancle" @click="cancel(index)"></i>
      </div>
    </el-row>
    <iep-table 
      :isLoadTable="isLoadTable"
      :pagination="pagination"
      :dictsMap="dictsMap"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      is-index>
      <el-table-column prop="operation" label="操作" min-width="80">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleSelect(scope.row)" size="small">选择</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm">确认</iep-button>
      <iep-button @click="closed">取消</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
import mixins from '@/mixins/mixins'
import IepDialog from '@/components/IepDialog/'
export default {
  name: 'product',
  mixins: [ mixins ],
  components: { IepDialog },
  data () {
    return {
      dialogShow: false,
      dictsMap: {},
      columnsMap: [
        { label: '产品', prop: 'name' },
      ],
      selectList: [
        {id: 1, name: '产品1号'},
      ],
    }
  },
  methods: {
    loadPage () {
      this.dialogShow = true
      this.pagination = { current: 1, size: 10, total: 2 }
      this.pagedTable = [
        { id: 1, name: '产品1号' },
        { id: 2, name: '产品2号' },
      ]
      this.isLoadTable = false
    },
    closed () {
      this.dialogShow = false
      this.selectList = []
    },
    handleSelect (row) {
      // 首先判断是否已经存在此条数据
      for (let item of this.selectList) {
        if (item.id == row.id) {
          this.$message.error('此条产品已经选中，请选择其他产品！')
          return
        }
      }
      this.selectList.push(row)
    },
    cancel (index) {
      this.selectList.splice(index, 1)
    },
    submitForm () {
      this.$emit('select-list', this.selectList)
      this.closed()
    },
  },
}
</script>

<style lang="scss" scoped>
.select-list {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  .select-item {
    display: inline-block;
    margin-right: 20px;
    .cancle {
      cursor: pointer;
    }
  }
}
</style>
