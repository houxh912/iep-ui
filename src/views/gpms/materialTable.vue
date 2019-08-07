<template>
  <div>
    <iep-table :isLoadTable="false" border :pagedTable="dataList" :isPagination="false">
      <el-table-column label="材料名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="类型" width="200px">
        <template slot-scope="scope">
          {{ scope.row.type }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120px">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleDetail(scope.row)" size="small" type="warning" plain>查看</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>
<script>
export default {
  name: 'collectionTable',
  props: {
    dataList: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data () {
    return {
      urlList: [
        {
          type: '周报',
          url: '/wel/staff_week_detail/',
        },
        {
          type: '会议纪要',
          url: '/mlms_spa/summary/detail/',
        },
        {
          type: '材料',
          url: '/app/resource/material/material_detail/',
        },
      ],
    }
  },
  methods: {
    handleDetail (row) {
      for (var item of this.urlList) {
        if (item.type == row.type)
          this.$router.push(`${item.url}${row.id}`)
      }
    },
  },
}
</script>
