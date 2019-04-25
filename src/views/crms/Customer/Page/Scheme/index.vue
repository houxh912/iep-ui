<template>
  <div>
    <operation-wrapper>
      <iep-button class="btn" type="primary" plain @click="handleAdd"><i class="el-icon-plus"></i> 添加方案</iep-button>
    </operation-wrapper>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <el-table-column label="方案名称">
        <template slot-scope="scope">
          <el-col>
            <div class="program-name">{{scope.row.programName}}</div>
          </el-col>
        </template>
      </el-table-column>
      <el-table-column label="附件" width="250px">
        <template slot-scope="scope">
          <span @click="download(scope.row)" class="download">下载<i class="icon-download1"></i></span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" width="250px" v-if="record.collaborations.length !== 0">
        <template>
          <div>
            <div class=' line'>
              <iep-img-avatar :size="30" :src="userInfo.avatar" alt="头像"></iep-img-avatar>
            </div>
            <div class='create-name line'>
              {{userInfo.realName}}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300px">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleSave(scope.row)" type="warning" plain v-if="!scope.row.status" :disabled="scope.row.creatorId !== userInfo.userId">保存至材料库</iep-button>
            <iep-button @click="handleEdit(scope.row)" type="warning" plain :disabled="scope.row.creatorId !== userInfo.userId">编辑</iep-button>
            <iep-button @click="handleDeleteById(scope.row)" :disabled="scope.row.creatorId !== userInfo.userId">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <el-row class="recommend">
      <el-col class="title">为您推荐以下参考材料： <span v-if="recommendList.length==0">无</span></el-col>
      <div class="meterial">
        <span class="item" v-for="(item, index) in recommendList" :key="index" @click="toDetail">{{item}}</span>
      </div>
    </el-row>
    <add-drawer ref="AddDrawer" @load-page="loadPage" @add="add"></add-drawer>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { getSchemePage, createScheme, updateScheme, deleteSchemeById, getSchemeById, getMaterial } from '@/api/crms/scheme'
import { mapGetters } from 'vuex'
import AddDrawer from './AddDrawer'
import { downloadModel } from '@/api/crms/download'
export default {
  name: 'contacts',
  mixins: [mixins],
  components: { AddDrawer },
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },

  data () {
    return {
      formData: {},
      rules: {},
      methodName: '',
      dialogShow: false,
      dialogVisible: false,
      deleteAll: '',
      id: '',
      dicData: [
        { value: 1, label: '选项1' },
        { value: 2, label: '选项2' },
      ],
      recommendList: [],
      submitFn: () => { },
      tags: ['政务网', '智慧城市'],
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  created () {
    this.formData.createName = this.userInfo.avatar
    this.loadPage()
    getMaterial({ clientId: this.record.id }).then((res) => {
      this.recommendList = res.data.data
    })
  },
  methods: {
    loadPage (param) {
      this.$emit('load-page')
      this.loadTable({ ...param, clientId: this.record.id }, getSchemePage)
    },
    handleAdd () {
      this.$refs['AddDrawer'].formData.clientId = this.record.id
      this.$refs['AddDrawer'].drawerShow = true
      this.$refs['AddDrawer'].methodName = '新增'
      this.$refs['AddDrawer'].submitFn = createScheme
      this.$refs['AddDrawer'].tabList = [{
        label: '关联材料库',
        value: 'Meterials',
      }, {
        label: '方案上传',
        value: 'upload',
      }]
      this.$refs['AddDrawer'].activeTab = 'Meterials'
    },
    handleEdit (row) {
      getSchemeById(row.programId).then((res) => {
        this.$refs['AddDrawer'].formData = res.data.data
      })
      this.$refs['AddDrawer'].drawerShow = true
      this.$refs['AddDrawer'].methodName = '编辑'
      this.$refs['AddDrawer'].submitFn = updateScheme
      this.$refs['AddDrawer'].tabList = [{ label: '方案上传', value: 'upload' }]
      this.$refs['AddDrawer'].activeTab = 'upload'
    },
    handleDeleteById (row) {
      this.$confirm('此操作将同时删除原件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteSchemeById(row.programId).then(res => {
          if (res.data.data) {
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
            this.$emit('load-page')
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
    download (row) {
      downloadModel(row.atchUpload)
    },
    add (val) {
      this.formData.programName = val.name
      this.formData.materialId = val.id
      this.formData.attachs = [{ 'name': 'AINY4Y0AL3.txt', 'url': 'files-04cd8be68d2846c197432e51ee8888b5.txt' }],
        createScheme(this.formData).then(() => {
          this.$message({
            message: '添加方案成功',
            type: 'success',
          })
          this.loadPage()
        })
    },
    toDetail () {
      this.$message.success('功能开发中')
    },
    handleSave () {
      this.$message.success('功能开发中')
      // this.$router.push({
      //   path: '/mlms_spa/datum/create',
      //   query: {
      //     router: true,
      //     data: row,
      //   },
      // })
      // row.status = 1
      // saveScheme({ ...row }).then(() => {
      //   this.$notify({
      //     title: '成功',
      //     message: `${this.methodName}成功`,
      //     type: 'success',
      //     duration: 2000,
      //   })

      // })
    },
  },

}
</script>

<style lang="scss" scoped>
.program-name {
  padding: 10px 0;
}
.download {
  color: #409eff;
  cursor: pointer;
  i {
    margin-left: 5px;
  }
}
.item {
  display: inline-block;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #d4d4d4;
  padding: 3px 10px;
  margin-right: 10px;
  &:hover {
    color: #ba1b21;
    border: 1px solid #ba1b21;
  }
}
.line {
  display: inline-block;
  vertical-align: middle;
}
.create-name {
  vertical-align: middle;
  padding-left: 5px;
}
</style>
