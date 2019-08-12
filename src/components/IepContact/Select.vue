<template>
  <div>
    <operation-wrapper v-if="disabled">
      <span v-if="![user].length">暂无</span>
      <span>{{user.name}}</span>
    </operation-wrapper>
    <operation-wrapper v-if="!disabled" class="contact-wrapper">
      <a-select ref="a-select" showSearch labelInValue :value="userValue" placeholder="请输入姓名或姓名拼音" :showArrow="false" :filterOption="false" @search="handleSearch" @change="handleChange" :notFoundContent="null" dropdownClassName="iep-contact-dropdown" :getPopupContainer="getPopupContainer">
        <a-select-option v-for="user in userResults" :key="user.id">{{user.name}}</a-select-option>
      </a-select>
      <a-button v-if="isClear && !disabled" icon="close" @click="clearAll"></a-button>
      <a-button v-if="isShowContactBtn" @click="openContact()">通讯录</a-button>
    </operation-wrapper>
    <iep-drawer :drawer-show="dialogShow" title="通讯录" width="300" @close="dialogShow = false" :z-index="3000">
      <el-input placeholder="输入关键字对国脉人进行过滤" v-model="filterText" clearable></el-input>
      <div class="tab-title">国脉人</div>
      <el-tree ref="tree" :filter-node-method="filterNode" :props="props" :data="treeData" @node-click="selectUser" node-key="value">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span @click="() => selectUser(data, node)">{{ node.label }}</span>
        </span>
      </el-tree>
      <relation @set-user="setUser"></relation>
    </iep-drawer>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getUserListTree } from '@/api/admin/contacts'
import { loadContactsPyList } from '@/api/admin/contacts'
import Relation from './Relation'
import debounce from 'lodash/debounce'
export default {
  name: 'IepContactSelect',
  components: { Relation },
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
    this.handleSearch = debounce(this.handleSearch, 800)
    return {
      dialogShow: false,
      fetching: false,
      filterText: '',
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
      return this.user.id !== ''
    },
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
    userValue () {
      return {
        key: this.user.id + '',
        label: this.user.name,
      }
    },
  },
  methods: {
    clearAll () {
      this.user = {
        id: '',
        name: '',
      }
    },
    getPopupContainer () {
      return this.$refs['a-select'].$el
    },
    handleClear () {
      this.user = {
        id: '',
        name: '',
      }
    },
    handleChange (value) {
      const user = {
        id: this.contactsPyGroup[+value.key].id,
        name: this.contactsPyGroup[+value.key].name,
      }
      Object.assign(this, {
        user,
        userResults: [],
        fetching: false,
      })
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
    selectUser (data, node) {
      if (node.level === 3) {
        this.setUser({
          id: data.value,
          name: data.label,
        })
      }
    },
    setUser (data) {
      this.user = {
        id: data.id,
        name: data.name,
      }
      this.filterText = ''
      this.dialogShow = false
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
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
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    },
  },
}
</script>
<style scoped>
.contact-wrapper >>> .ant-select {
  min-width: 173px;
}
</style>

<style lang="scss" scoped>
.contact-wrapper {
  display: flex;
  min-width: 200px;
}
.is-disabled {
  cursor: not-allowed;
  color: #aaa;
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
