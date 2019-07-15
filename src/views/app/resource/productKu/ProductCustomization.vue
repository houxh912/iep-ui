<template>
  <div class="pro-cus">
    <basic-container>
      <h2>定制产品</h2>
      <operation-container></operation-container>
      <iep-table :isLoadTable="false" :isPagination="false" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
        <el-table-column prop="operation" label="操作" width="260">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleDeleteById(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
      <div class="counts">
        <span>
          <span class="size">{{size}}</span>个模块
        </span>
        <span>
          共计:
          <span class="count">{{count}}</span>
        </span>
      </div>
    </basic-container>
    <div class="pro-cus-sub">
      <el-form :model="form" :rules="rules" label-width="120px" size="small" class="form-detail">
        <el-form-item label="产品定制名称：" prop="customName">
          <el-input v-model="form.customName" placeholder="请输入产品定制名称"></el-input>
        </el-form-item>
        <el-form-item label="产品说明：">
          <el-input v-model="form.synopsis" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn-culomn">
        <iep-button type="primary" size="medium" @click="submitForm()">提交</iep-button>
      </div>
    </div>
  </div>
</template>
<script>
import { getCusList, deleteModuleById } from '@/api/app/cpms/custom_module'
import { putCustomProdect } from '@/api/app/cpms/custom_product'
import { columnsMap, initSearchForm, rules } from './options'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      rules,
      size: '',
      count: '',
      form: initSearchForm(),
      pagedTable: [],
      ids: '',
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      getCusList().then(({ data }) => {
        this.pagedTable = data.data
        this.size = data.data.length ? data.data.length : 0
        let arr = []
        let arrId = []
        data.data.forEach(item => {
          arr.push(item.preferentialPrice)
          arrId.push(item.id)
          let result = arr.reduce((total, currentValue) => {
            return total + currentValue
          })
          this.count = result
        })
        this.ids = arrId
      })
    },
    init () {
      this.loadPage()
      this.count = 0
      this.form = initSearchForm()
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.id, deleteModuleById)
    },

    //防止点击频率过快，导致加载两条
    debounce (fn, wait) {
      let timeout = null
      return function () {
        if (timeout !== null) clearTimeout(timeout)
        timeout = setTimeout(fn, wait)
      }
    },
    async submitForm () {
      this.debounce(putCustomProdect({ customModules: this.ids, ...this.form }).then(({ data }) => {
        if (data.data) {
          this.$message.success('提交成功')
          this.init()
        } else {
          this.$message(data.msg)
        }
      }), 200)
    },
  },
}
</script>
<style scoped>
.pro-cus >>> .title-col {
  text-align: center;
}
.pro-cus >>> .el-button--primary {
  margin: 0 auto;
}
</style>
<style scoped lang='scss'>
.pro-cus {
  width: 1200px;
  margin: 0 auto;
  .counts {
    padding: 15px;
    text-align: right;
    & > span {
      margin-right: 15px;
      font-size: 14px;
      .size,
      .count {
        font-size: 16px;
      }
      .count {
        color: #ba1b21;
      }
    }
  }
  h2 {
    text-align: center;
  }
}
.pro-cus-sub {
  padding: 50px 200px;
  border: 1px solid #eee;
  .btn-culomn {
    display: flex;
  }
}
</style>
