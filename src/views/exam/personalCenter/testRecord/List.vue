<template>
  <div>
    <basic-container>
      <iep-page-header title="专题考试记录" :data="[10, 5]"></iep-page-header>
      <operation-container>
        <template slot="right">
          <el-radio-group v-model="type" size="small" @change="handleSelect(type)">
            <el-radio-button v-for="tab in tabList" :label="tab.value" :key="tab.value" :disabled="isLoadTable">{{tab.label}}</el-radio-button>
          </el-radio-group>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <el-table-column prop="fieldName" label="科目" width="150">
          <template slot-scope="scope">
            {{scope.row.fieldName}}
          </template>
        </el-table-column>
        <el-table-column prop="title" label="名称">
          <template slot-scope="scope">
            {{scope.row.title}}
          </template>
        </el-table-column>
        <el-table-column prop="certificateStatus" label="证书关联" width="100">
          <template slot-scope="scope">
            <el-tag type="success" size="medium" v-if="scope.row.certificateStatus === 0">已关联</el-tag>
            <el-tag type="error" size="medium" v-if="scope.row.certificateStatus === 1">未关联</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="beginTime" label="考试时间" width="330">
          <template slot-scope="scope">
            {{scope.row | getEndTime}}
          </template>
        </el-table-column>
        <el-table-column prop="examStatus" label="个人中心状态" width="150">
          <template slot-scope="scope">
            <el-tag type="success" size="medium" v-if="scope.row.examStatus === 0">已报名</el-tag>
            <el-tag type="warning" size="medium" v-if="scope.row.examStatus === 1">进行中</el-tag>
            <el-tag type="warning" size="medium" v-if="scope.row.examStatus === 3">批卷中</el-tag>
            <el-tag type="info" size="medium" v-if="scope.row.examStatus === 4">已结束</el-tag>
            <el-tag type="success" size="medium" v-if="scope.row.examStatus === 8">已完成</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="examAchievement" label="分数" width="80">
          <template slot-scope="scope">
            {{scope.row.examAchievement}}
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="200">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" v-if="scope.row.examStatus === 0" disabled plain>开始考试</iep-button>
              <iep-button type="warning" plain v-if="scope.row.examStatus === 1" @click="handleStartExam(scope.row)">开始考试</iep-button>
              <iep-button type="warning" v-if="scope.row.examStatus === 3" disabled plain>查看成绩</iep-button>

              <iep-button type="warning" v-if="scope.row.examStatus === 4" disabled plain>查看成绩</iep-button>
              <iep-button v-if="scope.row.examStatus === 4" disabled plain>查看证书</iep-button>

              <iep-button type="warning" plain v-if="scope.row.examStatus === 8" @click="handleShowResult(scope.row)">查看成绩</iep-button>
              <iep-button v-if="scope.row.examStatus === 8" plain @click="handleShowCER(scope.row)">查看证书</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
      <iep-dialog :dialog-show="dialogShow" title="查看证书" width="700px" @close="dialogShow = false" center>
        <img :src="imgurl" alt="查看证书" style="width: 100%">
      </iep-dialog>
    </basic-container>
  </div>
</template>
<script>
import { getTestRecordList, getCertificate } from '@/api/exam/personalCenter/testRecord/testRecord'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  props: ['record'],
  data () {
    return {
      dialogShow: false,
      imgurl: '',
      type: '',
      tabList: [
        {
          label: '全部',
          value: '',
        },
        {
          label: '按月',
          value: 'month',
        },
        {
          label: '按年',
          value: 'year',
        },
      ],
    }
  },
  filters: {
    getEndTime (val) {
      const data = val.endTime == '2049-09-24 12:00:00' ? '长期有效' : `${val.beginTime} ~ ${val.endTime}`
      return data
    },
  },
  created () {
    if (this.record) {
      this.load()
    } else {
      this.loadPage()
    }
  },
  methods: {
    /**
     * 点击筛选
     */
    handleSelect (type) {
      this.pageOption.current = 1
      this.searchForm.state = type
      this.loadTable({ ...this.searchForm }, getTestRecordList)
    },

    load (param = this.searchForm) {
      this.pageOption.current = this.record.current
      this.pageOption.size = this.record.size
      this.searchForm.state = this.record.state
      this.type = this.record.state
      this.loadTable({ ...this.pageOption, ...param }, getTestRecordList)
    },

    loadPage (param = this.searchForm) {
      this.loadTable({ ...this.pageOption, ...param }, getTestRecordList)
    },

    /**
     * 点击开始考试
     */
    handleStartExam (row) {
      this.$confirm('此操作将开始考试, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$message({
          type: 'success',
          message: '开始考试!',
        })
        this.$emit('onStartExam', row)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消考试',
        })
      })
    },

    /**
     * 点击成绩
     */
    handleShowResult (row) {
      this.$emit('onShowResult', {
        id: row.id,
        title: row.title,
        state: this.type,
        current: this.pageOption.current,
        size: this.pageOption.size,
      })
    },

    /**
     * 点击证书
     */
    handleShowCER (row) {
      getCertificate({ examId: row.id }).then(res => {
        const { data } = res
        if (data.data && data.msg === 'success') {
          this.dialogShow = true
          this.imgurl = data.data.imgurl
        } else {
          this.$message({
            type: 'error',
            message: data.msg,
          })
        }
      })
    },
  },
}
</script>