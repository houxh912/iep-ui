<template>
  <iep-a-dialog :visible="dialogShow" title="批量添加成员" width="70%" @ok="handleOk" :confirmLoading="confirmLoading" @cancel="dialogShow=false">
    <el-row :gutter="20">
      <el-col :span="6">
        已选择的用户(点击移除)：
        <el-scrollbar style="height:410px;">
          <span class="br" v-if="!selectUserList.length">
            <img :src="img" alt="" />
            <span>右侧选择成员加入</span>
          </span>
          <!-- <iep-no-data v-if="!selectUserList.length" message=""></iep-no-data> -->
          <a-button class="ant" v-for="user in selectUserList" :key="user.id" @click="handleDelete(user)" block>
            {{user.name}}
            <!-- <a-icon type="user-delete" /> -->
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
            <el-table-column label="姓名">
              <template slot-scope="scope">
                {{scope.row.name}}
              </template>
            </el-table-column>
          </template>
          <el-table-column prop="operation" label="操作" width="100">
            <template slot-scope="scope">
              <operation-wrapper>
                <iep-button :disabled="isDisabled(scope.row)" type="text" @click="handleSelect(scope.row)">选择</iep-button>
              </operation-wrapper>
            </template>
          </el-table-column>
        </iep-table>
      </el-col>
    </el-row>
    <template slot="footer">
      <a-button @click="dialogShow=false">取消</a-button>
      <a-button :disabled="!selectUserList.length" type="primary" :loading="confirmLoading" @click="handleOk()">
        添加
      </a-button>
    </template>
  </iep-a-dialog>

</template>
<script>
import mixins from '@/mixins/mixins'
import { gomsNoJoinUserPage } from '@/api/admin/user'
import { pullUser } from '@/api/goms/org'
export default {
  mixins: [mixins],
  data () {
    return {
      dialogShow: false,
      confirmLoading: false,
      selectUserList: [],
      img: '../img/noinfo.png',
    }
  },
  computed: {
    selectUserIds () {
      return this.selectUserList.map(m => m.id)
    },
  },
  methods: {
    _pageOption () {
      return {
        current: 1,
        size: 5,
      }
    },
    handleOk () {
      this.confirmLoading = true
      pullUser(this.selectUserIds).then(() => {
        this.$message.success('批量添加成功')
        this.dialogShow = false
        this.confirmLoading = false
        this.selectUserList = []
        this.$emit('load-page')
      })
    },
    isDisabled (row) {
      return this.selectUserIds.includes(row.id)
    },
    handleSelect (row) {
      this.selectUserList.push(row)
    },
    handleDelete (row) {
      const selectUserList = this.selectUserList.filter(user => user.id !== row.id)
      this.selectUserList = selectUserList
    },
    // handleSelectionChange (val) {
    //   this.multipleSelection = val.map(m => m.id)
    // },
    loadPage (param = this.searchForm) {
      this.loadTable({ ...param, ...this.searchForm }, gomsNoJoinUserPage)
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
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
}
.el-scrollbar >>> ::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #ddd;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
  display: none;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}
.el-scrollbar >>> :hover::-webkit-scrollbar-thumb {
  display: block;
}
</style>
