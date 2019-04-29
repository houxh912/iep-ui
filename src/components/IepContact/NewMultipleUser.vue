<template>
  <div class="multiple-box">
    <operation-wrapper v-if="disabled">
      <el-tag v-if="!users.length" type="info">暂无</el-tag>
      <el-tag type="info" v-for="user in users" :key="user.id">{{user.name}}</el-tag>
    </operation-wrapper>
    <operation-wrapper v-if="!disabled" class="contact-wrapper">
      <a-select mode="multiple" :value="usersValue" placeholder="请输入姓名或姓名拼音" style="width: 100%" :filterOption="false" @search="querySearch" @change="handleChange">
        <a-select-option v-for="item in userResults" :key="item.id+''">
          <span style="float: left">{{ item.name }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.pinyin }}</span>
        </a-select-option>
      </a-select>
      <a-button v-if="isClear && !disabled" icon="close" @click="clearAll"></a-button>
      <a-button @click="openContact()">通讯录</a-button>
    </operation-wrapper>
    <iep-drawer :drawer-show="dialogShow" title="通讯录" width="20%" @close="close" :z-index="3000">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText" clearable></el-input>
      <el-tree ref="tree" :filter-node-method="filterNode" :props="props" :data="treeData" default-expand-all :expand-on-click-node="true">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span :class="{level1:node.level===1,level2:node.level===2,level3:node.level===3}">{{ node.label }}</span>
          <span v-if="node.level===3">
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
import debounce from 'lodash/debounce'
export default {
  name: 'IepContactMultipleUser',
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
      type: Array,
      required: true,
    },
  },
  data () {
    this.querySearch = debounce(this.querySearch, 500)
    return {
      filterText: '',
      dialogShow: false,
      props: {
        isLeaf: 'leaf',
      },
      treeData: [],
      userPyList: [],
      userResults: [],
    }
  },
  computed: {
    ...mapGetters([
      'contactsPyList',
    ]),
    isClear () {
      return this.userIds.length !== 0 ? true : false
    },
    users: {
      get: function () { return this.value },
      set: function (value) { this.$emit('input', value) },
    },
    userIds: function () { return this.value.map(m => m.id) },
    usersValue () {
      return this.users.map(m => {
        return m.id + ''
      })
    },
    userPyListFilter () {
      return this.userPyList.filter(m => !this.userIds.includes(m.id))
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
      this.users = []
    },
    isDisabled (data, node) {
      if (node.level === 3 && (this.userIds.includes(data.value) || this.filterUserList.includes(data.value))) {
        return true
      }
      return false
    },
    handleClose (tag) {
      const newData = this.users.filter(item => item.id !== tag.id)
      this.users = newData
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
    },
    handleChange (value) {
      const users = value.map(m => {
        const i = this.userPyList.findIndex(user => user.id === +m)
        return {
          id: this.userPyList[i].id,
          name: this.userPyList[i].name,
        }
      })
      Object.assign(this, {
        users,
      })
    },
    handleSelect (item) {
      this.users.push({
        id: item.id,
        name: item.name,
      })
      this.username = ''
    },
    querySearch (queryString) {
      const userPyListFilter = this.userPyListFilter
      const results = queryString ? userPyListFilter.filter(this.createFilter(queryString)) : userPyListFilter
      // 调用 callback 返回建议列表的数据
      this.userResults = results
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
      this.userResults = [...this.contactsPyList]
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