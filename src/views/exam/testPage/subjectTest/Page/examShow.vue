<template>
  <div>
    <basic-container>
      <iep-page-header title="专题考试" :data="[10, 5]"></iep-page-header>
      <el-form :model="searchForm">
        <el-form-item label="科目：" prop="field">
          <el-radio-group size="small" v-model="searchForm.field" style="width: 90%;">
            <el-radio-button v-for="item in res.exms_subjects" :key="item.value" :label="item.label"
              :value="item.value" @change.native="handleSubject (item)">
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态：" prop="states" class="statesShow">
          <el-radio-group size="small" v-model="searchForm.states">
            <el-radio-button v-for="item in states" :key="item.value" :label="item.label"
              :value="item.value" @change.native="handleStates (item)">
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div class="gird-product">
        <div class="leaderBoard">
          <iep-tabs v-model="activeTab" :tab-list="tabList">
            <template v-if="activeTab ==='testRecordTab'" v-slot:testRecordTab>
              <div class="record">
                <el-row class="module" :gutter="20">
                  <el-col class="module-item" v-for="(item,index) in testListRes" :key="index"
                    :xs="12" :sm="12" :md="8" :lg="6" :xl="6">
                    <el-card shadow="hover">
                      <div class="header">
                        <img src="../img/1.jpg" alt="" class="img">
                        <div class="total">
                          <el-tooltip class="item" effect="dark" content="参加人数" placement="top">
                            <span><i class="el-icon-user"></i>{{item.totalEnrollment}}</span>
                          </el-tooltip>
                          <el-tooltip class="item" effect="dark" content="完成人数" placement="top">
                            <span><i class="el-icon-finished"></i>{{item.totalExam}}</span>
                          </el-tooltip>
                        </div>
                        <status :exam="item"></status>
                      </div>
                      <div class="content">
                        <h3 class="title">{{item.title}}</h3>
                        <div class="detail">
                          <div style="margin-bottom:5px">
                            <span v-if="item.examStatus === 5">报名日期：{{registDate(item)}}</span>
                            <span v-else>考试日期：{{examDate(item)}}</span>
                          </div>
                          <div>
                            <span style="margin-right:20px">时长：{{item.timeLong}}分钟</span>
                            <span v-if="item.examDifficultyName">难度系数：{{item.examDifficultyName}}</span>
                          </div>
                        </div>
                      </div>

                      <div class="finish button-set"
                        v-if="item.status === 3 && item.examStatus === 5">
                        <iep-button type="info" disabled>未参加</iep-button>
                      </div>
                      <div class="undone button-set" v-else>
                        <iep-button type="success" @click="handleSign(item)"
                          v-if="item.status === 0 && item.examStatus === 5 && item.status!==3">
                          开始报名
                        </iep-button>
                        <iep-button type="success" disabled
                          v-if="(item.status === undefined || item.status === 1) && item.examStatus === 5 ">
                          等待报名
                        </iep-button>
                        <iep-button type="info" disabled
                          v-if="item.status === 2 && item.examStatus === 5">
                          报名结束
                        </iep-button>
                        <iep-button type="success" disabled
                          v-if="item.examStatus === 0 && item.status!==3">审核中</iep-button>
                        <iep-button type="danger" disabled
                          v-if="item.examStatus === 1 && item.status === 1">
                          不通过</iep-button>

                        <iep-button type="primary" @click="handleStart(item)"
                          v-if="item.status === 1 && item.examStatus === 7">
                          开始考试
                        </iep-button>

                        <iep-button type="primary" disabled
                          v-if="item.status !== 1 && item.status!==3 && item.examStatus === 7">
                          等待考试
                        </iep-button>

                        <iep-button type="info" disabled
                          v-if="item.examStatus === 2 && item.status!==3">考试完成</iep-button>

                        <iep-button type="info" disabled
                          v-if="item.examStatus === 3 && item.status!==3">已交卷</iep-button>
                        <iep-button type="primary" disabled
                          v-if="item.examStatus === 7 && item.status === 3">未交卷</iep-button>
                        <iep-button type="primary" disabled
                          v-if="item.examStatus === 3 && item.status === 3">批卷中</iep-button>
                        <iep-button type="primary" v-if="item.examStatus === 8 "
                          @click="handleExamine(item)">查看成绩</iep-button>
                      </div>

                    </el-card>
                  </el-col>
                </el-row>
                <div class="pagination">
                  <el-pagination @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="paginationOption.current" :page-sizes="[8, 16, 20, 24]"
                    :page-size="paginationOption.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="paginationOption.total">
                  </el-pagination>
                </div>
              </div>
            </template>
          </iep-tabs>
        </div>
      </div>
    </basic-container>
    <sign-dialog ref="SignDialog" @reload="reload"></sign-dialog>
  </div>
