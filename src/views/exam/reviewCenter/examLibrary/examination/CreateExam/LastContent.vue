<template>
  <steps-content>
    <el-card shadow="always" class="content-wrapper">
      <h1>{{data.title}}</h1>
      <el-form size="small" label-width="100px">
        <el-form-item label="所属科目:">
          <el-input readonly></el-input>
        </el-form-item>
        <el-form-item label="试题数量:">
          <el-input v-model="data.choiceNum" readonly>
            <template slot="append">道</template>
          </el-input>
        </el-form-item>
        <el-form-item label="试卷总分:">
          <el-input v-model="data.score" readonly>
            <template slot="append">分</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-col :span="12">
            <p>创建人：<span>{{data.createName}}</span></p>
          </el-col>
          <el-col :span="12">
            <p>创建时间：<span>{{data.createTime}}</span></p>
          </el-col>
        </el-form-item>
      </el-form>
    </el-card>
    <template v-slot:action>
      <el-button type="primary" @click="back">
        返回考试列表
      </el-button>
      <el-button style="margin-left: 8px" @click="createNewExam">
        新增考试
      </el-button>
    </template>
  </steps-content>
</template>

<script>
import StepsContent from '@/views/exam/reviewCenter/testPaperLibrary/StepsContent'
export default {
  props: ['data'],
  components: { StepsContent },
  methods: {
    /**
     * 返回试卷列表
     */
    back () {
      this.$emit('back-list')
    },

    /**
     * 创建新考试
     */
    createNewExam () {
      let testPaper = {
        methodName: '新建考试',
        id: 'dasd',
      }
      this.$emit('on-data', testPaper)
    },
  },
}
</script>

<style lang="scss" scoped>
.content-wrapper {
  width: 50%;
  margin: 50px 0px;
  padding: 0 50px;
  h1 {
    text-align: center;
  }
  .el-form {
    margin-top: 20px;
  }
}
</style>