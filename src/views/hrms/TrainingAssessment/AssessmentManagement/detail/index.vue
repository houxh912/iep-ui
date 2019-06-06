<template>
  <iep-dialog :dialog-show="dialogShow" title="发起考核" width="800px" @close="loadPage">
    <el-form :model="form" size="small" ref="form" label-width="140px" class="form-detail cover-detail-form">
      <el-form-item label="考核名称：">
        <span>{{form.checkName}}</span>
      </el-form-item>
      <el-form-item label="考核时间：">
        <span>{{form.checkTime}}</span>
      </el-form-item>
      <el-form-item label="考核人：">
        <span>{{form.checkUser}}</span>
      </el-form-item>
      <el-form-item label="考核内容：" prop="checks">
        <el-table :data="form.list" border style="width: 100%">
          <el-table-column v-for="(item, index) in tableColumn" :key="index" :fixed="item.fixed" :prop="item.value" :label="item.label" :width="item.width"></el-table-column>
        </el-table>
      </el-form-item>
      <el-row>
        <el-col :span=12>
          <el-form-item label="员工自评权重(%)：">
            <span>{{form.selfWeight}}</span>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="考核人评分权重(%)：" label-width="160px">
            <span>{{form.assessorWeight}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="考核人评分方式：">
        <span>平均分</span>
      </el-form-item>
      <div class="score-list">
        <el-form-item label="考核成绩：">
          <div class="score-item">
            <div class="score">分值</div>
            <div class="evaluate">评价</div>
          </div>
        </el-form-item>
        <el-form-item v-for="(item, index) in form.kpiVOs" :key="index" :label="`${item.assessorUserName}：`">
          <div class="score-item">
            <div class="score">{{item.score}}</div>
            <div class="evaluate">{{item.evaluate}}</div>
          </div>
        </el-form-item>
        <el-form-item label="考核分值：">
          <div class="score-item">
            <div class="score">{{form.score}}</div>
          </div>
        </el-form-item>
      </div>
    </el-form>
  </iep-dialog>
</template>

<script>
import { initFormData, dictsMap, initTableColumn } from './options'
import { getCoverDetail } from '@/api/hrms/cover'
import './style.scss'

export default {
  components: {  },
  data () {
    return {
      dialogShow: false,
      form: initFormData(),
      dictsMap,
      tableColumn: initTableColumn(),
    }
  },
  methods: {
    open (row) {
      this.tableColumn = initTableColumn()
      getCoverDetail(row.coverId).then(({data}) => {
        let row = data.data
        let formObj = {
          checkName: row.detailsVO.kpiName,
          checkTime: `${row.detailsVO.createTime} 至 ${row.detailsVO.endTime}`,
          checkUser: row.userName,
          selfWeight: row.detailsVO.selfWeight,
          assessorWeight: row.detailsVO.assessorWeight,
          score: row.score,
        }
        this.form = Object.assign({}, this.form, formObj)
        this.$set(this.form, 'kpiVOs', row.kpiVOs)
        // 处理表格数据 - 前三列介绍，后面评分
        let tableList = []
        for (let item of row.detailsVO.templateVO.checks) {
          tableList.push({
            checkName: item.item,
            checkExplan: item.checkExplan,
            weight: item.weight,
            checkId: item.checkId,
          })
        }
        // 处理表格信息
        let columnList = []
        for (let index in row.kpiVOs) {
          let item = row.kpiVOs[index]
          columnList.push({
            label: item.assessorUserName,
            value: 'score'+index,
            width: '100px',
          })
          for (let tableItem of tableList) {
            for (let t of item.kpiRelations) {
              if (t.checkId == tableItem.checkId) {
                tableItem['score'+index] = t.score
              }
            }
          }
        }
        this.form.list = tableList
        this.tableColumn = this.tableColumn.concat(columnList)
      })
      this.dialogShow = true
    },
    loadPage () {
      this.dialogShow = false
    },
  },
}
</script>

