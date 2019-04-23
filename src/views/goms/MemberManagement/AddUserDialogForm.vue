<template>
  <iep-dialog :dialog-show="dialogShow" title="批量添加成员" width="70%" @close="close">
    <el-row :gutter="20">
      <el-col :span="6">
        已选择的用户：
        <el-scrollbar style="height:400px;">
          <a-button v-for="user in selectUserList" :key="user.id" @click="handleDelete(user)" block>{{user.name}}</a-button>
        </el-scrollbar>
      </el-col>
      <el-col :span="18">
        <el-scrollbar style="height:400px;">
          <operation-container>
            <template slot="right">
              <operation-search @search-page="searchPage">
              </operation-search>
            </template>
          </operation-container>
          <iep-table :isLoadTable="isLoadTable" size="mini" :pagination="pagination" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
            <template slot="before-columns">
              <el-table-column label="姓名">
                <template slot-scope="scope">
                  {{scope.row.name}}
                </template>
              </el-table-column>
            </template>
            <el-table-column prop="operation" label="操作" width="220">
              <template slot-scope="scope">
                <operation-wrapper>
                  <iep-button :disabled="isDisabled(scope.row)" type="text" @click="handleSelect(scope.row)">选择</iep-button>
                </operation-wrapper>
              </template>
            </el-table-column>
          </iep-table>
        </el-scrollbar>
      </el-col>
    </el-row>
    <template slot="footer">
      <operation-wrapper>
        <iep-button type="primary" @click="handleBatchAddUsers()">添加</iep-button>
        <iep-button @click="close">取消</iep-button>
      </operation-wrapper>
    </template>
  </iep-dialog>

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
      selectUserList: [],
    }
  },
  computed: {
    selectUserIds () {
      return this.selectUserList.map(m => m.id)
    },
  },
  methods: {
    handleBatchAddUsers () {
      pullUser(this.selectUserIds).then(() => {
        this.$message('批量添加成功')
        this.close()
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
    loadPage (param) {
      this.loadTable(param, gomsNoJoinUserPage)
    },
    close () {
      this.dialogShow = false
    },
  },
}
</script>
