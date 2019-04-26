<template>
  <el-table :data="data" style="width: 100%" border size="small">
    <el-table-column :label="item.label" :width="item.width" v-for="(item, idx) in columns" :key="idx">
      <template slot-scope="scope">
        <iep-dict-detail v-if="item.type === 'dict'" size="mini" :value="scope.row[item.prop]" :dict-name="item.dictName"></iep-dict-detail>
        <!-- <iep-date-range-detail v-else-if="item.type === 'daterange'" :value="scope.row[item.prop]"></iep-date-range-detail> 
            TODO: daterange
            -->
        <iep-div-detail v-else-if="item.type === 'date'" :value="scope.row[item.prop] | parseTime('{y}-{m}-{d}')"></iep-div-detail>
        <iep-div-detail v-else :value="scope.row[item.prop]"></iep-div-detail>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: 'InlineFormTableDetail',
  props: {
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
  data () {
    return {
    }
  },
}
</script>
