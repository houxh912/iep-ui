<template>
  <iep-table 
    :isLoadTable="isLoadTable"
    :pagination="pagination"
    :dictsMap="dictsMap"
    :columnsMap="columnsMap"
    :pagedTable="pagedTable"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    is-index
    isMutipleSelection
    @selection-change="selectionChange">
    <template slot="before-columns">
      <el-table-column label="">
        <template>
          <div class="mail-icon">
            <i class="icon-shoucang1 star"></i>
            <i class="icon-youxiang mail"></i>
            <i class="icon-fujian fujian"></i>
          </div>
        </template>
      </el-table-column>
    </template>
    <el-table-column prop="name" label="主题" min-width="160">
      <template slot-scope="scope">
        <div class="mail-name" @click="handleDetail(scope.row)">{{scope.row.name}}</div>
        <el-col class="mail-tags">
          <el-tag type="info" size="mini" v-for="(item, index) in scope.row.code" :key="index">{{item}}</el-tag>
        </el-col>
      </template>
    </el-table-column>
    <el-table-column prop="" label="发送时间">
      <template slot-scope="scope">
        {{scope.row.name}}
      </template>
    </el-table-column>
  </iep-table>
</template>

<script>
import mixins from '@/mixins/mixins'
import { tableOption, dictsMap } from './option'
import { fetchList, deleteDataById } from '@/api/crms/custom'

export default {
  name: 'custom',
  mixins: [mixins],
  components: {  },
  computed: {},
  data () {
    return {
      dictsMap,
      columnsMap: tableOption,
    }
  },
  methods: {
    handleDetail (row) {
      this.$emit('switchDialog', row)
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.id, deleteDataById)
    },
    selectionChange (val) {
      console.log('val: ', val)
    },
    loadPage (param) {
      this.loadTable(param, fetchList)
    },
  },
}
</script>

<style lang="scss" scoped>
.mail-icon {
  .star {
    margin-right: 50px;
  }
  .mail {
    margin-right: 20px;
  }
  i {
    cursor: pointer;
  }
}
.mail-name {
  cursor: pointer;
  margin-bottom: 10px;
}
.mail-tags {
  margin: 0;
  .el-tag {
    margin-right: 5px;
    height: 26px;
    line-height: 26px;
  }
}
</style>
