<template>
  <iep-dialog :dialog-show="dialogShow" :title="`添加协作人`" width="60%" @close="close">
    <div class="title">
      添加协作人:<span v-for="(item,index) in selectList" :key="index">{{item.name}}</span>
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
    <template slot="footer">
      <iep-button class="btn" @click="close">取消</iep-button>
      <iep-button type="danger" @click="submitForm('form')">保存</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
import mixins from '@/mixins/mixins'
import { AddCollaborator } from '@/api/crms/customer'
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
      dictsMap: {},
      columnsMap: [
        { label: '协作人', prop: 'realName' },
      ],
      selectList: [
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

  methods: {
    loadPage (param) {
      this.loadTable(param, fetchList)
      this.drawerShow = false
    },
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
      this.Contacts.clientId = this.record.id
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
          this.drawerShow = false
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

