<template>
  <el-input v-model="dept.name" placeholder="请选择一个部门" readonly>
    <el-popover slot="append" placement="right" width="300" trigger="click" v-model="dialogShow">
      <el-tree :props="props" :data="deptData" :show-checkbox="showCheckbox" @node-click="selectDept"></el-tree>
      <iep-button slot="reference">选择</iep-button>
    </el-popover>
  </el-input>
</template>
<script>
import { getCommonList } from '@/api/common'
export default {
  name: 'IepDeptSelect',
  props: {
    showCheckbox: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Object,
      required: true,
    },
    orgId: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      dialogShow: false,
      props: {
        isLeaf: 'leaf',
      },
      deptData: [],
    }
  },
  computed: {
    dept: {
      // getter
      get: function () {
        return this.value
      },
      // setter
      set: function (value) {
        this.$emit('input', value)
      },
    },
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      getCommonList(`admin/dept/${this.orgId}`).then(({ data }) => {
        this.deptData = data.data
      })
    },
    selectDept (data) {
      this.dept = {
        id: data.value,
        name: data.label,
      }
      this.dialogShow = false
    },
  },
  watch: {
    'orgId': function () {
      this.load()
    },
  },
}
</script>
