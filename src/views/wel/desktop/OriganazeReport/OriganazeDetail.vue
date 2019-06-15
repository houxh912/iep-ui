<template>
  <div>
    <basic-container>
      <page-header :title="title">
        <span class="to-reward" @click="handleReturn">返回</span>
      </page-header>
      <operation-container style="border-bottom: 1px solid #eee;padding-bottom:15px;">
        <template slot="left">
           <span style="margin-right:15px;">组织：{{origanize}}</span>
          <span>发布人：{{publisher}}</span>
        </template>
        <template slot="right">
          <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
        </template>
      </operation-container>
      <div class="container">
        <div class="con-item" v-for="(item,index) in pageList" :key="index">
          <div class="title">{{item.topic}}</div>
          <div class="content">{{item.content}}</div>
        </div>
      </div>
    </basic-container>
  </div>
</template>
<script>
import {getOgrReport} from '@/api/mlms/leader_report/' 
export default {
  data () {
    return {
      value1: '',
      title:'',
      origanize: '',
      publisher: '',
      pageList:[
        {topic:'领导指示',content:''},
        {topic:'本月工作总结',content:''},
        {topic:'下月工作计划',content:''},
        {topic:'总结与感想',content:''},
        {topic:'市场拓展',content:''},
        {topic:'相关产品',content:''},
        {topic:'相关项目',content:''},
      ],
      id: '',
    }
  },
  created () {
    this.id = this.$route.params.id
    getOgrReport (this.id).then(({data})=>{
      this.title  = data.data.title
      this.value1 = data.data.updateTime
      this.origanize = data.data.orgName
      this.publisher= data.data.realName
    })
  },
  methods: {
    handleReturn () {
        this.$router.push('/wel/origanaze_report')
    },
  },
}
</script>
<style scoped lang='scss'>
.to-reward{
    padding: 3px 8px;
    color:#ccc;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
    &:hover{
       border-color: #aaa; 
       color:#aaa;
    }
}
.container{
    padding: 0 10px;
    .con-item{
        margin-bottom: 15px;
        .title{
            font-size: 15px;
            color:#333;
        }
        .content{
            padding: 15px;
            font-size: 14px;
            color:#999;
        }
    }
}
</style>
