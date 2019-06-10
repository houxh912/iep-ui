<template>
  <div>
    <el-row class="aside-main" :gutter="8">
      <el-col class="sub-menu-left" :span="4">
        <el-card shadow="never" :body-style="bodyStyle">
          <div slot="header" class="clearfix">
            <span class="title">通讯录</span>
          </div>
          <el-menu :default-openeds="selectType" class="menu-vertical">
            <el-submenu index="1" collapse>
              <template slot="title">
                <span>国脉人</span>
              </template>
              <!-- <el-menu-item class="menu-item" :index="item.value+''" :key="item.value" v-for="item in imsMsgType" @click.native="handleSelectType(item.value+'')"> -->
              <el-menu-item class="menu-item" :index="item.value+''" :key="item.value" v-for="item in allPeople">
                <span>{{item.label}}</span>
                <!-- <el-badge v-if="typeCountMap[item.value]" class="mark" type="primary" :value="typeCountMap[item.value]" /> -->
              </el-menu-item>
            </el-submenu>
            <el-submenu index="2" collapse>
              <template slot="title">
                <span>我的关系</span>
              </template>
              <el-menu-item class="menu-item" :index="item.id+''" :key="item.id" v-for="item in relationship" @click.native="handleSelectType(item.id)" @dblclick.native="changeGroup(item.name,item.id)">
                <span>{{item.name}}</span>
                <i class="iconfont icon-shanchu1" @click="handleDelete(item.id)"></i>
                <!-- <el-badge v-if="typeCountMap[item.id]" class="mark" type="primary" :id="typeCountMap[item.id]" /> -->
              </el-menu-item>
            </el-submenu>
          </el-menu>
          <el-button style="width:100%;border:0;" @click="openContact"><i class="iconfont icon-xinzeng"></i></el-button>
        </el-card>
      </el-col>
      <el-col :span="20">
        <!-- <page-header title=""></page-header> -->
        <operation-container>
          <template slot="left">
            <iep-button type="primary" @click="handleAddBatch" plain>批量添加</iep-button>
          </template>
          <template slot="right">
            <!-- <el-radio-group v-model="type" size="small" @change="changeType"> -->
            <el-radio-group size="small">
              <el-radio-button v-for="tab in tabList" :label="tab.value" :key="tab.value">{{tab.label}}</el-radio-button>
            </el-radio-group>
            <operation-search @search-page="searchPage" prop="title">
              <!-- <advance-search @search-page="searchPage"></advance-search> -->
            </operation-search>
          </template>
        </operation-container>
        <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
          <template slot="before-columns">
          </template>
          <el-table-column prop="operation" label="操作">
            <template slot-scope="scope">
              <operation-wrapper>
                <iep-button type="warning" v-show="mark==''" plain @click="handleadd(scope.row)">添加</iep-button>
                <iep-button v-show="mark=='group'" plain @click="handleRemove(scope.row)">移除</iep-button>
              </operation-wrapper>
            </template>
          </el-table-column>
        </iep-table>
      </el-col>
    </el-row>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>
<script>
import { getRelationshipManagePage, getTypeCountMap, getRelationshipList, putRelationshipList, joinRelationship, deleteRelationshipList } from '@/api/wel/relationship_manage'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap, initForm } from './options'
import DialogForm from './DialogForm'
// import AdvanceSearch from './AdvanceSearch'
export default {
  mixins: [mixins],
  // components: { AdvanceSearch },
  components: { DialogForm },
  data () {
    return {
      dictsMap,
      columnsMap,
      bodyStyle: {
        padding: 0,
      },
      mark:'',
      typeCountMap: {},
      selectType: ['1','2'],
      allPeople:[
        {value:0,label:'按岗位信息'},
        {value:1,label:'按职务信息'},
        {value:2,label:'按职称信息'},
      ],
      relationship:[
      ],
      tabList:[
        {value:0,label:'含离职'},
        {value:1,label:'仅管理员'},
        {value:2,label:'资产所属为本组织'},
      ],
    }
  },
  computed: {
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleadd () {

    },
    handleAddBatch () {

    },
    handleDelete (id) {
      this._handleGlobalDeleteById(id, deleteRelationshipList)
    },
    handleRemove () {

    },
    openContact () {
      this.$refs['DialogForm'].form = initForm()
      this.$refs['DialogForm'].formRequestFn = joinRelationship
      this.$refs['DialogForm'].dialogShow = true
    },
    changeGroup (name,id) {
      this.$refs['DialogForm'].form.name = name
      this.$refs['DialogForm'].form.id = id
      this.$refs['DialogForm'].methodName = '编辑'
      this.$refs['DialogForm'].formRequestFn = putRelationshipList
      this.$refs['DialogForm'].dialogShow = true
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleSelectType (k) {
      this.groupType = k
      this.mark = 'group'
      this.loadPage()
    },
    loadTypeList () {
      getRelationshipList().then(({ data }) => {
        this.relationship = data.data
      })
    },
    //tab切换菜单
    // changeType () {
    //   this.searchPage()
    //   if (this.type === '2') {
    //     this.showSelect = true
    //   } else { this.showSelect = false }
    // },
    loadPage (param = this.searchForm) {
      this.loadTypeList()
      if(this.mark=='group'){
        this.loadTable({ id: this.groupType, ...param }, getTypeCountMap)
      }
      else {
        this.loadTable(param, getRelationshipManagePage)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.aside-main {
  display: flex;
  margin: 0 !important;
  padding: 20px;
  width: 100%;
  height: 100vh;
  .title {
    font-size: 16px;
  }
  .menu-vertical {
    border: none;
  }
  .menu-item {
    display: flex;
    justify-content: space-between;
    & > .mark {
      margin-top: 5px;
    }
  }
  .page-container {
    margin-left: 20px;
    width: 100%;
  }
}
.sub-menu-left {
  margin: -20px 15px -20px -20px;
  padding-top: 12px;
  border-right: 1px solid #ebeef5;
  .el-card {
    border: 0;
  }
}
</style>
<style scoped>
.sub-menu-left >>> .el-card__header {
  padding: 8px 20px;
  border: 0;
}
.sub-menu-left >>> .el-menu-item {
  height: 40px;
  line-height: 40px;
}
</style>




