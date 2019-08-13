<template>
  <div>
    <basic-container>
      <iep-page-header title="流水详情" :backOption="backOption">
      </iep-page-header>
      <operation-container>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="targetName">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { getBellBalancePageById } from '@/api/fams/balance_rule'
import mixins from '@/mixins/mixins'
import { initForm } from '../options'
export default {
  mixins: [mixins],
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.$emit('onGoBack') },
      },
      columnsMap: [
        {
          prop: 'ruleName',
          label: '规则名称',
        },
        {
          prop: 'targetName',
          label: '操作对象',
        },
        {
          prop: 'userName',
          label: '操作人',
        },
        {
          prop: 'amount',
          label: '国脉贝',
        },
        {
          prop: 'createTime',
          label: '操作时间',
        },
      ],
      form: initForm(),
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage (param = this.searchForm) {
      this.loadTable(param, getBellBalancePageById(this.record.id))
    },
  },
}
</script>

<style lang="scss" scoped>
.recruit-headers {
  padding: 20px;
  margin-bottom: 10px;
  .con {
    display: flex;
    justify-content: space-between;
  }
  .state {
    font-size: 14px;
    i {
      display: inline-block;
      margin-right: 5px;
      vertical-align: middle;
      color: #999;
    }
    span {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .left {
    margin: 10px 0;
    .name {
      margin-bottom: 20px;
      font-size: 24px;
      font-weight: 400;
      line-height: 32px;
    }
    .address {
      font-size: 14px;
      color: #999;
      span {
        margin-right: 10px;
      }
    }
  }
  .right {
    display: flex;
    flex-flow: column;
    margin: 10px 0;
    align-items: flex-end;
    .pay {
      margin-bottom: 20px;
      font-size: 24px;
      line-height: 32px;
      color: $--menu-color-primary;
    }
    .info-detail {
      font-size: 14px;
      color: #999;
      label {
        padding: 0 20px;
        border-right: 1px solid #eee;
        &:last-child {
          padding-right: 0;
          border: 0;
        }
      }
    }
  }
}
.middle-card {
  margin-top: 20px;
}
.info {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  .info-item {
    & > label {
      width: 120px;
      text-align: right;
      vertical-align: middle;
      float: left;
      font-size: 14px;
      color: #606266;
      line-height: 40px;
      padding: 0 12px 0 0;
      box-sizing: border-box;
    }
    .content {
      margin-left: 120px;
      line-height: 40px;
      position: relative;
      font-size: 14px;
    }
  }
}
</style>