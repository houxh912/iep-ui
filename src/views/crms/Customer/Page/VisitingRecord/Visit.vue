<template>
  <div>
    <operation-wrapper>
      <iep-button class="btn" type="primary" plain @click="handleAdd"><i class="el-icon-plus"></i>新增</iep-button>
    </operation-wrapper>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <!-- <el-table-column label="创建人" width="250px" v-if="record.collaborations.length !==0">
        <template slot-scope="scope">
          <div>
            <div class="line">
              <iep-img-avatar :size="30" :src="scope.row.avatar" alt="头像"></iep-img-avatar>
            </div>
            <div class="create-name line">
              {{scope.row.realName}}
            </div>
          </div>
        </template>
      </el-table-column> -->
      <template slot="before-columns">
        <el-table-column label="拜访主题">
          <template slot-scope="scope">
            <!-- <div @click="handleDetail(scope.row)" class="detail">{{scope.row.title}}</div> -->
            <div class="custom-name">{{scope.row.title}}</div>
            <el-col class="custom-tags">
              <el-tag class="tag" type="info" size="mini" v-for="(item, index) in scope.row.tagKeyWords" :key="index" @click="handleTagDetail(item)">{{item}}</el-tag>
            </el-col>
          </template>
        </el-table-column>
      </template>
      <el-table-column prop="operation" label="操作" width="200px">
        <template slot-scope="scope">
          <operation-wrapper v-if="scope.row.status===1">
            <iep-button type="warning" plain @click="handleRevise(scope.row)">修改草稿</iep-button>
            <iep-button @click="handleDeleteById(scope.row)">删除</iep-button>
          </operation-wrapper>
          <operation-wrapper v-else>
            <iep-button @click="handleDetail(scope.row)" type="warning" plain>查看</iep-button>
            <iep-button @click="handleEdit(scope.row)" :disabled="scope.row.userId !== userInfo.userId">编辑</iep-button>
            <iep-button @click="handleDeleteById(scope.row)" :disabled="scope.row.userId !== userInfo.userId">删除</iep-button>
          </operation-wrapper>

        </template>
      </el-table-column>
    </iep-table>
    <edit-dialog ref="EditDialog" @load-page="loadPage"></edit-dialog>
    <visit-dialog ref="VisitDialog" @load-page="loadPage"></visit-dialog>
    <detail ref='detail' @load-page="loadPage"></detail>
  </div>
</template> 

