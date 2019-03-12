<template>
  <iep-dialog :dialog-show="dialogShow" title="收藏至" width="50%" @close="resetForm">
    
    <el-radio-group v-model="selectVal">
      <el-radio v-for="(item, index) in list" :key="index" :label="item.value" class="radio">{{item.name}}</el-radio>
    </el-radio-group>

    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">确定</iep-button>
      <iep-button @click="resetForm">取消</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
import IepDialog from '@/components/IepDialog/'

export default {
  components: { IepDialog },
  data () {
    return {
      dialogShow: false,
      selectVal: '',
      list: [
        {name: '材料二级目录1', value: 1},
        {name: '材料二级目录2', value: 2},
        {name: '材料二级目录3', value: 3},
        {name: '材料二级目录4', value: 4},
        {name: '材料二级目录5', value: 5},
        {name: '材料二级目录6', value: 6},
      ],
    }
  },
  methods: {
    resetForm () {
      this.dialogShow = false
    },
  },
}
</script>

<style lang="scss" scoped>
.radio {
  width: calc(50% - 40px);
  margin: 0;
  padding: 10px;
}
</style>
