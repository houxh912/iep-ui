<template>
  <iep-dialog :dialog-show="dialogShow" :title="`转移客户`" width="60%" @close="close">
    <div class="title">
      协作人:<span>{{selectList.name}}</span>
      <span></span>
    </div>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-index>
      <el-table-column prop="operation" label="操作" min-width="80">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleSelect(scope.row)" size="small">请选择</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <!-- <el-table :data="data" style="width: 100%" height="250">
      <el-table-column fixed prop="commonName" label="协作人">
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click.native="handleSelect(scope.row)" type="text" size="small">
            选择
          </el-button>
        </template>
      </el-table-column>
    </el-table> -->
    <template slot="footer">
      <iep-button class="btn" @click="close">取消</iep-button>
      <iep-button type="danger" @click="submitForm('form')">保存</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
import mixins from '@/mixins/mixins'
import { TransferCustomers } from '@/api/crms/customer'
import { fetchList } from '@/api/admin/user'
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
      data: [],
      id: '',
      dictsMap: {},
      columnsMap: [
        { label: '协作人', prop: 'realName' },
      ],
      selectList: [
      ],
      Contacts: {
        clientIds: '',
        creatorId: [],
      },
    }
  },
  created () {
    this.loadPage()
    console.log(this.id)
  },

  methods: {
    loadPage (param) {
      this.loadTable(param, fetchList)
      this.drawerShow = false
    },
    handleGoBack () {
      this.$emit('onGoBack')
    },
    handleSelect (row) {
      console.log(row)
      // 首先判断是否已经存在此条数据
      // for (let item of this.selectList) {
      //   if (item.id == row.commonId) {
      //     this.$message.info('此位协作人已经选中，请选择其他协作人！')
      //     return
      //   }
      // }
      let data = {
        id: row.userId,
        name: row.realName,
      }
      this.selectList = data
      this.Contacts.clientIds = this.id
      this.Contacts.creatorId = this.selectList.id
      console.log(this.Contacts)
    },
    close () {
      // this.selectList.splice(index, 1)
      this.selectList = []
      this.dialogShow = false
    },
    submitForm () {
      TransferCustomers(this.Contacts).then(res => {
        if (res.data.data) {
          this.$message.success('添加协作人成功！')
          this.drawerShow = false
          this.$emit('load-page')
        } else {
          this.$message.error(`操作失败，${res.data.msg}`)
        }
      })
    },
  },
}
</script>
<style lang='scss' scoped>
.title {
  height: 30px !important;
  span {
    padding: 0 5px;
  }
}
.div {
  height: 50px;
  width: 100%;
}
</style>

