<template>
  <iep-a-dialog :dialog-show="dialogShow" :title="`批量添加${showTexts.name}`" width="70%" @ok="handleOk" :confirmLoading="confirmLoading" @cancel="close">
    <el-row :gutter="20">
      <el-col :span="6">
        已选择的{{showTexts.name}}(点击移除)：
        <el-scrollbar style="height:410px;">
          <span class="br" v-if="!selectList.length">
            <img :src="img" alt="" />
            <span>右侧选择{{showTexts.name}}加入</span>
          </span>
          <a-button class="ant" v-for="item in selectList" :key="item.id" @click="handleDelete(item)" block>
            {{item.name}}
            <i class="el-icon-close" type="user-delete"></i>
          </a-button>
        </el-scrollbar>
      </el-col>
      <el-col :span="18">
        <operation-container>
          <template slot="right">
            <operation-search @search-page="searchPage">
            </operation-search>
          </template>
        </operation-container>
        <iep-table :isLoadTable="isLoadTable" align="center" size="mini" :pagination="pagination" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-option-size="5">
          <template slot="before-columns">
            <el-table-column label="ID">
              <template slot-scope="scope">
                {{scope.row.id}}
              </template>
            </el-table-column>
            <el-table-column :label="showTexts.prop">
              <template slot-scope="scope">
                {{scope.row.name}}
              </template>
            </el-table-column>
          </template>
          <el-table-column prop="operation" label="操作" width="100">
            <template slot-scope="scope">
              <operation-wrapper>
                <iep-button :disabled="isDisabled(scope.row)" @click="handleSelect(scope.row)">选择</iep-button>
              </operation-wrapper>
            </template>
          </el-table-column>
        </iep-table>
      </el-col>
    </el-row>
    <template slot="footer">
      <a-button @click="close">取消</a-button>
      <a-button :disabled="!selectList.length" type="primary" :loading="confirmLoading" @click="handleOk()">
        添加
      </a-button>
    </template>
  </iep-a-dialog>

</template>
<script>
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  data () {
    return {
      dialogShow: false,
      confirmLoading: false,
      showTexts: {
        name: '用户',
        prop: '姓名',
      },
      selectList: [],
      putRequestFunction: () => { },
      getRequestFunction: () => { },
      img: '/img/noinfo.png',
    }
  },
  computed: {
    selectIds () {
      return this.selectList.map(m => m.id)
    },
  },
  methods: {
    _pageOption () {
      return {
        current: 1,
        size: 5,
      }
    },
    close () {
      this.dialogShow = false
      this.selectList = []
      this.$emit('load-page')
    },
    handleOk () {
      this.confirmLoading = true
      this.putRequestFunction(this.selectIds).then(() => {
        this.$message.success('操作成功')
        this.confirmLoading = false
        this.close()
      })
    },
    isDisabled (row) {
      return this.selectIds.includes(row.id)
    },
    handleSelect (row) {
      this.selectList.push(row)
    },
    handleDelete (row) {
      const selectList = this.selectList.filter(item => item.id !== row.id)
      this.selectList = selectList
    },
    loadPage (param = this.searchForm) {
      this.loadTable({ ...param, ...this.searchForm }, this.getRequestFunction)
    },
  },
}
</script>
<style lang="scss" scoped>
.el-scrollbar {
  margin-top: 25px;
  padding: 15px;
  border: 1px solid #eee;
}
.br {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  img {
    margin-bottom: 20px;
    width: 100px;
  }
}
.ant {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  height: 40px !important;
  border: 0;
  border-bottom: 1px solid #eee;
}
</style>
<style scoped>
.el-scrollbar >>> .el-scrollbar__wrap {
  margin-right: -6px !important;
  overflow-x: hidden;
}
.el-scrollbar >>> ::-webkit-scrollbar {
  border-radius: 10px;
  width: 6px;
  background-color: #fff;
}
.el-scrollbar >>> ::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #fff;
  transition: 0.3s background-color;
}
.el-scrollbar >>> ::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #ddd;
  transition: 0.3s background-color;
  display: none;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}
.el-scrollbar >>> :hover::-webkit-scrollbar-thumb {
  display: block;
}
</style>
