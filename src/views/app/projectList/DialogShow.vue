<template>
  <div class="dialog-show" v-show="dialogShow">
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <el-button @click="handleDeleteAll" class="deleteAll">清空全部</el-button>
    <i class="icon-guanbi" @click="close"></i>
    <div style="margin: 15px 0;"></div>
    <el-scrollbar style="height:220px">
      <el-checkbox-group class="options" v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox class="options-item" v-for="option in cities" :label="option.id" :key="option.id">
          <span>{{option.projectName}}</span>
          <i @click.stop="handleDelete(option)" class="icon-shanchu"></i>
        </el-checkbox>
      </el-checkbox-group>
    </el-scrollbar>
    <div class="dialog-bottom">
      <div class="count">
        <!-- <span>{{size}}个模块</span>
        <span>共计：￥{{count}}</span> -->
      </div>
      <el-button type="primary" @click="handeleCustom" size="small">开始PK</el-button>
    </div>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import { mapState, mapMutations } from 'vuex'
export default {
  mixins: [mixins],
  data () {
    return {
      checkAll: true,
      checkedCities: [],
      isIndeterminate: true,
      arrId: [],
    }
  },
  created () {
  },
  computed: {
    ...mapState({
      cities: state => state.gpms.dataList,
      dialogShow: state => state.gpms.projectPkDialogShow,
    }),
  },
  methods: {
    close () {
      this.setProjectPkDialogShow(false)
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
    handeleCustom () {
      if (this.checkedCities.length > 3) {
        this.$message({
          message: 'pk数量不能大于三个！',
          type: 'warning',
        })
      }
      else if (this.checkedCities.length == 0) {
        this.$message({
          message: '请勾选要pk的项目！',
          type: 'warning',
        })
      }
      else {
        this.$router.push({
          path: '/app/project_pk',
          query: {
            ids: this.arrId,
          },
        })
      }
    },
    ...mapMutations({
      setProjectRemovePk: 'SET_PROJECT_REMOVE_PK',
      setProjectPkDialogShow: 'SET_PROJECT_PK_DIALOG_SHOW',
    }),
    handleDelete (val) {
      // const removeObject = { id: val.id, projectName: val.projectName }
      this.setProjectRemovePk(val.id)
    },
    handleDeleteAll () {
      this.setProjectRemovePk(-1)
    },
  },
}
</script>
<style scoped lang='scss'>
.dialog-show {
  position: absolute;
  right: 20px;
  bottom: 65px;
  padding: 0 15px 15px;
  width: 300px;
  border: 1px solid #eee;
  background-color: #fff;
  .deleteAll {
    position: absolute;
    left: 85px;
    top: 13px;
    padding: 6px 10px;
    font-size: 16px;
    border: 0;
    cursor: pointer;
  }
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
    top: 10px;
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
