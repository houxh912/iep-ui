<template>
  <div>
    <keep-alive>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="拜访日志" name="visit">
          <!--拜访日志-->
          <visit :record="record" @async="async"></visit>
        </el-tab-pane>
        <el-tab-pane label="联系记录" name="contact">
          <!-- 联系记录 -->
          <contact :record="record" @async="async"></contact>
        </el-tab-pane>
      </el-tabs>
    </keep-alive>
  </div>
</template>

<script>
import Visit from './Visit'
import Contact from './Contact'
export default {
  name: 'contract',
  components: { Visit, Contact },
  data () {
    return {
      activeName: 'visit',
    }
  },
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  created () {
  },
  methods: {
    async () {
      this.$emit('load-page')
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
  },

}
</script>