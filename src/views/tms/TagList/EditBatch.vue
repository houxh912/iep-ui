<template>
  <iep-dialog :dialog-show="dialogShow" :title="'批量编辑标签'" width="520px" @close="handleCancel" center>
    <el-form :model="form" :rules="rules" label-width="100px" size="small">
      <el-form-item label="标签分类:" prop="typeid">
        <el-select v-model="form.typeid" clearable placeholder="请选择">
          <el-option v-for="item in typeNameOpts" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签级别:" prop="levelid">
        <el-select v-model="form.levelid" clearable placeholder="请选择">
          <el-option v-for="item in levelNameOpts" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="handleSubmit">提交</iep-button>
      <iep-button @click="handleCancel">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { getTagTypeList } from '@/api/tms/tag-type'
import { getTagLevelList } from '@/api/tms/tag-level'
import { updateBatchTag } from '@/api/tms/tag'
export const rules = {
  typeid: [
    { required: true, message: '请选择标签分类', trigger: 'blur' },
  ],
  levelid: [
    { required: true, message: '请选择标签级别', trigger: 'blur' },
  ],
}
export default {
  name: 'OpenEditBatch',
  props: {
  },
  data () {
    return {
      rules,
      formRequestFn: () => { },
      dialogShow: false,
      ids: [],
      form: {
        typeid: '',
        levelid: '',
      },
      typeNameOpts: [],
      levelNameOpts: [],
    }
  },
  created () {
    this.loadTagProp()
  },
  computed: {
  },
  methods: {
    loadPage () {
      this.dialogShow = false
      this.$emit('load-page')
    },
    handleSubmit () {
      updateBatchTag({
        tagIds: this.ids,
        typeid: this.form.typeid,
        levelid: this.form.levelid,
      }).then(({ data }) => {
        if (data.data) {
          this.$message({
            message: '成功',
            type: 'success',
          })
        } else {
          this.$message({
            message: data.msg,
            type: 'warning',
          })
        }
        this.loadPage()
      })
    },
    handleCancel () {
      this.loadPage()
      this.form = {
        typeid: '',
        levelid: '',
      }
    },
    loadTagProp () {
      getTagTypeList().then(res => {
        this.typeNameOpts = res.data.map(m => {
          return {
            label: m.name,
            value: m.typeId,
          }
        })
      })
      getTagLevelList().then(res => {
        this.levelNameOpts = res.data.map(m => {
          return {
            label: m.name,
            value: m.levelId,
          }
        })
      })
    },
  },
}
</script>
<style lang="scss" scoped>
</style>
