<template>
  <el-tree class="contact-tree" ref="tree" :filter-node-method="filterNode" @node-click="toChatUser" :data="$store.getters.imCustomGroups" node-key="id" :expand-on-click-node="false">
    <div v-if="data.leaf && data.value" class="im-friend" slot-scope="{ node, data }">
      <template>
        <iep-img class="im-friend-head" :src="data.avatar ? data.avatar : '/img/icons/apple-touch-icon-60x60.png'"></iep-img>
        <span>{{data.label}}</span>
      </template>
    </div>
    <div class="group-item" v-else-if="!data.leaf">
      <span :ref="`pname${data.value}`" v-show="optionId !== data.value">{{ data.label }}</span>
      <span v-show="optionId === data.value">
        <input :value="data.label" :ref="`name${data.value}`" @blur="modifyName($event, data.value, data.label)" />
      </span>
      <span>
        <i @mousedown.prevent.stop="" @click="toModify(data.value)" class="iconfont icon-iconset0136"></i>
        <i @click="toDelete(data.value)" class="iconfont icon-shanchu"></i>
      </span>
    </div>
  </el-tree>
</template>

<script>
export default {
  name: 'custom-group',
  data () {
    return {
      optionId: '',
    }
  },
  props: {
    filter: {
      type: String,
      default: '',
    },
  },
  methods: {
    toChatUser (data) {
      if (data.leaf) {
        let chat = {
          id: data.value,
          chatNo: `user${data.value}`,
          username: data.py,
          chatName: data.label,
          avatar: data.avatar,
          type: 1,
        }
        this.$store.dispatch('updateCurrentChat', { chat, show: true })
      }
    },
    toModify (id) {
      this.optionId = id
      this.$nextTick(() => {
        this.$refs[`name${id}`].focus()
        this.$refs[`name${id}`].select()
      })
    },
    modifyName (event, id, prename) {
      let name = event.target.value.replace(/(^\s*)|(\s*$)/g, '')
      if (name) {
        if (name !== prename) {
          this.$store.dispatch('updateCustomGroup', { id, name }).then(() => {
            this.optionId = ''
            this.$message.success('修改成功！')
          }, error => {
            this.$message.error(error)
          })
        }
      } else {
        this.optionId = ''
        this.$refs[`name${id}`].value = prename
        this.$message.warning('请输入分组名称！')
      }
    },
    toDelete (id) {
      this.$confirm('是否确认删除该分组？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$store.dispatch('deleteCustomGroup', { id }).then(() => {
          this.$message.success('删除成功！')
        }, error => {
          this.$message.error(error)
        })
      }).catch(() => {
      })
    },
    filterNode (value, data) {
      if (!value) return true
      return (data.label || '').indexOf(value) !== -1
    },
  },
  watch: {
    filter (val) {
      this.$refs.tree.filter(val)
    },
  },
}
</script>

<style scoped>
.contact-tree >>> .el-tree-node__content {
  max-width: 260px;
  height: auto;
}
.contact-tree >>> .is-leaf.el-tree-node__expand-icon.el-icon-caret-right {
  display: none;
}
</style>

<style lang="scss" scoped>
.im-friend {
  display: block;
  box-sizing: border-box;
  height: 52px;
  max-width: 242px;
  width: 100%;
  padding: 5px 15px 5px 60px;
  cursor: pointer;
  position: relative;
  .im-friend-head {
    position: absolute;
    left: 15px;
    top: 8px;
    height: 36px;
    width: 36px;
    border-radius: 18px;
    overflow: hidden;
  }
  span {
    display: inline-block;
    vertical-align: top;
    margin-top: 4px;
    max-width: 185px;
    line-height: 19px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
  }
  p {
    line-height: 18px;
    max-width: 185px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #dfdfdf;
    font-size: 12px;
  }
  .icon-liebiao {
    position: absolute;
    right: 20px;
    height: 40px;
    line-height: 40px;
    top: 6px;
  }
}
.filter-tree {
  margin-top: 10px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.group-item {
  display: flex;
  width: 235px;
  justify-content: space-between;
  input {
    vertical-align: middle;
    height: 20px;
    line-height: 20px;
    width: 120px;
    padding: 0 10px;
  }
  i {
    margin-left: 10px;
    &:hover {
      color: $--color-primary;
    }
  }
}
</style>