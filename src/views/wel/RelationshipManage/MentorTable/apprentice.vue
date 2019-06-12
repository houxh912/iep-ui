<template>
  <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
    <template slot="before-columns">
    </template>
    <el-table-column prop="operation" label="操作" width="120px">
      <template slot-scope="scope">
        <operation-wrapper>
          <iep-button type="warning" v-show="mark==''" plain @click="handleadd(scope.row)">解除关系</iep-button>
        </operation-wrapper>
      </template>
    </el-table-column>
  </iep-table>
</template>
<script>
import { getMyApprentice } from '@/api/wel/relationship_manage'
import mixins from '@/mixins/mixins'
import formMixins from '@/mixins/formMixins'
import { columnsMap } from './options'
export default {
  mixins: [mixins,formMixins],
  data () {
    return {
      columnsMap,
    }
  },
  computed: {
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleadd () {

    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getMyApprentice)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.userId)
    },
  },
  watch: {
  },
}
</script>
<style lang="scss" scoped>
</style>
