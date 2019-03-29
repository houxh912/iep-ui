<template>
  <div class="edit-wrapper">
    <basic-container>
      <div class="title">
        <div class="department">{{formData.clientName}}</div>
        <el-button class="back" @click="handleGoBack" size="mini">返回</el-button>
      </div>
      <!-- <div class="head-button">
        <iep-button class="tabs" type="danger" size="small">暂无需求</iep-button>
        <iep-button class="tabs" type="danger" size="small" @click="transfer">转移给他人</iep-button>
        <iep-button class="tabs" type="danger" size="small" @click="handleUpdate">编辑</iep-button>
        <iep-button class="tabs" type="danger" size="small" @click="handleDelete">删除</iep-button>
      </div> -->
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='CustomerPanorama'" v-slot:CustomerPanorama>
          <customer-panorama :formData="formData" v-loading="activeTab !=='CustomerPanorama'"></customer-panorama>
        </template>
        <template v-if="activeTab ==='Contacts'" v-slot:Contacts>
          <contacts v-loading="activeTab !=='Contacts'" :record="record"></contacts>
        </template>
        <template v-if="activeTab ==='VisitingRecord'" v-slot:VisitingRecord>
          <visiting-record v-loading="activeTab !=='VisitingRecord'" :record="record"></visiting-record>
        </template>
        <template v-if="activeTab ==='Scheme'" v-slot:Scheme>
          <scheme v-loading="activeTab !=='Scheme'" :record="record"></scheme>
        </template>
        <template v-if="activeTab ==='Agreement'" v-slot:Agreement>
          <agreement v-loading="activeTab !=='Agreement'"></agreement>
        </template>
        <template v-if="activeTab ==='Information'" v-slot:Information>
          <information v-loading="activeTab !=='Information'"></information>
        </template>
      </iep-tabs>
    </basic-container>
  </div>
</template>

<script>
import CustomerPanorama from './CustomerPanorama/'
import Contacts from './Contacts/'
import VisitingRecord from './VisitingRecord/'
import Scheme from './Scheme/'
import Agreement from './Agreement/'
import Information from './Information/'
import mixins from '@/mixins/mixins'
import { getCustomerById } from '@/api/crms/customer'
export default {
  name: 'detail',
  mixins: [mixins],
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  components: { CustomerPanorama, Contacts, VisitingRecord, Scheme, Agreement, Information },
  data () {
    return {
      formData: {},
      tabList: [{
        label: '客户全景',
        value: 'CustomerPanorama',
      }, {
        label: '联系人(10)',
        value: 'Contacts',
      }, {
        label: '拜访记录(9)',
        value: 'VisitingRecord',
      }, {
        label: '方案(8)',
        value: 'Scheme',
      }, {
        label: '合同(7)',
        value: 'Agreement',
      }, {
        label: '资讯(6)',
        value: 'Information',
      }],
      activeTab: 'CustomerPanorama',
      formRequestFn: () => { },
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      getCustomerById(this.record.id).then(({ data }) => {
        this.formData = data.data
      })
    },
    handleGoBack () {
      this.$emit('onGoBack')
    },
  },
}
</script>
<style lang="scss" scoped>
.edit-wrapper {
  margin: 5px 5px 50px 5px;
  .title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    display: flex;
    align-items: center;
    .department {
      font-weight: 600;
      font-size: 18px;
    }
    .back {
      height: 30px;
      float: right;
      margin-left: auto;
    }
  }
}
</style>