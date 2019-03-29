<template>
  <iep-dialog :dialog-show="dialogShow" :title="`添加协作人`" width="50%" @close="close">
    <div class="search">
      <el-input placeholder="请输入内容" v-model="commonName" maxlength="100" size="small">
        <template slot="append">
          <el-button @click="search" size="mini">搜索</el-button>
        </template>
      </el-input>
    </div>
    <el-table :data="data" size="small" :header-cell-style="{background:'#F3F4F7'}">
      <el-table-column fixed prop="commonName" label="协作人">
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click.native="handleSelect(scope.row)" type="text" size="small">
            选择
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <template slot="footer">
      <div class="list">
        协作人:<span v-for="(item,index) in selectList" :key="index">{{item.name}}</span>
        <span></span>
      </div>
      <iep-button class="btn" @click="close">取消</iep-button>
      <iep-button type="danger" @click="submitForm('form')">保存</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
import mixins from '@/mixins/mixins'
import { AddCollaborator, getCollaboratorPage } from '@/api/crms/customer'
// import { fetchList } from '@/api/admin/user'
export default {
  name: 'collaborator',
  mixins: [mixins],
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      dialogShow: false,
      commonName: '',
      data: [],
      id: '',
      currentPage: 1,
      pageSize: 10,
      total: null,
      selectList: [
      ],
      Contacts: {
        clientId: '',
        userId: [],
      },
    }
  },
  methods: {
    loadPage () {
      getCollaboratorPage(this.id, { currentPage: this.currentPage, size: this.pageSize }).then(res => {
        this.total = res.data.data.total
        this.data = res.data.data.records
      })
    },
    handleGoBack () {
      this.$emit('onGoBack')
    },
    handleSelect (row) {
      // 首先判断是否已经存在此条数据
      for (let item of this.selectList) {
        if (item.id == row.commonId) {
          this.$message.info('此位协作人已经选中，请选择其他协作人！')
          return
        }
      }
      let data = {
        id: row.commonId,
        name: row.commonName,
      }
      this.selectList.push(data)
      this.Contacts.clientId = this.id
      this.Contacts.userId = this.selectList.map(m => m.id)
    },
    close () {
      // this.selectList.splice(index, 1)
      this.selectList = []
      this.dialogShow = false
    },
    submitForm () {
      AddCollaborator(this.Contacts).then(res => {
        if (res.data.data) {
          this.$message.success('添加协作人成功！')
          this.dialogShow = false
        } else {
          this.$message.error(`操作失败，${res.data.msg}`)
        }
      })
    },
    handleSizeChange (val) {
      getCollaboratorPage(this.id, { current: this.currentPage, size: val }).then(res => {
        this.data = res.data.data.records
        this.pageSize = val
      })
    },
    handleCurrentChange (val) {
      getCollaboratorPage(this.id, { current: val, size: this.pageSize }).then(res => {
        this.data = res.data.data.records
        this.currentPage = val
      })
    },
    search () {
      // console.log(this.commonName)
    },
  },
}
</script>
<style  scoped>
.list {
  float: left;
  padding-left: 10px;
  font-weight: 600;
  font-size: 14px;
  line-height: 37px;
}
.list span {
  padding: 0 5px;
  font-size: 12px;
  font-weight: 500;
}
.el-table {
  z-index: 0 !important;
}
.el-pagination {
  text-align: right;
  padding: 30px 0;
}
.search {
  width: 250px;
  padding: 15px 0;
}
</style>

