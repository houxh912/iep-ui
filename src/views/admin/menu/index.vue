<template>
  <div>
    <basic-container>
      <iep-page-header title="菜单管理"></iep-page-header>
      <operation-container>
        <template slot="left">
          <el-button-group>
            <el-button type="primary" v-if="sys_menu_add" icon="plus" @click="handlerAdd" size="small" plain>添加
            </el-button>
            <el-button v-if="sys_menu_edit" icon="edit" size="small" @click="handlerEdit">编辑
            </el-button>
            <el-button v-if="sys_menu_del" icon="delete" size="small" @click="handleDelete">删除
            </el-button>
          </el-button-group>
        </template>
      </operation-container>

      <el-row class="con">
        <el-col :span="4" class="menu">
          <el-scrollbar style="height:calc(100vh - 240px);">
            <span class="border"></span>
            <el-tree class="filter-tree" node-key="id" highlight-current :data="treeData" :default-expanded-keys="aExpandedKeys" :filter-node-method="filterNode" :props="defaultProps" @node-click="getNodeData" @node-expand="nodeExpand" @node-collapse="nodeCollapse">
            </el-tree>
          </el-scrollbar>
        </el-col>
        <el-col :span="18">
          <el-card style="border:0;" class="box-card" shadow="never">
            <el-form :label-position="labelPosition" label-width="80px" :model="form" ref="form">
              <el-form-item label="父级节点" prop="parentId">
                <el-input v-model="form.parentId" :disabled="true" placeholder="请输入父级节点"></el-input>
              </el-form-item>
              <el-form-item label="节点ID" prop="menuId">
                <el-input v-model="form.menuId" :disabled="formEdit" placeholder="请输入节点ID"></el-input>
              </el-form-item>
              <el-form-item label="标题" prop="name">
                <el-input v-model="form.name" :disabled="formEdit" placeholder="请输入标题"></el-input>
              </el-form-item>
              <el-form-item label="权限标识" prop="permission">
                <el-input v-model="form.permission" :disabled="formEdit" placeholder="请输入权限标识"></el-input>
              </el-form-item>
              <el-form-item label="图标" prop="icon">
                <el-input v-model="form.icon" :disabled="formEdit" placeholder="请输入图标"></el-input>
              </el-form-item>
              <el-form-item label="类型" prop="type">
                <el-select class="filter-item" v-model="form.type" :disabled="formEdit" placeholder="请输入资源请求类型">
                  <el-option v-for="item in typeOptions" :key="item" :label="item | typeFilter" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="权限类型" prop="permissionType">
                <el-select class="filter-item" v-model="form.permissionType" :disabled="formEdit" placeholder="请输入权限类型">
                  <el-option v-for="item in permissionTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="排序" prop="sort">
                <el-input type="number" v-model="form.sort" :disabled="formEdit" placeholder="请输入排序"></el-input>
              </el-form-item>
              <el-form-item label="前端组件" prop="component">
                <el-input v-model="form.component" :disabled="formEdit" placeholder="请输入描述"></el-input>
              </el-form-item>
              <el-form-item label="前端地址" prop="path">
                <el-input v-model="form.path" :disabled="formEdit" placeholder="iframe嵌套地址"></el-input>
              </el-form-item>
              <el-form-item label="路由缓冲" prop="keepAlive">
                <el-switch v-model="form.keepAlive" :disabled="formEdit" active-color="#13ce66" inactive-color="#ff4949" :active-value="'1'" :inactive-value="'0'" active-text="缓存（该页面不需要实时数据更新）" inactive-text="不缓存（该页面需要实时数据更新）">
                </el-switch>
              </el-form-item>
              <el-form-item label="是否禁用" prop="isDisable">
                <el-switch v-model="form.isDisable" :disabled="formEdit" active-color="#ff4949" inactive-color="#13ce66" :active-value="1" :inactive-value="0" active-text="禁用" inactive-text="启用">
                </el-switch>
              </el-form-item>
              <el-form-item v-if="formStatus == 'update'">
                <el-button type="primary" @click="update">更新 </el-button>
                <el-button @click="onCancel">取消</el-button>
              </el-form-item>
              <el-form-item v-if="formStatus == 'create'">
                <el-button type="primary" @click="create">保存 </el-button>
                <el-button @click="onCancel">取消</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>

<script>
import {
  addObj,
  delObj,
  fetchMenuTree,
  getObj,
  putObj,
} from '@/api/admin/menu'
import { mapGetters } from 'vuex'

