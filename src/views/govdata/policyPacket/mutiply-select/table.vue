<template>
  <div class="box">
    <avue-crud ref="crud" :page="page" :data="tableData" :table-loading="tableLoading" :option="tableOption" @current-change="currentChange" @refresh-change="refreshChange" @size-change="sizeChange" @search-change="searchChange" @selection-change="selectionChange" @current-row-change="handleCurrentRowChange">
      <template slot="search">

        <el-form-item label="发布时间" class="timeInput">
          <el-date-picker v-model="listQuery.startTime" type="date" value-format="yyyy-MM-dd" placeholder="开始日期" class="block" clearable></el-date-picker> —
          <el-date-picker v-model="listQuery.endTime" type="date" value-format="yyyy-MM-dd" placeholder="结束日期" class="block" clearable></el-date-picker>
        </el-form-item>

        <!-- 标签有问题 -->
        <!-- <el-form-item label="标签筛选" style="100%" class="tag">
          <iep-tag v-model="listQuery.tagKeyWords"></iep-tag>
        </el-form-item> -->

        <el-form-item label="政策类型" class="selectinput">
          <el-select v-model="policytype" placeholder="请选择">
            <el-option v-for="item in policyType" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="formWidth selectinput" :label="key" v-for="(value, key) in selectFiledMap" :key="key">
          <el-select v-model="listQuery[value.searchText]" :placeholder="`请选择${key}`" clearable>
            <el-option v-for="item in dictGroup[value.dictText]" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="地域" class="selectinput">
          <el-cascader :options="options" :props="regionProps" v-model="listQuery.regionList" ref="region" clearable change-on-select @visible-change="handleVisibleChange($event)"></el-cascader>
        </el-form-item>
      </template>

      <!-- <template slot="searchMenu">
        <el-button size="small">自定义按钮</el-button>
      </template> -->
      <template slot="menuLeft">
        <el-button type="primary" size="small" @click="handleSaveAndExit();">保存</el-button>
        <span>表格总共已选择：</span>
        <el-tag> {{ selectedObjs.length }} 个 </el-tag>
      </template>
    </avue-crud>
  </div>
