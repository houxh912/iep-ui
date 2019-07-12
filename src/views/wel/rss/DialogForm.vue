<template>
  <iep-dialog :dialog-show="dialogShow" title="订阅主题" width="700px" @close="close">
    <el-transfer style="text-align: left; display: inline-block" v-model="themeList" filterable :props="props" :titles="['全部主題', '已订阅']" :button-texts="['取消订阅', '订阅']" :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }" :data="POLICY_THEME">
      <span slot-scope="{ option }">{{ option.label }}</span>
    </el-transfer>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm()">提交</iep-button>
      <iep-button @click="dialogShow = false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { postThemeRss } from '@/api/govdata/rss'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      dialogShow: false,
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
  },
  methods: {
    close () {
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm () {
      const dictArr = this.themeList.map(v => {
        return {
          dictValueKey: v,
          isMail: 0,
          type: 0,
        }
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

