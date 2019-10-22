<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button icon="el-icon-check" plain>认证</iep-button>
      </template>
      <template slot="right">
        <operation-search prop="name" placeholder="请输入机构名称进行搜索">
        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" isMutipleSelection :dictsMap="dictsMap">
      <template slot="before-columns">
        <el-table-column label="机构名称">
          <template slot-scope="scope">
            <div class="box">
              <span class="main-name">{{scope.row.orgName}}</span>
              <span class="claim">认</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="机构分类">
          <template slot-scope="scope">
            <span>{{dictsMap.type[scope.row.type]}}</span>
          </template>
        </el-table-column>
        <el-table-column label="行业">
          <template slot-scope="scope">
            <span>{{dictGroup['POLICY_INDUSTRY'].map(m => m.label)[scope.row.line]}}</span>
          </template>
        </el-table-column>
      </template>
      <el-table-column label="申请对象">
        <template slot-scope="scope">
          <span>{{scope.row.applyUserId}}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请时间">
        <template slot-scope="scope">
          <span>{{scope.row.applyTime|parseToDay}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="220">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleClaim(scope.row)">认证</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <dialog-form ref="DialogForm"></dialog-form>
  </div>
</template>>
<script>
import { columnsPendingMap, dictsMap, initForm } from '../options'
import mixins from '@/mixins/mixins'
import DialogForm from './DialogForm'
import { getPage } from '@/api/crms/organization_list'
import { mapGetters } from 'vuex'
export default {
  mixins: [mixins],
  components: { DialogForm },
  data () {
    return {
      isLoadTable: false,
      dictsMap,
      columnsMap: columnsPendingMap,
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'dictGroup',
    ]),
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleClaim (row) {
      this.$refs['DialogForm'].form = this.$mergeByFirst(initForm(), row)
      this.$refs['DialogForm'].dialogShow = true
    },
    async loadPage (param = this.searchForm) {
      await this.loadTable({ param, sort: 'apply' }, getPage)
    },
  },
}
</script>>
<style lang="scss" scoped>
.box {
  display: flex;
}
.main-name {
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 5px;
}
.claim {
  color: #cf3f26;
  font-size: 16px;
}
</style>