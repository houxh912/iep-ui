<template>
  <div>
    <basic-container>
      <iep-page-header title="出题记录"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd" icon="el-icon-plus" type="primary" plain>新增试题</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" :params="searchForm.title" prop="title">
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :pagedTable="pagedTable"
        @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <el-table-column prop="title" label="题目" width="250">
          <template slot-scope="scope">
            <span class="hiddenOverText" :title="scope.row.title">{{scope.row.title}}</span>
            <span class="overText" v-if="JSON.stringify(scope.row.title).length > 87">......</span>
          </template>
        </el-table-column>
        <el-table-column prop="fieldName" label="科目">
          <template slot-scope="scope">
            {{scope.row.fieldName}}
          </template>
        </el-table-column>
        <el-table-column prop="questionTypeName" label="题型">
          <template slot-scope="scope">
            {{scope.row.questionTypeName}}
          </template>
        </el-table-column>
        <el-table-column prop="kindName" label="题类">
          <template slot-scope="scope">
            {{scope.row.kindName}}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="title" label="内容">
          <template slot-scope="scope">
            {{scope.row.title}}
          </template>
        </el-table-column> -->
        <el-table-column prop="difficultyName" label="难度">
          <template slot-scope="scope">
            {{scope.row.difficultyName}}
          </template>
        </el-table-column>
        <el-table-column prop="associatedState" label="关联">
            <template slot-scope="scope">
              <el-tag type="success" size="medium" v-if="scope.row.associatedState === 0">不限</el-tag>
              <el-tag type="warning" size="medium" v-if="scope.row.associatedState === 1">限考试</el-tag>
            </template>
          </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag type="info" size="medium" v-if="scope.row.status === 0">审核中</el-tag>
            <el-tag type="success" size="medium" v-if="scope.row.status === 1">通过</el-tag>
            <el-tooltip effect="dark" placement="top-start" v-if="scope.row.status === 2">
              <div slot="content">未通过原因：<br />{{scope.row.reason}}</div>
              <el-tag type="warning" size="medium">未通过</el-tag>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="creatTime" label="提交时间" width="150">
          <template slot-scope="scope">
            {{scope.row.creatTime}}
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="200">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" plain @click="handleShow(scope.row)">查看</iep-button>
              <iep-button plain @click="handleModify(scope.row)">重新修改</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import { getSubmissionRecordList } from '@/api/exam/personalCenter/submissionRecord/submissionRecord'
import AdvanceSearch from '@/views/exam/reviewCenter/testQuestionsLibrary/Page/AdvanceSearch'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  components: { AdvanceSearch },
  props: [
    'record',
  ],
  data () {
    return {}
  },
  created () {
    /**
     * 当没点击查看或修改
     */
    if (!this.record) {
      this.loadPage()
    }
    /**
     * 当点击查看或修改后返回
     */
    if (this.record) {
      const param = {
        title: this.record.search,
      }
      this.pageOption.current = this.record.current
      this.pageOption.size = this.record.size
      this.searchForm.title = param.title
      this.loadTable({ ...param, ...this.pageOption }, getSubmissionRecordList)
    }
  },
  methods: {
    loadPage (param = this.searchForm) {
      this.loadTable(param, getSubmissionRecordList)
    },
    /**
     * 新增试题
     */
    handleAdd () {
      this.$emit('onEdit', {
        methodName: '创建新',
        id: '',
        edit: false,
      })
    },

    /**
     * 重新编辑
     */
    handleModify (row) {
      this.$emit('onEdit', {
        methodName: '修改',
        id: row.id,
        edit: false,
        current: this.pageOption.current,
        size: this.pageOption.size,
        search: this.searchForm.title,
      })
    },
    /**
     * 查看按钮
     */
    handleShow (row) {
      this.$emit('onEdit', {
        methodName: '查看',
        id: row.id,
        edit: true,
        current: this.pageOption.current,
        size: this.pageOption.size,
        search: this.searchForm.title,
      })
    },
  },
}
</script>
<style scoped>
.hiddenOverText {
  max-height: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.overText {
  position: absolute;
  bottom: 3px;
  left: 10px;
}
</style>


