<template>
  <div class="dialog-show" v-show="dialogShow">
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <span @click="handleAllDelete">批量删除</span>
    <i class="icon-guanbi" @click="close"></i>
    <div style="margin: 15px 0;"></div>
    <el-scrollbar style="height:300px">
      <el-checkbox-group class="options" v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox class="options-item" v-for="option in cities" :label="option.id" :key="option.id">
          <span>{{option.moduleName}}</span>
          <span>{{option.preferentialPrice}}</span>
          <i @click.stop="handleDelete(option.id)" class="icon-shanchu"></i>
        </el-checkbox>
      </el-checkbox-group>
    </el-scrollbar>
    <div class="dialog-bottom">
      <div class="count">
        <span>{{size}}个模块</span>
        <span>共计：￥{{count}}</span>
      </div>
      <el-button type="primary" @click="handeleCustom">产品定制</el-button>
    </div>
  </div>
</template>
<script>
import { getCusList, deleteModuleById, deleteBatchDelete } from '@/api/app/cpms/custom_module'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  data () {
    return {
      dialogShow: false,
      checkAll: false,
      checkedCities: [],
      cities: [],
      isIndeterminate: true,
      size: '',
      count: '',
      arrId: [],
    }
  },
  created () {
    this.loadPage()
  },
  watch: {
    arrId () {
    },
  },
  methods: {
    close () {
      this.dialogShow = false
    },
    async loadPage () {
      await getCusList().then(({ data }) => {
        this.cities = data.data
        this.size = data.data.length ? data.data.length : 0
        this.$emit('get-size', this.size)
        let arr = []
        data.data.forEach(item => {
          arr.push(item.preferentialPrice)
          let result = arr.reduce((total, currentValue) => {
            return total + currentValue
          })
          this.count = result
        })
      })
    },
    handleDelete (id) {
      this._handleGlobalDeleteById(id, deleteModuleById)
    },
    async handleAllDelete () {
      try {
        await deleteBatchDelete(this.arrId).then((data) => {
          if (data.data && this.arrId.length !== 0) {
            this.$message.success({
              message: '操作成功',
              type: 'success',
            })
            this.arrId = []
            this.loadPage()
          } else {
            this.$message({
              message: '请选择删除对象',
              type: 'warming',
            })
          }
        })
      } catch (error) {
        this.$message({
          message: error.message,
          type: 'error',
        })
      }
    },
    handeleCustom () {
      this.$router.push('/app/resource/product_ku/product_customization')
    },
    handleCheckAllChange () {
      this.checkAll = !!this.checkAll
      let checked = this.cities.map(function (item) { return item.id })
      this.checkedCities = this.checkAll ? checked : []
      this.isIndeterminate = false
      this.arrId = this.checkedCities
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
      this.arrId = value
    },
  },
}
</script>
<style scoped lang='scss'>
.dialog-show {
  padding: 15px;
  min-width: 300px;
  box-shadow: 0 0 1px #ccc;
  background-color: #fff;
  & > span {
    position: absolute;
    left: 94px;
    top: 30px;
    color: #999;
    cursor: pointer;
    &:hover {
      color: #888;
    }
  }
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
    position: relative;
    width: 100%;
    margin-bottom: 15px;
    border-bottom: 1px solid #eee;
    .options-item {
      &:hover span {
        color: #ba1b21;
      }
    }
    span {
      display: inline-block;
      vertical-align: -5px;
      line-height: 22px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:nth-child(1) {
        width: 200px;
      }
      &:nth-child(2) {
        width: 100px;
      }
    }
    i {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 16px;
      color: #aaa;
    }
  }
}
</style>
<style scoped>
.dialog-show >>> .el-checkbox {
  position: relative;
  display: block;
  margin: 15px 8px 15px 0;
}
</style>