<script>
import mixins from '@/mixins/mixins'
import { createVisitLog } from '@/api/crms/visiting_record'
// import { getTableData } from '@/api/mlms/material/summary'
import { getVisitListData } from '@/api/mlms/material/summary'
import { visitColumnsMap } from './options'
import EditDialog from './EditDialog'
import VisitDialog from './VisitDialog'
import Detail from './detail'
import { mapGetters } from 'vuex'
import { updateData, getDataById, deleteVisitLog } from '@/api/mlms/material/summary'
// import { initFormData } from './options'
export default {
  mixins: [mixins],
  props: ['record'],
  components: { EditDialog, VisitDialog, Detail },
  data () {
    return {
      id: this.record.id,
      columnsMap: visitColumnsMap,
      dialogShow: false,
      data: '',
      name: this.record.clientName,
    }
  },
  created () {
    this.loadPage()
    console.log(this.record)
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  methods: {
    handleAdd () {
      // this.$refs['VisitDialog'].formData = initFormData()
      this.$refs['VisitDialog'].methodName = '创建'
      this.$refs['VisitDialog'].formRequestFn = createVisitLog
      this.$refs['VisitDialog'].id = this.id
      this.$refs['VisitDialog'].name = this.name
      this.$refs['VisitDialog'].created = true
      this.$refs['VisitDialog'].disabled = false
      this.$refs['VisitDialog'].dialogShow = true
    },
    handleRevise (row) {
      this.$refs['VisitDialog'].id = this.id
      if (row) { // 可能是从别的项目进来新增的
        this.$refs['VisitDialog'].methodType = 'update'
        getDataById(row.id).then(({ data }) => {
          data.data.receiverList = {
            orgs: data.data.receiver.orgs ? data.data.receiver.orgs : [],
            users: data.data.receiver.users ? data.data.receiver.users : [],
            unions: [],
          }
          data.data.attendeeList = {
            orgs: data.data.attendee.orgs ? data.data.attendee.orgs : [],
            users: data.data.attendee.users ? data.data.attendee.users : [],
            unions: [],
          }
          data.data.hostList = data.data.host.length > 0 ? data.data.host[0] : { id: '', name: '' }
          this.$refs['VisitDialog'].formData = { ...data.data }
          this.$refs['VisitDialog'].methodName = '修改'
          this.$refs['VisitDialog'].formRequestFn = updateData
        })
      }
      // setTimeout().then(() => {
      //   this.$refs['VisitDialog'].dialogShow = true, 1000
      // })
      setTimeout(() => {
        this.$refs['VisitDialog'].dialogShow = true
      }, 500)
      // this.$refs['VisitDialog'].dialogShow = true
      // this.$refs['VisitDialog'].methodName = '保存'
      // this.$refs['VisitDialog'].id = this.id
      // this.$refs['VisitDialog'].formRequestFn = updateVisitLog
      this.$refs['VisitDialog'].isShow = true
      this.$refs['VisitDialog'].disabled = false
      this.$refs['VisitDialog'].created = false
    },
    handleEdit (row) {
      // fetchVisitLogById({ id: row.id }).then(res => {
      //   this.$refs['VisitDialog'].formData = res.data.data
      // })

      // 首先获取query
      // let query = this.params
      // 若存在 id， 即为修改
      this.$refs['VisitDialog'].id = this.id
      if (row) { // 可能是从别的项目进来新增的
        this.$refs['VisitDialog'].methodType = 'update'
        getDataById(row.id).then(({ data }) => {
          data.data.receiverList = {
            orgs: data.data.receiver.orgs ? data.data.receiver.orgs : [],
            users: data.data.receiver.users ? data.data.receiver.users : [],
            unions: [],
          }
          data.data.attendeeList = {
            orgs: data.data.attendee.orgs ? data.data.attendee.orgs : [],
            users: data.data.attendee.users ? data.data.attendee.users : [],
            unions: [],
          }
          data.data.hostList = data.data.host.length > 0 ? data.data.host[0] : { id: '', name: '' }
          this.$refs['VisitDialog'].formData = { ...data.data }
          this.$refs['VisitDialog'].methodName = '修改'
          this.$refs['VisitDialog'].formRequestFn = updateData
        })
      }
      // setTimeout().then(() => {
      //   this.$refs['VisitDialog'].dialogShow = true, 1000
      // })
      setTimeout(() => {
        this.$refs['VisitDialog'].dialogShow = true
      }, 500)
      // this.$refs['VisitDialog'].dialogShow = true
      // this.$refs['VisitDialog'].methodName = '保存'
      // this.$refs['VisitDialog'].id = this.id
      // this.$refs['VisitDialog'].formRequestFn = updateVisitLog
      this.$refs['VisitDialog'].isShow = true
      this.$refs['VisitDialog'].disabled = false
      this.$refs['VisitDialog'].created = false

    },
    handleDetail (row) {
      // fetchVisitLogById({ id: row.id }).then(res => {
      //   this.$refs['VisitDialog'].formData = res.data.data
      // })
      getDataById(row.id).then(res => {
        this.$refs['detail'].dialogShow = true
        this.$refs['detail'].formData = res.data.data
        let fn = (obj) => {
          let msg = ''
          for (let key in obj) {
            if (obj[key] !== null) {
              for (let item of obj[key]) {
                msg += item.name + '、'
              }
            }
          }
          if (msg === '') {
            return '无'
          } else {
            return msg.slice(0, msg.length - 1)
          }
        }
        this.$refs['detail'].formData.attendeeName = fn(res.data.data.attendee) // 参会人
        this.$refs['detail'].formData.receiverName = fn(res.data.data.receiver) // 参会人
        for (let i = 0; i < res.data.data.host.map(m => m.name).length; i++) {
          this.$refs['detail'].formData.hostName = res.data.data.host.map(m => m.name)[i]
        }
      })
      // this.$refs['VisitDialog'].dialogShow = true
      // this.$refs['VisitDialog'].disabled = true
      // this.$refs['VisitDialog'].isShow = false
    },

    handleDeleteById (row) {
      this.$confirm('此操作将同时删除原件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteVisitLog(row.id).then(res => {
          if (res.data.data) {
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
            this.$emit('async')
          } else {
            this.$message({
              type: 'info',
              message: `删除失败，${res.data.msg}`,
            })
          }
          this.loadPage()
        })
      })
    },
    loadPage (param = { ...this.searchForm, id: this.id }) {
      this.$emit('async')
      this.loadTable(param, getVisitListData)
    },
    handleTagDetail (val) {
      this.$openTagDetail(val)
    },
  },
}
</script>

<style lang="scss" scoped>
.line {
  display: inline-block;
  vertical-align: middle;
}
.create-name {
  vertical-align: middle;
  padding-left: 5px;
}
.custom-tags {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0;
  .el-tag {
    margin-top: 5px;
    margin-right: 5px;
    height: 26px;
    line-height: 26px;
  }
}
.tag {
  cursor: pointer;
}
</style>
