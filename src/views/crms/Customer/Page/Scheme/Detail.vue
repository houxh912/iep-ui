<template>
  <iep-drawer :drawer-show="drawerShow" type="drawer" :title="'方案详情'" width="40%" @close="close">
    <el-form :model="detailForm" class="form-detail" label-width="100px" size="small">
      <el-form-item label="材料名称：">
        <span>{{detailForm.materialName}}</span>
      </el-form-item>
      <el-form-item label="上传者：">
        <span>{{detailForm.uploader}}</span>
      </el-form-item>
      <el-form-item label="下载次数：">
        <span>{{detailForm.downloadCost}}</span>
      </el-form-item>
      <el-form-item label="创建时间：">
        <span>{{detailForm.createTime}}</span>
      </el-form-item>
      <el-form-item label="附件名称：">
        <span>{{detailForm.createTime}}</span>
      </el-form-item>
      <el-form-item label="材料标签：">
        <a-tag class="tags" v-for="(item,index) in detailForm.tagKeyWords" :key="index">{{item}}</a-tag>
      </el-form-item>
    </el-form>
  </iep-drawer>
</template>

<script>
export default {
  data () {
    return {
      drawerShow: false,
      detailForm: {},
    }
  },
  methods: {
    close () {
      this.drawerShow = false
    },
  },
}
</script>

<style>
</style>
