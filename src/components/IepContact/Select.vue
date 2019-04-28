<template>
  <div>
    <!-- <el-select v-model="userId" filterable :filter-method="onFilterMethod" placeholder="请选择" @focus.once="loadNode()" clearable>
      <el-option v-for="item in userDataOptions" :key="item.value" :label="item.label" :value="item.value">
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.py }}</span>
      </el-option>
    </el-select> -->
    <el-input v-model="user.name" placeholder="请选择用户" @focus="openContact()" readonly>
      <iep-button slot="append">选择</iep-button>
    </el-input>
    <iep-drawer :drawer-show="dialogShow" title="通讯录" width="20%" @close="dialogShow = false" :z-index="3000">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText" clearable></el-input>
      <el-tree ref="tree" :filter-node-method="filterNode" :props="props" :data="treeData" :show-checkbox="showCheckbox" default-expand-all @node-click="selectUser">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span :class="{'is-disabled':isDisabled(data, node)}" @click.stop="() => selectUser(data, node)">{{ node.label }}</span>
        </span>
      </el-tree>
    </iep-drawer>
  </div>
</template>
<script>
// import { _onFlattenTree } from './util'
import { getUserListTree } from '@/api/admin/contacts'
export default {
  name: 'IepContactSelect',
  props: {
    showCheckbox: {
      type: Boolean,
      default: false,
    },
    filterUserList: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      dialogShow: false,
      userId: '',
      filterText: '',
      props: {
        isLeaf: 'leaf',
      },
      treeData: [],
      userData: [],
      userDataOptions: [],
    }
  },
  computed: {
    user: {
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
  methods: {
    onFilterMethod (query) {
      const queryToLower = query.toLowerCase()
      if (query !== '') {
        setTimeout(() => {
          this.userDataOptions = this.userData.filter(item => {
            return item.label.toLowerCase().indexOf(queryToLower) > -1
              || item.py.toLowerCase().indexOf(queryToLower) > -1
              || item.pys.toLowerCase().indexOf(queryToLower) > -1
          })
        }, 200)
      } else {
        this.userDataOptions = [...this.userData]
      }
    },
    openContact () {
      this.dialogShow = true
      this.loadNode()
    },
    isDisabled (data, node) {
      if (node.level === 3 && this.filterUserList.includes(data.value)) {
        return true
      }
      return false
    },
    selectUser (data, node) {
      if (this.isDisabled(data, node)) {
        return
      }
      if (node.level === 3) {
        this.user = {
          id: data.value,
          name: data.label,
        }
        this.filterText = ''
        this.dialogShow = false
      }
    },
    filterNode (value, data) {
      console.log(value)
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    loadNode () {
      getUserListTree().then(({ data }) => {
        this.treeData = data.data
        // this.userData = [..._onFlattenTree(data.data)]
        // this.userDataOptions = [..._onFlattenTree(data.data)]
      })
    },
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    },
  },
}
</script>
<style lang="scss" scoped>
.is-disabled {
  cursor: not-allowed;
  color: #aaa;
}
</style>
