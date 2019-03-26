<template>
  <div class="edit-wrapper">
    <el-card class="edit-card" shadow="hover">
      <div slot="header" class="title">
        添加协作人:<span v-for="(item,index) in selectList" :key="index" class="marginLeft">{{item.name}}</span>
      </div>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-index>
        <el-table-column prop="operation" label="操作" min-width="80">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleSelect(scope.row)" size="small">选择</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
      <div>
        <iep-button type="primary" @click="submitForm">确认</iep-button>
        <iep-button @click="handleGoBack">取消</iep-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { AddCollaborator } from '@/api/crms/custom'
import { fetchList } from '@/api/admin/user'
export default {
  name: 'collaborator',
  mixins: [mixins],
  data () {
    return {
      dialogShow: false,
      dictsMap: {},
      columnsMap: [
        { label: '协作人', prop: 'realName' },
      ],
      selectList: [
        // { id: 1, name: '协作人1号' },
      ],
      Contacts: {
        clientId: '',
        userId: [],
      },
    }
  },
  created () {
    this.loadPage()
  },
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  methods: {
    loadPage (param) {
      // this.dialogShow = true
      // this.pagination = { current: 1, size: 10, total: 2 }
      // this.pagedTable = [
      //   { id: 1, name: '协作人1号' },
      //   { id: 2, name: '协作人2号' },
      // ]
      // this.isLoadTable = false
      this.loadTable(param, fetchList)
    },
    // closed () {
    //   this.dialogShow = false
    //   this.selectList = []
    // },
    handleGoBack () {
      this.$emit('onGoBack')
    },
    handleSelect (row) {
      // 首先判断是否已经存在此条数据
      for (let item of this.selectList) {
        if (item.id == row.userId) {
          this.$message.info('此位协作人已经选中，请选择其他协作人！')
          return
        }
      }
      let data = {
        id: row.userId,
        name: row.realName,
      }
      this.selectList.push(data)
      // let contacts = {
      //   clientId: this.record.id,
      //   userId: this.selectList.data.id,
      // }
      // this.contacts = contacts
      // console.log(this.contacts)
      this.Contacts.clientId = this.record.id
      this.Contacts.userId = this.selectList.map(m => m.id)
    },
    cancel (index) {
      this.selectList.splice(index, 1)
    },
    submitForm () {
      AddCollaborator(this.Contacts).then(res => {
        if (res.data.data) {
          this.$message.success('添加协作人成功！')
          // this.closed()
          this.$emit('onGoBack')
        } else {
          this.$message.error(`操作失败，${res.data.msg}`)
        }
      })
    },
  },
}
</script>
<style>
.aaa {
  display: flex;
  justify-content: right;
}
.marginLeft {
  margin-left: 10px;
}
</style>