</template>

<script>
import { getTestOption, getTestList } from '@/api/exam/testPage/subjectTest/subjectTest'
import mixins from '@/mixins/mixins'
import SignDialog from './SignDialog'
import Status from './status'
export default {
  mixins: [mixins],
   props: ['record'],
  components: { SignDialog, Status },
  data () {
    return {
      field: null,
      pageSize: 0,
      pageTotal: 0,
      res: {},
      testListRes: {},
      fields: { value: null, label: '全部' },
      tabList: [{
        label: '全部考试',
        value: 'testRecordTab',
      }],
      activeTab: 'testRecordTab',
      states: [
        { value: null, label: '全部' },
        { value: 0, label: '已报名' },
        { value: 1, label: '进行中' },
        { value: 8, label: '已完成' },
        { value: 3, label: '批卷中' },
        { value: 4, label: '已结束' },
        { value: 5, label: '未报名' },
      ],
      searchForm: {
        field: '全部',
        states: '全部',
      },
      total: null,
      paginationOption: {
        current: 1,
        size: 8,
      },
      pageOption: {
        field: null,
        state: null,
        current: 1,
        size: 8,
      },
      reloadPaginationOption: {
        current: 1,
        size: 8,
      },
      reloadPageOption: {
        field: null,
        state: null,
        current: 1,
        size: 8,
      },
      choosedPaginationOption: {
        current: 1,
        size: 8,
      },
    }
  },
  created () {
    this.getTestOption()
    if(this.record){
      this.getListByRecord()
      }else{
       this.getList()
    }
  },
  methods: {
    /**
     * 从当前跳到查看成绩返回时保持原来的翻页记录
     */
    getListByRecord () {
      let  status =  [
        { value: 0, label: '已报名' },
        { value: 1, label: '进行中' },
        { value: 8, label: '已完成' },
        { value: 3, label: '批卷中' },
        { value: 4, label: '已结束' },
        { value: 5, label: '未报名' },
      ]
      let field = [
        { value: 10001, label: '政策类' },
        { value: 24, label: '人力资源类' },
        { value: 23, label: '公司常识类' },
        { value: 22, label: '项目管理类' },
        { value: 21, label: '基本能力类' },
        { value: 20, label: '数据能力类' },
        { value: 19, label: '知识类' },
        { value: 18, label: '技能类' },
        { value: 17, label: '数据基因' },
        { value: 2, label: '水巢' },
        { value: 1, label: '国脉内网' },
      ]

      let i = status.find(item=>item.value === this.record.state) 
      let j = field.find(item=>item.value === this.record.field)  
      this.searchForm.states = i ? i.label :'全部'  
      this.searchForm.field = j ? j.label :'全部'    
      this.pageOption.field = this.record.field
      this.pageOption.state =  this.record.state
      this.paginationOption.current =  this.record.current
      this.paginationOption.size =  this.record.size
      this.getList()
    },

    /**
     * 报名时间
     */
    registDate (item) {
      if(item.signEndTime == '2049-09-24 12:00:00'){
        return '长期有效'
      }else{
        return `${this.dateFormat(item.signBeginTime)} - ${this.dateFormat(item.signEndTime)}`
      }
    },
    /**
     * 考试时间
     */
    examDate (item) {
       if(item.endTime == '2049-09-24 12:00:00'){
         return '长期有效'
       }else{
         return `${this.dateFormat(item.beginTime)} - ${this.dateFormat(item.endTime)}`
       }
    },
    /**
     * 格式化日期
     */
    dateFormat (date) {
      return date.substr(0, 10).replace(/-/g, '/')
    },
    handleSizeChange (val) {
      this.paginationOption.size = val
      this.load()
    },
    handleCurrentChange (val) {
      this.paginationOption.current = val
      this.load()
    },
    /**
     * 选择科目
     */
    handleSubject (item) {
      this.pageOption.field = item.id
      getTestList({ ...this.pageOption, ...this.choosedPaginationOption }).then(response => {
        const { records, size, total, current } = response.data.data
        this.testListRes = records
        this.total = total
        this.paginationOption = {
          current,
          size,
          total,
        }
      })
    },
    /**
     * 选择状态
     */
    handleStates (item) {
      this.pageOption.state = item.value
      getTestList({ ...this.pageOption, ...this.choosedPaginationOption }).then(response => {
        const { records, size, total, current } = response.data.data
        this.testListRes = records
        this.total = total
        this.paginationOption = {
          current,
          size,
          total,
        }
      })
    },
    /**
     * 获取试题数据
     */
    async getTestOption () {
      const params = {
        numberList: [
          'exms_subjects',//考试科目
          'exms_question_type',//题型
          'exms_question_category',//题类
          'exms_difficulty',//难度
        ],
      }
      const { data } = await getTestOption(params)
      this.res = data
      this.res.exms_subjects.reverse()
      this.res.exms_subjects.unshift(this.fields)
    },
    /**
     * 获取试题列表
     */
    getList () {
      getTestList({ ...this.pageOption, ...this.paginationOption }).then(response => {
        const { records, size, total, current } = response.data.data
        this.testListRes = records
        this.total = total
        this.paginationOption = {
          current,
          size,
          total,
        }
      })
    },
    load () {
      this.getList()
    },
    /**
     * 开始考试
     */
    handleStart (item) {
      this.$confirm('此操作将开始考试, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$message({
          type: 'success',
          message: '开始考试!',
        })
        this.$emit('onStart', item)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消考试',
        })
        // this.$emit('onStart', item)
      })
      // console.log(item)
    },
    /**
     * 开始报名
     */
    handleSign (item) {
      this.$refs['SignDialog'].dialogShow = true
      this.$refs['SignDialog'].explainList = item.description
      this.$refs['SignDialog'].consume = item.consume
      this.$refs['SignDialog'].examId = item.id
    },

    /**
     * 查看成绩
     */
    handleExamine (item) {
      // this.$emit('onExamine', item)
       this.$emit('onExamine', {
         title:item.title,
         id:item.id,
         field: this.pageOption.field,
         state: this.pageOption.state,
         current: this.paginationOption.current,
         size: this.paginationOption.size,
       })
    },
    /**
     * 报名成功重新加载
     */
    reload () {
      getTestList({ ...this.reloadPageOption, ...this.reloadPaginationOption }).then(response => {
        const { records, size, total, current } = response.data.data
        this.testListRes = records
        this.total = total
        this.paginationOption = {
          current,
          size,
          total,
        }
      })
    },
  },
}
</script>
<style scoped lang="scss">
.gird-product {
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-auto-flow: row dense;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  grid-template-columns: minmax(100px, 28fr) minmax(100px, 55fr) minmax(
      100px,
      28fr
    );
  .leaderBoard {
    grid-column-start: 1;
    grid-column-end: 4;
    margin-top: -12px;
  }
}

