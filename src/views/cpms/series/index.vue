<template>
  <div>
    <basic-container>
      <page-header title="产品系列" :replaceText="replaceText" :data="[120,20,30]"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="(scope.row)" type="primary" icon="el-icon-plus" plain>新增</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="false" :pagination="pagination" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
        <el-table-column label="名称" min-width="200px">
          <template slot-scope="scope">
            <IepTableLinkImgDesc :img="logo" :desc="scope.row.desc" :name="scope.row.name"></IepTableLinkImgDesc>
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
const logo = require('./img2.png')
export default {
  mixins: [mixins],
  data () {
    return {
      logo,
      pagedTable: [
        {
          id: 1,
          name: '数据基因DNA',
          desc: '对数据进行重新审核和校验, 并提供数据一致性.',
          userList: ['毛鑫明', '天成垸'],
          time: '2019-02-14 16:31:31',
          version: 'v5.0',
        },
      ],
      replaceText: (data) => `（共有${data[0]}份材料，${data[1]}个荣誉资质，${data[2]}份合同）`,
    }
  },
  created () {
    // this.loadPage()
  },
  methods: {
  },
}
</script>