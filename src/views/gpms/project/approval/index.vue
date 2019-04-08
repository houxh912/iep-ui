<template>
  <basic-container>
    <page-header title="详情" :backOption="backOption"></page-header>
    <div class="content">
      <div class="left">
        <el-card class="box-card">
          <div class="navigation" 
            :class="selectNavigation===item.value?'selectNavigation':''" 
            v-for="item in selectNavigatList" 
            :key="item.value"
            @click="navigationChosen(item)">{{item.name}}</div>
        </el-card>
      </div>
      <div class="right">
        <detailPage v-if="selectNavigation===0" :form="formData"></detailPage>
        <stagePage v-if="selectNavigation===1" :form="formData"></stagePage>
        <materialPage v-if="selectNavigation===2"></materialPage>
      </div>
    </div>
  </basic-container>
</template>

<script>
import detailPage from './detail/'
import stagePage from './stage/'
import materialPage from './material/'
import { getDataDetail } from '@/api/gpms/index'

export default {
  name: 'detail',
  components: { detailPage, stagePage, materialPage },
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$router.go(-1)
        },
      },
      selectNavigation: 0,
      selectNavigatList: [
        { name: '概况', value: 0 },
        { name: '立项阶段', value: 1 },
        { name: '项目材料', value: 2 },
      ],
      formData: {},
    }
  },
  methods: {
    close () {
      
    },
    // 导航切换
    navigationChosen (item) {
      this.selectNavigation = item.value
    },
  },
  created () {
    // 获取详情的数据，初步处理数据
    getDataDetail(this.$route.params.id).then(({data}) => {
      let list = [
        { name: 'applicantName', list: 'applicantList' },
        { name: 'approverName', list: 'approverList' },
        { name: 'inChargeDeptName', list: 'inChargeDeptList' },
        { name: 'coopDeptName', list: 'coopDeptList' },
        { name: 'publisherName', list: 'publisherList' },
        { name: 'relatedClientName', list: 'relatedClientList' },
        { name: 'groupExternalCooperatePartnerName', list: 'groupExternalCooperatePartnerList' },
      ]
      for (let item of list) {
        if (data.data[item.list]) {
          data.data[item.name] = data.data[item.list].name
        } else {
          data.data[item.name] = '无'
        }
      }
      this.formData = data.data
    })
  },
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  .left {
    width: 200px;
    .navigation {
      margin-bottom: 20px;
      cursor: pointer;
    }
    .selectNavigation {
      color: #cb3737
    }
  }
  .right {
    flex: 1;
  }
}
</style>

