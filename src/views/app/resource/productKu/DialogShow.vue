<template>
  <div class="dialog-show" v-show="dialogShow">
    <el-checkbox
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="handleCheckAllChange"
    >全选</el-checkbox>
    <i class="icon-guanbi" @click="close"></i>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group class="options" v-model="checkedCities" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="option in cities" :label="option.id" :key="option.id">
        <span>{{option.label}}</span>
        <span>{{option.money}}</span>
        <i @click.stop="handleDelete" class="icon-shanchu"></i>
      </el-checkbox>
    </el-checkbox-group>
    <div class="dialog-bottom">
      <div class="count">
        <span>5个模块</span>
        <span>共计：￥90000</span>
      </div>
      <el-button type="primary" @click="handeleCustom">产品定制</el-button>
    </div>
  </div>
</template>
<script>
const optionOptions = [
  { id: 1, label: '智能系统十世纪案件', money: '23112' },
  { id: 2, label: '智能系统十世纪案件', money: '23112' },
  { id: 3, label: '智能系统十世纪案件', money: '23112' },
  { id: 4, label: '智能系统十世纪案件', money: '23112' },
]
export default {
  data () {
    return {
      dialogShow: false,
      checkAll: false,
      checkedCities: [],
      cities: optionOptions,
      isIndeterminate: true,
    }
  },
  methods: {
    close () {
      this.dialogShow = false
    },
    handleDelete () {
      console.log(1)
    },
    handeleCustom () {
        this.$router.push('/app/resource/product_ku/product_customization')
    },  
    handleCheckAllChange () {
      this.checkAll = !!this.checkAll
      let checked = optionOptions.map(function (item) { return item.id })
      this.checkedCities = this.checkAll ? checked : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
  },
}
</script>
<style scoped lang='scss'>
.dialog-show {
  position: relative;
  padding: 15px;
  box-shadow: 0 0 1px #ccc;
  background-color: #fff;
  & > i {
    position: absolute;
    right: 15px;
    top: 25px;
    color: #aaa;
    font-size: 16px;
    cursor: pointer;
  }
  .dialog-bottom {
    display: flex;
    justify-content: space-between;
    .count {
      span {
        display: block;
      }
    }
  }
  .options {
    margin-bottom: 15px;
    border-bottom: 1px solid #eee;
    span {
      margin-right: 15px;
    }
    i {
      margin-left: 25px;
      font-size: 16px;
      color: #aaa;
    }
  }
}
</style>
<style scoped>
.dialog-show >>> .el-checkbox {
  display: block;
  margin: 15px 0;
}
</style>
