<template>
  <div>
    <basic-container>
      <page-header title="通知公告"></page-header>
      <iep-tabs v-model="type" :tab-list="tabList" @tab-click="changeType"></iep-tabs>
      <operation-container>
        <template slot="left">
          <iep-button v-if="ims_announcement_add" @click="handleAdd" type="primary" icon="el-icon-plus" plain>发布公告</iep-button>
          <el-dropdown size="medium">
            <iep-button type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>标记</el-dropdown-item>
              <el-dropdown-item v-if="ims_announcement_edit_del">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage"></operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
        <template slot="before-columns">
          <el-table-column label="主题" min-width="400">
            <template slot-scope="scope">
              <iep-table-link :is-read="scope.row.isRead" @click="handleDetail(scope.row)">{{scope.row.name}}</iep-table-link>
            </template>
          </el-table-column>
        </template>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getAnnouncementPage } from '@/api/ims/announcement'
import mixins from '@/mixins/mixins'
import { columnsMap } from './options'
export default {
  mixins: [mixins],
  data () {
    return {
      type: '2',
      tabList: [
        {
          label: '我接收的',
          value: '2',
        },

        {
          label: '我发出的',
          value: '1',
        },
        // {
        //   label: '未读',
        //   value: '3',
        // },
        // {
        //   label: '我标记的',
        //   value: '4',
        // },
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
  },
  created () {
    this.ims_announcement_add = this.permissions['ims_announcement_add']
    this.ims_announcement_view = this.permissions['ims_announcement_view']
    this.ims_announcement_edit_del = this.permissions['ims_announcement_edit_del']
    this.loadPage()
  },
  methods: {
    handleDetail (row) {
      if (this.ims_announcement_view) {
        this.$router.push({
          path: `/ims_spa/announcement_detail/${row.id}`,
        })
      }
    },
    //tab切换菜单
    changeType () {
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
