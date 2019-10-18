
<template>
  <div>
    <el-form ref="form" :model="form" label-width="120px" width="300px">
      <el-form-item label="记录时间：">
        <iep-date-picker v-model="form.time" type="date" placeholder="请选择记录时间" size="small">
        </iep-date-picker>
      </el-form-item>
    </el-form>
    <ul class="recording">
      <li v-for="(item,index) in recordingList" :key="index">
        <span class="time">{{item.time}}</span>
        <span>{{item.name}}</span>
        <span>{{item.desc}}</span>
      </li>
    </ul>
    <div style="text-align: center;margin: 20px 0;">
      <el-pagination background layout="prev, pager, next, total" :total="params.total" :page-size="params.size" @current-change="currentChange"></el-pagination>
    </div>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
// import { getMyBookPage } from '@/api/fams/investment'
export default {
  mixins: [mixins],
  data () {
    return {
      form: { time: '' },
      recordingList: [
        { time: '2019-05-12', name: '试试是', desc: 'ssssssssssssssssssssssssa爱上收拾收拾收拾收拾收拾收拾收拾收拾收拾收拾' },
        { time: '2019-05-12', name: '试试是', desc: 'ssssssssssssssssssssssssa爱上收拾收拾收拾收拾收拾收拾收拾收拾收拾收拾' },
        { time: '2019-05-12', name: '试试是', desc: 'ssssssssssssssssssssssssa爱上收拾收拾收拾收拾收拾收拾收拾收拾收拾收拾' },
        { time: '2019-05-12', name: '试试是', desc: 'ssssssssssssssssssssssssa爱上收拾收拾收拾收拾收拾收拾收拾收拾收拾收拾' },
      ],
      params: {
        current: 1,
        size: 10,
        total: 0,
      },
    }
  },
  computed: {
  },
  created () {
    // this.loadPage()
  },
  methods: {
    // loadPage (param = this.searchForm) {
    //   this.loadTable({ ...param }, getMyBookPage)
    // },
  },
}
</script>
<style lang="scss" scoped>
.recording {
  > li {
    margin: 10px 0;
    list-style: none;
    > span {
      color: #444;
      margin-right: 30px;
    }
    .time {
      color: #999;
    }
  }
}
</style>