export default {
  name: 'Menu',
  data () {
    return {
      list: null,
      total: null,
      formEdit: true,
      formAdd: true,
      formStatus: '',
      showElement: false,
      typeOptions: ['0', '1', '2'],
      permissionTypeOptions: [{
        value: 0,
        label: '基础',
      }, {
        value: 1,
        label: '高级',
      }],
      methodOptions: ['GET', 'POST', 'PUT', 'DELETE'],
      listQuery: {
        name: undefined,
      },
      treeData: [],
      oExpandedKey: {
        // key (from tree id) : expandedOrNot boolean
      },
      oTreeNodeChildren: {
        // id1 : [children] (from tree node id1)
        // id2 : [children] (from tree node id2)
      },
      aExpandedKeys: [],
      defaultProps: {
        children: 'children',
        label: 'name',
      },
      labelPosition: 'right',
      form: {
        permission: undefined,
        name: undefined,
        menuId: undefined,
        parentId: undefined,
        icon: undefined,
        sort: undefined,
        component: undefined,
        type: undefined,
        path: undefined,
      },
      currentId: 1,
      sys_menu_add: false,
      sys_menu_edit: false,
      sys_menu_del: false,
    }
  },
  filters: {
    typeFilter (type) {
      const typeMap = {
        0: '菜单',
        1: '按钮',
        2: '隐藏菜单',
      }
      return typeMap[type]
    },
  },
  created () {
    this.getList()
    this.sys_menu_add = this.permissions['sys_menu_add']
    this.sys_menu_edit = this.permissions['sys_menu_edit']
    this.sys_menu_del = this.permissions['sys_menu_del']
  },
  computed: {
    ...mapGetters(['permissions']),
  },
  methods: {
    getList () {
      fetchMenuTree(this.listQuery).then(response => {
        this.treeData = response.data.data
      })
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },

    nodeExpand (data) {
      let aChildren = data.children
      if (aChildren.length > 0) {
        this.oExpandedKey[data.id] = true
        this.oTreeNodeChildren[data.id] = aChildren
      }
      this.setExpandedKeys()
    },
    nodeCollapse (data) {
      this.oExpandedKey[data.id] = false
      // 如果有子节点
      this.treeRecursion(this.oTreeNodeChildren[data.id], oNode => {
        this.oExpandedKey[oNode.id] = false
      })
      this.setExpandedKeys()
    },
    setExpandedKeys () {
      let oTemp = this.oExpandedKey
      this.aExpandedKeys = []
      for (let sKey in oTemp) {
        if (oTemp[sKey]) {
          this.aExpandedKeys.push(parseInt(sKey))
        }
      }
    },
    treeRecursion (aChildren, fnCallback) {
      if (aChildren) {
        for (let i = 0; i < aChildren.length; ++i) {
          let oNode = aChildren[i]
          fnCallback && fnCallback(oNode)
          this.treeRecursion(oNode.children, fnCallback)
        }
      }
    },

    getNodeData (data) {
      if (!this.formEdit) {
        this.formStatus = 'update'
      }
      getObj(data.id).then(response => {
        this.form = response.data.data
      })
      this.currentId = data.id
      this.showElement = true
    },
    handlerEdit () {
      if (this.form.menuId) {
        this.formEdit = false
        this.formStatus = 'update'
      }
    },
    handlerAdd () {
      this.resetForm()
      this.formEdit = false
      this.formStatus = 'create'
    },
    handleDelete () {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        delObj(this.currentId).then(() => {
          this.getList()
          this.resetForm()
          this.onCancel()
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000,
          })
        })
      })
    },
    update () {
      putObj(this.form).then(() => {
        this.getList()
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000,
        })
      })
    },
    create () {
      addObj(this.form).then(() => {
        this.getList()
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000,
        })
      })
    },
    onCancel () {
      this.formEdit = true
      this.formStatus = ''
    },
    resetForm () {
      this.form = {
        permission: undefined,
        name: undefined,
        menuId: undefined,
        parentId: this.currentId,
        icon: undefined,
        sort: undefined,
        component: undefined,
        type: undefined,
        path: undefined,
      }
    },
  },
}
</script>
<style scoped>
.filter-tree {
  margin-top: 20px;
}
.filter-tree >>> .el-tree-node__content {
  height: 40px;
}
.menu {
  position: relative;
}
.con {
  margin-top: 15px;
  border-top: 1px solid #e5e5e5;
}
.border {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: block;
  margin-bottom: -100px;
  width: 1px;
  height: 10000px;
  background-color: #e5e5e5;
  z-index: 100;
}
</style>