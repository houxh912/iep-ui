<template>
  <iep-dialog :dialog-show="dialogShow" title="发起申请" width="520px" @close="loadPage" center>
    <el-form size="small" ref="form" label-width="100px">
      <el-form-item v-for="child in approvalTree" :key="child.id" :label="child.name">
        <a-checkable-tag v-for="item in child.children" :key="item.id" v-model="item.checked" @change="handleChange(item.name)">{{item.name}}</a-checkable-tag>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm">确定</iep-button>
      <iep-button @click="loadPage">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
function searchTree (element, matchingName) {
  if (element.name == matchingName) {
    return element
  } else if (element.children != null) {
    var i
    var result = null
    for (i = 0; result == null && i < element.children.length; i++) {
      result = searchTree(element.children[i], matchingName)
    }
    return result
  }
  return null
}
function initTree () {
  return [
    {
      id: 1,
      name: '人事管理',
      children: [
        {
          id: 1,
          name: '转正',
          checked: false,
        },
        {
          id: 2,
          name: '请假',
          checked: false,
        },
        {
          id: 3,
          name: '调岗',
          checked: false,
        },
        {
          id: 4,
          name: '离职',
          checked: false,
        },
        {
          id: 5,
          name: '加班',
          checked: false,
        },
        {
          id: 6,
          name: '出差',
          checked: false,
        },
      ],
    },
    {
      id: 2,
      name: '行政管理',
      children: [
        {
          id: 1,
          name: '物品领用',
          checked: false,
        },
      ],
    },
    {
      id: 3,
      name: '费用管理',
      children: [
        {
          id: 1,
          name: '报销',
          checked: false,
        },
      ],
    },
  ]
}
export default {
  data () {
    return {
      name: '',
      dialogShow: false,
      approvalTree: initTree(),
      formRequestFn: () => { },
    }
  },
  methods: {
    submitForm () {
      this.$router.push({
        path: '/hrms_spa/approval',
        query: {
          name: this.name,
          redirect: this.$route.fullPath,
        },
      })
    },
    handleChange (name) {
      this.initSelect()
      this.name = name
      var i
      var result = null
      for (i = 0; result == null && i < this.approvalTree.length; i++) {
        result = searchTree(this.approvalTree[i], name)
      }
      console.log(result)
      result.checked = true
    },
    initSelect () {
      this.approvalTree = initTree()
    },
    loadPage () {
      this.dialogShow = false
      this.$emit('load-page')
    },
  },
}
</script>

