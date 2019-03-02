<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button @click="(scope.row)" type="danger" icon="el-icon-plus">新增</iep-button>
        <el-dropdown size="medium">
          <iep-button type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>删除</el-dropdown-item>
            <el-dropdown-item divided>导入</el-dropdown-item>
            <el-dropdown-item>导出</el-dropdown-item>
            <el-dropdown-item>分享</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
      <!-- <template slot="right">
        <operation-search @search="searchPage" advance-search>
          <el-form :model="paramForm" label-width="80px" size="mini">
            <el-form-item label="员工姓名">
              <el-input v-model="paramForm.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="paramForm.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchPage">搜索</el-button>
              <el-button @click="clearSearchParam">清空</el-button>
            </el-form-item>
          </el-form>
        </operation-search>
      </template> -->
    </operation-container>
    <el-table class="table" v-loading="isLoadTable" :data="pagedTable" style="width: 100%;" @selection-change="handleSelectionChange" :header-cell-style="getRowClass" v-bind="$attrs">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column :label="item.label" :width="item.width" :min-width="item.minWidth" v-for="(item, idx) in columnsMap" :key="idx">
        <template slot-scope="scope">
          <div v-if="item.type==='dict'">
            <span>{{dictsMap[item.prop][scope.row[item.prop]]}}</span>
          </div>
          <div v-else>
            <span v-if="scope.row[item.prop] === 0">0</span>
            <span v-if="scope.row[item.prop] === null">{{ '暂无' }}</span>
            <span v-if="scope.row[item.prop]">{{scope.row[item.prop]}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="280">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button size="small" type="warning">编辑</iep-button>
            <iep-button @click="(scope.row)">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </el-table>
    <div class="add"><span @click="add"><i class="el-icon-plus"></i>新增职称</span></div>
  </div>
</template>
<script>
import { getPostLibrary1Page } from '@/api/hrms/post_library1'
import mixins from '@/mixins/mixins'
import { columnsMap, initSearchForm } from './options'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      paramForm: initSearchForm(),
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    clearSearchParam () {
      this.paramForm = initSearchForm()
    },
    loadPage (param) {
      this.loadTable(param, getPostLibrary1Page)
    },
    handleSizeChange (val) {
      this.$emit('size-change', val)
    },
    handleCurrentChange (val) {
      this.$emit('current-change', val)
    },
    handleSelectionChange (val) {
      this.$emit('selection-change', val)
    },
    getRowClass ({ rowIndex }) {
      if (rowIndex == 0) {
        return 'background:#F2F4F5;color:#000'
      } else {
        return ''
      }
    },
    add () {

    },
  },
}
</script>
<style lang="scss">
.add {
  width: 100%;
  border-bottom: 2px solid #ebeef5;
  text-align: center;
  padding: 20px 0;
  color: #cb3737;
  span {
    cursor: pointer;
  }
  i {
    padding: 0 5px;
  }
}
</style>



