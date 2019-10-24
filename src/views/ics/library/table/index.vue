<template>
  <div class="table">
    <operation-container>
      <template slot="left">
        <el-dropdown size="medium">
          <iep-button class="button" size="small" type="primary" icon="el-icon-plus" plain  @click="handleCreate">新增</iep-button>
          <iep-button class="button" size="small" type="primary" icon="el-icon-search" plain  @click="handleQuestion">问答</iep-button>
        </el-dropdown>
      </template>
      <template slot="right">
        <searchForm @searchPage="searchPage"></searchForm>
      </template>
    </operation-container>

    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" >
      <el-table-column prop="operation" label="操作" width="220">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button type="warning" plain size="small" @click="handleUpdate(scope.row)">编辑</iep-button>
            <iep-button size="small" @click="handleDeleteById(scope.row)">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>

  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from './options'
import { getQuestionPage, getQuestionById, deleteQuestion } from '@/api/ics/question'
import searchForm from './searchForm'
import { mapActions } from 'vuex'

export default {
  mixins: [ mixins ],
  components: { searchForm },
  props: {
    classList: {
      type: Object,
      default: () => {},
    },
  },
  data () {
    return {
      dictsMap,
      columnsMap,
    }
  },
  methods: {
    loadPage (id) {
      if (id) {
        this.searchForm.type = id
      }
      this.isLoadTable = false
      let fn = (m) => {
        let num = m.goodReviewNum + m.badReviewNum
        if (num > 0) {
          m.goodReview = 100%(m.goodReviewNum / (m.goodReviewNum + m.badReviewNum))
        } else {
          m.goodReview = 0
        }
        return m
      }
      this.loadTable(this.searchForm, getQuestionPage, fn)
    },
    handleCreate () {
      this.$emit('handle_form', 'create')
    },
    handleUpdate (row) {
      getQuestionById({id: row.id}).then(({ data }) => {
        this.$emit('handle_form', 'update', data.data)
      })
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById({ id: row.id }, deleteQuestion)
    },
    searchPage (val) {
      this.searchForm = Object.assign({}, this.searchForm, val)
      this.loadPage()
    },
    ...mapActions(['QuestionAndAnswer']),
    handleQuestion () {
      this.QuestionAndAnswer(true)
    },
  },
  watch: {
    classList: {
      handler (val) {
        this.dictsMap.type = val
      },
      deep: true,
    },
  },
}
</script>
<style scoped lang="scss">
.table {
  .button {
    margin-right: 15px;
  }
}
</style>