</template>
<script>
import _ from 'lodash'
import { findByTypeList } from '@/api/govdata/common'
import { region } from '../../policyManage/region'
const selectFiledMap = {
  主题: {
    formText: 'theme',
    searchText: 'theme',
    dictText: 'POLICY_THEME',
    multiple: true,
  },
  适用行业: {
    formText: 'industry',
    searchText: 'industry',
    dictText: 'POLICY_INDUSTRY',
    multiple: true,
  },
}
const typeList = []
for (const key in selectFiledMap) {
  if (selectFiledMap.hasOwnProperty(key)) {
    const element = selectFiledMap[key]
    typeList.push(element.dictText)
  }
}
function initDictGroup () {
  const dictGroup = {}
  for (const key in selectFiledMap) {
    if (selectFiledMap.hasOwnProperty(key)) {
      const element = selectFiledMap[key]
      dictGroup[element.dictText] = []
    }
  }
  return dictGroup
}
export default {
  props: [
    'selectIds',
    'selectedList',
    'columnMap',
    'getRequestName',
    'pageLimit',
    'isSimple',
  ],
  data () {
    // const pageLimit = this.pageLimit ? this.pageLimit : 6
    const pageLimit = 10 // 统一控制显示10条数据了，不然分页有问题
    return {
      tableData: [],
      page: {
        pageSizes: [10, 20, 30],
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: pageLimit, // 每页显示多少条
      },
      listQuery: {
        current: 1,
        size: pageLimit,
        // type: 'general',
        // page: 1,
        // limit: pageLimit,
        tagKeyWords: [],
      },
      tableLoading: false,
      tableOption: {
        menu: false,
        addBtn: false,
        selection: !this.isSimple,
        highlightCurrentRow: this.isSimple,
        border: true,
        index: true,
        stripe: true,
        align: 'center',
        column: this.columnMap,
      },
      selectedObjs: this.selectedList,
      selectedIds: this.selectIds,
      keyObject: {},
      tempSelectedObjs: [],
      selectFiledMap,
      dictGroup: initDictGroup(),
      policyType: [
        {
          value: 'general',
          label: '通用政策',
        }, {
          value: 'declare',
          label: '申报政策',

        }, {
          value: 'explain',
          label: '政策解读',
        }, {
          value: 'information',
          label: '政策资讯',
        },
      ],
      options: region,
      regionProps: {
        value: 'code',
        label: 'name',
      },
      policytype: 'general',
    }
  },
  computed: {
    currentSelected () {
      const cSIDS = []
      this.tableData.map(m => {
        if (this.selectedIds.includes(m[this.columnMap[0].prop])) {
          cSIDS.push(m)
        }
      })
      return cSIDS
    },
  },
  created () {
    this.getList()
    this.loadDict()
  },
  mounted: function () { },
  methods: {
    /**
     * 获取获取层级、适用对象、主题、规模、行业数据
     */
    loadDict () {
      findByTypeList(typeList).then(res => {
        const { data } = res
        const dictGroup = initDictGroup()
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const element = data[key]
            dictGroup[key] = element.map(m => {
              return { label: m.label, value: m.value }
            })
          }
        }
        this.$set(this, 'dictGroup', dictGroup)
      })
    },

    /**
     * 点击地区字典按钮
     */
    handleVisibleChange (callback) {
      const { regionList } = this.listQuery
      // 当关闭级联选择框时触发
      if (!callback) {
        this.listQuery.region = regionList ? regionList.join(',') : []
        this.getList()
      }
    },

    /**
     * 获取列表数据
     */
    getList () {
      this.tableLoading = true
      this.listQuery.current = 1
      this.listQuery.size = 10
      this.listQuery.type = this.policytype
      this.getRequestName(this.listQuery).then(response => {
        this.tableData = response.data.records
        this.page.total = response.data.total
        this.tableLoading = false
        const selectedIds = this.selectedIds
        // 当前页的数据 value 映射
        this.keyObject = _.keyBy(this.tableData, this.columnMap[0].prop)
        // 当前页的临时总数据
        this.tempSelectedObjs = [...this.selectedObjs]
        // 移除当前页的数据 为了与当前页选择的合并.
        for (const key in this.keyObject) {
          const isIncludes = selectedIds.includes(parseInt(key))
          if (this.keyObject.hasOwnProperty(key) && isIncludes) {
            // this.tempSelectedObjs.splice(index, 1)
            _.remove(this.tempSelectedObjs, item => {
              return item.value === parseInt(key)
            })
          }
        }
        window.tempSelectedObjs = this.tempSelectedObjs
        this.$nextTick(() => {
          this._handleSelectStatus()
        })
      }, error => {
        this.$message.error(error.msg)
      })
    },
    /**
     * 刷新回调
     */
    refreshChange () {
      this.getList()
    },
    searchChange (form) {
      this.listQuery = form
      this.getList()
    },
    handleCurrentRowChange (val) {
      const theVal = {
        value: val[this.columnMap[0].prop],
        label: val[this.columnMap[1].prop],
        // type: val[this.columnMap[2].prop],
      }
      this.selectedObjs = _([theVal])
        .uniqBy('value')
        .value()
    },
    selectionChange (list) {
      console.log('list', list)
      list = list.filter(element => {
        return element !== undefined
      })
      const theVal = list.map(item => {
        return {
          value: item[this.columnMap[0].prop],
          label: item[this.columnMap[1].prop],
          // type: item[this.columnMap[2].prop],
        }
      })
      this.selectedObjs = _([...this.tempSelectedObjs, ...theVal])
        .uniqBy('value')
        .value()
      console.log(' this.selectedObjs', this.selectedObjs)
    },
    handleSaveAndExit () {
      this.$emit('giveSelectedObjs', this.selectedObjs)
    },
    _handleSelectStatus () {
      const selectList = this.selectedIds.map(id => {
        return this.keyObject[id]
      })
      this.$refs.crud.toggleSelection(selectList)
    },
    currentChange (val) {
      this.page.currentPage = val
      this.listQuery.page = val
      this.getList()
    },
    sizeChange (val) {
      this.page.pageSize = val
      this.listQuery.limit = val
      this.getList()
    },
  },
}
</script>
<style lang="scss" scoped>
</style>
<style scoped>
.box >>> .el-form-item {
  margin-top: -15px;
}
.tag >>> .ant-select-selection--multiple {
  width: 314px;
  min-height: 33px;
}
.timeInput >>> .el-input__inner {
  height: 33px;
}
.selectinput >>> .el-input__inner {
  height: 33px;
  line-height: 33px;
}
</style>
