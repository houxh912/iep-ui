<template>
  <div>
    <basic-container>
      <operation-container>
        <template slot="left">
          <span>{{subTitle}}</span>
        </template>
      </operation-container>
      <iep-table :isLoadTable="false" :pagination="pagination" :columnsMap="columnsMap" :dictsMap="dictsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-tree>
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { columnsMap } from './options'
export default {
  mixins: [mixins],
  data () {
    return {
      subTitle: '投资人共82人，已释放股份2,000,000元',
      columnsMap,
      pagination: {},
      pagedTable: [
        {
          id: '1',
          name: '何益挺',
          limit: '5%',
          time: '2018-02-28',
        },
        {
          id: '2',
          name: '何益挺',
          limit: '5%',
          time: '2018-02-28',
        },
        {
          id: '3',
          name: '何益挺',
          limit: '5%',
          time: '2018-02-28',
        },
        {
          id: '4',
          name: '何益挺',
          limit: '5%',
          time: '2018-02-28',
        },
        {
          id: '5',
          name: '何益挺',
          limit: '5%',
          time: '2018-02-28',
        },
        {
          id: '6',
          name: '何益挺',
          limit: '5%',
          time: '2018-02-28',
        },
        {
          id: '7',
          name: '何益挺',
          limit: '5%',
          time: '2018-02-28',
        },
        {
          id: '8',
          name: '何益挺',
          limit: '5%',
          time: '2018-02-28',
        },
        {
          id: '9',
          name: '何益挺',
          limit: '5%',
          time: '2018-02-28',
        },
      ],
    }
  },
  created () {
  },
}
</script>
<style scoped>
</style>
