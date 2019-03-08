<template>
  <iep-dialog :dialog-show="dialogShow" title="选择项目" width="40%" @close="resetForm('form')">
    
    <div class="form">
      <el-input placeholder="请输入内容" v-model="searchData" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <div class="select-content">
        <div class="title">请从列表中选择项目</div>
        <div class="select-ul">
          <div class="select-li" v-for="(item, index) in list" :key="index">
            <el-radio v-model="selectId" :label="item.id">{{item.name}}</el-radio>
          </div>
        </div>
      </div>
    </div>

    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">{{methodName}}</iep-button>
      <iep-button @click="resetForm('form')">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import IepDialog from '@/components/IepDialog/'
export default {
  components: { IepDialog },
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '确定',
      searchData: '',
      list: [
        {id: 1, name: '公共数据目录系统'},
        {id: 2, name: '内网系统'},
        {id: 3, name: '上海青浦项目'},
      ],
      selectId: '',
    }
  },
  methods: {
    loadPage () {
      this.$emit('load-page')
    },
    resetForm () {
      this.searchDatas = ''
      this.dialogShow = false
    },
    submitForm () {
      if (this.selectId == '') {
        this.$message.error('请至少选择一个项目进行创建')
        return
      }
      this.formRequestFn(this.formData).then(() => {
        this.$notify({
          title: '成功',
          message: `${this.methodName}成功`,
          type: 'success',
          duration: 2000,
        })
        this.loadPage()
        this.dialogShow = false
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.form {
  padding: 0 20px 0 30px;
  .select-content {
    border-top: 1px solid #eee;
    padding-top: 20px;
    margin-top: 20px;
    .title {
      margin-bottom: 20px;
    }
    .select-ul {
      .select-li {
        margin-bottom: 15px;
      }
    }
  }
}
</style>
