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
import { columnsMap, dictsMap, tabList } from './options'
export default {
  mixins: [mixins],
  data () {
    return {
      subTitle: '投资总人数82人，投资总数2,000,000元',
      columnsMap,
      dictsMap,
      tabList,
      pagination: {},
      pagedTable: [
        {
          id: '1',
          name: '王俊辉',
          sum: '100000',
          paymentMethod: '国脉贝',
          time: '2018-05-06',
        },
        {
          id: '2',
          name: '王俊辉',
          sum: '100000',
          paymentMethod: '国脉贝',
          time: '2018-05-06',
        },
        {
          id: '3',
          name: '王俊辉',
          sum: '100000',
          paymentMethod: '国脉贝',
          time: '2018-05-06',
        },
        {
          id: '4',
          name: '王俊辉',
          sum: '100000',
          paymentMethod: '国脉贝',
          time: '2018-05-06',
        },
        {
          id: '5',
          name: '王俊辉',
          sum: '100000',
          paymentMethod: '国脉贝',
          time: '2018-05-06',
        },
        {
          id: '6',
          name: '王俊辉',
          sum: '100000',
          paymentMethod: '国脉贝',
          time: '2018-05-06',
        },
        {
          id: '7',
          name: '王俊辉',
          sum: '100000',
          paymentMethod: '国脉贝',
          time: '2018-05-06',
        },
        {
          id: '8',
          name: '王俊辉',
          sum: '100000',
          paymentMethod: '国脉贝',
          time: '2018-05-06',
        },
        {
          id: '9',
          name: '王俊辉',
          sum: '100000',
          paymentMethod: '国脉贝',
          time: '2018-05-06',
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
