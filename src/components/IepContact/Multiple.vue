<template>
  <div class="multiple-box">
    <el-tag v-if="!isClear" type="info">暂无</el-tag>
    <el-tag type="danger" :closable="!disabled" v-for="tag in unions" :key="tag.id+tag.name" @close="handleClose(tag, 'unions')">{{tag.name}}</el-tag>
    <el-tag type="warning" :closable="!disabled" v-for="tag in orgs" :key="tag.id+tag.name" @close="handleClose(tag, 'orgs')">{{tag.name}}</el-tag>
    <el-tag type="info" :closable="!disabled" v-for="tag in users" :key="tag.id+tag.name" @close="handleClose(tag, 'users')">{{tag.name}}</el-tag>
    <operation-wrapper v-if="!disabled" class="contact-wrapper">
      <el-autocomplete style="width:100%;" v-model="username" :fetch-suggestions="querySearch" placeholder="请输入姓名或姓名拼音" @select="handleSelect" highlight-first-item>
        <i class="el-icon-edit el-input__icon" slot="suffix"></i>
        <template slot-scope="{ item }">
          <span style="float: left">{{ item.name }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.pinyin }}</span>
        </template>
      </el-autocomplete>
      <iep-button v-if="isClear && !disabled" icon="el-icon-error" @click="clearAll"></iep-button>
      <iep-button @click="openContact()">通讯录</iep-button>
    </operation-wrapper>
    <iep-drawer :drawer-show="dialogShow" title="通讯录" width="20%" @close="close" :z-index="3000">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText" clearable></el-input>
      <el-tree ref="tree" :props="props" :data="treeData" default-expand-all :expand-on-click-node="true" :filter-node-method="filterNode">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-button :disabled="isDisabled(data, node)" type="text" size="mini" @click.stop="() => selectGroup(data, node)">选择</el-button>
          </span>
        </span>
      </el-tree>
    </iep-drawer>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getUserListTree } from '@/api/admin/contacts'
export default {
  name: 'IepContactMultiple',
  props: {
    disabled: {
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
      filterText: '',
      dialogShow: false,
      props: {
        isLeaf: 'leaf',
      },
      username: '',
      treeData: [],
      userPyList: [],
      userResults: [],
    }
  },
  computed: {
    ...mapGetters([
      'contactsPyList',
    ]),
    users: {
      get: function () { return this.group.users },
      set: function (value) { this.group.users = value },
    },
    userIds: function () { return this.group.users.map(m => m.id) },
    orgs: {
      get: function () { return this.group.orgs },
      set: function (value) { this.group.orgs = value },
    },
    orgIds: function () { return this.group.orgs.map(m => m.id) },
    unions: {
      get: function () { return this.group.unions },
      set: function (value) { this.group.unions = value },
    },
    unionIds: function () { return this.group.unions.map(m => m.id) },
    group: {
      get: function () { return this.value },
      set: function (value) { this.$emit('input', value) },
    },
    userPyListFilter () {
      return this.userPyList.filter(m => !this.userIds.includes(m.id))
    },
    isClear () {
      if (this.unionIds.length) {
        return true
      }
      if (this.orgIds.length) {
        return true
      }
      if (this.userIds.length) {
        return true
      }
      return false
    },
  },
  created () {
    this.loadPyList()
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    },
  },
  methods: {
    close () {
      this.filterText = ''
      this.dialogShow = false
    },
    openContact () {
      this.dialogShow = true
      this.loadNode()
    },
    clearAll () {
      this.unions = []
      this.orgs = []
      this.users = []
    },
    isDisabled (data, node) {
      if (data.value === 0) return true
      if (node.level === 1 && this.unionIds.includes(data.value)) {
        return true
      }
      if (node.level === 2 && this.orgIds.includes(data.value)) {
        return true
      }
      if (node.level === 3 && (this.userIds.includes(data.value) || this.filterUserList.includes(data.value))) {
        return true
      }
      return false
    },
    handleClose (tag, arr) {
      const newData = this.group[arr].filter(item => item.id !== tag.id)
      this.group[arr] = newData
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    selectGroup (data, node) {
      if (node.level === 3) {
        if (!this.userIds.includes(data.value)) {
          this.users.push({
            id: data.value,
            name: data.label,
          })
        }
      }
      if (node.level === 2) {
        if (!this.orgIds.includes(data.value)) {
          this.orgs.push({
            id: data.value,
            name: data.label,
          })
        }
      }
      if (node.level === 1) {
        if (!this.unionIds.includes(data.value)) {
          this.unions.push({
            id: data.value,
            name: data.label,
          })
        }
      }
    },
    handleSelect (item) {
      this.users.push({
        id: item.id,
        name: item.name,
      })
      this.username = ''
    },
    querySearch (queryString, cb) {
      const userPyListFilter = this.userPyListFilter
      const results = queryString ? userPyListFilter.filter(this.createFilter(queryString)) : userPyListFilter
      // 调用 callback 返回建议列表的数据
      this.userResults = results
      cb(results)
    },
    createFilter (query) {
      const queryToLower = query.toLowerCase()
      return (item) => {
        return (item.name.toLowerCase().indexOf(queryToLower) > -1
          || item.pinyin.toLowerCase().indexOf(queryToLower) > -1
          || item.py.toLowerCase().indexOf(queryToLower) > -1)
      }
    },
    loadPyList () {
      this.userPyList = [...this.contactsPyList]
    },
    loadNode () {
      getUserListTree().then(({ data }) => {
        this.treeData = data.data
      })
    },
  },
}
</script>
<style scoped>
.contact-wrapper {
  display: flex;
}
.multiple-box > .el-tag {
  margin-right: 5px;
  margin-bottom: 5px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
