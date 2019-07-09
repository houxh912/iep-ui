<template>
  <div>
    <basic-container>
      <iep-page-header title="系统设置" :data="[10, 5]"></iep-page-header>
      <el-tabs v-model="tabName" type="border-card">
        <el-tab-pane label="试题设置" name="testSetting">
          <test-show></test-show>
        </el-tab-pane>
        <!-- <el-tab-pane label="试卷设置" name="paperSetting">
                功能开发中……
            </el-tab-pane>
            <el-tab-pane label="考试设置" name="examSetting">
                功能开发中……
            </el-tab-pane>
            <el-tab-pane label="阅卷权限设置" name="readSetting">
                功能开发中……
            </el-tab-pane>
            <el-tab-pane label="审核权限设置" name="auditSetting">
                功能开发中……
            </el-tab-pane> -->
      </el-tabs>
    </basic-container>
  </div>
</template>

<script>
import TestShow from './testShow.vue'
export default {
  components: {
    TestShow,
  },
  data () {
    return {
      tabName: 'testSetting',
    }
  },
  methods: {
  },
}
</script>
<style lang="scss" scoped>
</style>