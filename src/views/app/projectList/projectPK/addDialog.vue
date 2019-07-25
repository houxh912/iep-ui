<template>
  <iep-dialog :dialog-show="dialogShow" title="添加比对" width="600px" @close="loadPage">
    <el-form :model="form" ref="form" :rules="rules" class="form-detail" size="small" label-width="160px">
      <el-form-item label="项目名称：">
        <iep-project-select v-model="form.project"></iep-project-select>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <operation-wrapper>
        <iep-button type="primary" @click="updateForm()">确定</iep-button>
        <iep-button @click="loadPage">取消</iep-button>
      </operation-wrapper>
    </template>
  </iep-dialog>
</template>
<script>
import formMixins from '@/mixins/formMixins'
import { rules } from './option'
// import { getProjectPKList } from '@/api/app/prms/project_pk'
export default {
  mixins: [formMixins],
  data () {
    return {
      dialogShow: false,
      form: {
        project: '',
      },
      rules,
      idList: [],
    }
  },
  created () {
  },
  computed: {
  },
  methods: {
    loadPage () {
      this.dialogShow = false
      this.$emit('load-page')
    },
    updateForm () {
      this.form.project = ''
      this.dialogShow = false
      this.idList.push(this.form.project)
      this.$router.push({
        path: '/app/project_pk',
        query: {
          ids: this.idList,
        },
      })
      // getProjectPKList({ ids: this.idList }).then(({ data }) => {
      //   if (data.data) {
      //     this.formData = [data.data[0], data.data.length == 2 ? data.data[1] : initForm(), data.data.length == 3 ? data.data[2] : initForm()]
      //     this.$message.success('添加成功')
      //     this.dialogShow = false
      //   } else {
      //     this.$message(data.msg)
      //   }
      // })
    },
  },
}
</script>
<style lang="scss" scoped>
.isAsset {
  color: red;
}
</style>
