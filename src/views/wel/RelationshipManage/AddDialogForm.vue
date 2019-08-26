<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}自定义分组`" width="500px" @close="loadPage">
    <el-radio-group v-model="form.customId">
      <el-radio v-for="item in relationship" :key="item.id" :label="item.id">{{item.name}}</el-radio>
    </el-radio-group>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm()">确定</iep-button>
      <iep-button @click="loadPage">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { getRelationshipList } from '@/api/wel/relationship_manage'
import { initGroupForm } from './options'
import formMixins from '@/mixins/formMixins'
export default {
  mixins: [formMixins],
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      customName: '',
      checked: false,
      relationship: [],
      form: initGroupForm(),
    }
  },
  computed: {
  },
  methods: {
    loadPage () {
      this.form = initGroupForm()
      this.loadTypeList()
      this.dialogShow = false
      this.$emit('load-page')
    },
    loadTypeList () {
      getRelationshipList().then(({ data }) => {
        this.relationship = data.data
        this.form.customId = this.relationship[0].id
      })
    },
    async submitForm () {
      const { data } = await this.formRequestFn(this.form)
      if (data.data) {
        this.$message({
          message: '操作成功',
          type: 'success',
        })
        this.loadPage()
      } else {
        this.$message({
          message: data.msg,
          type: 'error',
        })
      }
    },
  },
  created () {
    this.loadTypeList()
  },
  watch: {
  },
}
</script>
<style lang="scss" scoped>
.agree-wrapper {
  text-align: center;
}
</style>
<style scoped>
.el-radio {
  display: block;
  height: 40px;
}
</style>
