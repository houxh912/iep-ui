<template>
  <div class="multiple-box">
    <operation-wrapper v-if="disabled" class="contact-wrapper">
      <span v-if="!isClear">暂无</span>
      <el-tag type="danger" v-for="tag in unions" :key="tag.id+tag.name">{{tag.name}}</el-tag>
      <el-tag type="warning" v-for="tag in orgs" :key="tag.id+tag.name">{{tag.name}}</el-tag>
      <span>{{users.map(m => m.name).join('、')}}</span>
    </operation-wrapper>
    <operation-wrapper v-if="!disabled">
      <!-- <el-tag v-if="!isClearUser" type="info">暂无</el-tag> -->
      <el-tag type="danger" :closable="!disabled" v-for="tag in unions" :key="tag.id+tag.name" @close="handleClose(tag, 'unions')">{{tag.name}}</el-tag>
      <el-tag type="warning" :closable="!disabled" v-for="tag in orgs" :key="tag.id+tag.name" @close="handleClose(tag, 'orgs')">{{tag.name}}</el-tag>
      <operation-wrapper class="contact-wrapper">
        <a-select mode="multiple" labelInValue :value="usersValue" :placeholder="placeholder" style="width: 100%" :filterOption="false" @search="querySearch" @change="handleChange" :notFoundContent="fetching ? undefined : null" dropdownClassName="iep-contact-dropdown" :getPopupContainer="getPopupContainer" ref="a-select">
          <a-spin v-if="fetching" slot="notFoundContent" size="small" />
          <a-select-option v-for="item in userResults" :key="item.id+''" :value="item.id+''" :title="item.name">{{ item.name }}</a-select-option>
        </a-select>
        <a-button v-if="isClear && !disabled" icon="close" @click="clearAll"></a-button>
        <a-button v-if="isShowContactBtn" @click="openContact()">通讯录</a-button>
      </operation-wrapper>
    </operation-wrapper>
    <iep-drawer :drawer-show="dialogShow" title="通讯录" width="300" @close="close" :z-index="3000">
      <el-input placeholder="输入关键字对国脉人进行过滤" v-model="filterText" clearable></el-input>
      <div class="tab-title">国脉人</div>
      <el-tree ref="tree" :props="props" :data="treeData" node-key="value" :filter-node-method="filterNode">
        <span v-if="node.value!==1" class="custom-tree-node" slot-scope="{ node, data }">
          <iep-div-detail :value="node.label"></iep-div-detail>
          <span>
            <el-button :disabled="isDisabled(data, node)" type="text" size="mini" @click="() => selectGroup(data, node)">选择</el-button>
          </span>
        </span>
      </el-tree>
      <relations :user-ids="userIds" :filter-user-list="filterUserList" @push="_pushUsers" @push-list="_pushUserList"></relations>
    </iep-drawer>
  </div>
</template>
<script>
import uniqBy from 'lodash/uniqBy'
import { mapGetters } from 'vuex'
import { getUserListTree } from '@/api/admin/contacts'
import { loadContactsPyList } from '@/api/admin/contacts'
import Relations from './Relations'
import debounce from 'lodash/debounce'
export default {
  name: 'IepContactMultiple',
  components: { Relations },
  props: {
    placeholder: {
      type: String,
      default: '请输入姓名或姓名拼音',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isShowContactBtn: {
      type: Boolean,
      default: true,
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
    this.querySearch = debounce(this.querySearch, 800)
    return {
      filterText: '',
      dialogShow: false,
      fetching: false,
      props: {
        isLeaf: 'leaf',
      },
      username: '',
      treeData: [],
      userResults: [],
    }
  },
  computed: {
    ...mapGetters([
      'contactsPyGroup',
    ]),
    users: {
      get: function () { return this.group.users },
      set: function (value) {
        this.group.users = value
      },
    },
    userIds: function () { return this.group.users.map(m => m.id) },
    usersValue () {
      return this.users.map(m => {
        return {
          key: m.id + '',
          label: m.name,
        }
      })
    },
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
    isClearUser () {
      if (this.unionIds.length) {
        return true
      }
      if (this.orgIds.length) {
        return true
      }
      return false
    },
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    },
  },
  methods: {
    getPopupContainer () {
      return this.$refs['a-select'].$el
    },
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
    _pushUsers (obj) {
      const users = [...this.users]
      users.push(obj)
      this.users = uniqBy(users, 'id')
    },
    _pushUserList (arr) {
      const users = [...this.users]
      users.push(...arr)
      this.users = uniqBy(users, 'id')
    },
    handleChange (value) {
      const users = value.map(m => {
        return {
          id: this.contactsPyGroup[+m.key].id,
          name: this.contactsPyGroup[+m.key].name,
        }
      })
      Object.assign(this, {
        users,
        userResults: [],
        fetching: false,
      })
    },
    handleSelect (item) {
      this.users.push({
        id: item.id,
        name: item.name,
      })
      this.username = ''
    },
    async querySearch (query) {
      this.fetching = true
      const name = query.toLowerCase().trim()
      const { data } = await loadContactsPyList({ name })
      this.userResults = data.data.filter(m => !this.filterUserList.includes(m.id))
      this.fetching = false
    },
    loadNode () {
      if (this.treeData.length) {
        return
      }
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
  min-width: 200px;
}
.contact-wrapper
  >>> .ant-select-selection__choice__content
  > span:nth-child(2) {
  display: none;
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
.tab-title {
  font-size: 16px;
  color: #3a3a3a;
  background-color: #eee;
  padding: 5px;
  padding-left: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}
</style>
