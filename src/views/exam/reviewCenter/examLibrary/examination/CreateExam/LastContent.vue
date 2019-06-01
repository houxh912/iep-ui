<template>
  <steps-content>
    <el-card shadow="always" class="content-wrapper">
      <h1>{{data.title}}</h1>
      <el-form size="small" label-width="100px">
        <el-form-item label="所属科目:">
          <el-input readonly v-model="fieldName"></el-input>
        </el-form-item>
        <el-form-item label="分数:">
          <el-input v-model="data.score" readonly>
          </el-input>
        </el-form-item>
        <el-form-item label="优秀线:">
          <el-input v-model="data.totalEnrollment" readonly>
          </el-input>
        </el-form-item>
        <el-form-item label="考试说明:">
          <iep-input-area v-model="data.totalExam"></iep-input-area>
        </el-form-item>
        <el-form-item>
          <el-col :span="12">
            <p>创建人：<span>{{data.username}}</span></p>
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
        methodName: '创建考试',
        id: false,
        current: 0,
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