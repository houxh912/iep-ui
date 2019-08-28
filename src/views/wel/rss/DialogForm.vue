<template>
  <iep-dialog class="remark" :dialog-show="dialogShow" title="订阅" width="700px" @close="close" @slot-mounted="loadPage">
    <el-tabs v-model="activeName">
      <el-tab-pane label="主题" name="first">
        <el-transfer style="text-align: left; display: inline-block" v-model="themeList" filterable :props="props" :titles="['全部', '已订阅']" :button-texts="['取消', '订阅']" :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }" :data="POLICY_THEME">
          <span slot-scope="{ option }">{{ option.label }}</span>
        </el-transfer>
      </el-tab-pane>
      <el-tab-pane label="行业" name="second">
        <el-transfer style="text-align: left; display: inline-block" v-model="industryList" filterable :props="props" :titles="['全部', '已订阅']" :button-texts="['取消', '订阅']" :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }" :data="POLICY_INDUSTRY">
          <span slot-scope="{ option }">{{ option.label }}</span>
        </el-transfer>
      </el-tab-pane>
      <el-tab-pane label="地域" name="third">
        <div style="display: flex;">
          <el-cascader style="flex: 1;" size="small" :props="cityProps" v-model="cityList" :options="cityOption"></el-cascader>
          <iep-button @click="handleAdd">添加</iep-button>
        </div>
        <el-divider>已选择</el-divider>
        <div style="display: flex;" v-for="(item,i) in selectCityList" :key="i">
          <el-cascader style="flex: 1;" size="small" :props="cityProps" :value="item" :options="cityOption" disabled></el-cascader>
          <iep-button @click="handleDel(i)">删除</iep-button>
        </div>
      </el-tab-pane>
    </el-tabs>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm()">提交</iep-button>
      <iep-button @click="dialogShow = false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { postThemeRss, getThemeList, getIndustryList, getRegionList } from '@/api/govdata/rss'
import { region as cityOption } from '@/views/govdata/policyManage/region.js'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      cityOption,
      cityProps: {
        value: 'code',
        label: 'name',
      },
      cityList: [],

      activeName: 'first',
      dialogShow: false,
      industryList: [],
      themeList: [],
      selectCityList: [],
      props: {
        key: 'value',
      },
    }
  },
  computed: {
    ...mapGetters(['dictGroup']),
    POLICY_THEME () {
      return this.dictGroup['POLICY_THEME']
    },
    POLICY_INDUSTRY () {
      return this.dictGroup['POLICY_INDUSTRY']
    },
  },
  methods: {
    handleDel (i) {
      this.selectCityList.splice(i, 1)
    },
    handleAdd () {
      if (this.cityList.length) {
        this.selectCityList.push(this.cityList)
        this.cityList = []
      }
    },
    loadPage () {
      getThemeList().then(({ data }) => {
        this.themeList = data.data.map(m => m.value)
      })
      getIndustryList().then(({ data }) => {
        this.industryList = data.data.map(m => m.value)
      })
      getRegionList().then(({ data }) => {
        this.selectCityList = data.data.map(m => m.dictValueKey.split(','))
      })
    },
    close () {
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm () {
      const dictArr = []
      this.themeList.map(v => {
        dictArr.push({
          dictValueKey: v,
          isMail: 0,
          type: 1,
        })
      })
      this.industryList.map(v => {
        dictArr.push({
          dictValueKey: v,
          isMail: 0,
          type: 3,
        })
      })
      this.selectCityList.map(v => {
        dictArr.push({
          dictValueKey: v.join(','),
          isMail: 0,
          type: 4,
        })
      })
      postThemeRss(dictArr).then(() => {
        this.$message({
          message: '操作成功',
          type: 'success',
        })
        this.close()
      })
    },
  },
}
</script>
<style scoped>
.remark >>> .el-transfer__button:nth-child(2) {
  width: 100%;
}
.remark >>> .el-transfer-panel {
  width: 243px;
}
.remark >>> .el-transfer-panel__item.el-checkbox {
  display: block;
}
</style>
