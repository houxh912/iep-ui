<template>
  <el-row>
    <el-col :span="24">
      <el-row>
        <el-col :span="6">
          <div class="containerLeft" v-loading="loading">
            指标体系
            <el-tree style="margin:5px 0" :data="treeData" :props="defaultProps" @node-click="handleNodeClick" default-expand-all></el-tree>
          </div>
        </el-col>
        <el-col :span="18">
          <work-order ref="workOrder" :formData="formData" :members="members" :ids="ids" @createSucess="createSucess" :editable="editable"></work-order>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
import mixin from '@/wenjuan/mixins/mixin'
import workOrder from './workOrder'
// import {getWorkById} from '@/api/evaluate/management'
export default {
  components: {workOrder},
  mixins: [mixin],
  props: {
    treeData: {
      type: Object,
      default: ()=>{},
    },
    members: {
      type: Object,
      default: ()=>{},
    },
    ids: {
      type: Object,
      default: ()=>{},
    },
    editable: {
      type: Boolean,
      default: ()=>true,
    },
  },
  data () {
    return {
      loading: false,
      formData: {},
      defaultProps: {
        children: 'relationList',
        label: 'name',
      },
    }
  },
  watch: {
    'treeData': {
      deep: true,
      handler () {
        this.formData = {}
      },
    },
  },
  computed: {

  },
  methods: {
    handleNodeClick (row) {
      this.$refs['workOrder'] ? this.$refs['workOrder'].clearData() : ''
      if(!row.relationList || !row.relationList.length>0){
        this.formData = row
        this.formData.indexSystemRelationVO = {
          summarize: this.formData.summarize,
          detail: this.formData.detail,
          accord: this.formData.accord,
          weight: this.formData.weight,
        }
        this.$emit('correlation',row)
      }
    },
    createSucess () {
      this.$emit('createSucess')
    },
  },
}
</script>
<style lang="scss" scoped>
.company{
  .c-item{
    margin: 15px 0;
    cursor: pointer;
  }
}
.containerLeft{
  border: 1px solid #EBEEF5;
  margin: 5px;
  padding: 5px;
  min-height: 400px;
}
</style>
