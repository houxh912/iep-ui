<template>
  <div class="multiple-box">
    <operation-wrapper v-if="disabled">
      <span v-if="!users.length">暂无</span>
      <span>{{users.map(m => m.name).join('、')}}</span>
    </operation-wrapper>
    <operation-wrapper v-if="!disabled" class="contact-wrapper">
      <a-select ref="a-select" mode="multiple" labelInValue :value="usersValue" :placeholder="placeholder" :filterOption="false" :notFoundContent="fetching ? undefined : null" dropdownClassName="iep-contact-dropdown" :getPopupContainer="getPopupContainer" @search="handleSearch" @change="handleChange">
        <a-spin v-if="fetching" slot="notFoundContent" size="small" />
        <a-select-option v-for="item in userResults" :key="item.id+''">{{item.name}}</a-select-option>
      </a-select>
      <a-button v-if="isClear && !disabled" icon="close" @click="clearAll"></a-button>
      <a-button v-if="isShowContactBtn" @click="openContact()">通讯录</a-button>
    </operation-wrapper>
    <iep-drawer :drawer-show="dialogShow" title="通讯录" width="300" @close="close" :z-index="3000">
      <el-input placeholder="输入关键字对国脉人进行过滤" v-model="filterText" clearable></el-input>
      <div class="tab-title">国脉人</div>
      <el-tree ref="tree" :filter-node-method="filterNode" :props="props" :data="treeData" node-key="value">
        <span v-if="node.value!==1" class="custom-tree-node" slot-scope="{ node, data }">
          <span :class="{level1:node.level===1,level2:node.level===2,level3:node.level===3}">{{ node.label }}</span>
          <span v-if="node.level===3">
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
  name: 'IepContactMultipleUser',
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
      type: Array,
      required: true,
    },
  },
  data () {
    this.handleSearch = debounce(this.handleSearch, 800)
    return {
      filterText: '',
      dialogShow: false,
      fetching: false,
      props: {
        isLeaf: 'leaf',
      },
      treeData: [],
      userResults: [],
    }
  },
  computed: {
    ...mapGetters([
      'contactsPyGroup',
    ]),
    isClear () {
      return this.userIds.length !== 0 ? true : false
    },
    users: {
      get: function () { return this.value },
      set: function (value) {
        this.$emit('input', value)
      },
    },
    userIds: function () { return this.value.map(m => m.id) },
    usersValue () {
      return this.users.map(m => {
        return {
          key: m.id + '',
          label: m.name,
        }
      })
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
    async handleSearch (query) {
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
.contact-wrapper >>> .ant-select {
  min-width: 173px;
}
</style>
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