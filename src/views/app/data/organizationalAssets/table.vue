<template>
  <div class="organizationalAssets">
    <page-header title="组织资产"></page-header>
    <iep-table :isLoadTable="isLoadTable" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" :isPagination="false"></iep-table>
  </div>
</template>

<script>
import { getAssetsList } from '@/api/fams/statistics'
export default {
  data () {
    return {
      isLoadTable: false,
      dictsMap: {},
      pagedTable: [],
      columnsMap: [
        {
          label: '排行',
          prop: 'createTime',
        }, {
          label: '组织名称',
          prop: 'createTime',
        }, {
          label: '组织资产',
          prop: 'createTime',
        }, {
          label: '数据资产',
          prop: 'createTime',
        }, {
          label: '财务资产',
          prop: 'createTime',
        },
      ],
    }
  },
  methods: {
    loadPage () {
      getAssetsList().then(() => {})
    },
  },
  cteared () {
    this.loadPage()
  },
}
</script>
