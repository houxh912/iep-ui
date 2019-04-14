<template>
  <div>
    <basic-container>
      <iep-page-header is-advance :backOption="backOption">
        <template slot="custom">
          <el-row>
            <el-col :span="4" class="img">
              <iep-img :src="form.imageUrl" alt=""></iep-img>
            </el-col>
            <el-col :span="14" class="title">
              <div>
                <div class="tags"><span class="weight">{{form.name}}</span><span class="time">上线时间：{{form.onlineTime}}</span></div>
                <div class="tags">
                  <iep-detail-tag :value="form.tagKeywords"></iep-detail-tag>
                </div>
              </div>
            </el-col>
          </el-row>
        </template>
      </iep-page-header>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='BaseInfo'" v-slot:BaseInfo>
          <base-info v-loading="activeTab !=='BaseInfo'" :form="form"></base-info>
        </template>
        <template v-if="activeTab ==='TeamInfo'" v-slot:TeamInfo>
          <team-info v-loading="activeTab !=='TeamInfo'"></team-info>
        </template>
        <template v-if="activeTab ==='AllVersion'" v-slot:AllVersion>
          <all-version v-loading="activeTab !=='AllVersion'"></all-version>
        </template>
        <template v-if="activeTab ==='Modules'" v-slot:Modules>
          <modules v-loading="activeTab !=='Modules'"></modules>
        </template>
        <template v-if="activeTab ==='Materials'" v-slot:Materials>
          <materials v-loading="activeTab !=='Materials'"></materials>
        </template>
      </iep-tabs>
    </basic-container>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import BaseInfo from './BaseInfo/'
import TeamInfo from './TeamInfo/'
import AllVersion from './AllVersion/'
import Modules from './Modules/'
import Materials from './Materials/'
import { initForm } from '../options'
import { getModuleById } from '@/api/cpms/module'
export default {
  name: 'detail',
  components: { BaseInfo, TeamInfo, AllVersion, Modules, Materials },
  mixins: [mixins],
  data () {
    return {
      backOption: {
        isBack: true,
      },
      form: initForm(),
      tabList: [{
        label: '基本信息',
        value: 'BaseInfo',
      }, {
        label: '团队信息',
        value: 'TeamInfo',
      }, {
        label: '全新版本',
        value: 'AllVersion',
      }, {
        label: '包含模块',
        value: 'Modules',
      }, {
        label: '相关材料',
        value: 'Materials',
      }],
      activeTab: 'BaseInfo',
    }
  },
  computed: {
    id () {
      return this.$route.query.id
    },
  },
  created () {
    getModuleById(this.id).then(({ data }) => {
      this.form = this.$mergeByFirst(initForm(), data.data)
    })
  },
  methods: {
    handleBack () {
      this.$emit('onGoBack')
    },
  },
}
</script>

<style lang="scss" scoped>
.img {
  width: 80px;
  padding: 5px;
  border: 1px solid #eee;
  margin: 5px;
  img {
    width: 100%;
  }
}
.title {
  margin-left: 10px;
  display: flex;
  height: 80px;
  align-items: center;
  .weight {
    font-size: 22px;
    font-weight: 600;
    margin-right: 10px;
  }
  .tags {
    margin: 10px 0;
  }
}
</style>
