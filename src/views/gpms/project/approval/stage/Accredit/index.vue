<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button class="add" @click="addProject" type="primary">新增</iep-button>
        <iep-button @click="deleteAll" class="add">批量删除</iep-button>
      </template>
    </operation-container>
    <iep-table 
      :isLoadTable="isLoadTable" 
      :pagination="pagination" 
      :columnsMap="columnsMap" 
      :pagedTable="pagedTable" 
      @size-change="handleSizeChange" 
      @current-change="handleCurrentChange" 
      is-mutiple-selection 
      @selection-change="selectionChange">
      <el-table-column label="操作" width="180px">
        <template slot-scope="scope">
          <el-button v-for="(item, i) in scope.row.btns" :key="i" size="small" type="text" @click="btnEvents(scope.row, item.fn)">{{item.label}}</el-button>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { columnsMap, pagedTable } from './option.js'

export default {
  data () {
    return {
      addDialogShow:false,
      isLoadTable:false,
      columnsMap,
      pagedTable,
      value: '',
    }
  },
  mixins: [mixins],
  components:{
  },
  methods: {
    btnEvents (row,filed) {
      switch (filed){
        case 'refer':this.refer(row);break
        case 'detail':this.detail(row);break
        case 'edit':this.edit(row);break
        case 'deleteOne':this.deleteOne(row);break
      }
    },
    // 提交
    refer (row) {
      console.log(row, '提交')
    },
    //详情
    detail (row) {
      console.log(row, '详情')
      this.detailDialog()
    },
    //编辑
    edit (row) {
      console.log(row, '编辑')
    },
    //勾选行执行
    selectionChange (val) {
      this.multipleSelection = val
    },
    //删除所有勾选行
    deleteAll () {
      this._handleGlobalAll()
    },
    deleteOne (val) {
      // console.log(val)
      this._handleGlobalById(val.id)
      console.log(val)
    },
    closeDialog () {
      this.dialogIsShow = false
      this.paramForm = {}
      console.log(this.dialogIsShow)
    },
    addProject () {
      this.$emit('toggle-show',!this.isShow)
    },
    detailDialog () {
      this.$emit('detail-show',!this.detailShow)
    },
  },
  mounted (){
    // console.log(this.isShow)
  },
  props:{
    isShow:{
      type: Boolean,
      required: false,
    },
    detailShow:{
      type: Boolean,
      required: false,
    },
  },
}
</script>

<style scoped>
.search {
  height: 35px;
  line-height: 26px;
  color: #666;
  font-weight: 900;
  font-size: 17px;
  border-bottom: 1px solid #cdcdcd;
  margin-bottom: 20px;
}
.searchbot {
  margin-right: 20px !important;
}
.num{
  width: 47%;
}
.smallcol{
  width: 110px !important;
}
.blackColor{
  color: #666;
}
</style>