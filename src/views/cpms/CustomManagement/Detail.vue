<template>
  <div>
    <basic-container>
      <iep-page-header title="定制管理" :backOption="backOption"></iep-page-header>
      <operation-container>
      </operation-container>
      <div class="container">
        <div class="con-item">
          <div class="title">
            <div class="title1">定制信息</div>
            <div class="con-item">
              <span class="title2">提交人：</span>
              <iep-div-detail class="content" :value="form.creatorName"></iep-div-detail>
            </div>
            <div class="con-item">
              <span class="title2">提交时间：</span>
              <iep-div-detail class="content" :value="form.createTime"></iep-div-detail>
            </div>
            <div class="con-item">
              <span class="title2">定制产品名称：</span>
              <iep-div-detail class="content" :value="form.customName"></iep-div-detail>
            </div>
            <div class="con-item">
              <span class="title2">产品说明：</span>
              <iep-div-detail class="content" :value="form.synopsis"></iep-div-detail>
            </div>
          </div>
        </div>
      </div>
      <div>
        <iep-table :isLoadTable="isLoadTable" :isPagination="false" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
        </iep-table>
        <div class="counts">
          <span>
            <span class="size">{{size}}</span>个模块
          </span>
          <span>
            共计:
            <span class="count">{{count}}</span>
          </span>
        </div>
      </div>
    </basic-container>
  </div>
</template>
<script>
function initForm () {
  return {
    creatorName: '',
    createTime: '',
    customName: '',
    synopsis: '',
  }
}
const columnsMap = [
  {
    prop: 'moduleName',
    label: '模块名称',
  },
  {
    prop: 'guidePrice',
    label: '指导价格',
  },
  {
    prop: 'preferentialPrice',
    label: '优惠价格',
  },
]
import mixins from '@/mixins/mixins'
// import CustomForm from '../Components/CustomForm'
import { getListById } from '@/api/app/cpms/custom_product'

export default {
  mixins: [mixins],
  // components: {
  //   CustomForm,
  // },
  data () {
    return {
      backOption: {
        isBack: true,
      },
      form: initForm(),
      columnsMap,
      size: '',
      count: '',
      pagedTable: [],
      isLoadTable: false,
    }
  },
  computed: {
    id () {
      return +this.$route.params.id
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    async loadPage () {
      await getListById(this.id).then((data) => {
        // const { creatorName, createTime, customName,synopsis } = data.data.data
        this.form = this.$mergeByFirst(initForm(), data.data.data)
        const customModules = data.data.data.customModules
        this.pagedTable = customModules
        this.size = this.pagedTable.length ? this.pagedTable.length : 0
        let arr = []
        this.pagedTable.forEach(item => {
          arr.push(item.preferentialPrice)
          let result = arr.reduce((total, currentValue) => {
            return total + currentValue
          })
          this.count = result
        })
      })
    },
  },
}
</script>

<style scoped lang='scss'>
.container {
  padding: 0 10px;
  margin-bottom: 30px;
  border-bottom: 1px solid #eee;
  .con-item {
    margin-bottom: 15px;
    .title {
      font-size: 16px;
      color: #333;
    }
    .title1 {
      margin-bottom: 15px;
    }
    .title2 {
      display: inline-block;
      margin-right: 8px;
      width: 100px;
      text-align: right;
      font-size: 14px;
      color: #999;
    }
    .content {
      display: inline-block;
      word-break: break-all;
      word-wrap: break-word;
      white-space: pre-wrap;
      font-size: 14px;
      color: #999;
      vertical-align: -4px;
    }
  }
}
.counts {
  padding: 15px;
  text-align: right;
  & > span {
    margin-right: 15px;
    font-size: 14px;
    .size,
    .count {
      font-size: 16px;
    }
    .count {
      color: $--color-primary;
    }
  }
}
</style>
