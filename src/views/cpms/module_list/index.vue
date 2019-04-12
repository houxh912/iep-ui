<template>
  <div>
    <basic-container>
      <page-header title="模块清单" :replaceText="replaceText" :data="[1, 2, 4, 8]"></page-header>
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
            <IepTableLinkImgDesc img="/upload/iep/201904/3c8801b8-5377-498b-a60e-1560b0c465f9_logo.png" :desc="scope.row.desc" :name="scope.row.name"></IepTableLinkImgDesc>
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
          name: '数据清洗',
          desc: '在数据元池库中选取相关领域、相关发布机构发布的大量数据元作为标准基础。',
          userList: ['毛鑫明', '天成垸'],
          time: '2019-02-14 16:31:31',
          version: 'v5.0',
        },
      ],
      replaceText: (data) => `（共有${data[0]}个模块已上架，${data[1]}个模块研发中，${data[2]}个模块在测试，${data[3]}个模块在验收）`,
    }
  },
  created () {
    // this.loadPage()
  },
  methods: {
  },
}
</script>