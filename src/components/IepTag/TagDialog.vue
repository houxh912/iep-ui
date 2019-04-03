<template>
  <iep-dialog :dialog-show="dialogShow" title="添加标签" width="520px" @close="cancel">
    <operation-container>
      <template slot="right">
        <operation-search @search-page="searchPage"></operation-search>
      </template>
    </operation-container>
    <div class="tag-list" v-loading="isLoadTable">
      <a-tag v-for="tag in pagedTable" :key="tag.tagId" color="blue" @click.native="handleSelect(tag.name)">{{tag.name}}</a-tag>
    </div>
    <iep-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :pagination-option="pagination" :page-sizes="[10, 20, 30, 40]" layout="prev, next" :pager-count="5" prev-text="上一页" next-text="下一页" background></iep-pagination>
  </iep-dialog>
</template>
<script>
import { getTagPage } from '@/api/tms/tag'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  data () {
    return {
      dialogShow: false,
      selectedTags: [],
    }
  },
  methods: {
    handleSelect (name) {
      this.dialogShow = false
      this.$emit('select-one', name)
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getTagPage)
    },
    loadTable (param, requestFn) {
      this.isLoadTable = true
      requestFn({ ...param, ...this.pageOption }).then(({ data }) => {
        const { records, size, total, current } = data
        this.pagination = { current, size, total }
        this.pagedTable = records.filter(m => {
          return !this.selectedTags.includes(m.name)
        })
        this.isLoadTable = false
      })
    },
    cancel () {
      this.dialogShow = false
      this.$emit('load-page')
    },
  },
}
</script>
<style scoped>
.tag-list >>> .ant-tag {
  margin-bottom: 5px;
}
.tag-list {
  margin: 20px;
}
</style>
