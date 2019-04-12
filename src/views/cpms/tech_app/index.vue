<template>
  <div>
    <basic-container>
      <page-header title="技术应用"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="(scope.row)" type="primary" icon="el-icon-plus" plain>新增</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="false" :pagination="pagination" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <el-table-column label="名称" min-width="200px">
          <template slot-scope="scope">
            <IepTableLinkImgDesc img="/upload/iep/201904/653a3f5a-8702-443e-8387-4c5a16b837d0_logo.png" :desc="scope.row.desc" :name="scope.row.name"></IepTableLinkImgDesc>
          </template>
        </el-table-column>
        <el-table-column label="负责人">
          <template slot-scope="scope">
            <iep-detail-tag :value="scope.row.userList"></iep-detail-tag>
          </template>
        </el-table-column>
        <el-table-column label="时间">
          <template slot-scope="scope">
            {{scope.row.time}}
          </template>
        </el-table-column>
        <el-table-column label="当前版本">
          <template slot-scope="scope">
            {{scope.row.version}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <operation-wrapper>
              <iep-button type="warning" plain>编辑</iep-button>
              <iep-button>分享</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  data () {
    return {
      pagedTable: [
        {
          id: 1,
          name: 'Ant Design',
          desc: 'Ant Design是基于react开发的一个解放ui和前端的工具，它提供了一致的设计方便我们快速开发和减少不必要的设计与代码',
          userList: ['毛鑫明', '天成垸'],
          time: '2019-02-14 16:31:31',
          version: 'v5.0',
        },
      ],
    }
  },
  created () {
    // this.loadPage()
  },
  methods: {
  },
}
</script>