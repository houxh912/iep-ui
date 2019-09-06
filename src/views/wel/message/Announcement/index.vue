<template>
  <div>
    <basic-container>
      <iep-page-header title="通知公告"></iep-page-header>
      <iep-tabs v-model="type" :tab-list="announcementTypeList" @tab-click="changeType"></iep-tabs>
      <operation-container>
        <template slot="left">
          <iep-button v-if="ims_announcement_add" @click="handleAdd" type="primary" icon="el-icon-plus" plain>发布公告</iep-button>
          <iep-read-mark-del :enableList="[type==='2', type==='2', false]" @on-view-batch="handleViewBatch" @on-mark-batch="onMarkBatch"></iep-read-mark-del>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="title"></operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
        <template slot="before-columns">
          <el-table-column label="" width="50">
            <template slot-scope="scope">
              <i v-if="scope.row.isMark" class="el-icon-s-flag"></i>
            </template>
          </el-table-column>
          <el-table-column label="主题" min-width="400">
            <template slot-scope="scope">
              <div v-if="type==='1'">
                {{scope.row.name}}
                <a-tag>{{scope.row.status}}</a-tag>
              </div>
              <iep-table-link v-if="type==='2'" is-dot :is-read="scope.row.isRead" @click="handleDetail(scope.row)">{{scope.row.name}}</iep-table-link>
            </template>
          </el-table-column>
        </template>
        <el-table-column v-if="type==='1'" label="操作" width="200">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" @click="handleDetail(scope.row)" plain>查看</iep-button>
              <iep-button @click="handleEdit(scope.row)">编辑</iep-button>
              <template v-if="scope.row.status==='草稿'">
                <iep-button @click="handlePublish(scope.row)">发布</iep-button>
              </template>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getAnnouncementPage, readAnnouncementBatch, markAnnouncementBatch, publishAnnouncement } from '@/api/ims/announcement'
import mixins from '@/mixins/mixins'
import { columnsMap } from './options'
export default {
  mixins: [mixins],
  data () {
    return {
      type: this.$route.query.type || '2',
      tabList: [
        {
          label: '我接收的',
          value: '2',
        },
        {
          label: '我发出的',
          value: '1',
        },
      ],
      columnsMap,
      ims_announcement_add: false,
      ims_announcement_view: false,
      ims_announcement_edit_del: false,
    }
  },
  computed: {
    ...mapGetters([
      'permissions',
    ]),
    announcementTypeList () {
      if (!this.ims_announcement_add) {
        return this.tabList.filter(m => m.value !== '1')
      } else {
        return this.tabList
      }
    },
  },
  created () {
    this.ims_announcement_add = this.permissions['ims_announcement_add']
    this.ims_announcement_view = this.permissions['ims_announcement_view']
    this.ims_announcement_edit_del = this.permissions['ims_announcement_edit_del']
    this.loadPage()
  },
  methods: {
    handlePublish (row) {
      this._handleComfirm(row.id, publishAnnouncement, '发布', '', '操作成功')
    },
    handleViewBatch () {
      // TODO: 是否多选提醒
      if (!this.multipleSelection.length) {
        this.$message('请先选择需要的选项')
        return
      }
      this._handleComfirm(this.multipleSelection, readAnnouncementBatch, '批量已读', '', '操作成功')
    },
    onMarkBatch () {
      // TODO: 是否多选提醒
      if (!this.multipleSelection.length) {
        this.$message('请先选择需要的选项')
        return
      }
      this._handleComfirm(this.multipleSelection, markAnnouncementBatch, '批量设置 / 取消标记', '', '操作成功')
    },
    handleDetail (row) {
      this.$router.push({
        path: `/ims_spa/announcement_detail/${row.id}`,
      })
    },
    //tab切换菜单
    changeType () {
      this.$router.push({
        path: '/wel/message/announcement',
        query: {
          type: this.type,
        },
      })
      this.loadPage()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleAdd () {
      this.$router.push({
        path: '/ims_spa/announcement_edit/0',
        query: {
          id: 0,
        },
      })
    },
    handleEdit (row) {
      this.$router.push({
        path: `/ims_spa/announcement_edit/${row.id}`,
      })
    },
    loadPage (param = this.searchForm) {
      this.loadTable({ ...param, classId: this.type }, getAnnouncementPage)
    },
  },
}
</script>