.module {
  .module-item {
    margin-bottom: 20px;
  }
  .header {
    position: relative;

    .total {
      position: absolute;
      left: 15px;
      bottom: 12px;
      color: #fff;
      > span {
        padding-right: 12px;

        > i {
          padding-right: 3px;
        }
      }
    }
  }
  .img {
    width: 100%;
  }
  .content {
    padding: 15px;
  }

  .title {
    font-size: 16px;
    height: 48px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .detail {
    // display: flex;
    flex-direction: column;
    .total {
      em {
        font-style: normal;
      }
    }
    span {
      display: inline-block;
      color: #999;
    }
  }
  .button-set {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    visibility: visible;
    opacity: 1;
    transition: all 0.3s ease-in-out;

    &.undone {
      visibility: hidden;
      opacity: 0;
    }
    > button {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      font-size: 14px;
      padding: 0;
      box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.28);
    }
  }

  .el-card:hover {
    .button-set.undone {
      visibility: visible;
      opacity: 1;
    }
  }
}
.pagination {
  text-align: center;
}
</style>
<style scoped>
.header >>> .el-button {
  padding: 0;
  width: 22px;
  height: 22px;
  line-height: 22px;
  border-radius: 50%;
}
.module >>> .el-tag--white {
  border: 1px solid #dcdfe6;
  height: 28px;
  line-height: 26px;
  background: #fff;
  color: #606266;
}
.module >>> .el-card__body {
  position: relative;
  padding: 0;
}
.record >>> .el-tag--white {
  border: 0;
  height: 28px;
  line-height: 26px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
}
</style>
<style scoped>
/* TODO:scoped */
.el-radio-button__inner {
  margin-right: 10px;
  border-radius: 5px !important;
  border: 1px solid #dde0e7;
}
.statesShow {
  margin-top: -12px;
}
.timeShow {
  float: right;
  text-align: right;
  width: 60%;
}
.states {
  font-size: 13px;
  padding-left: 15px;
}
</style>

