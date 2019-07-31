<template>
  <iep-dialog :dialog-show="dialogShow" title="订阅主题/行业" width="700px" @close="close" @slot-mounted="loadPage">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="主题管理" name="first">
        <el-transfer style="text-align: left; display: inline-block" v-model="themeList" filterable :props="props" :titles="['全部', '已订阅']" :button-texts="['取消订阅', '订阅']" :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }" :data="POLICY_THEME">
          <span slot-scope="{ option }">{{ option.label }}</span>
        </el-transfer>
      </el-tab-pane>
      <el-tab-pane label="行业管理" name="second">
        <el-transfer style="text-align: left; display: inline-block" v-model="industryList" filterable :props="props" :titles="['全部', '已订阅']" :button-texts="['取消订阅', '订阅']" :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }" :data="POLICY_INDUSTRY">
          <span slot-scope="{ option }">{{ option.label }}</span>
        </el-transfer>
      </el-tab-pane>
    </el-tabs>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm()">提交</iep-button>
      <iep-button @click="dialogShow = false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { postThemeRss, getThemeList, getIndustryList } from '@/api/govdata/rss'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      activeName: 'first',
      dialogShow: false,
      industryList: [],
      themeList: [],
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
    loadPage () {
      getThemeList().then(({ data }) => {
        this.themeList = data.data.map(m => m.value)
      })
      getIndustryList().then(({ data }) => {
        this.industryList = data.data.map(m => m.value)
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

