<template>
  <operation-wrapper class="contact-wrapper">
    <el-select :value="user.id" filterable :filter-method="onFilterMethod" placeholder="请选择" @change="handleChange" @clear="handleClear" clearable>
      <el-option v-for="item in userPyListOptions" :key="item.id" :label="item.name" :value="item.id">
        <span style="float: left">{{ item.name }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.pinyin }}</span>
      </el-option>
    </el-select>
    <iep-button @click="openContact()">通讯录</iep-button>
    <iep-drawer :drawer-show="dialogShow" title="通讯录" width="20%" @close="dialogShow = false" :z-index="3000">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText" clearable></el-input>
      <el-tree ref="tree" :filter-node-method="filterNode" :props="props" :data="treeData" :show-checkbox="showCheckbox" default-expand-all @node-click="selectUser">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span :class="{'is-disabled':isDisabled(data, node)}" @click.stop="() => selectUser(data, node)">{{ node.label }}</span>
        </span>
      </el-tree>
    </iep-drawer>
  </operation-wrapper>
</template>
<script>
import { mapGetters } from 'vuex'
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
      userPyList: [],
      userPyListOptions: [],
    }
  },
  computed: {
    ...mapGetters([
      'contactsPyList',
    ]),
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
  created () {
    this.loadPyList()
  },
  methods: {
    handleClear () {
      this.user = {
        id: '',
        name: '',
      }
    },
    handleChange (value) {
      const index = this.userPyList.findIndex(m => m.id === value)
      if (index >= 0) {
        const name = this.userPyList[index].name
        this.user = {
          id: value,
          name,
        }
      }
    },
    onFilterMethod (query) {
      const queryToLower = query.toLowerCase()
      if (query !== '') {
        setTimeout(() => {
          this.userPyListOptions = this.userPyList.filter(item => {
            return item.name.toLowerCase().indexOf(queryToLower) > -1
              || item.pinyin.toLowerCase().indexOf(queryToLower) > -1
              || item.py.toLowerCase().indexOf(queryToLower) > -1
          })
        }, 200)
      } else {
        this.userPyListOptions = [...this.userPyList]
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
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    loadPyList () {
      this.userPyList = [...this.contactsPyList]
      this.userPyListOptions = [...this.contactsPyList]
    },
    loadNode () {
      getUserListTree().then(({ data }) => {
        this.treeData = data.data
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
.contact-wrapper {
  display: flex;
}
.is-disabled {
  cursor: not-allowed;
  color: #aaa;
}
</style>
